from ast import keyword
from crawler_sample import GoogleCrawler
import pymongo
from pymongo.errors import ConnectionFailure
from tqdm import tqdm
import datetime
import os
import pathlib
import yaml


CFG_DB_PATH = os.path.join(pathlib.Path(__file__).parent.absolute(), "config", "cfg_db.yaml")
CFG_CRAWLER_PATH = os.path.join(pathlib.Path(__file__).parent.absolute(), "config", "cfg_crawler.yaml")

class AutoCrawler():
    def __init__(self, useDB = True):
        with open(CFG_DB_PATH, 'r') as db_f:
            db_cfg = yaml.load(db_f)
        self.url_count = '10'
        self.crawler = GoogleCrawler()
        self.useDB = useDB
        if self.useDB:
            usr = db_cfg.get("usr", "")
            pwd = db_cfg.get("pwd", "")
            ip = db_cfg.get("ip", "")
            port = db_cfg.get("port", "")
            self.dbName = db_cfg.get("database_name", "")
            db_url = "mongodb://{}:{}@{}:{}/{}".format(usr, pwd, ip, port, self.dbName)
            print("db_url :", db_url)
            self.dbclient = pymongo.MongoClient(db_url)
            self.colName = db_cfg.get("collection_name", "")

            self.mydb = self.dbclient[self.dbName]
            self.mycol = self.mydb[self.colName]

    def getURL(self, query)-> list:
        results = self.crawler.google_search(query , 'qdr:w' , self.url_count)
        # print(results[:3])
        return results

    def getTextbyURL(self, url)-> list:
        response = self.crawler.get_source(url)
        print("response : ", response)
        soup = self.crawler.html_parser(response.text)
        orignal_text = self.crawler.html_getText(soup)
        print(orignal_text[:100])
        return orignal_text

    def countKeyWord(self, whitelist, orignal_text)->dict:
        result_wordcount = self.crawler.word_count(orignal_text)
        end_result = self.crawler.get_wordcount_json(whitelist , result_wordcount)
        # print(end_result)
        return end_result

    def run(self, keywords, whitelist):
       
        for query in keywords:
            results = self.getURL(query)
            for result in tqdm(results):
                url = result["link"]
                orignal_text = self.getTextbyURL(url)
                end_results = self.countKeyWord(whitelist, orignal_text)
                print("end_result : ", end_results)
                for end_result in end_results:
                    self.sentToDb(end_result)
            print(query, ' is OK')
        
        return 0

    def sentToDb(self, keywords_count_data):
        if (not self.useDB):
            return 0
        collist = self.mydb.list_collection_names()
        keywords_count_data["Timestamp"] = datetime.datetime.utcnow()

        # print(collist)
        if self.colName in collist:
            x = self.mycol.insert_one(keywords_count_data)
        return 0

if __name__ == "__main__":
    with open(CFG_CRAWLER_PATH, 'r', encoding='utf-8') as cfg_f:
        cfg = yaml.load(cfg_f, Loader=yaml.FullLoader)
    keywords = cfg.get('keywords', ['TSMC'])
    whitelist = cfg.get('whitelist', ['TSMC'])
    auto_crawler = AutoCrawler()
    auto_crawler.run(keywords, whitelist)