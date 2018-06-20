FROM node:6.1.0

WORKDIR /client/src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "server/index.js"]