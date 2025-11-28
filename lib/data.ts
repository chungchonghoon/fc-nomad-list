
export type Continent = "all" | "Asia" | "Europe" | "North America" | "South America" | "Africa" | "Oceania"

export type Safety = "high" | "medium" | "low"

export interface City {
  id: string
  rank: number
  name: string
  country: string
  continent: Continent
  imageUrl: string
  overallScore: number
  costPerMonth: number
  internetSpeed: number
  likedPercentage: number
  safety: Safety
  temperature: number
  aqi: number
}

export const cities: City[] = [
  {
    id: "1", // 고유 식별자
    rank: 1, // 순위
    name: "방콕", // 도시 이름
    country: "태국", // 국가 이름
    continent: "Asia", // 대륙 (필터링용)
    imageUrl: "/city/bangkok.jpg", // 도시 이미지 경로
    overallScore: 4.5, // 종합 점수 (5점 만점)
    costPerMonth: 1579, // 월 생활비 (USD)
    internetSpeed: 24, // 인터넷 속도 (Mbps)
    likedPercentage: 94, // 좋아요 비율 (%)
    safety: "high", // 안전도 (high/medium/low)
    temperature: 28, // 평균 기온 (°C)
    aqi: 59, // 공기질 지수 (낮을수록 좋음)
  },
  {
    id: "2",
    rank: 2,
    name: "리스본",
    country: "포르투갈",
    continent: "Europe",
    imageUrl: "/city/lisbon.jpg",
    overallScore: 4.7,
    costPerMonth: 2100,
    internetSpeed: 35,
    likedPercentage: 96,
    safety: "high",
    temperature: 22,
    aqi: 32,
  },
  {
    id: "3",
    rank: 3,
    name: "치앙마이",
    country: "태국",
    continent: "Asia",
    imageUrl: "/city/chiang-mai.jpg",
    overallScore: 4.4,
    costPerMonth: 1250,
    internetSpeed: 22,
    likedPercentage: 92,
    safety: "high",
    temperature: 26,
    aqi: 48,
  },
  {
    id: "4",
    rank: 4,
    name: "멕시코시티",
    country: "멕시코",
    continent: "North America",
    imageUrl: "/city/mexico-city.jpg",
    overallScore: 4.3,
    costPerMonth: 1890,
    internetSpeed: 28,
    likedPercentage: 89,
    safety: "medium",
    temperature: 18,
    aqi: 72,
  },
  {
    id: "5",
    rank: 5,
    name: "발리",
    country: "인도네시아",
    continent: "Asia",
    imageUrl: "/city/bali.jpg",
    overallScore: 4.6,
    costPerMonth: 1680,
    internetSpeed: 20,
    likedPercentage: 95,
    safety: "high",
    temperature: 29,
    aqi: 41,
  },
  {
    id: "6",
    rank: 6,
    name: "포르투",
    country: "포르투갈",
    continent: "Europe",
    imageUrl: "/city/porto.jpg",
    overallScore: 4.5,
    costPerMonth: 1950,
    internetSpeed: 32,
    likedPercentage: 93,
    safety: "high",
    temperature: 20,
    aqi: 28,
  },
  {
    id: "7",
    rank: 7,
    name: "서울",
    country: "대한민국",
    continent: "Asia",
    imageUrl: "/city/seoul.jpg",
    overallScore: 4.2,
    costPerMonth: 2800,
    internetSpeed: 95,
    likedPercentage: 88,
    safety: "high",
    temperature: 15,
    aqi: 54,
  },
  {
    id: "8",
    rank: 8,
    name: "바르셀로나",
    country: "스페인",
    continent: "Europe",
    imageUrl: "/city/barcelona.jpg",
    overallScore: 4.6,
    costPerMonth: 2450,
    internetSpeed: 38,
    likedPercentage: 94,
    safety: "high",
    temperature: 21,
    aqi: 36,
  },
  {
    id: "9",
    rank: 9,
    name: "도쿄",
    country: "일본",
    continent: "Asia",
    imageUrl: "/city/tokyo.jpg",
    overallScore: 4.3,
    costPerMonth: 3200,
    internetSpeed: 88,
    likedPercentage: 91,
    safety: "high",
    temperature: 19,
    aqi: 42,
  },
  {
    id: "10",
    rank: 10,
    name: "부에노스아이레스",
    country: "아르헨티나",
    continent: "South America",
    imageUrl: "/city/buenos-aires.jpg",
    overallScore: 4.1,
    costPerMonth: 1450,
    internetSpeed: 18,
    likedPercentage: 87,
    safety: "medium",
    temperature: 17,
    aqi: 38,
  },
  {
    id: "11",
    rank: 11,
    name: "프라하",
    country: "체코",
    continent: "Europe",
    imageUrl: "/city/prague.jpg",
    overallScore: 4.4,
    costPerMonth: 2100,
    internetSpeed: 30,
    likedPercentage: 92,
    safety: "high",
    temperature: 14,
    aqi: 34,
  },
  {
    id: "12",
    rank: 12,
    name: "오스틴",
    country: "미국",
    continent: "North America",
    imageUrl: "/city/austin.jpg",
    overallScore: 4.0,
    costPerMonth: 3800,
    internetSpeed: 65,
    likedPercentage: 86,
    safety: "high",
    temperature: 24,
    aqi: 45,
  },
  {
    id: "13",
    rank: 13,
    name: "메데진",
    country: "콜롬비아",
    continent: "South America",
    imageUrl: "/city/medellin.jpg",
    overallScore: 4.3,
    costPerMonth: 1620,
    internetSpeed: 25,
    likedPercentage: 90,
    safety: "medium",
    temperature: 22,
    aqi: 52,
  },
  {
    id: "14",
    rank: 14,
    name: "아테네",
    country: "그리스",
    continent: "Europe",
    imageUrl: "/city/athens.jpg",
    overallScore: 4.2,
    costPerMonth: 1850,
    internetSpeed: 27,
    likedPercentage: 88,
    safety: "high",
    temperature: 23,
    aqi: 44,
  },
  {
    id: "15",
    rank: 15,
    name: "케이프타운",
    country: "남아공",
    continent: "Africa",
    imageUrl: "/city/cape-town.jpg",
    overallScore: 4.3,
    costPerMonth: 1720,
    internetSpeed: 22,
    likedPercentage: 91,
    safety: "medium",
    temperature: 19,
    aqi: 38,
  },
  {
    id: "16",
    rank: 16,
    name: "멜버른",
    country: "호주",
    continent: "Oceania",
    imageUrl: "/city/melbourne.jpg",
    overallScore: 4.1,
    costPerMonth: 3500,
    internetSpeed: 45,
    likedPercentage: 89,
    safety: "high",
    temperature: 16,
    aqi: 26,
  },
]

export const continents = [
  { value: "all" as Continent, label: "전체", emoji: "🌍" },
  { value: "Asia" as Continent, label: "아시아", emoji: "🌏" },
  { value: "Europe" as Continent, label: "유럽", emoji: "🌍" },
  { value: "North America" as Continent, label: "북미", emoji: "🌎" },
  { value: "South America" as Continent, label: "남미", emoji: "🌎" },
  { value: "Africa" as Continent, label: "아프리카", emoji: "🌍" },
  { value: "Oceania" as Continent, label: "오세아니아", emoji: "🌏" },
]
