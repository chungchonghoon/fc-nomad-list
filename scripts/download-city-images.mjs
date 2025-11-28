import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// .env.local 파일 로드
dotenv.config({ path: '.env.local' })

// ESM에서 __dirname 대체
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Unsplash API 키 확인
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY

if (!UNSPLASH_ACCESS_KEY || UNSPLASH_ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') {
  console.error('❌ 오류: .env.local 파일에 UNSPLASH_ACCESS_KEY를 설정해주세요.')
  console.error('📝 https://unsplash.com/developers 에서 API 키를 발급받으세요.')
  process.exit(1)
}

// 16개 도시 목록 (app/page.tsx에서 가져온 데이터)
const cities = [
  { id: "1", name: "Bangkok", country: "Thailand", filename: "bangkok.jpg" },
  { id: "2", name: "Lisbon", country: "Portugal", filename: "lisbon.jpg" },
  { id: "3", name: "Chiang Mai", country: "Thailand", filename: "chiang-mai.jpg" },
  { id: "4", name: "Mexico City", country: "Mexico", filename: "mexico-city.jpg" },
  { id: "5", name: "Bali", country: "Indonesia", filename: "bali.jpg" },
  { id: "6", name: "Porto", country: "Portugal", filename: "porto.jpg" },
  { id: "7", name: "Seoul", country: "South Korea", filename: "seoul.jpg" },
  { id: "8", name: "Barcelona", country: "Spain", filename: "barcelona.jpg" },
  { id: "9", name: "Tokyo", country: "Japan", filename: "tokyo.jpg" },
  { id: "10", name: "Buenos Aires", country: "Argentina", filename: "buenos-aires.jpg" },
  { id: "11", name: "Prague", country: "Czech Republic", filename: "prague.jpg" },
  { id: "12", name: "Austin", country: "United States", filename: "austin.jpg" },
  { id: "13", name: "Medellín", country: "Colombia", filename: "medellin.jpg" },
  { id: "14", name: "Athens", country: "Greece", filename: "athens.jpg" },
  { id: "15", name: "Cape Town", country: "South Africa", filename: "cape-town.jpg" },
  { id: "16", name: "Melbourne", country: "Australia", filename: "melbourne.jpg" },
]

// 이미지 저장 디렉토리
const imageDir = path.join(__dirname, '..', 'public', 'city')

// 디렉토리 생성 (이미 있으면 무시)
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true })
  console.log(`✅ 디렉토리 생성: ${imageDir}`)
} else {
  console.log(`📁 기존 디렉토리 사용: ${imageDir}`)
}

// Unsplash API를 사용해서 이미지 검색
async function searchUnsplashImage(city) {
  const { name, country } = city
  const searchQuery = `${name} ${country} city skyline`

  try {
    // Unsplash API - Search Photos
    const searchUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=1&orientation=landscape`

    const response = await fetch(searchUrl, {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    })

    if (!response.ok) {
      throw new Error(`API error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.results && data.results.length > 0) {
      // 첫 번째 검색 결과의 regular 크기 이미지 URL 반환 (1080px wide)
      return data.results[0].urls.regular
    } else {
      throw new Error('검색 결과 없음')
    }
  } catch (error) {
    console.error(`❌ 검색 실패: ${name} - ${error.message}`)
    return null
  }
}

// Unsplash 이미지 다운로드 함수
async function downloadImage(city) {
  const { name, country, filename } = city
  const outputPath = path.join(imageDir, filename)

  try {
    console.log(`🔍 검색 중: ${name} (${country})...`)

    // 1. Unsplash API로 이미지 검색
    const imageUrl = await searchUnsplashImage(city)

    if (!imageUrl) {
      throw new Error('이미지 URL을 찾을 수 없음')
    }

    console.log(`🔄 다운로드 중: ${name}...`)

    // 2. 이미지 다운로드
    const response = await fetch(imageUrl)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // 3. ArrayBuffer로 받아서 파일로 저장
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    fs.writeFileSync(outputPath, buffer)
    console.log(`✅ 저장 완료: ${filename}\n`)

    return true
  } catch (error) {
    console.error(`❌ 실패: ${name} - ${error.message}\n`)
    return false
  }
}

// 모든 도시 이미지 다운로드 (순차 실행으로 rate limit 방지)
async function downloadAllImages() {
  console.log('🚀 Unsplash API로 도시 이미지 다운로드 시작...\n')
  console.log(`🔑 API Key: ${UNSPLASH_ACCESS_KEY.substring(0, 10)}...\n`)

  let successCount = 0
  let failCount = 0

  for (const city of cities) {
    const success = await downloadImage(city)
    if (success) {
      successCount++
    } else {
      failCount++
    }

    // Rate limit 방지를 위해 1초 대기 (Unsplash는 시간당 50 requests 제한)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  console.log('\n📊 다운로드 완료!')
  console.log(`✅ 성공: ${successCount}개`)
  console.log(`❌ 실패: ${failCount}개`)
  console.log(`📁 저장 위치: ${imageDir}`)
}

// 스크립트 실행
downloadAllImages().catch(console.error)
