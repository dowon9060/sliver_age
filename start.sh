#!/bin/bash

echo "🌟 실버세대 커뮤니티 앱 시작 스크립트"
echo "======================================"
echo ""

# 색상 정의
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. 백엔드 패키지 설치
echo -e "${BLUE}[1/5] 백엔드 패키지 설치 중...${NC}"
cd backend
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ 백엔드 패키지 설치 완료${NC}"
    else
        echo -e "${RED}✗ 백엔드 패키지 설치 실패${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}✓ 백엔드 패키지가 이미 설치되어 있습니다${NC}"
fi
echo ""

# 2. 환경 변수 확인
echo -e "${BLUE}[2/5] 환경 변수 확인 중...${NC}"
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠ .env 파일이 없습니다. .env.example을 복사합니다${NC}"
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "${GREEN}✓ .env 파일 생성됨 (설정을 확인하세요)${NC}"
    else
        echo -e "${RED}✗ .env.example 파일이 없습니다${NC}"
    fi
else
    echo -e "${GREEN}✓ .env 파일이 존재합니다${NC}"
fi
cd ..
echo ""

# 3. 모바일 앱 패키지 설치
echo -e "${BLUE}[3/5] 모바일 앱 패키지 설치 중...${NC}"
cd mobile
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ 모바일 앱 패키지 설치 완료${NC}"
    else
        echo -e "${RED}✗ 모바일 앱 패키지 설치 실패${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}✓ 모바일 앱 패키지가 이미 설치되어 있습니다${NC}"
fi
cd ..
echo ""

# 4. PostgreSQL 확인
echo -e "${BLUE}[4/5] PostgreSQL 연결 확인 중...${NC}"
if command -v psql &> /dev/null; then
    echo -e "${GREEN}✓ PostgreSQL이 설치되어 있습니다${NC}"
    echo -e "${YELLOW}  데이터베이스 생성: psql -U postgres -c 'CREATE DATABASE silver_age;'${NC}"
else
    echo -e "${YELLOW}⚠ PostgreSQL이 설치되어 있지 않습니다${NC}"
    echo -e "${YELLOW}  설치 방법: brew install postgresql@14 (macOS)${NC}"
fi
echo ""

# 5. 실행 안내
echo -e "${BLUE}[5/5] 실행 준비 완료!${NC}"
echo ""
echo -e "${GREEN}======================================"
echo "🚀 프로젝트 실행 방법"
echo "======================================${NC}"
echo ""
echo -e "${BLUE}백엔드 실행:${NC}"
echo "  cd backend"
echo "  npm run start:dev"
echo ""
echo -e "${BLUE}모바일 앱 실행:${NC}"
echo "  cd mobile"
echo "  npm start"
echo "  # 그 다음 i (iOS) 또는 a (Android) 입력"
echo ""
echo -e "${YELLOW}======================================"
echo "⚙️  설정 확인사항"
echo "======================================${NC}"
echo ""
echo "1. PostgreSQL 데이터베이스 생성:"
echo "   psql -U postgres -c 'CREATE DATABASE silver_age;'"
echo ""
echo "2. backend/.env 파일 설정:"
echo "   - DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD"
echo "   - JWT_SECRET"
echo ""
echo "3. 선택적 설정:"
echo "   - 네이버맵 API 키"
echo "   - 토스페이먼츠 API 키"
echo "   - AWS S3 자격증명"
echo ""
echo -e "${GREEN}자세한 내용은 SETUP_GUIDE.md를 참고하세요!${NC}"





