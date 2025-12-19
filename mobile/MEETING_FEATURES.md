# 모임 기능 - 트립닷컴 스타일 UI

## 📱 구현된 기능

### 1. 홈 화면 (MeetingHomeScreen)
트립닷컴 스타일의 모던한 UI로 디자인된 홈 화면입니다.

#### 주요 기능:
- **카테고리 메뉴**: 운동, 문화, 식사, 카페 등 8개 카테고리를 스크롤하여 선택
- **지도 보기 버튼**: 지도 화면으로 쉽게 이동
- **근처 모임 리스트**: 반경 1.5km 내의 모임을 자동으로 표시
- **위치 기반 자동 필터링**: GPS를 사용하여 현재 위치 주변의 모임만 표시
- **실시간 정보**: 모집 상태, 참여 인원, 거리, 참가비 등을 한눈에 확인

#### 디자인 특징:
- 블루 그라디언트 헤더
- 카드 기반 레이아웃
- 부드러운 그림자 효과
- 직관적인 아이콘과 배지

### 2. 지도 화면 (MeetingMapScreen)
구글 맵 기반으로 모임 위치를 시각적으로 표시합니다.

#### 주요 기능:
- **커스텀 마커**: 참여 인원 수를 표시하는 색상별 마커
  - 🔵 파란색: 참여 가능
  - 🔴 빨간색: 인원 마감 임박
  - ⚫ 회색: 모집 종료
- **마커 클릭 시 바텀시트**: 모임 상세 정보를 바텀시트로 표시
- **지도 자동 이동**: 마커 선택 시 해당 위치로 부드럽게 이동
- **내 위치 표시**: 실시간 GPS 위치 표시

#### 바텀시트 내용:
- 모임 제목 및 상태
- 상세 설명
- 장소 정보 (이름, 주소)
- 참여 인원 현황
- 참가비
- 일시
- 참여자 목록 (아바타)
- 참여하기 버튼
- 자세히 보기 버튼

### 3. 위치 기반 필터링
백엔드와 프론트엔드 양쪽에서 구현된 정확한 거리 계산

#### 구현 방식:
- **Haversine 공식**: 두 지점 간의 정확한 구면 거리 계산
- **반경 1.5km**: 걸어서 이동 가능한 거리 설정
- **자동 갱신**: 위치 권한 허용 시 자동으로 주변 모임 검색

## 🚀 설치 및 실행

### 1. 패키지 설치

```bash
cd mobile
npm install
```

### 2. 필수 패키지
다음 패키지들이 자동으로 설치됩니다:
- `@gorhom/bottom-sheet`: 바텀시트 UI
- `react-native-gesture-handler`: 제스처 처리
- `react-native-reanimated`: 애니메이션
- `react-native-maps`: 지도 기능
- `expo-location`: GPS 위치 정보

### 3. 실행

```bash
# iOS
npm run ios

# Android
npm run android

# 개발 서버만 시작
npm start
```

### 4. 위치 권한 설정

#### iOS (Info.plist)
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>주변 모임을 찾기 위해 위치 정보가 필요합니다.</string>
```

#### Android (AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: `#2563EB` (파란색)
- **Success**: `#059669` (녹색)
- **Error**: `#DC2626` (빨간색)
- **Gray Scale**: `#F8FAFC`, `#E5E7EB`, `#9CA3AF`, `#374151`, `#111827`

### 타이포그래피
- **헤더**: 24px, Bold
- **타이틀**: 18-20px, Bold
- **본문**: 14-16px, Regular/Medium
- **캡션**: 12px, Regular

## 📋 API 엔드포인트

### 모임 목록 조회 (위치 기반)
```
GET /meetings?latitude=37.5665&longitude=126.978&radius=1.5
```

**Parameters:**
- `latitude`: 현재 위치 위도
- `longitude`: 현재 위치 경도
- `radius`: 검색 반경 (km)

