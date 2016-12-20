FROM nginx:1.10

MAINTAINER Scott Kraemer

VOLUME /var/cache/nginx

# Copy custom nginx config
COPY api/docker/config/nginx.conf /etc/nginx/nginx.conf

# Copy dist folder
COPY ./web/dist/ /var/www/public/

EXPOSE 80 443

ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]