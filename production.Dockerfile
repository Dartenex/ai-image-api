FROM node:18-alpine as build_stage

WORKDIR /app
COPY package-lock.json .
COPY package.json .

COPY email-builder/package.json /app/email-builder/package.json
COPY email-builder/package-lock.json /app/email-builder/package-lock.json

RUN cd /app/email-builder && npm i

RUN npm i

COPY . .
RUN npm run test:unit

RUN npm run build

FROM node:18 as prod_stage

WORKDIR /app

RUN apt-get update
RUN apt-get -f install
RUN apt-get upgrade -y
RUN dpkg --configure -a
RUN wget --continue https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get install -y ./google-chrome-stable_current_amd64.deb

COPY package-lock.json .
COPY package.json .
RUN npm ci --omit=dev

COPY --from=build_stage /app/dist /app/dist

COPY .env .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
