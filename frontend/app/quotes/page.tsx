"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { PenLine, Check, Sparkles } from "lucide-react"
import Link from "next/link"

const quotes = [
  {
    text: "감정을 표현하는 것은 약함이 아니라 용기입니다",
    author: "브레네 브라운",
  },
  {
    text: "어둠 속에서도 빛을 찾을 수 있다면, 그것이 진정한 행복입니다",
    author: "알버스 덤블도어",
  },
  {
    text: "당신이 겪고 있는 폭풍은 당신을 파괴하는 것이 아니라 더 강하게 만듭니다",
    author: "익명",
  },
  {
    text: "오늘의 작은 진전이 내일의 큰 변화를 만듭니다",
    author: "익명",
  },
  {
    text: "완벽하지 않아도 괜찮아요. 있는 그대로의 당신이 충분합니다",
    author: "익명",
  },
]

export default function QuotesPage() {
  const [currentQuote] = useState(quotes[0])
  const [isCalligraphy, setIsCalligraphy] = useState(false)
  const [calligraphyText, setCalligraphyText] = useState("")
  const [isSaved, setIsSaved] = useState(false)

  const startCalligraphy = () => {
    setIsCalligraphy(true)
    setCalligraphyText("")
    setIsSaved(false)
  }

  const saveCalligraphy = () => {
    setIsSaved(true)
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container py-8 md:py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">오늘의 명언</h1>
          <p className="text-muted-foreground">마음을 위로하는 따뜻한 문장을 만나보세요</p>
        </div>

        {!isCalligraphy ? (
          <div className="space-y-6">
            {/* Daily Quote */}
            <Card className="p-12 bg-gradient-to-br from-accent/30 to-secondary/40 border-none">
              <div className="flex justify-center mb-6">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <blockquote className="text-center space-y-6">
                <p className="text-2xl md:text-3xl font-medium leading-relaxed text-balance">{currentQuote.text}</p>
                <footer className="text-base text-muted-foreground">- {currentQuote.author}</footer>
              </blockquote>
            </Card>

            {/* Actions */}
            <div className="flex justify-center">
              <Button size="lg" className="gap-2" onClick={startCalligraphy}>
                <PenLine className="h-5 w-5" />
                필사하기
              </Button>
            </div>

            {/* Info Card */}
            <Card className="p-6 bg-muted/50">
              <h3 className="font-semibold mb-2">필사의 효과</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                손으로 직접 문장을 베껴 쓰면 마음이 차분해지고 그 의미가 더 깊이 새겨집니다. 하루 한 문장, 마음을
                가다듬는 시간을 가져보세요.
              </p>
            </Card>

            {/* Recent Calligraphy */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">내가 필사한 문장</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/profile">전체 보기</Link>
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <p className="text-sm leading-relaxed mb-2">감정을 표현하는 것은 약함이 아니라 용기입니다</p>
                  <p className="text-xs text-muted-foreground">2일 전</p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm leading-relaxed mb-2">오늘의 작은 진전이 내일의 큰 변화를 만듭니다</p>
                  <p className="text-xs text-muted-foreground">5일 전</p>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Original Quote */}
            <Card className="p-8 bg-secondary/30">
              <p className="text-center text-xl font-medium leading-relaxed text-balance">{currentQuote.text}</p>
            </Card>

            {/* Calligraphy Input */}
            <Card className="p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">필사하기</h2>
                <p className="text-sm text-muted-foreground">위 문장을 천천히 베껴 써보세요</p>
              </div>
              <Textarea
                placeholder="여기에 문장을 베껴 쓰세요..."
                className="min-h-[200px] resize-none text-lg leading-relaxed"
                value={calligraphyText}
                onChange={(e) => setCalligraphyText(e.target.value)}
              />
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {calligraphyText.length} / {currentQuote.text.length} 글자
                </p>
                {calligraphyText === currentQuote.text && (
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Check className="h-4 w-4" />
                    <span>완벽해요!</span>
                  </div>
                )}
              </div>
            </Card>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1"
                onClick={saveCalligraphy}
                disabled={!calligraphyText.trim() || isSaved}
              >
                {isSaved ? "저장 완료" : "저장하기"}
              </Button>
              <Button size="lg" variant="outline" onClick={() => setIsCalligraphy(false)}>
                취소
              </Button>
            </div>

            {isSaved && (
              <Card className="p-6 bg-primary/10 border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">필사를 완료했어요!</p>
                    <p className="text-sm text-muted-foreground">마이페이지에서 다시 볼 수 있어요</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
