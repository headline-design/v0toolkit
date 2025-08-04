"use client"

import type React from "react"
import { useRef, useState, useCallback, useEffect } from "react"
import type { SlateItem } from "@/lib/types/slate"
import { NoteItem } from "./note-item"
import { FolderItem } from "./folder-item"
import { PromptItem } from "./prompt-item"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Folder, Zap, StickyNote, Plus, Grid3X3, Maximize2, ZoomIn, ZoomOut } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface SlateCanvasProps {
  items: SlateItem[]
  onUpdateItem: (id: string, updates: Partial<SlateItem>) => void
  onDeleteItem: (id: string) => void
  onCreateItem: (type: "prompt" | "folder" | "note") => void
  onMoveItemToFolder: (itemId: string, folderId: string) => void
  onRemoveItemFromFolder: (itemId: string, folderId: string) => void
  onUpdateItemInFolder: (itemId: string, folderId: string, updates: Partial<SlateItem>) => void
  onCopyPrompt: (item: SlateItem) => void
}

export function SlateCanvas({
  items,
  onUpdateItem,
  onDeleteItem,
  onCreateItem,
  onMoveItemToFolder,
  onRemoveItemFromFolder,
  onUpdateItemInFolder,
  onCopyPrompt,
}: SlateCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 })
  const [showGrid, setShowGrid] = useState(true)

  const handleDragStart = useCallback((e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", itemId)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const itemId = e.dataTransfer.getData("text/plain")

      if (canvasRef.current && itemId) {
        const rect = canvasRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left - pan.x) / zoom
        const y = (e.clientY - rect.top - pan.y) / zoom

        onUpdateItem(itemId, { x, y })
      }

      setDraggedItem(null)
    },
    [onUpdateItem, pan, zoom],
  )

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null)
  }, [])

  const handleFolderDrop = useCallback(
    (e: React.DragEvent, folderId: string) => {
      e.preventDefault()
      e.stopPropagation()
      const itemId = e.dataTransfer.getData("text/plain")
      if (itemId && itemId !== folderId) {
        onMoveItemToFolder(itemId, folderId)
      }
      setDraggedItem(null)
    },
    [onMoveItemToFolder],
  )

  // Pan and zoom handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.metaKey)) {
      // Middle mouse or Cmd+click
      setIsPanning(true)
      setLastPanPoint({ x: e.clientX, y: e.clientY })
      e.preventDefault()
    }
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isPanning) {
        const deltaX = e.clientX - lastPanPoint.x
        const deltaY = e.clientY - lastPanPoint.y
        setPan((prev) => ({ x: prev.x + deltaX, y: prev.y + deltaY }))
        setLastPanPoint({ x: e.clientX, y: e.clientY })
      }
    },
    [isPanning, lastPanPoint],
  )

  const handleMouseUp = useCallback(() => {
    setIsPanning(false)
  }, [])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.metaKey || e.ctrlKey) {
      e.preventDefault()
      const delta = e.deltaY > 0 ? 0.9 : 1.1
      setZoom((prev) => Math.max(0.25, Math.min(2, prev * delta)))
    }
  }, [])

  const resetView = useCallback(() => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [])

  const autoArrange = useCallback(() => {
    const gridSize = 300
    let x = 100
    let y = 100
    let maxHeight = 0

    items.forEach((item, index) => {
      if (x > 1200) {
        // Wrap to next row
        x = 100
        y += maxHeight + 50
        maxHeight = 0
      }

      onUpdateItem(item.id, { x, y })
      x += gridSize
      maxHeight = Math.max(maxHeight, 200) // Approximate item height
    })
  }, [items, onUpdateItem])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case "=":
          case "+":
            e.preventDefault()
            setZoom((prev) => Math.min(2, prev * 1.2))
            break
          case "-":
            e.preventDefault()
            setZoom((prev) => Math.max(0.25, prev / 1.2))
            break
          case "0":
            e.preventDefault()
            resetView()
            break
          case "g":
            e.preventDefault()
            setShowGrid((prev) => !prev)
            break
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [resetView])

  const promptCount = items.filter((item) => item.type === "prompt").length
  const folderCount = items.filter((item) => item.type === "folder").length
  const noteCount = items.filter((item) => item.type === "note").length

  return (
    <div className="flex-1 relative overflow-hidden bg-background">
      {/* Canvas controls */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
        <div className="bg-background/80 backdrop-blur border rounded-lg p-2 shadow-lg">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setZoom((prev) => Math.min(2, prev * 1.2))}
              className="h-8 w-8 p-0"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <span className="text-xs font-mono w-12 text-center">{Math.round(zoom * 100)}%</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setZoom((prev) => Math.max(0.25, prev / 1.2))}
              className="h-8 w-8 p-0"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={resetView} className="h-8 w-8 p-0" title="Reset view (Cmd+0)">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="bg-background/80 backdrop-blur border rounded-lg p-2 shadow-lg">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowGrid(!showGrid)}
              className="h-8 w-8 p-0"
              title="Toggle grid (Cmd+G)"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={autoArrange}
              className="h-8 px-3 text-xs"
              title="Auto arrange items"
            >
              Arrange
            </Button>
          </div>
        </div>
      </div>

      {/* Stats panel */}
      <div className="absolute top-4 right-4 z-20">
        <div className="bg-background/80 backdrop-blur border rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>{promptCount} prompts</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>{folderCount} folders</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              <span>{noteCount} notes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating action button */}
      <div className="absolute bottom-6 right-6 z-20">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="lg"
              className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              title="Add Item"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => onCreateItem("prompt")} className="gap-3">
              <div className="w-8 h-8 bg-green-100 text-green-700 rounded-lg flex items-center justify-center">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <div className="font-medium">New Prompt</div>
                <div className="text-xs text-muted-foreground">Create v0 prompt</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onCreateItem("folder")} className="gap-3">
              <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center">
                <Folder className="h-4 w-4" />
              </div>
              <div>
                <div className="font-medium">New Folder</div>
                <div className="text-xs text-muted-foreground">Organize items</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onCreateItem("note")} className="gap-3">
              <div className="w-8 h-8 bg-yellow-100 text-yellow-700 rounded-lg flex items-center justify-center">
                <StickyNote className="h-4 w-4" />
              </div>
              <div>
                <div className="font-medium">New Note</div>
                <div className="text-xs text-muted-foreground">Add documentation</div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Canvas area */}
      <div
        ref={canvasRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "0 0",
        }}
      >
        {/* Grid background */}
        {showGrid && (
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                radial-gradient(circle, hsl(var(--muted-foreground)) 1px, transparent 1px)
              `,
              backgroundSize: "24px 24px",
            }}
          />
        )}

        {/* Empty state */}
        {items.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-6 text-muted-foreground max-w-md">
              <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mx-auto">
                <FileText className="h-12 w-12" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Your canvas awaits</h3>
                <p className="text-sm leading-relaxed">
                  Start by adding prompts, folders, or notes using the + button. Drag items around to organize your
                  workspace visually.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="outline" className="text-xs">
                  Cmd+Scroll to zoom
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Cmd+Click to pan
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Cmd+G for grid
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Items */}
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              position: "absolute",
              left: item.x,
              top: item.y,
              opacity: draggedItem === item.id ? 0.5 : 1,
              transition: draggedItem === item.id ? "none" : "opacity 0.2s ease",
            }}
            onDragEnd={handleDragEnd}
          >
            {item.type === "prompt" ? (
              <PromptItem
                item={item}
                onUpdate={(updates) => onUpdateItem(item.id, updates)}
                onDelete={() => onDeleteItem(item.id)}
                onDragStart={(e) => handleDragStart(e, item.id)}
                onCopy={() => onCopyPrompt(item)}
              />
            ) : item.type === "note" ? (
              <NoteItem
                item={item}
                onUpdate={(updates) => onUpdateItem(item.id, updates)}
                onDelete={() => onDeleteItem(item.id)}
                onDragStart={(e) => handleDragStart(e, item.id)}
              />
            ) : (
              <FolderItem
                item={item}
                onUpdate={(updates) => onUpdateItem(item.id, updates)}
                onDelete={() => onDeleteItem(item.id)}
                onDragStart={(e) => handleDragStart(e, item.id)}
                onDrop={(e) => handleFolderDrop(e, item.id)}
                onRemoveItemFromFolder={onRemoveItemFromFolder}
                onUpdateItemInFolder={onUpdateItemInFolder}
                onCopyPrompt={onCopyPrompt}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
