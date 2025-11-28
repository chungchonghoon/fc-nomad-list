"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BackgroundPaths } from "@/components/ui/background-paths"
import { cities, continents, type Continent } from "@/lib/data"

const safetyColors = {
  high: "text-success",
  medium: "text-warning",
  low: "text-danger",
}

const safetyLabels = {
  high: "높음",
  medium: "중간",
  low: "낮음",
}

export default function Home() {
  const [selectedContinent, setSelectedContinent] = useState<Continent>("all")

  const filteredCities =
    selectedContinent === "all" ? cities : cities.filter((city) => city.continent === selectedContinent)

  const scrollToFilter = () => {
    document.getElementById("filter-section")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <BackgroundPaths
        title="노마드를 위한 완벽한 도시를 찾아보세요"
        buttonText="도시 탐색하기"
        onButtonClick={scrollToFilter}
        stats={[
          { value: "100+", label: "도시" },
          { value: "실시간", label: "데이터" },
          { value: "무료", label: "이용" },
        ]}
      />

      {/* Filter Section */}
      <section id="filter-section" className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">대륙별로 탐색하기</h2>
            <p className="text-lg text-gray-600">원하는 지역을 선택하세요</p>
          </div>

          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {continents.map((continent) => (
              <button
                key={continent.value}
                onClick={() => setSelectedContinent(continent.value)}
                className={`rounded-lg px-6 py-3 text-sm font-medium transition-all ${
                  selectedContinent === continent.value
                    ? "bg-[#667eea] text-white shadow-lg shadow-[#667eea]/30"
                    : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="mr-2">{continent.emoji}</span>
                {continent.label}
              </button>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">
              {selectedContinent === "all"
                ? `총 ${filteredCities.length}개 도시`
                : `${continents.find((c) => c.value === selectedContinent)?.label}의 ${filteredCities.length}개 도시`}
            </p>
          </div>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          {filteredCities.length === 0 ? (
            <div className="py-20 text-center">
              <div className="mb-4 text-6xl">😢</div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">해당 대륙에는 아직 등록된 도시가 없습니다.</h3>
              <Button onClick={() => setSelectedContinent("all")} variant="outline">
                전체 도시 보기
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCities.map((city) => (
                <Card
                  key={city.id}
                  className="group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative">
                    <img
                      src={city.imageUrl || "/placeholder.svg"}
                      alt={`${city.name}, ${city.country}`}
                      className="h-48 w-full object-cover"
                    />
                    <Badge className="absolute right-3 top-3 bg-black/70 text-white hover:bg-black/70">
                      #{city.rank}
                    </Badge>
                  </div>

                  <CardContent className="p-5">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">📍 {city.name}</h3>
                        <p className="text-sm text-gray-600">{city.country}</p>
                      </div>
                    </div>

                    <div className="mb-4 space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">⭐ Overall:</span>
                        <span className="font-semibold text-warning">{city.overallScore}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">💵 월 비용:</span>
                        <span className="font-semibold text-success">${city.costPerMonth.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">📡 인터넷 속도:</span>
                        <span className="font-semibold text-info">{city.internetSpeed} Mbps</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">👍 좋아요:</span>
                        <span className="font-semibold text-pink-500">{city.likedPercentage}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">👮 안전:</span>
                        <span className={`font-semibold ${safetyColors[city.safety]}`}>
                          {safetyLabels[city.safety]}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4 flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm">
                      <span>🌡️ {city.temperature}°C</span>
                      <span>😷 공기질 지수(AQI): {city.aqi}</span>
                    </div>

                    <Button variant="ghost" className="w-full group-hover:bg-[#667eea] group-hover:text-white">
                      더 알아보기 →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 px-6 py-16 text-gray-300">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 text-2xl font-bold text-white">노마드 리스트</h3>
              <p className="text-sm text-gray-400">디지털 노마드를 위한 도시 가이드</p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-white">서비스</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    도시 검색
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    순위 보기
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    비교하기
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    즐겨찾기
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-white">리소스</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    블로그
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    노마드 가이드
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    문의하기
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-white">커뮤니티</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    피드백 보내기
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    도시 추천하기
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p className="mb-2">© 2025 노마드 리스트. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="hover:text-white">
                개인정보처리방침
              </a>
              <span>|</span>
              <a href="#" className="hover:text-white">
                이용약관
              </a>
              <span>|</span>
              <a href="#" className="hover:text-white">
                쿠키정책
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
