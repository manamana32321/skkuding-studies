docker-compose build
docker tag 3docker-auth manayume/3docker-auth:latest
docker tag 3docker-article manayume/3docker-article:latest
docker tag 3docker-frontend manayume/3docker-frontend:latest
docker push manayume/3docker-auth:latest
docker push manayume/3docker-article:latest
docker push manayume/3docker-frontend:latest