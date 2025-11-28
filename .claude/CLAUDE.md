# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**노마드 리스트** - 디지털 노마드를 위한 전 세계 도시 정보 비교 웹 애플리케이션

- **Language**: 한국어 (Korean) - All UI text, metadata, and user-facing content must be in Korean
- **Stack**: Next.js 16.0.0 (App Router) + React 19.2.0 + TypeScript 5 + Tailwind CSS v4
- **UI Library**: shadcn/ui (New York style) with 58 pre-installed components
- **Package Manager**: pnpm (never use npm or yarn)

---

## Development Commands

```bash
# Development server (http://localhost:3000)
pnpm dev

# Production build
pnpm build

# Production server
pnpm start

# Lint with ESLint
pnpm lint

# Download city images from Unsplash API
node scripts/download-city-images.mjs
```

**Environment Setup**: Requires `UNSPLASH_ACCESS_KEY` in `.env.local` for image downloads.

---

## Architecture & Code Structure

### Next.js App Router Structure

This project uses **Next.js 16 App Router** exclusively (no Pages Router):

- **`app/layout.tsx`**: Root layout with Korean language (`lang="ko"`), Vercel Analytics, and next-themes provider
- **`app/page.tsx`**: Main page containing 16 hardcoded cities with continent filtering
- **`app/globals.css`**: Tailwind v4 config with OKLCH color system and custom CSS variables

### Key Directories

```
app/              # Next.js App Router pages
components/ui/    # shadcn/ui components (58 components, auto-generated)
components/       # Custom components (e.g., theme-provider.tsx)
lib/             # Utilities (utils.ts with cn() function)
hooks/           # Custom React hooks (use-mobile.ts, use-toast.ts)
public/city/     # City images (16 .jpg files downloaded from Unsplash)
scripts/         # Automation scripts (download-city-images.mjs)
```

### Import Aliases

All imports use absolute paths with `@/` prefix:

```typescript
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
```

Configured in `tsconfig.json`:
```json
{
  "paths": {
    "@/*": ["./*"]
  }
}
```

---

## Core Data Structure

### City Interface

The main data model representing each city:

```typescript
type Continent = "Asia" | "Europe" | "North America" | "South America" | "Africa" | "Oceania"
type Safety = "high" | "medium" | "low"

interface City {
  id: string               // Unique identifier
  rank: number            // Overall ranking
  name: string            // City name (English for code, Korean for display)
  country: string         // Country name
  continent: Continent    // Continent classification
  imageUrl: string        // Path to image (must be /city/*.jpg)
  overallScore: number    // Overall score (0-5)
  costPerMonth: number    // Monthly cost in USD
  internetSpeed: number   // Internet speed in Mbps
  likedPercentage: number // User satisfaction (0-100)
  safety: Safety          // Safety level
  temperature: number     // Average temperature in °C
  aqi: number            // Air Quality Index
}
```

**Current Cities** (16 total):
- Asia: Bangkok, Chiang Mai, Bali, Seoul, Tokyo
- Europe: Lisbon, Porto, Barcelona, Prague, Athens
- North America: Mexico City, Austin
- South America: Buenos Aires, Medellín
- Africa: Cape Town
- Oceania: Melbourne

### Adding New Cities

1. Add city object to `cities` array in `app/page.tsx`
2. Add city to `scripts/download-city-images.mjs`
3. Run `node scripts/download-city-images.mjs` to download image
4. Verify `imageUrl` points to `/city/{filename}.jpg`

---

## Styling System

### Tailwind CSS v4 + OKLCH Colors

Tailwind v4 configuration is defined directly in `app/globals.css` (no `tailwind.config.*` file):

```css
@import "tailwindcss";

@theme {
  /* Custom colors using OKLCH color space */
  --color-primary: oklch(0.62 0.15 265);    /* #667EEA purple-blue */
  --color-success: oklch(0.65 0.18 155);    /* green */
  --color-warning: oklch(0.75 0.18 65);     /* yellow */
  --color-danger: oklch(0.58 0.25 27);      /* red */
  --color-info: oklch(0.6 0.18 245);        /* blue */
}
```

### shadcn/ui Configuration

Configured in `components.json`:

```json
{
  "style": "new-york",      // New York design style
  "rsc": true,              // React Server Components support
  "tsx": true,              // TypeScript
  "tailwind": {
    "baseColor": "neutral", // Neutral color base
    "cssVariables": true    // Use CSS variables
  },
  "iconLibrary": "lucide"   // Lucide icons
}
```

**Adding Components**:
```bash
pnpm dlx shadcn@latest add [component-name]
```

Never manually install Radix UI packages - always use shadcn CLI.

### Styling Patterns

Always use the `cn()` utility for conditional classes:

```typescript
import { cn } from "@/lib/utils"

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  hasError && "error-classes"
)} />
```

**Responsive Grid**:
```typescript
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" />
```

---

## Component Patterns

### Server Components (Default)

Components in `app/` are Server Components by default:

```typescript
// app/layout.tsx or app/page.tsx
export default function Layout() {
  // Rendered on server
  return <div>...</div>
}
```

### Client Components

Use `"use client"` directive for interactive components:

```typescript
"use client"

import { useState } from "react"

export default function InteractiveComponent() {
  const [state, setState] = useState("")
  // ...
}
```

### TypeScript Props

Always define explicit prop types:

```typescript
interface CityCardProps {
  city: City
  onClick?: () => void
}

export function CityCard({ city, onClick }: CityCardProps) {
  // ...
}
```

---

## Korean Localization

