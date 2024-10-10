#!/bin/bash

# Prisma 마이그레이션 생성 및 적용
npx prisma migrate dev --name init

# Prisma 클라이언트 재생성
npx prisma generate

# Node 애플리케이션 실행
npm start