FROM node:25-alpine

WORKDIR /app

COPY ./src/package*.json ./

RUN npm install

COPY ./src .

EXPOSE 3000

ENTRYPOINT [ "node", "api.mjs" ]