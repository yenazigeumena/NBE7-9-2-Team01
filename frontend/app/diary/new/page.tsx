"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, X, Sparkles } from "lucide-react"
import Link from "next/link"

const emotions = [
  { emoji: "😊", label: "행복해요", value: "happy", bgColor: "bg-yellow-50" },
  { emoji: "😂", label: "즐거워요", value: "joyful", bgColor: "bg-orange-50" },
  { emoji: "😌", label: "평온해요", value: "calm", bgColor: "bg-green-50" },
  { emoji: "😐", label: "그저그래요", value: "neutral", bgColor: "bg-gray-50" },
  { emoji: "😔", label: "우울해요", value: "down", bgColor: "bg-blue-50" },
  { emoji: "😢", label: "슬퍼요", value: "sad", bgColor: "bg-indigo-50" },
  { emoji: "😭", label: "힘들어요", value: "struggling", bgColor: "bg-purple-50" },
  { emoji: "😤", label: "화나요", value: "angry", bgColor: "bg-red-50" },
]

export default function NewDiaryPage() {
  const [selectedEmotion, setSelectedEmotion] = useState<string>("")
  const [content, setContent] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [visibility, setVisibility] = useState("private")
  const [allowComments, setAllowComments] = useState(true)
  const [allowLikes, setAllowLikes] = useState(true)
  const [showAnalysis, setShowAnalysis] = useState(false)

  const selectedEmotionData = emotions.find((e) => e.value === selectedEmotion)

  const handleSubmit = () => {
    // Simulate AI analysis
    setShowAnalysis(true)
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container py-8 md:py-12 max-w-4xl">
        <div className="mb-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← 홈으로 돌아가기
          </Link>
        </div>

        {!showAnalysis ? (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">오늘의 다이어리</h1>
              <p className="text-muted-foreground">당신의 감정을 자유롭게 표현해보세요</p>
            </div>

            {/* Emotion Selection */}
            <Card className="p-6">
              <Label className="text-lg font-semibold mb-4 block">지금 기분이 어떠신가요?</Label>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                {emotions.map((emotion) => (
                  <button
                    key={emotion.value}
                    onClick={() => setSelectedEmotion(emotion.value)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all hover:scale-105 ${
                      selectedEmotion === emotion.value ? "ring-2 ring-primary bg-primary/10" : "hover:bg-muted"
                    }`}
                  >
                    <span className="text-3xl">{emotion.emoji}</span>
                    <span className="text-xs text-center">{emotion.label}</span>
                  </button>
                ))}
              </div>
            </Card>

            {/* Diary Content */}
            <Card className={`p-6 transition-colors ${selectedEmotionData?.bgColor || ""}`}>
              <Label htmlFor="content" className="text-lg font-semibold mb-4 block">
                오늘 하루는 어땠나요?
              </Label>
              <Textarea
                id="content"
                placeholder="자유롭게 감정을 표현해보세요..."
                className="min-h-[300px] resize-none text-base leading-relaxed bg-background/50"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Card>

            {/* Image Upload */}
            <Card className="p-6">
              <Label className="text-lg font-semibold mb-4 block">사진 첨부 (최대 3장)</Label>
              <div className="grid grid-cols-3 gap-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`Upload ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setImages(images.filter((_, i) => i !== idx))}
                      className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {images.length < 3 && (
                  <button className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 flex flex-col items-center justify-center gap-2 transition-colors">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">사진 추가</span>
                  </button>
                )}
              </div>
            </Card>

            {/* Visibility Settings */}
            <Card className="p-6">
              <Label className="text-lg font-semibold mb-4 block">공개 범위</Label>
              <RadioGroup value={visibility} onValueChange={setVisibility}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public" className="font-normal cursor-pointer">
                    전체 공개 - 모든 사용자가 볼 수 있어요
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="friends" id="friends" />
                  <Label htmlFor="friends" className="font-normal cursor-pointer">
                    친구 공개 - 친구만 볼 수 있어요
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private" className="font-normal cursor-pointer">
                    비공개 - 나만 볼 수 있어요
                  </Label>
                </div>
              </RadioGroup>

              {visibility === "friends" && (
                <div className="mt-6 pt-6 border-t space-y-3">
                  <Label className="text-base font-semibold block">상호작용 설정</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="allowLikes"
                      checked={allowLikes}
                      onCheckedChange={(checked) => setAllowLikes(checked as boolean)}
                    />
                    <Label htmlFor="allowLikes" className="font-normal cursor-pointer">
                      친구들이 좋아요를 누를 수 있어요
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="allowComments"
                      checked={allowComments}
                      onCheckedChange={(checked) => setAllowComments(checked as boolean)}
                    />
                    <Label htmlFor="allowComments" className="font-normal cursor-pointer">
                      친구들이 댓글을 남길 수 있어요
                    </Label>
                  </div>
                </div>
              )}
            </Card>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button size="lg" className="flex-1" onClick={handleSubmit} disabled={!selectedEmotion || !content}>
                작성 완료
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/">취소</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2">AI 감정 분석 결과</h1>
              <p className="text-muted-foreground">당신의 감정을 분석했어요</p>
            </div>

            {/* Emotion Score */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">감정 점수</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">긍정</span>
                    <span className="text-sm text-muted-foreground">65%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "65%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">중립</span>
                    <span className="text-sm text-muted-foreground">20%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gray-500 rounded-full" style={{ width: "20%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">부정</span>
                    <span className="text-sm text-muted-foreground">15%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: "15%" }} />
                  </div>
                </div>
              </div>
            </Card>

            {/* Keywords */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">주요 키워드</h2>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">희망</span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">성장</span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">감사</span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">평온</span>
              </div>
            </Card>

            {/* Summary */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">감정 요약</h2>
              <p className="text-muted-foreground leading-relaxed">
                오늘 하루는 전반적으로 긍정적인 감정이 우세했어요. 작은 일상 속에서 감사함을 느끼고 있으며, 앞으로
                나아가려는 의지가 보여요. 이런 마음가짐을 계속 유지하면 좋을 것 같아요.
              </p>
            </Card>

            {/* Actions */}
            <div className="flex gap-4">
              <Button size="lg" className="flex-1" asChild>
                <Link href="/calendar">감정 캘린더 보기</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/">홈으로</Link>
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
