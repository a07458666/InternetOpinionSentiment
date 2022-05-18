from crawler_sample import GoogleCrawler
import pymongo
from pymongo.errors import ConnectionFailure
from tqdm import tqdm
import datetime

class AutoCrawler():
    def __init__(self, db_url = ""):
        self.url_count = '10'
        self.db_url = db_url
        self.crawler = GoogleCrawler()
        if (self.db_url != ""):
            self.dbclient = pymongo.MongoClient(self.db_url)
            self.dbName = "crawler_db"
            self.colName = "crawler_col"

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

    def run(self, keywords):
        for query, whitelist in keywords.items():
            results = self.getURL(query)
            for result in tqdm(results):
                url = result["link"]
                orignal_text = self.getTextbyURL(url)
                end_results = self.countKeyWord(whitelist, orignal_text)
                print("end_result : ", end_results)
                for end_result in end_results:
                    self.sentToDb(end_result)
            print(query, 'Excel is OK')
        return 0

    def sentToDb(self, keywords_count_data):
        if (self.db_url == ""):
            return 0
        collist = self.mydb.list_collection_names()
        keywords_count_data["Timestamp"] = datetime.datetime.utcnow()

        # print(collist)
        if self.colName in collist:
            x = self.mycol.insert_one(keywords_count_data)
        return 0

if __name__ == "__main__":
    keywords = {
        "TSMC ASML": ['ASML' , 'Intel'],
        "TSMC SUMCO": ['SUMCO', ],
        "TSMC Applied Material": ["Applied Material",]
    }
    import yaml

    with open('./db.yaml', 'r') as f:
        data = yaml.load(f)
        db_url = data["db_url"]
        auto_crawler = AutoCrawler(db_url)
        auto_crawler.run(keywords)