FROM nginx:latest

MAINTAINER Scott Kraemer

VOLUME /var/cache/nginx

# Copy custom nginx config
COPY docker/config/nginx.conf /etc/nginx/nginx.conf

# Copy dist folder
#COPY . /var/www/public

EXPOSE 80 443

ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]