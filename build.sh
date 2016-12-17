#!/bin/bash
echo "build mofo"
cd web
ng build &&
cd .. &&
docker-compose build &&
docker-compose up
