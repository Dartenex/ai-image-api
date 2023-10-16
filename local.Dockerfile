FROM node:18-alpine

WORKDIR /app
COPY package-lock.json .
COPY package.json .

RUN npm i

COPY . .

CMD ["npm", "run", "start:dev"]
