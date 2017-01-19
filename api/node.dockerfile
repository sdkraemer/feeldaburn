FROM node:latest

MAINTAINER Scott Kraemer

#COPY . /var/www
WORKDIR /var/www

RUN npm install -g nodemon

RUN apt-get update

EXPOSE 3000

ENTRYPOINT ["nodemon", "index.js", "-L"]