**Response:**
```json
[
  {
    "id": 1,
    "title": "아침 산책 모임",
    "description": "남산에서 함께 산책해요",
    "location": {
      "id": 1,
      "name": "남산 입구",
      "address": "서울시 중구 남산동",
      "latitude": 37.5511,
      "longitude": 126.9882
    },
    "currentParticipants": 3,
    "maxParticipants": 10,
    "participationFee": 0,
    "status": "open",
    "dateTime": "2024-12-05T07:00:00Z"
  }
]
```

## 🔧 커스터마이징

### 검색 반경 변경
`MeetingHomeScreen.tsx`의 `fetchNearbyMeetings` 함수에서 `radius` 값을 수정하세요.

```typescript
const response = await apiClient.get('/meetings', {
  params: {
    latitude,
    longitude,
    radius: 2.0, // 2km로 변경
  },
});
```

### 카테고리 추가/수정
`MeetingHomeScreen.tsx`의 `categories` 배열을 수정하세요.

```typescript
const categories: CategoryItem[] = [
  {
    id: '9',
    icon: '🎸',
    label: '음악',
    onPress: () => console.log('음악'),
  },
  // ... 추가 카테고리
];
```

### 마커 색상 변경
`MeetingMapScreen.tsx`의 `getMarkerColor` 함수를 수정하세요.

```typescript
const getMarkerColor = (meeting: Meeting) => {
  if (meeting.status === 'closed') return '#9CA3AF';
  if (meeting.currentParticipants >= meeting.maxParticipants) return '#EF4444';
  return '#10B981'; // 녹색으로 변경
};
```

## 📱 스크린샷 위치

홈 화면과 지도 화면의 주요 UI 요소:

### 홈 화면
```
┌─────────────────────────┐
│  실버에이지             ⚙️ │
│  내 주변 1.5km           │
├─────────────────────────┤
│  🏃 운동  🎨 문화  🍽️ 식사 │
│  ☕ 카페  🎤 노래  🎯 취미 │
├─────────────────────────┤
│  🗺️  지도로 보기      →  │
├─────────────────────────┤
│  근처 모임        3개     │
├─────────────────────────┤
│  ┌───────────────────┐  │
│  │ 아침 산책 모임  [모집중] │
│  │ 남산에서 함께...       │
│  │ 📍 남산 입구  👥 3/10  │
│  │ 무료          500m   │
│  └───────────────────┘  │
│              (+)        │
└─────────────────────────┘
```

### 지도 화면
```
┌─────────────────────────┐
│  ←  지도로 보기           │
├─────────────────────────┤
│                         │
│    📍 3  📍 5  📍 2      │
│                         │
│  [참여 가능] [인원 마감]    │
│  [모집 종료]             │
│                         │
├═════════════════════════┤ ← 바텀시트
│       ━━━━              │
│  아침 산책 모임    [모집중] │
│  남산에서 함께 산책해요     │
│  📍 남산 입구            │
│  👥 3/10명              │
│  💰 무료                │
│  [모임 참여하기]          │
│  [자세히 보기]           │
└─────────────────────────┘
```

## 🐛 알려진 이슈

1. **Android에서 지도 표시 안됨**
   - Google Maps API 키가 필요합니다
   - `app.json`에 API 키 추가 필요

2. **iOS 시뮬레이터에서 위치 확인**
   - 시뮬레이터 메뉴: Features > Location > Custom Location

3. **바텀시트 제스처 작동 안함**
   - `App.tsx`에 `GestureHandlerRootView`가 추가되어 있는지 확인
   - `babel.config.js`에 reanimated 플러그인 확인

## 💡 다음 단계

### 추가 가능한 기능:
1. ✅ 카테고리별 필터링
2. ✅ 정렬 옵션 (거리순, 인기순, 최신순)
3. ✅ 즐겨찾기 기능
4. ✅ 모임 검색
5. ✅ 푸시 알림 (근처 새 모임 알림)
6. ✅ 모임 공유하기
7. ✅ 참여 이력 보기

## 🤝 기여

버그 리포트나 기능 제안은 이슈로 등록해주세요!




