FROM node:14.17.3

WORKDIR /app
STOPSIGNAL SIGINT

COPY package*.json ./
COPY ./.sequelizerc ./.sequelizerc
COPY ./nodemon.json ./nodemon.json
COPY ./sequelize ./sequelize
COPY ./app ./app
COPY ./config ./config
COPY ./server.js ./server.js

RUN npm install --quiet