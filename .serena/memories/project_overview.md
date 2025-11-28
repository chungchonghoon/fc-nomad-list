# Nomad List - Project Overview

## 프로젝트 타입
- **Framework**: Next.js 16.0.0 (App Router)
- **언어**: TypeScript 5
- **스타일링**: Tailwind CSS v4.1.9
- **UI 라이브러리**: Radix UI + shadcn/ui 컴포넌트 시스템
- **React**: 19.2.0

## 주요 디렉토리 구조
```
nomad-list/
├── app/                 # Next.js App Router 페이지
│   ├── globals.css     # 전역 스타일
│   ├── layout.tsx      # 루트 레이아웃
│   └── page.tsx        # 홈 페이지
├── components/          # React 컴포넌트
│   ├── ui/             # shadcn/ui 컴포넌트 (50+ 컴포넌트)
│   └── theme-provider.tsx
├── hooks/              # Custom React Hooks
├── lib/                # 유틸리티 함수 및 라이브러리
├── public/             # 정적 파일
└── styles/             # 추가 스타일 파일

## 주요 의존성
- **UI 컴포넌트**: Radix UI primitives (accordion, dialog, dropdown 등)
- **폼 관리**: react-hook-form + zod 스키마 검증
- **차트**: recharts
- **애니메이션**: tailwindcss-animate, embla-carousel
- **날짜**: date-fns, react-day-picker
- **테마**: next-themes (다크모드 지원)
- **아이콘**: lucide-react
- **토스트**: sonner
- **애널리틱스**: @vercel/analytics

## TypeScript 설정
- **타겟**: ES6
- **모드**: Strict mode 활성화
- **경로 별칭**: `@/*` → 프로젝트 루트
- **모듈 해석**: bundler (Next.js 최적화)

## 개발 환경
- **패키지 매니저**: pnpm
- **플랫폼**: Windows 11 PowerShell
- **Git**: 저장소 아님 (현재)
