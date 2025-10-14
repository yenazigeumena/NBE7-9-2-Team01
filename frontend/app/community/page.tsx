"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Search, PenLine, Flag, Bookmark } from "lucide-react"
import Link from "next/link"
import { CommunityDetailDialog } from "@/components/community-detail-dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const posts = [
  {
    id: 1,
    title: "요즘 너무 힘들어요",
    content: "일도 잘 안 풀리고 사람들과의 관계도 어려워요. 혼자인 것 같아서 외로워요...",
    emotion: "😔",
    author: "익명의 토끼",
    date: "2시간 전",
    likes: 24,
    comments: 8,
    isMyPost: false,
  },
  {
    id: 2,
    title: "작은 행복을 찾았어요",
    content: "오늘 길을 걷다가 예쁜 꽃을 발견했어요. 작은 것에서 행복을 느낄 수 있다는 걸 깨달았습니다.",
    emotion: "😊",
    author: "익명의 새",
    date: "5시간 전",
    likes: 42,
    comments: 12,
    isMyPost: true,
  },
  {
    id: 3,
    title: "불안한 마음을 나눠요",
    content: "미래가 불안하고 걱정이 많아요. 비슷한 고민을 하시는 분들과 이야기 나누고 싶어요.",
    emotion: "😰",
    author: "익명의 구름",
    date: "1일 전",
    likes: 31,
    comments: 15,
    isMyPost: false,
  },
  {
    id: 4,
    title: "감사한 하루였어요",
    content: "가족들과 함께 시간을 보내며 감사함을 느꼈어요. 소중한 사람들이 있다는 게 행복합니다.",
    emotion: "🥰",
    author: "익명의 별",
    date: "1일 전",
    likes: 56,
    comments: 9,
    isMyPost: false,
  },
]

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [filter, setFilter] = useState<"latest" | "popular">("latest")

  const openPostDetail = (post: any) => {
    setSelectedPost(post)
    setDialogOpen(true)
  }

  const sortedPosts = [...posts].sort((a, b) => {
    if (filter === "popular") {
      return b.likes - a.likes
    }
    return 0 // latest is default order
  })

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container py-8 md:py-12 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">익명 커뮤니티</h1>
            <p className="text-muted-foreground">비슷한 감정을 가진 사람들과 위로를 나눠보세요</p>
          </div>
          <Button asChild>
            <Link href="/community/new">
              <PenLine className="h-4 w-4 mr-2" />
              글쓰기
            </Link>
          </Button>
        </div>

        {/* Search */}
        <Card className="p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="고민이나 키워드로 검색하세요..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </Card>

        {/* Community Guidelines */}
        <Card className="p-4 mb-6 bg-accent/20 border-accent/30">
          <p className="text-sm text-muted-foreground leading-relaxed">
            💡 이곳은 서로의 감정을 존중하고 위로하는 공간입니다. 따뜻한 말 한마디가 누군가에게 큰 힘이 될 수 있어요.
          </p>
        </Card>

        {/* Filter Tabs */}
        <Tabs value={filter} onValueChange={(v) => setFilter(v as "latest" | "popular")} className="mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="latest">최신글</TabsTrigger>
            <TabsTrigger value="popular">인기글</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Posts */}
        <div className="space-y-4">
          {sortedPosts.map((post) => (
            <Card
              key={post.id}
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => openPostDetail(post)}
            >
              <div className="flex gap-4">
                <div className="text-4xl">{post.emotion}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        console.log("[v0] Report post")
                      }}
                    >
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">{post.content}</p>
                  <div className="flex items-center gap-4">
                    <button
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </button>
                    <button
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {selectedPost && <CommunityDetailDialog open={dialogOpen} onOpenChange={setDialogOpen} post={selectedPost} />}
      </main>
    </div>
  )
}
