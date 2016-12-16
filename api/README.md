To Start:
nodemon index.js
Listens on port 3000

Where I left off:
    -Added mongo image to docker-compose file
    -Created ./lib/accessDB.js, added it to index.js
    -Now I need t connect to mongo in accessDB


The way I currently have it setup is web uses nodejs to serve content.
Go into web, do a docker-compose build after running ng build
Then go to api and run a docker-compose build then docker-compose up