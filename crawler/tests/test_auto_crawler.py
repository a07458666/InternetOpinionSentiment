import sys
import os

current = os.path.dirname(os.path.realpath(__file__))
parent = os.path.dirname(current)
sys.path.append(parent)


import auto_crawler
def test_getURL():
    crawler = auto_crawler.AutoCrawler()
    query = "TSMC Ingas"
    results = crawler.getURL(query)
    assert len(results) > 0

def test_getTextbyURL():
    crawler = auto_crawler.AutoCrawler()
    target_url = 'https://www.reuters.com/technology/exclusive-ukraine-halts-half-worlds-neon-output-chips-clouding-outlook-2022-03-11/'
    results = crawler.getTextbyURL(target_url)
    assert len(results) > 0

def test_countKeyWord():
    query = "TSMC ASML"
    whitelist = ['TSMC', 'ASML' , 'Intel']
    crawler = auto_crawler.AutoCrawler()
    target_url = 'https://www.reuters.com/technology/exclusive-ukraine-halts-half-worlds-neon-output-chips-clouding-outlook-2022-03-11/'
    orignal_text = crawler.getTextbyURL(target_url)
    results = crawler.countKeyWord(whitelist, orignal_text)
    assert len(results) > 0

def test_run():
    keywords = {"TSMC ASML": ['ASML' , 'Intel']}
    crawler = auto_crawler.AutoCrawler()
    ret = crawler.run(keywords)
    assert ret == 0


def test_sentToDb():
    crawler = auto_crawler.AutoCrawler()
    keywords_count_data = { "Date": "week1", "Company": "TSMC", "Count": "1" }
    ret = crawler.sentToDb(keywords_count_data)
    assert ret == 0

