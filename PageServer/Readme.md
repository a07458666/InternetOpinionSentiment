
# Architecture
PageServer/my-app/ : fontend project (power by reactJS)
PageServer/: page server project (power by expressJS)

# Debuging
## fontend 
```
cd PageServer/my-app/

npm install && npm run start
```
[see more detail](./my-app/Readme.md)
## page server
```
cd PageServer

npm install && npm run start
```


# Deployment
## Deploy to GKE (k8s)


### Step 1: Build and push to docker hub
```
cd PageServer/

docker build -t [your dockerhub account]/[your image] .

(docker login -u [your dockerhub account])

docker push [your dockerhub account]/[your image]
```
### Step 2: Change deployment.yaml
```
cp deployment.example.yaml deployment.yaml

修改 deployment.yaml  --> image: [your dockerhub account]/[your image]
```

### Step 3: k8s apply
```
kubectl apply -f deployment.yaml
``` 
--
## Deploy by Docker 
```
cd PageServer/

cp /my-app/src/config.example.json  my-app/src/config.json

cd ../  (project_root_dir)

docker-compose up 
```