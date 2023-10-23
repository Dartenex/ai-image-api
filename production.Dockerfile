FROM node:18-alpine as build_stage

WORKDIR /app
COPY package-lock.json .
COPY package.json .

RUN npm i

COPY . .

RUN cd /app/email-builder && npm i

RUN cd /app

RUN npm run build

RUN cd /app/dist && ls -la
RUN cd /app/dist/src && ls -la

FROM node:18-alpine as prod_stage

WORKDIR /app

COPY package-lock.json .
COPY package.json .
RUN npm ci --omit=dev

COPY --from=build_stage /app/dist /app/dist

RUN ls -la
RUN cd /app/dist && ls -la

COPY .env .
RUN cat /app/.env

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
