cd ./fontend/my-app
npm run build
cd ../../
cp -r ./fontend/my-app/build ./PageServer 
docker-compose up 