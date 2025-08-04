"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  MoreHorizontal,
  GripVertical,
  Copy,
  Edit,
  Trash2,
  StickyNote,
  Clock,
  Maximize2,
  Pin,
  PinOff,
} from "lucide-react"
import { toast } from "sonner"
import type { SlateItem } from "@/lib/types/slate"

interface NoteItemProps {
  item: SlateItem
  onUpdate: (updates: Partial<SlateItem>) => void
  onDelete: () => void
  onDragStart: (e: React.DragEvent) => void
}

export function NoteItem({ item, onUpdate, onDelete, onDragStart }: NoteItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const [editTitle, setEditTitle] = useState(item.title)
  const [editContent, setEditContent] = useState(item.content || "")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) {
      if (titleRef.current) {
        titleRef.current.focus()
        titleRef.current.select()
      }
    }
  }, [isEditing])

  const handleSave = () => {
    onUpdate({
      title: editTitle.trim() || "Untitled Note",
      content: editContent,
    })
    setIsEditing(false)
    toast.success("Note updated!")
  }

  const handleCancel = () => {
    setEditTitle(item.title)
    setEditContent(item.content || "")
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSave()
    } else if (e.key === "Escape") {
      e.preventDefault()
      handleCancel()
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.content || "")
      toast.success("Content copied to clipboard")
    } catch (err) {
      toast.error("Failed to copy content")
    }
  }

  const togglePin = () => {
    setIsPinned(!isPinned)
    // You could also update the item with a pinned property
  }

  const wordCount = item.content ? item.content.split(/\s+/).filter((word) => word.length > 0).length : 0

  return (
    <Card
      className={`w-72 cursor-move select-none shadow-lg hover:shadow-xl transition-all duration-200 border-2 hover:border-yellow-200 ${
        isExpanded ? "w-80" : ""
      } ${isPinned ? "border-yellow-300 bg-yellow-50/50" : ""}`}
      draggable
      onDragStart={onDragStart}
    >
      <CardHeader className="p-4 pb-3 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <div className="p-2 rounded-lg bg-yellow-100 text-yellow-800 border-yellow-200">
            <StickyNote className="h-4 w-4" />
          </div>
          {isEditing ? (
            <Input
              ref={titleRef}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-7 text-sm font-medium border-none p-0 focus-visible:ring-0 bg-transparent"
              placeholder="Note title"
            />
          ) : (
            <h3 className="text-sm font-semibold truncate flex-1">{item.title}</h3>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={togglePin} className="h-7 w-7 p-0 hover:bg-yellow-100">
            {isPinned ? (
              <Pin className="h-3 w-3 text-yellow-600 fill-current" />
            ) : (
              <PinOff className="h-3 w-3 text-muted-foreground" />
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setIsEditing(true)} className="text-sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Note
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopy} className="text-sm">
                <Copy className="h-4 w-4 mr-2" />
                Copy Content
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsExpanded(!isExpanded)} className="text-sm">
                <Maximize2 className="h-4 w-4 mr-2" />
                {isExpanded ? "Collapse" : "Expand"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onDelete} className="text-sm text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-3">
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              ref={textareaRef}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write your notes, ideas, or reminders here..."
              className={`text-xs resize-none ${isExpanded ? "min-h-32" : "min-h-24"}`}
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave} className="h-8 text-xs px-4 flex-1">
                Save Changes
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel} className="h-8 text-xs px-4 bg-transparent">
                Cancel
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center bg-muted/30 rounded px-2 py-1">
              <kbd className="px-1 py-0.5 bg-background rounded text-xs">Cmd+Enter</kbd> to save •{" "}
              <kbd className="px-1 py-0.5 bg-background rounded text-xs">Esc</kbd> to cancel
            </p>
          </div>
        ) : (
          <>
            <div
              className={`overflow-hidden cursor-pointer text-xs text-muted-foreground leading-relaxed p-3 bg-muted/30 rounded-lg border hover:bg-muted/50 transition-colors ${
                isExpanded ? "min-h-32" : "min-h-20"
              }`}
              onClick={() => setIsEditing(true)}
            >
              {item.content || "Click to add content..."}
            </div>

            {/* Footer with stats */}
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  {wordCount} words
                </Badge>
                {item.updatedAt && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(item.updatedAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-7 px-3 text-xs hover:bg-yellow-100 hover:text-yellow-700"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
