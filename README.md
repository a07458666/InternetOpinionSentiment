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
[Frontend](/PageServer/Readme.md)
### Backend
[Backend]()

### Build step:
Two Choice For Deploy

#### Deploy to GKE (K8s)
    1. 使用docker build各個image，並上傳至docker hub
    2. 在GKE上安裝Prometheus和Grafana，並apply各個deploment和service.yaml
#### Use Docker to Deploy
    1. 修改各個config
    2. docker-comopose up 
