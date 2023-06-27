FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps && npm i -g --unsafe-perm @nestjs/cli

EXPOSE 3003
