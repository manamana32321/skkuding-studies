# 베이스 이미지 설정
FROM node:20.18

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 패키지 파일 복사 및 설치
COPY package*.json ./
RUN npm install

# 애플리케이션 소스 복사
COPY . .

# 스크립트 파일에 실행 권한 부여
RUN chmod +x ./migrate.sh

# 애플리케이션 포트 설정
EXPOSE 3000

# 애플리케이션 시작 명령어
CMD ["node", "app.js"]