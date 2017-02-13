FROM node:latest

MAINTAINER Scott Kraemer

#COPY . /var/www
WORKDIR /var/www

#RUN npm install -g nodemon
RUN npm install -g pm2
RUN npm install

RUN apt-get update

EXPOSE 3000

#ENTRYPOINT ["nodemon", "server.js", "-L"]
ENTRYPOINT ["pm2", "start", "server.js"]

