FROM node:22.7-alpine

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install --legacy-peer-deps

COPY . .
EXPOSE 5173

CMD [ "npm", "run","dev" ]