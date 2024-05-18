FROM node:14

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

COPY init.sql /docker-entrypoint-initdb.d/

CMD ["node", "index.js"]
