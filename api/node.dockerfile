FROM node:latest

MAINTAINER Scott Kraemer

COPY . /var/www
WORKDIR /var/www

RUN apt-get update

EXPOSE 3000

ENTRYPOINT ["node", "index.js"]
