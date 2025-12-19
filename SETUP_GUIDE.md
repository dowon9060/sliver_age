# 실버세대 커뮤니티 앱 설치 및 실행 가이드

## 목차
1. [개발 환경 요구사항](#개발-환경-요구사항)
2. [백엔드 설정](#백엔드-설정)
3. [모바일 앱 설정](#모바일-앱-설정)
4. [데이터베이스 설정](#데이터베이스-설정)
5. [환경 변수 설정](#환경-변수-설정)

---

## 개발 환경 요구사항

### 필수 도구
- **Node.js**: v18 이상
- **npm** 또는 **yarn**
- **PostgreSQL**: v14 이상
- **Redis**: v6 이상 (선택사항, 실시간 기능용)
- **React Native 개발 환경**:
  - iOS: Xcode (macOS)
  - Android: Android Studio

---

## 백엔드 설정

### 1. 의존성 설치
```bash
cd backend
npm install
```

### 2. 환경 변수 설정
`.env` 파일을 생성하고 다음 내용을 입력하세요:

```env
# 데이터베이스
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=silver_age

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d

# AWS S3 (파일 업로드용)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET_NAME=silver-age-uploads
AWS_REGION=ap-northeast-2

# 네이버 맵 API
NAVER_MAP_CLIENT_ID=your-naver-map-client-id
NAVER_MAP_CLIENT_SECRET=your-naver-map-client-secret

# 토스페이먼츠
TOSS_PAYMENTS_SECRET_KEY=test_sk_
TOSS_PAYMENTS_CLIENT_KEY=test_ck_

# 앱 설정
PORT=3000
NODE_ENV=development
```

### 3. 데이터베이스 생성
```bash
# PostgreSQL 접속
psql -U postgres

# 데이터베이스 생성
CREATE DATABASE silver_age;
```

### 4. 백엔드 실행
```bash
# 개발 모드
npm run start:dev

# 프로덕션 빌드
npm run build
npm run start:prod
```

서버가 http://localhost:3000 에서 실행됩니다.

---

## 모바일 앱 설정

### 1. 의존성 설치
```bash
cd mobile
npm install
```

### 2. iOS 설정 (macOS만 해당)
```bash
cd ios
pod install
cd ..
```

### 3. 환경 설정
`mobile/src/api/client.ts` 파일에서 API 주소를 확인하세요:
```typescript
const API_BASE_URL = 'http://localhost:3000/api';
// 실제 기기에서 테스트할 경우, localhost를 컴퓨터의 IP 주소로 변경
```

### 4. 앱 실행

**iOS:**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

**웹 (개발용):**
```bash
npm run web
```

---

## 데이터베이스 설정

### 데이터베이스 마이그레이션
백엔드를 처음 실행하면 TypeORM이 자동으로 테이블을 생성합니다 (synchronize: true).

**프로덕션 환경에서는 반드시 `synchronize: false`로 설정하고 마이그레이션을 사용하세요!**

### 초기 데이터 입력 (선택사항)

#### 1. 장소 데이터 (경로당, 카페 등)
```sql
INSERT INTO locations (name, address, latitude, longitude, type, "isAffiliated") VALUES
('행복 경로당', '서울시 강남구 테헤란로 123', 37.5012, 127.0396, 'senior_center', false),
('실버 카페', '서울시 송파구 올림픽로 456', 37.5145, 127.1051, 'cafe', true),
('모두의 식당', '서울시 강동구 천호대로 789', 37.5301, 127.1238, 'restaurant', true);
```

#### 2. 취미 카테고리
```sql
INSERT INTO hobbies (name, description, category) VALUES
('등산', '자연과 함께하는 건강한 활동', '운동'),
('서예', '붓글씨를 배우고 연습합니다', '문화'),
('노래교실', '함께 노래하며 즐거운 시간', '문화'),
('탁구', '실내에서 즐기는 스포츠', '운동');
```

---

## API 테스트

### 회원가입
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "01012345678",
    "password": "password123",
    "nickname": "행복한할머니",
    "gender": "female",
    "ageGroup": "60대"
  }'
```

### 로그인
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "01012345678",
    "password": "password123"
  }'
```

### 소모임 목록 조회
```bash
curl http://localhost:3000/api/meetings
```

---

## 주요 기능 설명

### 1. 위치 기반 서비스
- 주변 경로당 및 모임 장소 찾기
- 실시간 인원수 확인
- 체크인/체크아웃 기능

### 2. 소모임 시스템
- 소모임 생성 및 참여
- 참여비 결제 (토스페이먼츠)
- 모임 완료 후 참여자 평가 (칭찬, 후기, 매너 점수)

### 3. 매너 점수 시스템
- 초기 점수: 50%
- 긍정 평가로 점수 상승
- 부정 평가로 점수 하락
- 프로필에 하트 아이콘으로 표시

### 4. 커뮤니티
- 게시글 작성 (텍스트 + 사진 최대 10장)
- 좋아요/싫어요 반응
- 댓글 작성

### 5. 공동구매
- 할인 상품 (공동구매 딜)
- 일반 상품 구매
- 상품 리뷰 및 평점

### 6. 취미활동
- 같은 취미를 가진 사람 매칭
- 국가 교육 프로그램 신청

### 7. 동네병원
- 주변 병원 검색
- 병원 예약
- 픽업 요청

---

## 트러블슈팅

### 백엔드 연결 실패
- PostgreSQL이 실행 중인지 확인
- `.env` 파일의 데이터베이스 설정 확인

### 모바일 앱 빌드 오류
- `node_modules` 삭제 후 재설치: `rm -rf node_modules && npm install`
- iOS: `cd ios && pod install`
- 캐시 삭제: `npm start -- --reset-cache`

### 네이버맵 API 오류
- 네이버 클라우드 플랫폼에서 Maps API 키 발급 필요
- https://www.ncloud.com/

### 토스페이먼츠 테스트
- 테스트 키 사용 시 실제 결제 없이 테스트 가능
- https://docs.tosspayments.com/

---

## 배포

### 백엔드 배포 (AWS EC2 예시)
1. EC2 인스턴스 생성
2. PostgreSQL 및 Redis 설정
3. 프로덕션 환경 변수 설정
4. PM2로 프로세스 관리
```bash
npm install -g pm2
pm2 start dist/main.js --name silver-age-api
```

### 모바일 앱 배포
- **iOS**: App Store Connect에 업로드
- **Android**: Google Play Console에 업로드

---

## 라이선스
MIT License

## 문의
프로젝트 관련 문의: your-email@example.com





