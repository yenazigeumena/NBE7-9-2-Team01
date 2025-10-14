"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Check, Coffee, Heart, Sun, History } from "lucide-react"

const emotions = [
  { emoji: "😊", label: "행복해요", color: "hover:bg-yellow-100", score: 5 },
  { emoji: "😂", label: "즐거워요", color: "hover:bg-orange-100", score: 5 },
  { emoji: "😌", label: "평온해요", color: "hover:bg-green-100", score: 4 },
  { emoji: "😐", label: "그저그래요", color: "hover:bg-gray-100", score: 3 },
  { emoji: "😔", label: "우울해요", color: "hover:bg-blue-100", score: 2 },
  { emoji: "😢", label: "슬퍼요", color: "hover:bg-indigo-100", score: 2 },
  { emoji: "😭", label: "힘들어요", color: "hover:bg-purple-100", score: 1 },
  { emoji: "😤", label: "화나요", color: "hover:bg-red-100", score: 1 },
]

const missions = [
  {
    id: 1,
    title: "따뜻한 차 마시기",
    description: "좋아하는 차를 천천히 마시며 오늘 하루를 돌아보세요",
    icon: Coffee,
    emotion: "평온",
    completed: false,
  },
  {
    id: 2,
    title: "감사한 일 3가지 쓰기",
    description: "오늘 감사했던 작은 일들을 떠올려보세요",
    icon: Heart,
    emotion: "감사",
    completed: false,
  },
  {
    id: 3,
    title: "10분 산책하기",
    description: "밖에 나가 신선한 공기를 마시며 걸어보세요",
    icon: Sun,
    emotion: "활력",
    completed: false,
  },
]

const pastMissions = [
  {
    date: "2025년 1월 14일",
    missions: [
      { title: "따뜻한 차 마시기", completed: true },
      { title: "감사한 일 3가지 쓰기", completed: true },
      { title: "10분 산책하기", completed: false },
    ],
  },
  {
    date: "2025년 1월 13일",
    missions: [
      { title: "좋아하는 음악 듣기", completed: true },
      { title: "친구에게 연락하기", completed: true },
      { title: "스트레칭 하기", completed: true },
    ],
  },
]

export default function MissionsPage() {
  const [missionList, setMissionList] = useState(missions)
  const [showEmotionDialog, setShowEmotionDialog] = useState(true)
  const [selectedEmotion, setSelectedEmotion] = useState<(typeof emotions)[0] | null>(null)

  const completedCount = missionList.filter((m) => m.completed).length

  const toggleMission = (id: number) => {
    setMissionList(missionList.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m)))
  }

  const selectEmotion = (emotion: (typeof emotions)[0]) => {
    setSelectedEmotion(emotion)
    setShowEmotionDialog(false)
  }

  return (
    <div className="min-h-screen">
      <Header />

      <Dialog open={showEmotionDialog} onOpenChange={setShowEmotionDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">지금 기분이 어떠신가요?</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-4 gap-4 py-6">
            {emotions.map((emotion) => (
              <button
                key={emotion.label}
                onClick={() => selectEmotion(emotion)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${emotion.color} hover:scale-105 active:scale-95`}
              >
                <span className="text-4xl">{emotion.emoji}</span>
                <span className="text-xs text-center">{emotion.label}</span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <main className="container py-8 md:py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">오늘의 미션</h1>
          <p className="text-muted-foreground">감정 분석 기반 맞춤 미션으로 하루를 더 풍요롭게</p>
        </div>

        {/* AI Recommendation */}
        <Tabs defaultValue="today" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="today">오늘의 미션</TabsTrigger>
            <TabsTrigger value="history">
              <History className="h-4 w-4 mr-2" />
              미션 이력
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            {selectedEmotion && (
              <Card className="p-6 bg-gradient-to-br from-accent/30 to-secondary/40 border-none">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg mb-2">AI 추천</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedEmotion.label} 상태시네요. 오늘은 차분한 활동으로 마음을 가다듬어보는 건 어떨까요?
                    </p>
                  </div>
                </div>
              </Card>
            )}

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-1">오늘의 진행도</h3>
                  <p className="text-sm text-muted-foreground">
                    {completedCount} / {missionList.length} 완료
                  </p>
                </div>
              </div>
            </Card>

            {/* Missions */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">추천 미션</h2>
              {missionList.map((mission) => {
                const Icon = mission.icon
                return (
                  <Card
                    key={mission.id}
                    className={`p-6 transition-all ${mission.completed ? "bg-muted/50 border-primary/30" : "hover:shadow-lg"}`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                          mission.completed ? "bg-primary/20" : "bg-secondary"
                        }`}
                      >
                        {mission.completed ? (
                          <Check className="h-6 w-6 text-primary" />
                        ) : (
                          <Icon className="h-6 w-6 text-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3
                              className={`font-semibold text-lg mb-1 ${mission.completed ? "line-through text-muted-foreground" : ""}`}
                            >
                              {mission.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">{mission.description}</p>
                            <span className="text-xs px-2 py-1 bg-accent/30 rounded-full">{mission.emotion}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant={mission.completed ? "outline" : "default"}
                        size="sm"
                        onClick={() => toggleMission(mission.id)}
                      >
                        {mission.completed ? "완료 취소" : "완료"}
                      </Button>
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Motivation */}
            {completedCount === missionList.length && (
              <Card className="p-6 bg-primary/10 border-primary/20">
                <div className="text-center">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="font-semibold text-xl mb-2">오늘의 미션을 모두 완료했어요!</h3>
                  <p className="text-muted-foreground">정말 잘하셨어요. 내일도 함께 해요!</p>
                </div>
              </Card>
            )}
          </TabsContent>

          {/* Mission History */}
          <TabsContent value="history" className="space-y-4">
            <h2 className="text-xl font-semibold">지난 미션 이력</h2>
            {pastMissions.map((day, idx) => (
              <Card key={idx} className="p-6">
                <h3 className="font-semibold mb-4">{day.date}</h3>
                <div className="space-y-3">
                  {day.missions.map((mission, mIdx) => (
                    <div key={mIdx} className="flex items-center gap-3">
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                          mission.completed ? "bg-primary/20" : "bg-muted"
                        }`}
                      >
                        {mission.completed && <Check className="h-4 w-4 text-primary" />}
                      </div>
                      <span className={mission.completed ? "text-muted-foreground" : "text-foreground"}>
                        {mission.title}
                      </span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {mission.completed ? "완료" : "미완료"}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    완료율: {Math.round((day.missions.filter((m) => m.completed).length / day.missions.length) * 100)}%
                  </p>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
