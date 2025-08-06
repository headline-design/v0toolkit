"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal,
  GripVertical,
  Copy,
  Edit,
  Trash2,
  Zap,
  RefreshCw,
  Search,
  Sparkles,
  Hash,
  Clock,
  Star,
  StarOff,
  ExternalLink,
  Maximize2,
} from "lucide-react"
import { toast } from "sonner"
import type { SlateItem } from "@/lib/types/slate"

interface PromptItemProps {
  item: SlateItem
  onUpdate: (updates: Partial<SlateItem>) => void
  onDelete: () => void
  onDragStart: (e: React.DragEvent) => void
  onCopy: () => void
}

const promptTypeIcons = {
  create: Zap,
  refine: RefreshCw,
  analyze: Search,
  custom: Sparkles,
}

const promptTypeColors = {
  create: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300",
  refine: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300",
  analyze: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300",
  custom: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300",
}

const categories = [
  "Components",
  "Pages",
  "Features",
  "Integrations",
  "Analysis",
  "Refinement",
  "Custom",
  "Layout",
  "API",
  "Sections",
]

export function PromptItem({ item, onUpdate, onDelete, onDragStart, onCopy }: PromptItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [editTitle, setEditTitle] = useState(item.title)
  const [editContent, setEditContent] = useState(item.content || "")
  const [editCategory, setEditCategory] = useState(item.category || "Components")
  const [editPromptType, setEditPromptType] = useState(item.promptType || "create")
  const [editTags, setEditTags] = useState(item.tags?.join(", ") || "")
  const [isFavorite, setIsFavorite] = useState(false)

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
    const tagsArray = editTags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)

    onUpdate({
      title: editTitle.trim() || "Untitled Prompt",
      content: editContent,
      category: editCategory,
      promptType: editPromptType as "create" | "refine" | "analyze" | "custom",
      tags: tagsArray,
    })
    setIsEditing(false)
    toast.success("Prompt updated!")
  }

  const handleCancel = () => {
    setEditTitle(item.title)
    setEditContent(item.content || "")
    setEditCategory(item.category || "Components")
    setEditPromptType(item.promptType || "create")
    setEditTags(item.tags?.join(", ") || "")
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

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // You could also update the item with a favorite property
  }

  const openInV0 = () => {
    // This would open the prompt in v0 - placeholder for now
    toast.info("Opening in v0...")
  }

  const PromptTypeIcon = promptTypeIcons[item.promptType || "create"]
  const promptTypeColor = promptTypeColors[item.promptType || "create"]

  const tokenProgress = Math.min((item.estimatedTokens || 0) / 100, 1) * 100

  return (
    <Card
      className={`w-80 cursor-move select-none shadow-lg hover:shadow-xl transition-all duration-200 border-2 hover:border-primary/20 ${
        isExpanded ? "w-96" : ""
      }`}
      draggable
      onDragStart={onDragStart}
    >
      <CardHeader className="p-4 pb-3 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <div className={`p-2 rounded-lg ${promptTypeColor}`}>
            <PromptTypeIcon className="h-4 w-4" />
          </div>
          {isEditing ? (
            <Input
              ref={titleRef}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-7 text-sm font-medium border-none p-0 focus-visible:ring-0 bg-transparent"
              placeholder="Prompt title"
            />
          ) : (
            <h3 className="text-sm font-semibold truncate flex-1">{item.title}</h3>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={toggleFavorite} className="h-7 w-7 p-0 hover:bg-yellow-100">
            {isFavorite ? (
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
            ) : (
              <StarOff className="h-3 w-3 text-muted-foreground" />
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
                Edit Prompt
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onCopy} className="text-sm">
                <Copy className="h-4 w-4 mr-2" />
                Copy to Clipboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={openInV0} className="text-sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in v0
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

      <CardContent className="p-4 pt-0 space-y-4">
        {/* Category and Type */}
        {isEditing ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Category</label>
                <Select value={editCategory} onValueChange={setEditCategory}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="text-xs">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Type</label>
                <Select value={editPromptType} onValueChange={setEditPromptType}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="create" className="text-xs">
                      Create
                    </SelectItem>
                    <SelectItem value="refine" className="text-xs">
                      Refine
                    </SelectItem>
                    <SelectItem value="analyze" className="text-xs">
                      Analyze
                    </SelectItem>
                    <SelectItem value="custom" className="text-xs">
                      Custom
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs px-2 py-1 font-medium">
              {item.category}
            </Badge>
            <Badge variant="outline" className="text-xs px-2 py-1 capitalize">
              {item.promptType}
            </Badge>
            {item.version && (
              <Badge variant="outline" className="text-xs px-2 py-1">
                v{item.version}
              </Badge>
            )}
          </div>
        )}

        {/* Content */}
        {isEditing ? (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Prompt Content</label>
              <Textarea
                ref={textareaRef}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe what you want v0 to create, refine, or analyze..."
                className={`text-xs resize-none ${isExpanded ? "min-h-32" : "min-h-24"}`}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Tags (comma-separated)</label>
              <Input
                value={editTags}
                onChange={(e) => setEditTags(e.target.value)}
                placeholder="react, dashboard, responsive"
                className="h-8 text-xs"
              />
            </div>
          </div>
        ) : (
          <div
            className={`overflow-hidden cursor-pointer text-xs text-muted-foreground leading-relaxed p-3 bg-muted/30 rounded-lg border hover:bg-muted/50 transition-colors ${
              isExpanded ? "min-h-32" : "min-h-20"
            }`}
            onClick={() => setIsEditing(true)}
          >
            {item.content || "Click to add your v0 prompt..."}
          </div>
        )}

        {/* Tags */}
        {!isEditing && item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.tags.slice(0, isExpanded ? 6 : 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs px-2 py-0.5 bg-background">
                <Hash className="h-2 w-2 mr-1" />
                {tag}
              </Badge>
            ))}
            {item.tags.length > (isExpanded ? 6 : 3) && (
              <Badge variant="outline" className="text-xs px-2 py-0.5">
                +{item.tags.length - (isExpanded ? 6 : 3)}
              </Badge>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-3">
            {item.estimatedTokens && (
              <div className="flex items-center gap-2">
                <span>{item.estimatedTokens} tokens</span>
                <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${tokenProgress}%` }}
                  />
                </div>
              </div>
            )}
            {item.updatedAt && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{new Date(item.updatedAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>
          {!isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onCopy}
              className="h-7 px-3 text-xs hover:bg-primary/10 hover:text-primary"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
          )}
        </div>

        {/* Edit Actions */}
        {isEditing && (
          <div className="flex gap-2 pt-3 border-t">
            <Button size="sm" onClick={handleSave} className="h-8 text-xs px-4 flex-1">
              Save Changes
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel} className="h-8 text-xs px-4 bg-transparent">
              Cancel
            </Button>
          </div>
        )}

        {isEditing && (
          <p className="text-xs text-muted-foreground text-center bg-muted/30 rounded px-2 py-1">
            <kbd className="px-1 py-0.5 bg-background rounded text-xs">Cmd+Enter</kbd> to save •{" "}
            <kbd className="px-1 py-0.5 bg-background rounded text-xs">Esc</kbd> to cancel
          </p>
        )}
      </CardContent>
    </Card>
  )
}
