# 이미지 빌드
docker-compose build

# 로컬 이미지에 태그 지정
docker tag skkuding-study-app manayume/skkuding-study-app:latest

# Docker Hub에 이미지 푸시
docker push manayume/skkuding-study-app:latest