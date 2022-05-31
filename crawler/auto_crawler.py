from ast import keyword
from crawler_sample import GoogleCrawler
import pymongo
from pymongo.errors import ConnectionFailure
from tqdm import tqdm
import datetime
import os
import pathlib
import yaml
import requests

CFG_DB_PATH = os.path.join(pathlib.Path(__file__).parent.absolute(), "config", "cfg_db.yaml")
CFG_CRAWLER_PATH = os.path.join(pathlib.Path(__file__).parent.absolute(), "config", "cfg_crawler.yaml")

class AutoCrawler(GoogleCrawler):
    def __init__(self, useDB = True):
        super().__init__()
        self.db_cfg, self.keywords, self.whitelist = self.loadCfg()
        self.url_count = '10'
        self.useDB = useDB
        if self.useDB:
            self.setDB()

    def getTextbyURL(self, url)-> list:
        response = self.get_source(url)
        print("response : ", response)
        soup = self.html_parser(response.text)
        orignal_text = self.html_getText(soup)
        print(orignal_text[:100])
        return orignal_text

    def countKeyWord(self, whitelist, orignal_text)->dict:
        result_wordcount = self.word_count(orignal_text)
        end_result = self.get_wordcount_json(self.whitelist , result_wordcount)
        # print(end_result)
        return end_result

    def run(self):
        print(self.keywords)
        for query in self.keywords:
            results = self.google_search(query , 'qdr:w' , self.url_count)
            for result in tqdm(results):
                url = result["link"]
                orignal_text = self.getTextbyURL(url)
                try:
                    r = requests.get('http://localhost:8111/search_url') # 需要加上try，因為在test的時候可能並沒有建立prometheus，會導致這行出錯
                except requests.exceptions.RequestException as e:
                    pass
                end_results = self.countKeyWord(self.whitelist, orignal_text)
                print("end_result : ", end_results)
                for end_result in end_results:
                    self.sentToDb(end_result)
            print(query, ' is OK')   
        return 0
    
    def loadCfg(self):
        with open(CFG_DB_PATH, 'r') as db_f:
            db_cfg = yaml.load(db_f)
            
        with open(CFG_CRAWLER_PATH, 'r', encoding='utf-8') as cfg_f:
            cfg = yaml.load(cfg_f, Loader=yaml.FullLoader)
        keywords = cfg.get('keywords', ['TSMC'])
        whitelist = cfg.get('whitelist', ['TSMC'])
        return db_cfg, keywords, whitelist

    def setDB(self):
        usr = self.db_cfg.get("usr", "")
        pwd = self.db_cfg.get("pwd", "")
        ip = self.db_cfg.get("ip", "")
        port = self.db_cfg.get("port", "")
        self.dbName = self.db_cfg.get("database_name", "")
        db_url = "mongodb://{}:{}@{}:{}/{}".format(usr, pwd, ip, port, self.dbName)
        print("db_url :", db_url)
        self.dbclient = pymongo.MongoClient(db_url)
        self.colName = self.db_cfg.get("collection_name", "")

        self.mydb = self.dbclient[self.dbName]
        self.mycol = self.mydb[self.colName]
        return
    
    def setKeyword(self, keywords):
        self.keywords = keywords

    def sentToDb(self, keywords_count_data):
        if (not self.useDB):
            return 0
        collist = self.mydb.list_collection_names()
        keywords_count_data["Timestamp"] = datetime.datetime.utcnow()

        if self.colName in collist:
            x = self.mycol.insert_one(keywords_count_data)
        return 0

if __name__ == "__main__":
    auto_crawler = AutoCrawler()
    auto_crawler.run()