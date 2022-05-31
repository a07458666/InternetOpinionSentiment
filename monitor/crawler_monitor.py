import http.server
from prometheus_client import start_http_server
from prometheus_client import Counter
from prometheus_client import Gauge

REQUESTS_COUNTER = Counter('crawler_requests', 'Demo counter metric to record request count', labelnames=['info', 'response_code'])

app_info = {
  'app': 'crawler',
  'author' : 'lab18',
  'author_email': 'xxx@gmail.com',
  'version' : '0.0.1',
}

INFO = Gauge('crawler_info', 'Demo info metric to record application info', 
             labelnames=app_info.keys())
INFO.labels(**app_info).set(1)

class DemoHandler(http.server.BaseHTTPRequestHandler):
  def do_GET(self):
    tokens = self.path.split('/')
    if (tokens[1] == 'search_fail'):
      REQUESTS_COUNTER.labels(tokens[1], 510).inc()
      self.send_response(500)
      self.end_headers()
      self.wfile.write(b"Search Fail!\n")
    elif (tokens[1] == 'search_url'):
      REQUESTS_COUNTER.labels(tokens[1], 200).inc()
      self.send_response(200)
      self.end_headers()
      self.wfile.write(b"Search url Success.\n")
    elif (tokens[1] == 'beautifulsoup_error'):
      REQUESTS_COUNTER.labels(tokens[1], 511).inc()
      self.send_response(501)
      self.end_headers()
      self.wfile.write(b"Beautifulsoup Error!\n")
    else:
      self.send_response(512)
      self.end_headers()
      self.wfile.write(b"fail to connect prometheus.\n")



if __name__ == "__main__":
  print("Starting metrics endpoint...")
  # expose /metrics http endpoint in port 8123
  start_http_server(8777)

  print("Starting service endpoint...")
  # service endpoint
  server = http.server.HTTPServer(('', 8111), DemoHandler)
  server.serve_forever()