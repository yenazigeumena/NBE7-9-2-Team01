"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Flag } from "lucide-react"
import Link from "next/link"

const post = {
  id: 1,
  title: "요즘 너무 힘들어요",
  content:
    "일도 잘 안 풀리고 사람들과의 관계도 어려워요. 혼자인 것 같아서 외로워요. 이런 감정을 느끼는 게 저만 그런 건 아니겠죠? 어떻게 하면 이 상황을 극복할 수 있을까요?",
  emotion: "😔",
  author: "익명의 토끼",
  date: "2시간 전",
  likes: 24,
  isLiked: false,
}

const comments = [
  {
    id: 1,
    author: "익명의 나무",
    content: "저도 비슷한 경험이 있어요. 혼자가 아니에요. 함께 이겨내요!",
    date: "1시간 전",
    likes: 8,
  },
  {
    id: 2,
    author: "익명의 바다",
    content: "힘든 시기는 누구에게나 있어요. 천천히 한 걸음씩 나아가면 괜찮아질 거예요.",
    date: "1시간 전",
    likes: 12,
  },
  {
    id: 3,
    author: "익명의 달",
    content: "작은 것부터 시작해보세요. 오늘 하루 잘 버텨낸 자신을 칭찬해주세요.",
    date: "30분 전",
    likes: 5,
  },
]

export default function CommunityPostPage() {
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [likes, setLikes] = useState(post.likes)
  const [newComment, setNewComment] = useState("")

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  const handleCommentSubmit = () => {
    // Submit comment logic
    setNewComment("")
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container py-8 md:py-12 max-w-4xl">
        <div className="mb-8">
          <Link href="/community" className="text-sm text-muted-foreground hover:text-foreground">
            ← 커뮤니티로 돌아가기
          </Link>
        </div>

        {/* Post */}
        <Card className="p-8 mb-6">
          <div className="flex gap-4 mb-6">
            <div className="text-5xl">{post.emotion}</div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-destructive">
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-base leading-relaxed mb-6">{post.content}</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    isLiked ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? "fill-primary" : ""}`} />
                  <span className="font-medium">{likes}</span>
                </button>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageCircle className="h-5 w-5" />
                  <span className="font-medium">{comments.length}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Comments */}
        <div className="space-y-4 mb-6">
          <h2 className="text-xl font-semibold">댓글 {comments.length}개</h2>
          {comments.map((comment) => (
            <Card key={comment.id} className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium mb-1">{comment.author}</p>
                  <p className="text-sm text-muted-foreground">{comment.date}</p>
                </div>
                <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-destructive">
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-3">{comment.content}</p>
              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Heart className="h-4 w-4" />
                <span>{comment.likes}</span>
              </button>
            </Card>
          ))}
        </div>

        {/* New Comment */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">댓글 작성</h3>
          <Textarea
            placeholder="따뜻한 위로의 말을 남겨주세요..."
            className="mb-4 resize-none"
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex justify-end">
            <Button onClick={handleCommentSubmit} disabled={!newComment.trim()}>
              댓글 작성
            </Button>
          </div>
        </Card>
      </main>
    </div>
  )
}
