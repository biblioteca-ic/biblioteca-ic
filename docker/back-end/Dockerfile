FROM node:17

LABEL maintainer="Mateus Pereira"

ARG WWWGROUP

WORKDIR /usr/app

COPY ./back-end/package.json .
RUN npm install --quiet

RUN groupadd --force -g $WWWGROUP eco
RUN useradd -ms /bin/bash --no-user-group -g $WWWGROUP -u 1337 eco
