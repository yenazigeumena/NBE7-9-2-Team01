"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Share2, Bookmark, ImageIcon, Pencil, Trash2, Maximize2 } from "lucide-react"
import { useState } from "react"

interface DiaryDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  diary: {
    id: number
    author?: string
    date: string
    emotion: string
    title: string
    content: string
    visibility?: string
    hasImage?: boolean
    likes?: number
    comments?: number
    allowComments?: boolean
  }
}

export function DiaryDetailDialog({ open, onOpenChange, diary }: DiaryDetailDialogProps) {
  const [comment, setComment] = useState("")
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [imageZoomed, setImageZoomed] = useState(false)
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)
  const [editCommentText, setEditCommentText] = useState("")

  const comments = [
    {
      id: 1,
      author: "익명의 새",
      content: "공감돼요. 저도 비슷한 경험이 있었어요.",
      time: "2시간 전",
      isMyComment: false,
    },
    {
      id: 2,
      author: "익명의 고양이",
      content: "힘내세요! 응원합니다 💪",
      time: "5시간 전",
      isMyComment: true,
    },
  ]

  const handleEdit = () => {
    console.log("[v0] Edit diary:", diary.id)
  }

  const handleDelete = () => {
    console.log("[v0] Delete diary:", diary.id)
    onOpenChange(false)
  }

  const handleEditComment = (commentId: number, currentText: string) => {
    setEditingCommentId(commentId)
    setEditCommentText(currentText)
  }

  const handleSaveComment = (commentId: number) => {
    console.log("[v0] Save comment:", commentId, editCommentText)
    setEditingCommentId(null)
    setEditCommentText("")
  }

  const handleDeleteComment = (commentId: number) => {
    console.log("[v0] Delete comment:", commentId)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">다이어리 상세보기</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="text-5xl">{diary.emotion}</div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{diary.title}</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {diary.author && (
                      <>
                        <span>{diary.author}</span>
                        <span>•</span>
                      </>
                    )}
                    <span>{diary.date}</span>
                    {diary.visibility && (
                      <>
                        <span>•</span>
                        <span className="px-2 py-0.5 bg-muted rounded-full text-xs">
                          {diary.visibility === "private"
                            ? "비공개"
                            : diary.visibility === "friends"
                              ? "친구공개"
                              : "전체공개"}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                {!diary.author && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={handleEdit}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={handleDelete}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-sm max-w-none">
            <p className="text-base leading-relaxed whitespace-pre-wrap">{diary.content}</p>
          </div>

          {/* Image if exists */}
          {diary.hasImage && (
            <div className="relative w-full h-64 bg-muted rounded-lg flex items-center justify-center group">
              <ImageIcon className="h-16 w-16 text-muted-foreground" />
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setImageZoomed(true)}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-4 border-t">
            <Button variant="ghost" size="sm" className="gap-2" onClick={() => setIsLiked(!isLiked)}>
              <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              {diary.likes || 0}
            </Button>
            {diary.allowComments !== false && (
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                {diary.comments || comments.length}
              </Button>
            )}
            <Button variant="ghost" size="sm" className="gap-2" onClick={() => setIsBookmarked(!isBookmarked)}>
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 ml-auto">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Comments Section */}
          {diary.allowComments !== false && (
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold">댓글 {comments.length}</h3>

              {/* Comment Input */}
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>나</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Textarea
                    placeholder="댓글을 입력하세요..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={2}
                  />
                  <Button size="sm" disabled={!comment.trim()}>
                    댓글 작성
                  </Button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((c) => (
                  <Card key={c.id} className="p-4">
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>{c.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{c.author}</span>
                            <span className="text-xs text-muted-foreground">{c.time}</span>
                          </div>
                          {c.isMyComment && (
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0"
                                onClick={() => handleEditComment(c.id, c.content)}
                              >
                                <Pencil className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                                onClick={() => handleDeleteComment(c.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                        {editingCommentId === c.id ? (
                          <div className="space-y-2">
                            <Textarea
                              value={editCommentText}
                              onChange={(e) => setEditCommentText(e.target.value)}
                              rows={2}
                            />
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleSaveComment(c.id)}>
                                저장
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setEditingCommentId(null)}>
                                취소
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm leading-relaxed">{c.content}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>

      {imageZoomed && (
        <Dialog open={imageZoomed} onOpenChange={setImageZoomed}>
          <DialogContent className="max-w-7xl max-h-[95vh] p-0">
            <div className="relative w-full h-[90vh] bg-black flex items-center justify-center">
              <ImageIcon className="h-32 w-32 text-muted-foreground" />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  )
}
