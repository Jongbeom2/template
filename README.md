# Template
기본 기능을 구현한 웹 페이지 애플리케이션

## 기능
- 색 테마 변경
- 실시간 채팅 
- 로그인
- 회원가입
- 사이드 프로젝트 조회
- 이미지 조회, 업로드, 다운로드
- Open API 문서 조회
- Open API Key 발급 및 조회

## 사용 기술
- Front-End : React
- Back-End : Express
- Database : MongoDB
- Deployed : Heroku

## Start producton mode
1. 레포지토리의 소스코드 pull
2. npm i
3. .env에서 MONGO_ID(MongoDB user 입력), MONGO_PASSWORD(MongoDB password 입력), COOKIE_SECRET, JWT_SECRET, NODE_ENV(production 입력) 설정
4. npm start
5. localhost:4000에서 확인
6. 만약 client를 수정했다면 cd client && npm run build 선행 필요

## Start development mode
1. 레포지토리의 소스코드 pull
2. npm i
3. .env에서 MONGO_ID(MongoDB user 입력), MONGO_PASSWORD(MongoDB password 입력), COOKIE_SECRET, JWT_SECRET, NODE_ENV(dev 입력) 
4. npm run dev
5. localhost:4000에서 http API, socket API 확인
6. cd client && npm start
7. localhost:3000에서 client 확인