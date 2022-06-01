FROM python:3.6.15-slim
RUN pip install prometheus-client
COPY ./crawler_monitor.py /crawler/
CMD ["python", "crawler/crawler_monitor.py"]