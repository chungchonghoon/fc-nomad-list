# Nomad List - 프로젝트 설정

## Next.js 설정 (`next.config.mjs`)
- **TypeScript**: `ignoreBuildErrors: true` (빌드 에러 무시)
- **이미지**: `unoptimized: true` (이미지 최적화 비활성화)

## shadcn/ui 설정 (`components.json`)
- **스타일**: new-york
- **RSC**: React Server Components 활성화
- **Tailwind**:
  - CSS 파일: `app/globals.css`
  - Base 색상: neutral
  - CSS Variables: 활성화
  - Prefix: 없음
- **경로 별칭**:
  - `@/components` → components/
  - `@/utils` → lib/utils
  - `@/ui` → components/ui/
  - `@/lib` → lib/
  - `@/hooks` → hooks/
- **아이콘 라이브러리**: lucide-react

## 유틸리티 함수 (`lib/utils.ts`)
- `cn()`: clsx + tailwind-merge를 결합한 클래스 이름 유틸리티
  - 조건부 클래스 병합 및 Tailwind 클래스 중복 제거

## 커스텀 Hooks
- `hooks/use-mobile.ts`: 모바일 디바이스 감지
- `hooks/use-toast.ts`: 토스트 알림 관리

## 개발 환경
- **패키지 매니저**: pnpm
- **스크립트**:
  - `pnpm dev`: 개발 서버 실행
  - `pnpm build`: 프로덕션 빌드
  - `pnpm start`: 프로덕션 서버 실행
  - `pnpm lint`: ESLint 실행

## 주의사항
⚠️ **TypeScript 빌드 에러 무시 설정**: 
- 프로덕션 배포 전 타입 에러 수정 권장
- 현재는 빠른 개발을 위해 무시 설정

⚠️ **이미지 최적화 비활성화**:
- 실제 배포 시 성능 영향 가능
- placeholder 이미지 사용 중이므로 현재는 문제 없음
