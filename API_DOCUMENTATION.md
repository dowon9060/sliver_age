# API 문서

## 기본 정보
- Base URL: `http://localhost:3000/api`
- 인증 방식: JWT Bearer Token

---

## 인증 (Authentication)

### 회원가입
```
POST /auth/register
```
**Body:**
```json
{
  "phone": "01012345678",
  "password": "password123",
  "nickname": "행복한할머니",
  "gender": "female",
  "ageGroup": "60대"
}
```

### 로그인
```
POST /auth/login
```
**Body:**
```json
{
  "phone": "01012345678",
  "password": "password123"
}
```

### 내 정보 조회
```
GET /auth/me
Headers: Authorization: Bearer {token}
```

---

## 사용자 (Users)

### 사용자 프로필 조회
```
GET /users/:id
```

### 사용자 매너 점수 조회
```
GET /users/:id/rating
Headers: Authorization: Bearer {token}
```

### 프로필 수정
```
PUT /users/profile
Headers: Authorization: Bearer {token}
Body: { "nickname": "새로운닉네임", ... }
```

---

## 장소 (Locations)

### 주변 장소 조회
```
GET /locations/nearby?lat=37.5012&lng=127.0396&radius=5
```

### 장소 상세 조회
```
GET /locations/:id
```

### 체크인
```
POST /locations/:id/checkin
Headers: Authorization: Bearer {token}
```

### 체크아웃
```
POST /locations/:id/checkout
Headers: Authorization: Bearer {token}
```

### 현재 인원 조회
```
GET /locations/:id/current-users
```

---

## 소모임 (Meetings)

### 소모임 목록 조회
```
GET /meetings?locationId=1
```

### 소모임 상세 조회
```
GET /meetings/:id
```

### 소모임 생성
```
POST /meetings
Headers: Authorization: Bearer {token}
Body:
{
  "title": "저녁 산책 모임",
  "description": "함께 산책해요",
  "locationId": 1,
  "meetingDateTime": "2024-12-10T18:00:00Z",
  "maxParticipants": 5,
  "participationFee": 0
}
```

### 소모임 참여
```
POST /meetings/:id/join
Headers: Authorization: Bearer {token}
```

### 소모임 취소
```
DELETE /meetings/:id/leave
Headers: Authorization: Bearer {token}
```

### 참여자 평가
```
POST /meetings/:id/reviews
Headers: Authorization: Bearer {token}
Body:
{
  "reviewedUserId": 2,
  "praise": "친절하고 좋은 분이었어요!",
  "review": "다음에도 함께하고 싶어요",
  "rating": "positive"
}
```

### 모임 후기 조회
```
GET /meetings/:id/reviews
```

---

## 커뮤니티 (Community)

### 게시글 목록 조회
```
GET /community/posts?limit=20&offset=0
```

### 게시글 상세 조회
```
GET /community/posts/:id
```

### 게시글 작성
```
POST /community/posts
Headers: Authorization: Bearer {token}
Body:
{
  "content": "오늘 날씨가 좋네요!",
  "images": ["https://..."]
}
```

### 좋아요/싫어요
```
POST /community/posts/:id/reactions
Headers: Authorization: Bearer {token}
Body: { "type": "like" }
```

### 댓글 작성
```
POST /community/posts/:id/comments
Headers: Authorization: Bearer {token}
Body: { "content": "좋은 글이네요!" }
```

---

## 공동구매 (Group Buy)

### 상품 목록
```
GET /groupbuy/products
```

### 공동구매 딜
```
GET /groupbuy/deals
```

### 주문하기
```
POST /groupbuy/orders
Headers: Authorization: Bearer {token}
Body:
{
  "productId": 1,
  "quantity": 2,
  "deliveryAddress": "서울시 강남구...",
  "recipientName": "홍길동",
  "recipientPhone": "01012345678"
}
```

### 리뷰 작성
```
POST /groupbuy/products/:id/reviews
Headers: Authorization: Bearer {token}
Body: { "rating": 5, "content": "좋은 상품입니다" }
```

---

## 취미활동 (Hobby)

### 취미 목록
```
GET /hobby/hobbies
```

### 교육 프로그램 목록
```
GET /hobby/programs
```

### 프로그램 신청
```
POST /hobby/programs/:id/apply
Headers: Authorization: Bearer {token}
```

### 취미 매칭
```
GET /hobby/matches
Headers: Authorization: Bearer {token}
```

---

## 동네병원 (Hospital)

### 주변 병원 조회
```
GET /hospital/nearby?lat=37.5012&lng=127.0396&radius=5
```

### 병원 예약
```
POST /hospital/reserve
Headers: Authorization: Bearer {token}
Body:
{
  "hospitalId": 1,
  "reservationDateTime": "2024-12-10T10:00:00Z",
  "department": "내과",
  "symptoms": "감기 증상"
}
```

### 픽업 요청
```
POST /hospital/pickup
Headers: Authorization: Bearer {token}
Body:
{
  "hospitalId": 1,
  "pickupAddress": "서울시 강남구...",
  "requestedDateTime": "2024-12-10T10:00:00Z",
  "notes": "1층 현관에서 대기하겠습니다"
}
```

### 내 예약 내역
```
GET /hospital/reservations
Headers: Authorization: Bearer {token}
```

---

## 결제 (Payment)

### 결제 승인
```
POST /payment/confirm
Headers: Authorization: Bearer {token}
Body:
{
  "paymentKey": "tgen...",
  "orderId": "ORD-123456",
  "amount": 5000
}
```

### 결제 취소
```
POST /payment/cancel
Headers: Authorization: Bearer {token}
Body:
{
  "paymentKey": "tgen...",
  "cancelReason": "단순 변심"
}
```

---

## 응답 형식

### 성공
```json
{
  "id": 1,
  "title": "저녁 산책 모임",
  ...
}
```

### 에러
```json
{
  "statusCode": 400,
  "message": "잘못된 요청입니다",
  "error": "Bad Request"
}
```

---

## 상태 코드

- `200 OK`: 성공
- `201 Created`: 생성 성공
- `400 Bad Request`: 잘못된 요청
- `401 Unauthorized`: 인증 실패
- `403 Forbidden`: 권한 없음
- `404 Not Found`: 리소스를 찾을 수 없음
- `500 Internal Server Error`: 서버 오류

