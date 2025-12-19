# 디자인 업데이트 설치 가이드

DagymApp 스타일의 새로운 디자인이 적용되었습니다. 아래 단계를 따라 설치하세요.

## 📋 변경된 파일 목록

### 새로 생성된 파일
- `mobile/src/styles/theme.ts` - 공통 디자인 시스템

### 수정된 파일
- `mobile/package.json` - expo-linear-gradient 추가
- `mobile/src/screens/home/HomeScreen.tsx` - 그라데이션 헤더, 건강 점수 카드
- `mobile/src/screens/activity/ActivityScreen.tsx` - 타임라인 스타일
- `mobile/src/screens/profile/ProfileScreen.tsx` - 레벨 시스템, 배지
- `mobile/src/screens/meeting/MeetingHomeScreen.tsx` - 개선된 UI

## 🚀 설치 단계

### 1. 의존성 설치

```bash
cd mobile
npm install
```

또는 특정 패키지만 설치:

```bash
npm install expo-linear-gradient@~14.0.2
```

### 2. 캐시 클리어 (선택사항)

문제가 발생하면 캐시를 클리어하세요:

```bash
# Expo 캐시 클리어
npx expo start -c

# 또는 npm 캐시 클리어
npm cache clean --force
rm -rf node_modules
npm install
```

### 3. 앱 실행

```bash
# 개발 서버 시작
npm start

# iOS 시뮬레이터
npm run ios

# Android 에뮬레이터
npm run android

# 웹 브라우저
npm run web
```

## 🔍 확인 사항

### 설치 확인

앱을 실행한 후 다음 사항들을 확인하세요:

#### ✅ HomeScreen
- [ ] 헤더가 오렌지색 그라데이션으로 표시됨
- [ ] 건강 점수 카드가 크게 표시됨
- [ ] 퀵 스탯 (참여 모임, 활동일, 이동거리)이 표시됨
- [ ] 카드들이 둥근 모서리와 그림자 효과를 가짐

#### ✅ ActivityScreen
- [ ] 타임라인 형태로 활동이 표시됨
- [ ] 필터 칩이 가로 스크롤로 표시됨
- [ ] 헤더에 통계 정보가 표시됨
- [ ] 각 활동 타입별로 다른 색상이 적용됨

#### ✅ ProfileScreen
- [ ] 레벨 배지가 표시됨
- [ ] 경험치 바가 표시됨
- [ ] 배지 컬렉션이 가로 스크롤로 표시됨
- [ ] 획득한 배지와 미획득 배지가 구분됨

#### ✅ MeetingHomeScreen
- [ ] 그라데이션 헤더가 표시됨
- [ ] 카테고리 버튼이 원형으로 표시됨
- [ ] 모임 카드가 개선된 디자인으로 표시됨
- [ ] FAB 버튼이 우측 하단에 표시됨

## 🐛 문제 해결

### 문제 1: "expo-linear-gradient를 찾을 수 없습니다"

**해결방법:**
```bash
cd mobile
npm install expo-linear-gradient
npx expo start -c
```

### 문제 2: "theme.ts를 찾을 수 없습니다"

**해결방법:**
파일이 올바른 위치에 있는지 확인:
```
mobile/src/styles/theme.ts
```

### 문제 3: 그라데이션이 표시되지 않음

**해결방법:**
1. expo-linear-gradient가 설치되었는지 확인
2. import 문이 올바른지 확인:
```typescript
import { LinearGradient } from 'expo-linear-gradient';
```

### 문제 4: 색상이 이상하게 표시됨

**해결방법:**
`theme.ts` 파일의 색상 값을 확인하고 필요시 수정:
```typescript
export const colors = {
  primary: {
    main: '#FF6B35',
    // ...
  },
};
```

### 문제 5: TypeScript 오류

**해결방법:**
```bash
# TypeScript 재컴파일
npx tsc --noEmit

# 또는 VSCode 재시작
```

## 📱 플랫폼별 주의사항

### iOS
- Xcode 14.0 이상 필요
- iOS 13.0 이상 지원

### Android
- Android Studio 필요
- Android 5.0 (API 21) 이상 지원

### Web
- 모던 브라우저 (Chrome, Firefox, Safari, Edge)
- Linear Gradient가 CSS gradient로 자동 변환됨

## 🎨 커스터마이징

### 색상 변경

`mobile/src/styles/theme.ts` 파일 수정:

```typescript
export const colors = {
  primary: {
    main: '#YOUR_COLOR',  // 원하는 색상으로 변경
    light: '#YOUR_LIGHT_COLOR',
    dark: '#YOUR_DARK_COLOR',
    gradient: ['#COLOR1', '#COLOR2'],
  },
  // ...
};
```

### 폰트 크기 조정

```typescript
export const typography = {
  h1: {
    fontSize: 36,  // 크기 조정
    fontWeight: '800',
    lineHeight: 44,
  },
  // ...
};
```

### 간격 조정

```typescript
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 20,  // 조정
  xl: 24,
  xxl: 28,
  xxxl: 36,
};
```

## 📊 성능 최적화

### 1. 이미지 최적화
- 이미지를 WebP 형식으로 변환
- 적절한 크기로 리사이징

### 2. 번들 크기 최적화
```bash
# 번들 분석
npx expo-bundle-visualizer
```

### 3. 메모이제이션
컴포넌트에 `React.memo` 사용:
```typescript
export default React.memo(HomeScreen);
```

## 🔄 업데이트 내역

### v2.0.0 (2024-12-19)
- ✨ DagymApp 스타일 디자인 적용
- 🎨 새로운 디자인 시스템 (theme.ts)
- 🏠 HomeScreen 그라데이션 헤더 추가
- 📊 ActivityScreen 타임라인 스타일
- 👤 ProfileScreen 레벨 시스템 및 배지
- 🔍 MeetingHomeScreen UI 개선

## 📞 지원

문제가 계속되면:
1. GitHub Issues에 문제 보고
2. 로그 파일 첨부
3. 스크린샷 제공

## 📚 추가 자료

- [DESIGN_GUIDE.md](./DESIGN_GUIDE.md) - 상세 디자인 가이드
- [Expo 문서](https://docs.expo.dev/)
- [React Native 문서](https://reactnative.dev/)


