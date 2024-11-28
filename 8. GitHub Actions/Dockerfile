# 베이스 이미지 설정
FROM node:20.18

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 패키지 파일 복사 및 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# 애플리케이션 빌드 (필요한 경우)
# RUN npm run build

# 포트 노출
EXPOSE 3000

# 애플리케이션 시작
CMD ["npm", "start"]