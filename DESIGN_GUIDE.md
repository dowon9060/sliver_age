# 실버세대 앱 디자인 가이드

DagymApp 스타일을 참고하여 현대적이고 역동적인 피트니스 앱 디자인으로 개선되었습니다.

## 🎨 디자인 시스템

### 색상 팔레트

#### Primary Colors
- **Main**: `#FF6B35` - 활기찬 오렌지색으로 에너지와 활동성을 표현
- **Light**: `#FF8C61` - 부드러운 강조색
- **Dark**: `#E55A2B` - 진한 강조색
- **Gradient**: `['#FF6B35', '#FF8C61']` - 그라데이션 효과

#### Secondary Colors
- **Main**: `#4ECDC4` - 청록색으로 신뢰감과 안정감 표현
- **Light**: `#7FDFD8`
- **Dark**: `#3BA8A0`

#### Status Colors
- **Success**: `#10B981` - 완료, 성공 상태
- **Warning**: `#F59E0B` - 예정, 주의 상태
- **Danger**: `#EF4444` - 마감, 위험 상태
- **Info**: `#3B82F6` - 정보 표시

### 타이포그래피

```typescript
h1: { fontSize: 32, fontWeight: '800', lineHeight: 40 }
h2: { fontSize: 24, fontWeight: '700', lineHeight: 32 }
h3: { fontSize: 20, fontWeight: '700', lineHeight: 28 }
h4: { fontSize: 18, fontWeight: '600', lineHeight: 24 }
body1: { fontSize: 16, fontWeight: '400', lineHeight: 24 }
body2: { fontSize: 14, fontWeight: '400', lineHeight: 20 }
caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 }
```

### Spacing

- **xs**: 4px
- **sm**: 8px
- **md**: 12px
- **lg**: 16px
- **xl**: 20px
- **xxl**: 24px
- **xxxl**: 32px

### Border Radius

- **sm**: 8px
- **md**: 12px
- **lg**: 16px
- **xl**: 20px
- **xxl**: 24px
- **round**: 999px (완전한 원형)

## 📱 주요 화면 개선사항

### 1. HomeScreen (홈 화면)

#### 주요 변경사항
- **그라데이션 헤더**: LinearGradient를 사용한 역동적인 헤더
- **건강 점수 카드**: 큰 숫자와 진행률 원형 표시로 시각적 강조
- **퀵 스탯**: 참여 모임, 활동일, 이동거리를 한눈에 표시
- **카드 디자인**: 더 큰 그림자와 둥근 모서리로 입체감 강조

#### 주요 컴포넌트
```tsx
<LinearGradient colors={colors.primary.gradient}>
  <View style={styles.healthScoreCard}>
    <Text style={styles.healthScoreValue}>95</Text>
    <View style={styles.healthScoreCircle}>
      <Text>95%</Text>
    </View>
  </View>
</LinearGradient>
```

### 2. ActivityScreen (활동내역)

#### 주요 변경사항
- **타임라인 스타일**: 세로 타임라인 레이아웃으로 활동 흐름 시각화
- **필터 칩**: 가로 스크롤 필터로 활동 타입별 필터링
- **통계 요약**: 헤더에 총 활동, 완료, 예정 개수 표시
- **컬러 코딩**: 활동 타입별 고유 색상으로 구분

#### 타임라인 구조
```tsx
<View style={styles.timelineItem}>
  <View style={styles.timelineLineContainer}>
    <View style={styles.timelineDot} />
    <View style={styles.timelineLine} />
  </View>
  <TouchableOpacity style={styles.activityCard}>
    {/* 활동 내용 */}
  </TouchableOpacity>
</View>
```

### 3. ProfileScreen (프로필)

#### 주요 변경사항
- **레벨 시스템**: 사용자 레벨과 경험치 바 표시
- **골드 그라데이션 아바타**: 프리미엄 느낌의 골드 그라데이션
- **성취 배지**: 가로 스크롤 배지 컬렉션
- **잠금/해제 상태**: 획득한 배지와 미획득 배지 시각적 구분

#### 배지 시스템
```tsx
const badges = [
  { icon: '🏃', name: '활동왕', earned: true },
  { icon: '✍️', name: '작가', earned: true },
  { icon: '🤝', name: '친구왕', earned: true },
  { icon: '⭐', name: '인기인', earned: false },
  // ...
];
```

### 4. MeetingHomeScreen (모임 찾기)

#### 주요 변경사항
- **카테고리 버튼**: 더 큰 원형 버튼으로 터치 영역 확대
- **모임 카드**: 더욱 명확한 정보 계층 구조
- **FAB 버튼**: 크고 눈에 띄는 플로팅 액션 버튼
- **상태 배지**: 모집중/마감 상태를 컬러로 명확히 표시

## 🎯 디자인 원칙

### 1. 가독성 우선
- 큰 폰트 사이즈 (최소 14px)
- 높은 명도 대비
- 충분한 여백

### 2. 터치 친화적
- 최소 터치 영역: 44x44px
- 충분한 간격
- 명확한 버튼 상태

### 3. 시각적 계층
- 그라데이션으로 중요도 강조
- 그림자로 깊이감 표현
- 컬러 코딩으로 정보 구분

### 4. 일관성
- 공통 디자인 시스템 사용 (`theme.ts`)
- 반복되는 패턴 재사용
- 통일된 애니메이션

## 🔧 기술 스택

### 새로 추가된 라이브러리
```json
{
  "expo-linear-gradient": "~14.0.2"
}
```

### 디자인 시스템 파일
```
mobile/src/styles/
  └── theme.ts  // 색상, 타이포그래피, 간격 등 정의
```

## 📦 설치 및 실행

```bash
# 의존성 설치
cd mobile
npm install

# 앱 실행
npm start
```

## 🎨 커스터마이징

디자인을 커스터마이징하려면 `mobile/src/styles/theme.ts` 파일을 수정하세요:

```typescript
export const colors = {
  primary: {
    main: '#YOUR_COLOR',  // 메인 컬러 변경
    // ...
  },
  // ...
};
```

## 📸 스크린샷

### Before & After

#### HomeScreen
- **Before**: 단순한 흰색 헤더, 기본 카드
- **After**: 그라데이션 헤더, 건강 점수 강조, 퀵 스탯

#### ActivityScreen
- **Before**: 리스트 형태
- **After**: 타임라인 스타일, 필터 기능

#### ProfileScreen
- **Before**: 기본 프로필 정보
- **After**: 레벨 시스템, 배지 컬렉션, 경험치 바

## 🚀 향후 개선 계획

1. **애니메이션 추가**
   - 화면 전환 애니메이션
   - 배지 획득 애니메이션
   - 레벨업 효과

2. **다크 모드**
   - 다크 테마 색상 팔레트
   - 자동/수동 테마 전환

3. **접근성 개선**
   - 스크린 리더 지원
   - 고대비 모드
   - 폰트 크기 조절

4. **성능 최적화**
   - 이미지 레이지 로딩
   - 메모이제이션
   - 가상화 리스트

## 📝 참고 자료

- [DagymApp GitHub](https://github.com/stone-i/DagymAppReactNative)
- [Expo Linear Gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)
- [React Native Design Patterns](https://reactnative.dev/docs/design)


