"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MoreHorizontal,
  GripVertical,
  Edit,
  Trash2,
  Folder,
  FolderOpen,
  FileText,
  Copy,
  X,
  Zap,
  StickyNote,
  Hash,
  ChevronDown,
  ChevronRight,
  Users,
  Clock,
  Archive,
} from "lucide-react"
import { toast } from "sonner"
import type { SlateItem } from "@/lib/types/slate"

interface FolderItemProps {
  item: SlateItem
  onUpdate: (updates: Partial<SlateItem>) => void
  onDelete: () => void
  onDragStart: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  onRemoveItemFromFolder: (itemId: string, folderId: string) => void
  onUpdateItemInFolder: (itemId: string, folderId: string, updates: Partial<SlateItem>) => void
  onCopyPrompt: (item: SlateItem) => void
}

interface FolderItemDisplayProps {
  item: SlateItem
  folderId: string
  onRemove: (itemId: string, folderId: string) => void
  onUpdate: (itemId: string, folderId: string, updates: Partial<SlateItem>) => void
  onCopy: (item: SlateItem) => void
}

function FolderItemDisplay({ item, folderId, onRemove, onUpdate, onCopy }: FolderItemDisplayProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(item.title)
  const [editContent, setEditContent] = useState(item.content || "")
  const [isOpen, setIsOpen] = useState(false)

  const handleSave = () => {
    onUpdate(item.id, folderId, {
      title: editTitle.trim() || "Untitled",
      content: editContent,
    })
    setIsEditing(false)
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

  const getItemIcon = () => {
    switch (item.type) {
      case "prompt":
        return <Zap className="h-4 w-4 text-green-600" />
      case "note":
        return <StickyNote className="h-4 w-4 text-yellow-600" />
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getItemColor = () => {
    switch (item.type) {
      case "prompt":
        return "hover:bg-green-50 border-l-green-200"
      case "note":
        return "hover:bg-yellow-50 border-l-yellow-200"
      default:
        return "hover:bg-muted/50 border-l-muted"
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div
          className={`flex items-center gap-3 p-3 rounded-lg border-l-2 cursor-pointer group transition-all duration-200 ${getItemColor()}`}
        >
          {getItemIcon()}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{item.title}</div>
            {item.type === "prompt" && (
              <div className="flex items-center gap-2 mt-1">
                {item.category && (
                  <Badge variant="secondary" className="text-xs px-2 py-0.5">
                    {item.category}
                  </Badge>
                )}
                {item.promptType && (
                  <Badge variant="outline" className="text-xs px-2 py-0.5 capitalize">
                    {item.promptType}
                  </Badge>
                )}
                {item.estimatedTokens && (
                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                    {item.estimatedTokens} tokens
                  </Badge>
                )}
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onRemove(item.id, folderId)
            }}
            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="start">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            {isEditing ? (
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-8 text-sm font-medium"
                placeholder="Item title"
              />
            ) : (
              <div className="flex items-center gap-2">
                {getItemIcon()}
                <h4 className="text-sm font-semibold">{item.title}</h4>
              </div>
            )}
            <div className="flex gap-1">
              {item.type === "prompt" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onCopy(item)}
                  className="h-7 w-7 p-0 hover:bg-green-100"
                  title="Copy prompt"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(item.id, folderId)}
                className="h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive"
                title="Remove from folder"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Item metadata */}
          {!isEditing && item.type === "prompt" && (
            <div className="flex flex-wrap gap-2">
              {item.category && (
                <Badge variant="secondary" className="text-xs">
                  {item.category}
                </Badge>
              )}
              {item.promptType && (
                <Badge variant="outline" className="text-xs capitalize">
                  {item.promptType}
                </Badge>
              )}
              {item.tags?.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  <Hash className="h-2 w-2 mr-1" />
                  {tag}
                </Badge>
              ))}
              {item.estimatedTokens && (
                <Badge variant="outline" className="text-xs">
                  {item.estimatedTokens} tokens
                </Badge>
              )}
            </div>
          )}

          {isEditing ? (
            <div className="space-y-3">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Content..."
                className="min-h-32 text-sm resize-none"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave} className="h-8 text-xs px-3 flex-1">
                  Save Changes
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel} className="h-8 text-xs px-3 bg-transparent">
                  Cancel
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Cmd+Enter</kbd> to save •{" "}
                <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Esc</kbd> to cancel
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <ScrollArea className="max-h-40">
                <div className="text-sm text-muted-foreground leading-relaxed pr-3">{item.content || "No content"}</div>
              </ScrollArea>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setIsEditing(true)} className="h-8 text-xs px-3">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                {item.type === "prompt" && (
                  <Button size="sm" variant="outline" onClick={() => onCopy(item)} className="h-8 text-xs px-3">
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function FolderItem({
  item,
  onUpdate,
  onDelete,
  onDragStart,
  onDrop,
  onRemoveItemFromFolder,
  onUpdateItemInFolder,
  onCopyPrompt,
}: FolderItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(item.title)
  const titleRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && titleRef.current) {
      titleRef.current.focus()
      titleRef.current.select()
    }
  }, [isEditing])

  const handleSave = () => {
    onUpdate({
      title: editTitle.trim() || "Untitled Folder",
    })
    setIsEditing(false)
    toast.success("Folder updated!")
  }

  const handleCancel = () => {
    setEditTitle(item.title)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSave()
    } else if (e.key === "Escape") {
      e.preventDefault()
      handleCancel()
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = "move"
  }

  const folderItems = item.items || []
  const promptCount = folderItems.filter((item) => item.type === "prompt").length
  const noteCount = folderItems.filter((item) => item.type === "note").length
  const totalTokens = folderItems.reduce((sum, item) => sum + (item.estimatedTokens || 0), 0)

  return (
    <Card
      className="w-80 cursor-move select-none shadow-lg hover:shadow-xl transition-all duration-200 border-2 hover:border-blue-200 bg-gradient-to-br from-background to-blue-50/30"
      draggable
      onDragStart={onDragStart}
      onDragOver={handleDragOver}
      onDrop={onDrop}
    >
      <CardHeader className="p-4 pb-3 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 flex-1 min-w-0 text-left hover:bg-blue-50 rounded p-1 -m-1 transition-colors"
          >
            <div className="p-2 rounded-lg bg-blue-100 text-blue-800 border-blue-200">
              {isOpen ? <FolderOpen className="h-4 w-4" /> : <Folder className="h-4 w-4" />}
            </div>
            {isEditing ? (
              <Input
                ref={titleRef}
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                onClick={(e) => e.stopPropagation()}
                className="h-7 text-sm font-medium border-none p-0 focus-visible:ring-0 bg-transparent"
                placeholder="Folder name"
              />
            ) : (
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <h3 className="text-sm font-semibold truncate">{item.title}</h3>
                {isOpen ? (
                  <ChevronDown className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                )}
              </div>
            )}
          </button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setIsEditing(true)} className="text-sm">
              <Edit className="h-4 w-4 mr-2" />
              Rename Folder
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-sm">
              <Archive className="h-4 w-4 mr-2" />
              Archive Folder
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onDelete} className="text-sm text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Folder
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-4">
        {/* Folder stats */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="space-y-1">
            <div className="text-lg font-semibold text-green-600">{promptCount}</div>
            <div className="text-xs text-muted-foreground">Prompts</div>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-semibold text-yellow-600">{noteCount}</div>
            <div className="text-xs text-muted-foreground">Notes</div>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-semibold text-blue-600">{totalTokens}</div>
            <div className="text-xs text-muted-foreground">Tokens</div>
          </div>
        </div>

        {/* Progress bar for folder fullness */}
        {folderItems.length > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Folder capacity</span>
              <span>{folderItems.length}/20</span>
            </div>
            <Progress value={(folderItems.length / 20) * 100} className="h-2" />
          </div>
        )}

        {/* Folder contents */}
        {isOpen && folderItems.length > 0 ? (
          <div className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <Users className="h-3 w-3" />
              Contents ({folderItems.length})
            </div>
            <ScrollArea className="max-h-64">
              <div className="space-y-2 pr-3">
                {folderItems.map((folderItem) => (
                  <FolderItemDisplay
                    key={folderItem.id}
                    item={folderItem}
                    folderId={item.id}
                    onRemove={onRemoveItemFromFolder}
                    onUpdate={onUpdateItemInFolder}
                    onCopy={onCopyPrompt}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        ) : isOpen ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto">
              <Folder className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium text-muted-foreground">Empty folder</div>
              <div className="text-xs text-muted-foreground">Drag items here to organize them</div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="text-xs text-muted-foreground">
              {folderItems.length === 0 ? "Empty folder" : `Click to view ${folderItems.length} items`}
            </div>
          </div>
        )}

        {/* Last updated */}
        {item.updatedAt && (
          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground pt-2 border-t">
            <Clock className="h-3 w-3" />
            <span>Updated {new Date(item.updatedAt).toLocaleDateString()}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
