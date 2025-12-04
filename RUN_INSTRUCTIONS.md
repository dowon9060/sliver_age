# 🚀 실행 방법 (단계별 가이드)

## ✅ 완료된 작업
- ✅ 백엔드 패키지 설치 완료
- ✅ 모바일 앱 패키지 설치 완료
- ⚠️ PostgreSQL 미설치
- ⚠️ .env 파일 미생성

---

## 📋 실행 순서

### 1️⃣ 환경 변수 설정 (백엔드)

터미널을 열고:

```bash
cd /Users/dowon_mac/Desktop/도원프로젝트/silver_age/backend

# env.example.txt를 .env로 복사
cp env.example.txt .env

# .env 파일 편집
nano .env
```

**최소 필수 설정:**
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=silver_age

JWT_SECRET=my-secret-key-123456789

PORT=3000
NODE_ENV=development
```

저장: `Ctrl+O` → Enter → `Ctrl+X`

---

### 2️⃣ PostgreSQL 설치 및 설정 (선택사항)

#### PostgreSQL 설치하지 않고 테스트하기

백엔드를 실행하지 않고 **모바일 앱만** 먼저 확인할 수 있습니다.

#### PostgreSQL 설치하기 (나중에)

```bash
# macOS
brew install postgresql@14
brew services start postgresql@14

# 데이터베이스 생성
psql postgres -c "CREATE DATABASE silver_age;"
```

---

### 3️⃣ 모바일 앱 실행 (지금 바로 가능!)

**새 터미널 창을 열고:**

```bash
cd /Users/dowon_mac/Desktop/도원프로젝트/silver_age/mobile
npm start
```

몇 초 후 QR 코드와 메뉴가 나타납니다:

```
› Press i │ open iOS simulator
› Press a │ open Android emulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
› Press o │ open project code in your editor

› Press ? │ show all commands
```

---

### 4️⃣ 에뮬레이터/시뮬레이터 실행

#### iOS 시뮬레이터 (macOS)

Metro Bundler가 실행 중일 때:

1. 키보드에서 `i` 입력
2. 자동으로 iOS 시뮬레이터가 실행됩니다
3. 앱이 로드됩니다

**또는 수동으로:**
```bash
# 별도 터미널에서
npx expo run:ios
```

#### Android 에뮬레이터

**먼저 Android Studio에서 에뮬레이터를 실행해야 합니다:**

1. Android Studio 열기
2. More Actions → Virtual Device Manager
3. 에뮬레이터 선택 후 Play 버튼

**그 다음 Metro Bundler에서:**
- 키보드에서 `a` 입력

**또는 수동으로:**
```bash
# 별도 터미널에서
npx expo run:android
```

#### 웹 브라우저 (테스트용)

Metro Bundler가 실행 중일 때:
- 키보드에서 `w` 입력
- 브라우저가 자동으로 열립니다

---

### 5️⃣ 백엔드 실행 (나중에 API 연동 시)

**새 터미널 창을 열고:**

```bash
cd /Users/dowon_mac/Desktop/도원프로젝트/silver_age/backend
npm run start:dev
```

서버 실행 확인:
```
🚀 서버가 http://localhost:3000 에서 실행 중입니다.
```

---

## 🎯 현재 실행 가능한 것

### ✅ 지금 바로 실행 가능
- 모바일 앱 UI 확인
- 네비게이션 테스트
- 화면 레이아웃 확인

### 🔄 백엔드 실행 후 가능
- 회원가입/로그인
- 소모임 생성/참여
- 커뮤니티 게시글 작성
- 매너 점수 시스템
- 모든 API 기능

---

## 📱 모바일 앱 확인 사항

앱이 실행되면 다음을 볼 수 있습니다:

### Bottom Tab Navigation (하단 탭)
1. **홈** - "홈 (지도)" 화면
2. **소모임** - "소모임" 화면
3. **커뮤니티** - "커뮤니티" 화면
4. **더보기** - "더보기" 화면
5. **마이페이지** - "마이페이지" 화면

### 임시 화면들
모든 화면은 현재 기본 텍스트로 표시됩니다.
실제 UI는 로그인, 소모임 리스트, 커뮤니티 화면에 구현되어 있습니다.

---

## 🐛 문제 해결

### "EPERM: operation not permitted" 오류

**원인:** macOS 보안 권한 문제

**해결:**
1. 터미널을 **직접** 열기 (Spotlight에서 "Terminal" 검색)
2. 위의 명령어를 **수동으로** 입력
3. 처음 실행 시 권한 요청이 나오면 **허용**

### Metro Bundler가 시작되지 않음

```bash
cd /Users/dowon_mac/Desktop/도원프로젝트/silver_age/mobile

# 캐시 삭제 후 재시작
rm -rf .expo node_modules
npm install
npm start -- --clear
```

### iOS 시뮬레이터가 열리지 않음

**Xcode 설치 확인:**
```bash
xcode-select --install
```

**시뮬레이터 수동 실행:**
```bash
open -a Simulator
```

### Android 에뮬레이터가 연결되지 않음

**에뮬레이터 목록 확인:**
```bash
emulator -list-avds
```

**수동 실행:**
```bash
emulator -avd Pixel_5_API_33
```

---

## 🎨 UI 확인 포인트

### 실버세대 맞춤 디자인
- ✅ 큰 글씨 (18px 이상)
- ✅ 큰 버튼 (60px 높이)
- ✅ 명확한 색상
- ✅ 간단한 네비게이션

### 매너 점수 시스템
- ✅ 프로필에 하트 ❤️ 표시
- ✅ 0~100% 점수
- ✅ 색상으로 구분 (초록/주황/빨강)

---

## 📞 다음 단계

1. **지금**: 모바일 앱 UI 확인
   ```bash
   cd mobile && npm start
   ```

2. **나중에**: PostgreSQL 설치 및 백엔드 실행
   ```bash
   brew install postgresql@14
   cd backend && npm run start:dev
   ```

3. **마지막**: API 연동 테스트
   - 회원가입
   - 로그인
   - 소모임 생성
   - 매너 점수 테스트

---

## 🆘 추가 도움

- **QUICKSTART.md** - 빠른 시작
- **SETUP_GUIDE.md** - 상세 가이드
- **PROJECT_STATUS.md** - 현재 상태

---

**지금 바로 시작하세요!**

```bash
# 터미널을 직접 열고 실행:
cd /Users/dowon_mac/Desktop/도원프로젝트/silver_age/mobile
npm start

# 그 다음: i (iOS) 또는 a (Android) 또는 w (웹)
```

🎉 행운을 빕니다!