All user-facing content MUST be in Korean:

### HTML & Metadata
```typescript
// app/layout.tsx
<html lang="ko">
<meta title="노마드 리스트 - 디지털 노마드를 위한 도시 가이드" />
```

### UI Text Examples
- Continent labels: "아시아", "유럽", "북미", "남미", "아프리카", "오세아니아"
- Safety levels: "높음" (high), "중간" (medium), "낮음" (low)
- UI elements: "전체", "필터", "검색" etc.

### Code Comments
Write explanatory comments in Korean for each line of complex logic:

```typescript
// ✅ Good
const filteredCities = cities.filter(city =>
  selectedContinent === "all" || city.continent === selectedContinent
) // 선택된 대륙으로 도시 필터링

// ❌ Bad
const filteredCities = cities.filter(city =>
  selectedContinent === "all" || city.continent === selectedContinent
) // Filter cities by selected continent
```

---

## Image Management

### City Images

- **Location**: `public/city/` directory
- **Format**: JPEG (`.jpg`) only
- **Naming**: kebab-case (e.g., `chiang-mai.jpg`, `mexico-city.jpg`)
- **Size**: 800x400 recommended (landscape orientation)
- **Source**: Downloaded from Unsplash API via automation script

### Image Path Convention

Always use absolute paths from public root:

```typescript
imageUrl: "/city/bangkok.jpg"  // ✅ Correct
imageUrl: "./bangkok.jpg"      // ❌ Wrong
imageUrl: "bangkok.jpg"        // ❌ Wrong
```

### Fallback Images

```typescript
<img
  src={city.imageUrl || "/placeholder.svg"}
  alt={`${city.name}, ${city.country}`}
/>
```

---

## TypeScript Configuration

### Strict Mode Enabled

`tsconfig.json` enforces strict type checking:

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES6"
  }
}
```

**Rules**:
- Never use `any` type
- Always define explicit types for props, state, and function parameters
- Use optional chaining (`city?.imageUrl`)
- Prefer type inference where obvious

---

## Build Configuration Warnings

### next.config.mjs

```javascript
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,  // ⚠️ TEMPORARY: Should be removed for production
  },
  images: {
    unoptimized: true,        // ⚠️ Disables Next.js Image Optimization
  },
}
```

**TODO Before Production**:
1. Fix all TypeScript errors and remove `ignoreBuildErrors`
2. Consider enabling image optimization (remove `unoptimized: true`)
3. Migrate from `<img>` to Next.js `<Image>` component

---

## Environment Variables

### .env.local

```bash
UNSPLASH_ACCESS_KEY=your_api_key_here
```

**Security**:
- Never commit `.env.local` to Git (already in `.gitignore`)
- Only use environment variables in Server Components or server-side scripts
- Never expose API keys in client-side code

---

## Custom Scripts

### scripts/download-city-images.mjs

Automation script that downloads city images from Unsplash API:

```bash
node scripts/download-city-images.mjs
```

**Features**:
- Uses Unsplash Search API with `UNSPLASH_ACCESS_KEY`
- Downloads landscape orientation images (800x400)
- Saves to `public/city/` with proper naming
- Rate limiting: 1 second delay between requests
- Progress logging with emoji indicators (🔍, 🔄, ✅, ❌)

**When to Run**:
- After adding new cities to the `cities` array
- When updating existing city images
- If images are missing or corrupted

---

## Dependencies Management

### Adding Packages

```bash
# Regular dependency
pnpm add [package-name]

# Dev dependency
pnpm add -D [package-name]

# shadcn/ui component
pnpm dlx shadcn@latest add [component-name]
```

### Key Dependencies

- **UI**: shadcn/ui + Radix UI (42 packages)
- **Styling**: Tailwind CSS v4 + tailwind-merge + clsx
- **Forms**: react-hook-form + zod
- **Icons**: lucide-react
- **Utilities**: date-fns, sonner (toast)
- **Analytics**: @vercel/analytics
- **Charts**: recharts
- **Carousel**: embla-carousel-react

---

## Code Conventions

### File Naming

- Components: PascalCase (e.g., `CityCard.tsx`)
- Utilities: camelCase (e.g., `formatCurrency.ts`)
- Hooks: camelCase with `use` prefix (e.g., `useFilteredCities.ts`)
- Scripts: kebab-case (e.g., `download-city-images.mjs`)

### Component Structure

```typescript
// 1. Imports
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// 2. Types/Interfaces
interface Props {
  city: City
}

// 3. Component
export function CityCard({ city }: Props) {
  return (
    <div className={cn("...")}>
      {/* JSX */}
    </div>
  )
}
```

### Prohibited Practices

- ❌ Using `npm` or `yarn` (only pnpm)
- ❌ Direct Radix UI installation (use shadcn CLI)
- ❌ Inline styles (use Tailwind classes)
- ❌ `any` type in TypeScript
- ❌ English text in user-facing UI
- ❌ Relative imports for shared code (use `@/` aliases)

---

## Future Considerations

### Current Limitations

1. **Hardcoded Data**: Cities are defined in `app/page.tsx` - consider migrating to database or CMS
2. **No Backend**: All data is static - may need API endpoints for dynamic filtering/search
3. **Image Optimization**: Currently disabled - should enable Next.js Image component
4. **TypeScript Errors**: Build errors are ignored - need to fix before production

### Potential Enhancements

- Add user authentication and favorites
- Implement dynamic search and advanced filtering
- Integrate with real-time cost of living APIs
- Add user reviews and ratings
- Implement city comparison feature
- Add more cities (currently only 16)
