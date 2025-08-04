"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Plus,
  MoreHorizontal,
  Edit3,
  Trash2,
  Copy,
  Zap,
  StickyNote,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Hash,
  Clock,
  MoveHorizontal,
  X,
} from "lucide-react"
import type { SlateItem } from "@/lib/types/slate"

interface SlateListViewProps {
  items: SlateItem[]
  onUpdateItem: (id: string, updates: Partial<SlateItem>) => void
  onDeleteItem: (id: string) => void
  onCreateItem: (type: "prompt" | "folder" | "note") => void
  onMoveItemToFolder: (itemId: string, folderId: string) => void
  onRemoveItemFromFolder: (itemId: string, folderId: string) => void
  onUpdateItemInFolder: (itemId: string, folderId: string, updates: Partial<SlateItem>) => void
  onCopyPrompt: (item: SlateItem) => void
}

interface CreateItemDialogProps {
  onCreateItem: (type: "prompt" | "folder" | "note") => void
}

function CreateItemDialog({ onCreateItem }: CreateItemDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [itemType, setItemType] = useState<"prompt" | "folder" | "note">("prompt")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("Components")
  const [promptType, setPromptType] = useState("create")

  const handleCreate = () => {
    if (!title.trim()) return

    const newItem: Partial<SlateItem> = {
      title: title.trim(),
      content: content.trim(),
      type: itemType,
      x: Math.random() * 400 + 100,
      y: Math.random() * 400 + 100,
    }

    if (itemType === "prompt") {
      newItem.category = category
      newItem.promptType = promptType as "create" | "refine" | "analyze" | "custom"
    }

    onCreateItem(itemType)
    setIsOpen(false)
    setTitle("")
    setContent("")
    setCategory("Components")
    setPromptType("create")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Item</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Type</label>
            <Select value={itemType} onValueChange={(value) => setItemType(value as "prompt" | "folder" | "note")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prompt">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Prompt
                  </div>
                </SelectItem>
                <SelectItem value="folder">
                  <div className="flex items-center gap-2">
                    <Folder className="h-4 w-4" />
                    Folder
                  </div>
                </SelectItem>
                <SelectItem value="note">
                  <div className="flex items-center gap-2">
                    <StickyNote className="h-4 w-4" />
                    Note
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={`Enter ${itemType} title...`}
            />
          </div>

          {itemType === "prompt" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Components">Components</SelectItem>
                    <SelectItem value="Pages">Pages</SelectItem>
                    <SelectItem value="Features">Features</SelectItem>
                    <SelectItem value="Layout">Layout</SelectItem>
                    <SelectItem value="API">API</SelectItem>
                    <SelectItem value="Sections">Sections</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Type</label>
                <Select value={promptType} onValueChange={setPromptType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="create">Create</SelectItem>
                    <SelectItem value="refine">Refine</SelectItem>
                    <SelectItem value="analyze">Analyze</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div>
            <label className="text-sm font-medium">Content</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`Enter ${itemType} content...`}
              className="min-h-24"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!title.trim()}>
              Create {itemType}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface ItemRowProps {
  item: SlateItem
  level: number
  isExpanded: boolean
  onToggleExpanded: () => void
  onUpdate: (updates: Partial<SlateItem>) => void
  onDelete: () => void
  onCopy?: () => void
  onMoveToFolder: (folderId: string) => void
  onRemoveFromFolder?: () => void
  folders: SlateItem[]
}

function ItemRow({
  item,
  level,
  isExpanded,
  onToggleExpanded,
  onUpdate,
  onDelete,
  onCopy,
  onMoveToFolder,
  onRemoveFromFolder,
  folders,
}: ItemRowProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(item.title)
  const [editContent, setEditContent] = useState(item.content || "")

  const handleSave = () => {
    onUpdate({
      title: editTitle.trim() || "Untitled",
      content: editContent.trim(),
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(item.title)
    setEditContent(item.content || "")
    setIsEditing(false)
  }

  const getIcon = () => {
    switch (item.type) {
      case "prompt":
        return <Zap className="h-4 w-4 text-primary" />
      case "note":
        return <StickyNote className="h-4 w-4 text-yellow-600" />
      case "folder":
        return isExpanded ? (
          <FolderOpen className="h-4 w-4 text-blue-600" />
        ) : (
          <Folder className="h-4 w-4 text-blue-600" />
        )
      default:
        return null
    }
  }

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-2" style={{ paddingLeft: `${level * 20}px` }}>
          {item.type === "folder" && (
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onToggleExpanded}>
              {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            </Button>
          )}
          {getIcon()}
          {isEditing ? (
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="h-8 text-sm"
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave()
                if (e.key === "Escape") handleCancel()
              }}
              autoFocus
            />
          ) : (
            <span className="font-medium text-sm cursor-pointer" onClick={() => setIsEditing(true)}>
              {item.title}
            </span>
          )}
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="text-xs capitalize">
          {item.type}
        </Badge>
      </TableCell>
      <TableCell>
        {item.category && (
          <Badge variant="secondary" className="text-xs">
            {item.category}
          </Badge>
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="min-h-16 text-xs"
            onBlur={handleSave}
          />
        ) : (
          <div className="text-xs text-muted-foreground line-clamp-2 cursor-pointer" onClick={() => setIsEditing(true)}>
            {item.content || "No content"}
          </div>
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {item.estimatedTokens && (
            <div className="flex items-center gap-1">
              <Hash className="h-3 w-3" />
              <span>{item.estimatedTokens}</span>
            </div>
          )}
          {item.updatedAt && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{new Date(item.updatedAt).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsEditing(true)}>
              <Edit3 className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            {item.type === "prompt" && onCopy && (
              <DropdownMenuItem onClick={onCopy}>
                <Copy className="h-4 w-4 mr-2" />
                Copy Prompt
              </DropdownMenuItem>
            )}
            {folders.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <DropdownMenuItem>
                    <MoveHorizontal className="h-4 w-4 mr-2" />
                    Move to Folder
                  </DropdownMenuItem>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="left">
                  {folders.map((folder) => (
                    <DropdownMenuItem key={folder.id} onClick={() => onMoveToFolder(folder.id)}>
                      {folder.title}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {onRemoveFromFolder && (
              <DropdownMenuItem onClick={onRemoveFromFolder}>
                <X className="h-4 w-4 mr-2" />
                Remove from Folder
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={onDelete} className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

export function SlateListView({
  items,
  onUpdateItem,
  onDeleteItem,
  onCreateItem,
  onMoveItemToFolder,
  onRemoveItemFromFolder,
  onUpdateItemInFolder,
  onCopyPrompt,
}: SlateListViewProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId)
    } else {
      newExpanded.add(folderId)
    }
    setExpandedFolders(newExpanded)
  }

  const renderRows = () => {
    const rows: React.ReactNode[] = []
    const folders = items.filter((item) => item.type === "folder")

    items.forEach((item) => {
      rows.push(
        <ItemRow
          key={item.id}
          item={item}
          level={0}
          isExpanded={expandedFolders.has(item.id)}
          onToggleExpanded={() => toggleFolder(item.id)}
          onUpdate={(updates) => onUpdateItem(item.id, updates)}
          onDelete={() => onDeleteItem(item.id)}
          onCopy={item.type === "prompt" ? () => onCopyPrompt(item) : undefined}
          onMoveToFolder={(folderId) => onMoveItemToFolder(item.id, folderId)}
          folders={folders.filter((f) => f.id !== item.id)}
        />,
      )

      // Render folder contents if expanded
      if (item.type === "folder" && expandedFolders.has(item.id) && item.items) {
        item.items.forEach((folderItem) => {
          rows.push(
            <ItemRow
              key={`${item.id}-${folderItem.id}`}
              item={folderItem}
              level={1}
              isExpanded={false}
              onToggleExpanded={() => {}}
              onUpdate={(updates) => onUpdateItemInFolder(folderItem.id, item.id, updates)}
              onDelete={() => onRemoveItemFromFolder(folderItem.id, item.id)}
              onCopy={folderItem.type === "prompt" ? () => onCopyPrompt(folderItem) : undefined}
              onMoveToFolder={(folderId) => onMoveItemToFolder(folderItem.id, folderId)}
              onRemoveFromFolder={() => onRemoveItemFromFolder(folderItem.id, item.id)}
              folders={folders.filter((f) => f.id !== item.id)}
            />,
          )
        })
      }
    })

    return rows
  }

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">All Items</h2>
          <p className="text-sm text-muted-foreground">{items.length} items total</p>
        </div>
        <CreateItemDialog onCreateItem={onCreateItem} />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Details</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No items yet. Create your first prompt, note, or folder to get started.
                </TableCell>
              </TableRow>
            ) : (
              renderRows()
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
