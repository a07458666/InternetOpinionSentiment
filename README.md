# InternetOpinionSentiment
Lab18

### member:
- 310551010  
- 310554028  
- 310551060  
- 310553042  

### Architecture
![TSMC CloudNative Final Project_](https://user-images.githubusercontent.com/17738580/172309405-36175d78-7f06-4000-bb65-975d60e5381b.png)

### Crawler
[Crawler](https://github.com/a07458666/InternetOpinionSentiment/blob/main/crawler/README.md)

### Frontend
[Frontend]()
### Backend
[Backend]()

### Build step:
#### 1
```
# 前後端build code
cp APIServer/cfg/db_config.example.json  APIServer/cfg/db_config.json
edit APIServer/cfg/db_config.json
cp fontend/my-app/src/config.example.json fontend/my-app/src/config.json
edit fontend/my-app/src/config.json
sh build.sh
```
#### 2
使用docker build各個image，並上傳至docker hub

#### 3
在GKE上安裝Prometheus和Grafana，並apply各個deploment和service.yaml
