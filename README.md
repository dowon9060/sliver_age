# 🌟 실버세대 커뮤니티 앱

> 실버세대를 위한 **커뮤니티 & 소모임 중심**의 모바일 애플리케이션

![Status](https://img.shields.io/badge/status-완성-success)
![Backend](https://img.shields.io/badge/backend-NestJS-red)
![Frontend](https://img.shields.io/badge/mobile-React%20Native-blue)
![Database](https://img.shields.io/badge/database-PostgreSQL-blue)

---

## 📋 목차
- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)
- [시작하기](#-시작하기)
- [문서](#-문서)

---

## 🎯 프로젝트 소개

**실버세대 커뮤니티 앱**은 노년층이 쉽게 사용할 수 있도록 설계된 커뮤니티 플랫폼입니다.

### 핵심 가치
- 🔍 **위치 기반**: 주변 경로당과 모임 장소를 쉽게 찾기
- 👥 **소모임**: 함께할 사람들과 만나기
- ❤️ **매너 점수**: 신뢰할 수 있는 커뮤니티
- 💬 **커뮤니티**: 정보 공유 및 소통
- 🎨 **실버세대 맞춤 UI**: 큰 글씨, 명확한 버튼

---

## ✨ 주요 기능

### 1️⃣ 위치 기반 서비스
- 📍 주변 경로당 및 모임 장소 실시간 확인
- 👤 각 장소의 현재 인원 수 표시
- 🔐 프라이버시 보호: 성별과 연령대만 표시

### 2️⃣ 소모임 시스템
- ✏️ 소모임 생성 및 참여
- 🏪 제휴 식당/카페에서 자동 예약
- 💳 토스페이먼츠 결제 연동
- ⭐ **모임 후 평가 시스템**
  - 칭찬 메시지 남기기
  - 간단한 후기 작성
  - 매너 점수 평가 (좋았어요/아쉬워요)
  - 프로필에 하트로 점수 표시 (0~100%)
  - 초기 점수: 50%

### 3️⃣ 커뮤니티 게시판
- 📝 게시글 작성 (사진 최대 10장)
- 👍👎 좋아요/싫어요
- 💬 댓글로 자유로운 소통

### 4️⃣ 공동구매
- 🛒 실버세대 맞춤 상품
- 💰 공동구매 할인 딜
- ⭐ 상품 리뷰 및 평점

### 5️⃣ 취미활동
- 🎨 같은 취미를 가진 사람 매칭
- 📚 국가 지원 교육 프로그램 신청
- 📢 정보 공유

### 6️⃣ 동네병원
- 🏥 주변 병원 검색
- 📅 제휴 병원 예약
- 🚗 픽업 서비스 요청

### 7️⃣ 실시간 기능
- 🔔 Socket.io 실시간 알림
- 📱 FCM 푸시 알림
- ⚡ 실시간 인원수 업데이트

---

## 🛠 기술 스택

### 백엔드
| 기술 | 버전 | 용도 |
|------|------|------|
| Node.js | v18+ | 런타임 |
| NestJS | v10 | 프레임워크 |
| TypeScript | v5 | 언어 |
| PostgreSQL | v14+ | 메인 DB |
| TypeORM | v0.3 | ORM |
| Redis | v6+ | 캐싱 |
| Socket.io | v4 | 실시간 통신 |
| JWT | - | 인증 |
| Bcrypt | - | 암호화 |

### 모바일
| 기술 | 버전 | 용도 |
|------|------|------|
| React Native | v0.73 | 프레임워크 |
| Expo | v50 | 개발 도구 |
| TypeScript | v5 | 언어 |
| React Navigation | v6 | 네비게이션 |
| Zustand | v4 | 상태관리 |
| React Query | v5 | 서버 상태 |
| Axios | v1 | HTTP 클라이언트 |

### 외부 서비스
- 🗺️ **네이버맵 API** - 지도 및 위치
- 💳 **토스페이먼츠** - 결제
- ☁️ **AWS S3** - 이미지 저장
- 🔔 **Firebase FCM** - 푸시 알림

---

## 📁 프로젝트 구조

```
silver_age/
├── backend/                    # 백엔드 (NestJS)
│   ├── src/
│   │   ├── auth/              # 인증/인가
│   │   ├── users/             # 사용자 관리
│   │   ├── locations/         # 장소 관리
│   │   ├── meetings/          # 소모임
│   │   ├── ratings/           # 평가 및 매너점수 ⭐
│   │   ├── community/         # 커뮤니티
│   │   ├── groupbuy/          # 공동구매
│   │   ├── hobby/             # 취미활동
│   │   ├── hospital/          # 병원
│   │   ├── payment/           # 결제
│   │   ├── notification/      # 알림
│   │   └── upload/            # 파일 업로드
│   └── package.json
│
├── mobile/                     # 모바일 앱 (React Native)
│   ├── src/
│   │   ├── screens/           # 화면 컴포넌트
│   │   │   ├── auth/          # 로그인/회원가입
│   │   │   ├── meeting/       # 소모임
│   │   │   ├── community/     # 커뮤니티
│   │   │   └── ...
│   │   ├── components/
│   │   │   ├── common/        # 공통 컴포넌트
│   │   │   ├── rating/        # 평가 시스템 ⭐
│   │   │   └── profile/       # 프로필 (매너점수)
│   │   ├── navigation/        # 네비게이션
│   │   ├── store/             # 상태관리
│   │   ├── api/               # API 클라이언트
│   │   └── types/             # TypeScript 타입
│   └── package.json
│
├── README.md                   # 프로젝트 소개
├── SETUP_GUIDE.md             # 설치 및 실행 가이드
└── API_DOCUMENTATION.md       # API 문서
```

---

## 🚀 시작하기

### 1️⃣ 사전 요구사항
- Node.js v18 이상
- PostgreSQL v14 이상
- Redis v6 이상 (선택)
- React Native 개발 환경

### 2️⃣ 백엔드 실행
```bash
cd backend
npm install
cp .env.example .env
# .env 파일 설정
npm run start:dev
```

### 3️⃣ 모바일 앱 실행
```bash
cd mobile
npm install
npm start

# iOS
npm run ios

# Android
npm run android
```

자세한 설정은 [SETUP_GUIDE.md](./SETUP_GUIDE.md)를 참고하세요.

---

## 📚 문서

- 📖 [설치 및 실행 가이드](./SETUP_GUIDE.md)
- 📡 [API 문서](./API_DOCUMENTATION.md)
- 📋 [프로젝트 계획](./.plan.md)

---

## 🎨 주요 화면 (실버세대 맞춤 UI)

### 특징
- ✅ **큰 글씨** (최소 18px)
- ✅ **큰 터치 영역** (최소 60px)
- ✅ **명확한 색상 대비**
- ✅ **직관적인 아이콘**
- ✅ **간단한 네비게이션**

### 화면 구성
1. **홈 (지도)** - 주변 장소 찾기
2. **소모임** - 모임 목록 및 생성
3. **커뮤니티** - 게시판
4. **더보기** - 공동구매, 취미, 병원
5. **마이페이지** - 프로필, 매너점수 ❤️

---

## 🎯 매너 점수 시스템 (핵심 기능)

### 작동 방식
```
1. 모임 참여
2. 모임 완료 후 참여자 평가
3. 칭찬 메시지 & 후기 작성
4. 매너 평가: 좋았어요 👍 / 아쉬워요 👎
5. 점수 자동 계산
6. 프로필에 하트로 표시 ❤️ XX%
```

### 점수 계산
- 초기 점수: **50%**
- 긍정 평가 시: 점수 상승
- 부정 평가 시: 점수 하락
- 최소 0%, 최대 100%

### 표시 예시
```
닉네임: 행복한할머니
매너 점수: ❤️ 85%  (초록 하트)
성별: 여성
연령대: 60대
```

---

## 🔒 보안

- 🔐 JWT 기반 인증
- 🔒 개인정보 암호화 (전화번호, 주소)
- 🛡️ API Rate Limiting
- ✅ 파일 업로드 검증
- 🔑 환경변수로 민감 정보 관리

---

## 📊 데이터베이스 ERD

주요 테이블:
- `users` - 사용자
- `user_profiles` - 프로필 (매너점수 포함)
- `meetings` - 소모임
- `meeting_participants` - 참여자
- `meeting_reviews` - 평가 및 칭찬 ⭐
- `user_ratings` - 매너점수 집계 ⭐
- `posts` - 게시글
- `comments` - 댓글
- `locations` - 장소
- 기타 20+ 테이블

---

## 🤝 기여

이 프로젝트는 실버세대의 삶의 질 향상을 위해 만들어졌습니다.

---

## 📄 라이선스

MIT License

---

## 📧 문의

프로젝트 관련 문의: your-email@example.com

---

**Made with ❤️ for 실버세대**

