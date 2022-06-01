FROM node

WORKDIR /workspace

COPY . .

RUN npm i -g mocha
RUN npm i -g nyc
RUN npm i

CMD ["npm", "run", "start"]
