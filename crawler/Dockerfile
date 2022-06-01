FROM python:3.6.15-slim
COPY . /sample_crawler
WORKDIR /sample_crawler
RUN pip install -r ./requirements.txt
RUN apt-get update
RUN apt-get update && apt-get install -y cron
RUN apt-get install libgomp1
RUN python -m nltk.downloader stopwords
RUN chmod 0644 /sample_crawler/crawler.sh
RUN crontab -l | { cat; echo "*/1 * * * * bash /sample_crawler/crawler.sh"; } | crontab -
CMD cron

# CMD ["python","auto_crawler.py"]