# 🚀 빠른 시작 가이드

프로젝트를 **5분 안에** 실행하는 방법입니다.

---

## ✅ 체크리스트

실행 전에 확인하세요:

- [ ] Node.js v18 이상 설치됨
- [ ] PostgreSQL 설치됨
- [ ] 터미널 2개 준비 (백엔드용, 모바일용)

---

## 📋 순차적 실행 단계

### 1단계: 자동 설치 스크립트 실행

```bash
cd /Users/dowon_mac/Desktop/도원프로젝트/silver_age
./start.sh
```

이 스크립트가 자동으로:
- ✅ 백엔드 패키지 설치
- ✅ 모바일 앱 패키지 설치
- ✅ 환경 파일 생성
- ✅ PostgreSQL 확인

### 2단계: PostgreSQL 데이터베이스 생성

```bash
# PostgreSQL 실행 (macOS)
brew services start postgresql@14

# 데이터베이스 생성
psql -U postgres -c "CREATE DATABASE silver_age;"
```

**Windows 사용자:**
```cmd
psql -U postgres
CREATE DATABASE silver_age;
\q
```

### 3단계: 환경 변수 설정

`backend/.env` 파일을 열어 다음 항목을 수정하세요:

```env
# 필수 설정
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=YOUR_PASSWORD  # ⬅️ 여기를 수정
DB_DATABASE=silver_age

JWT_SECRET=my-super-secret-key-123  # ⬅️ 임의의 긴 문자열

# 나머지는 기본값 사용 가능
```

### 4단계: 백엔드 실행

**터미널 1** (백엔드):
```bash
cd backend
npm run start:dev
```

서버가 실행되면 다음과 같은 메시지가 나타납니다:
```
🚀 서버가 http://localhost:3000 에서 실행 중입니다.
```

### 5단계: 모바일 앱 실행

**터미널 2** (모바일):
```bash
cd mobile
npm start
```

Metro Bundler가 시작되면:
- iOS: 키보드에서 `i` 입력
- Android: 키보드에서 `a` 입력
- 웹 (테스트용): 키보드에서 `w` 입력

---

## 🧪 테스트

### API 테스트

백엔드가 실행 중인 상태에서:

```bash
# 회원가입
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "01012345678",
    "password": "test1234",
    "nickname": "테스트유저",
    "gender": "male",
    "ageGroup": "60대"
  }'

# 로그인
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "01012345678",
    "password": "test1234"
  }'
```

성공하면 `access_token`이 반환됩니다!

### 모바일 앱 테스트

1. **회원가입** 화면에서 계정 생성
2. **로그인** 
3. **홈** 탭에서 지도 확인
4. **소모임** 탭에서 모임 목록 확인

---

## ⚠️ 문제 해결

### 백엔드가 실행되지 않을 때

**증상:** `npm run start:dev` 실패

**해결:**
```bash
# node_modules 삭제 후 재설치
cd backend
rm -rf node_modules package-lock.json
npm install
npm run start:dev
```

### 데이터베이스 연결 오류

**증상:** `ECONNREFUSED` 또는 `password authentication failed`

**해결:**
1. PostgreSQL 실행 확인:
```bash
# macOS
brew services list | grep postgresql

# 실행
brew services start postgresql@14
```

2. `.env` 파일의 비밀번호 확인
3. 데이터베이스 생성 확인:
```bash
psql -U postgres -c "\l" | grep silver_age
```

### 모바일 앱이 백엔드에 연결되지 않을 때

**증상:** API 호출 실패

**해결:**
1. `mobile/src/api/client.ts` 파일 열기
2. 실제 기기에서 테스트하는 경우:
```typescript
// localhost를 컴퓨터의 IP로 변경
const API_BASE_URL = 'http://192.168.0.10:3000/api';
```

3. 컴퓨터 IP 확인:
```bash
# macOS/Linux
ifconfig | grep "inet "

# Windows
ipconfig
```

### Metro Bundler 캐시 문제

**해결:**
```bash
cd mobile
npm start -- --reset-cache
```

### iOS 빌드 오류

**해결:**
```bash
cd mobile/ios
pod install
cd ..
npm run ios
```

---

## 📱 실제 기기에서 테스트

### iOS (iPhone/iPad)

1. Xcode 열기
2. 개발자 계정 등록
3. 기기 연결
4. Xcode에서 실행

### Android

1. 개발자 모드 활성화
2. USB 디버깅 활성화
3. 기기 연결
4. `npm run android`

---

## 🎯 다음 단계

프로젝트가 성공적으로 실행되면:

1. **초기 데이터 입력**
   - `SETUP_GUIDE.md`의 "초기 데이터 입력" 섹션 참고
   - 장소, 취미 카테고리 등

2. **외부 API 설정**
   - 네이버 맵 API 키 발급
   - 토스페이먼츠 테스트 키 설정

3. **기능 테스트**
   - 회원가입/로그인
   - 소모임 생성
   - 커뮤니티 게시글 작성
   - 매너 점수 시스템 테스트

---

## 📚 추가 문서

- [상세 설치 가이드](./SETUP_GUIDE.md)
- [API 문서](./API_DOCUMENTATION.md)
- [프로젝트 계획](./.plan.md)

---

## 🆘 도움이 필요하신가요?

1. 문서를 다시 확인하세요
2. 에러 메시지를 검색하세요
3. GitHub Issues 확인

---

**행운을 빕니다! 🍀**





