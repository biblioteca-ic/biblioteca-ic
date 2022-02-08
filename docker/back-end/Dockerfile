FROM node:17

LABEL maintainer="Mateus Pereira"

ARG WWWGROUP

WORKDIR /usr/app

COPY ./back-end/package.json .
RUN npm install --quiet

RUN chown -R 1000:1000 /root/.npm
