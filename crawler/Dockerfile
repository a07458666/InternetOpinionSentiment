FROM python:3.6.15-slim
COPY . /sample_crawler
WORKDIR /sample_crawler
RUN /usr/local/bin/python -m pip install --upgrade pip
RUN pip install -r ./requirements.txt
RUN python3 -m nltk.downloader stopwords
CMD ["python3","auto_crawler.py"]