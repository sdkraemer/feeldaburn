FROM node:boron

MAINTAINER Scott Kraemer

#COPY . /var/www
WORKDIR /var/www

#RUN npm install -g nodemon
RUN npm install -g pm2
RUN npm install

RUN mkdir -p /var/log/pm2

RUN apt-get update

EXPOSE 3000
#DO NOT COMMIT THIS, PORT 7000 SHOULD NOT BE EXPOSED
EXPOSE 7000 

ENV NODE_ENV $node_env

#ENTRYPOINT ["nodemon", "server.js", "-L"]
ENTRYPOINT ["pm2", "start", "server.js", "--log", "/var/log/pm2/pm2.log", "--watch", "--no-daemon"]

#CMD ["pm2-docker", "process.json"]  