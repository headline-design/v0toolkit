"use client"

import { useState, useCallback, useEffect } from "react"
import { SlateCanvas } from "@/components/slate/slate-canvas"
import { SlateListView } from "@/components/slate/slate-list-view"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Plus,
  FileText,
  Download,
  Search,
  Filter,
  BarChart3,
  Rocket,
  ShoppingCart,
  Crown,
  MoreHorizontal,
  Zap,
  LayoutGrid,
  List,
  Upload,
  Settings,
  Archive,
  Share2,
  Command,
} from "lucide-react"
import { toast } from "sonner"
import type { SlateItem, SlateProject, ProjectTemplate } from "@/lib/types/slate"
import { slateService } from "@/lib/services/slate-service"

const templateIcons = {
  BarChart3,
  Rocket,
  ShoppingCart,
  Crown,
}

export default function SlatePage() {
  const [currentProject, setCurrentProject] = useState<SlateProject | null>(null)
  const [items, setItems] = useState<SlateItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [showTemplateDialog, setShowTemplateDialog] = useState(false)
  const [showProjectDialog, setShowProjectDialog] = useState(false)
  const [newProjectName, setNewProjectName] = useState("")
  const [viewMode, setViewMode] = useState<"canvas" | "list">("canvas")
  const [isAutoSaving, setIsAutoSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Load current project on mount
  useEffect(() => {
    const project = slateService.getCurrentProject()
    if (project) {
      setCurrentProject(project)
      const savedItems = localStorage.getItem(`slate-items-${project.id}`)
      if (savedItems) {
        try {
          const parsed = JSON.parse(savedItems)
          setItems(
            parsed.map((item: any) => ({
              ...item,
              createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
              updatedAt: item.updatedAt ? new Date(item.updatedAt) : new Date(),
            })),
          )
        } catch (error) {
          console.error("Failed to load items:", error)
        }
      }
    }
  }, [])

  // Auto-save with debouncing
  useEffect(() => {
    if (currentProject && items.length >= 0) {
      setIsAutoSaving(true)
      const timeoutId = setTimeout(() => {
        localStorage.setItem(`slate-items-${currentProject.id}`, JSON.stringify(items))
        setIsAutoSaving(false)
        setLastSaved(new Date())
      }, 1000)

      return () => clearTimeout(timeoutId)
    }
  }, [items, currentProject])

  const createProject = useCallback((name: string, template?: ProjectTemplate) => {
    const project = slateService.createProject(name, template)
    setCurrentProject(project)

    if (template) {
      const templateItems: SlateItem[] = template.items.map((item, index) => ({
        ...item,
        id: `${item.type}-${Date.now()}-${index}`,
        x: 100 + (index % 3) * 280,
        y: 100 + Math.floor(index / 3) * 220,
        createdAt: new Date(),
        updatedAt: new Date(),
        items: item.items?.map((subItem, subIndex) => ({
          ...subItem,
          id: `${subItem.type}-${Date.now()}-${index}-${subIndex}`,
          x: 0,
          y: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
      }))
      setItems(templateItems)
      toast.success(`Project "${name}" created from template!`)
    } else {
      setItems([])
      toast.success(`Project "${name}" created!`)
    }

    setShowTemplateDialog(false)
    setShowProjectDialog(false)
    setNewProjectName("")
  }, [])

  const createItem = useCallback((type: "prompt" | "folder" | "note") => {
    const newItem: SlateItem = {
      id: `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      title: type === "prompt" ? "New Prompt" : type === "folder" ? "New Folder" : "New Note",
      content: type === "prompt" ? "Describe what you want to create..." : "",
      x: Math.random() * 400 + 100,
      y: Math.random() * 300 + 100,
      category: type === "prompt" ? "Components" : undefined,
      promptType: type === "prompt" ? "create" : undefined,
      tags: [],
      estimatedTokens: 0,
      version: 1,
      items: type === "folder" ? [] : undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setItems((prev) => [...prev, newItem])
  }, [])

  const updateItem = useCallback((id: string, updates: Partial<SlateItem>) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedItem = {
            ...item,
            ...updates,
            updatedAt: new Date(),
            estimatedTokens: updates.content ? slateService.estimateTokens(updates.content) : item.estimatedTokens,
          }
          return updatedItem
        }
        if (item.type === "folder" && item.items) {
          const updatedItems = item.items.map((folderItem) =>
            folderItem.id === id
              ? {
                  ...folderItem,
                  ...updates,
                  updatedAt: new Date(),
                  estimatedTokens: updates.content
                    ? slateService.estimateTokens(updates.content)
                    : folderItem.estimatedTokens,
                }
              : folderItem,
          )
          if (updatedItems !== item.items) {
            return { ...item, items: updatedItems, updatedAt: new Date() }
          }
        }
        return item
      }),
    )
  }, [])

  const deleteItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const moveItemToFolder = useCallback((itemId: string, folderId: string) => {
    setItems((prev) => {
      const itemToMove = prev.find((item) => item.id === itemId)
      if (!itemToMove || itemToMove.type === "folder") return prev

      const updatedItems = prev.filter((item) => item.id !== itemId)
      return updatedItems.map((item) => {
        if (item.id === folderId && item.type === "folder") {
          return {
            ...item,
            items: [...(item.items || []), { ...itemToMove, updatedAt: new Date() }],
            updatedAt: new Date(),
          }
        }
        return item
      })
    })
  }, [])

  const removeItemFromFolder = useCallback((itemId: string, folderId: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === folderId && item.type === "folder" && item.items) {
          const itemToRemove = item.items.find((folderItem) => folderItem.id === itemId)
          if (itemToRemove) {
            const updatedItems = item.items.filter((folderItem) => folderItem.id !== itemId)
            setTimeout(() => {
              setItems((current) => [
                ...current,
                {
                  ...itemToRemove,
                  x: Math.random() * 400 + 100,
                  y: Math.random() * 300 + 100,
                  updatedAt: new Date(),
                },
              ])
            }, 0)
            return { ...item, items: updatedItems, updatedAt: new Date() }
          }
        }
        return item
      }),
    )
  }, [])

  const updateItemInFolder = useCallback((itemId: string, folderId: string, updates: Partial<SlateItem>) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === folderId && item.type === "folder" && item.items) {
          const updatedItems = item.items.map((folderItem) =>
            folderItem.id === itemId
              ? {
                  ...folderItem,
                  ...updates,
                  updatedAt: new Date(),
                  estimatedTokens: updates.content
                    ? slateService.estimateTokens(updates.content)
                    : folderItem.estimatedTokens,
                }
              : folderItem,
          )
          return { ...item, items: updatedItems, updatedAt: new Date() }
        }
        return item
      }),
    )
  }, [])

  const copyPromptToClipboard = useCallback(async (item: SlateItem) => {
    const formattedPrompt = slateService.formatPromptForV0(item)
    try {
      await navigator.clipboard.writeText(formattedPrompt)
      toast.success("Prompt copied to clipboard!")
    } catch (error) {
      toast.error("Failed to copy prompt")
    }
  }, [])

  const exportProject = useCallback(() => {
    if (!currentProject) return

    const exportData = slateService.exportProject(currentProject, items)
    const blob = new Blob([exportData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${currentProject.name.replace(/\s+/g, "-").toLowerCase()}-slate-project.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Project exported!")
  }, [currentProject, items])

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.content && item.content.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(items.map((item) => item.category).filter(Boolean)))
  const totalPrompts = items.filter((item) => item.type === "prompt").length
  const totalTokens = items.reduce((sum, item) => sum + (item.estimatedTokens || 0), 0)
  const totalFolders = items.filter((item) => item.type === "folder").length
  const totalNotes = items.filter((item) => item.type === "note").length

  const templates = slateService.getProjectTemplates()

  if (!currentProject) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="text-center space-y-8 max-w-4xl">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Zap className="h-4 w-4" />
              v0 Workspace
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Welcome to Slate</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your intelligent v0 project workspace for organizing prompts, ideas, and workflows with visual canvas and
              smart templates
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2 h-12 px-8">
                  <Zap className="h-5 w-5" />
                  Start from Template
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Choose a Project Template</DialogTitle>
                  <p className="text-muted-foreground">Get started quickly with pre-built project structures</p>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {templates.map((template) => {
                    const IconComponent = templateIcons[template.icon as keyof typeof templateIcons] || FileText
                    return (
                      <Card
                        key={template.id}
                        className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-2 hover:border-primary/20"
                      >
                        <CardHeader className="pb-4">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-xl">
                              <IconComponent className="h-8 w-8 text-primary" />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-2">
                                <CardTitle className="text-xl">{template.name}</CardTitle>
                                <Badge variant="secondary" className="text-xs">
                                  {template.difficulty}
                                </Badge>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {template.category}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <CardDescription className="text-sm leading-relaxed">{template.description}</CardDescription>
                          <div className="flex flex-wrap gap-2">
                            {template.tags.slice(0, 4).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs px-2 py-1">
                                {tag}
                              </Badge>
                            ))}
                            {template.tags.length > 4 && (
                              <Badge variant="outline" className="text-xs px-2 py-1">
                                +{template.tags.length - 4} more
                              </Badge>
                            )}
                          </div>
                          <Button
                            onClick={() => {
                              setNewProjectName(template.name)
                              createProject(template.name, template)
                            }}
                            className="w-full h-10"
                          >
                            Use Template
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={showProjectDialog} onOpenChange={setShowProjectDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="gap-2 h-12 px-8 bg-background">
                  <Plus className="h-5 w-5" />
                  Create Blank Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                  <p className="text-sm text-muted-foreground">Start with a clean slate</p>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium">Project Name</label>
                    <Input
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                      placeholder="My v0 Project"
                      className="mt-2"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && newProjectName.trim()) {
                          createProject(newProjectName)
                        }
                      }}
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => createProject(newProjectName || "Untitled Project")}
                      disabled={!newProjectName.trim()}
                      className="flex-1"
                    >
                      Create Project
                    </Button>
                    <Button variant="outline" onClick={() => setShowProjectDialog(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                <LayoutGrid className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Visual Canvas</h3>
              <p className="text-sm text-muted-foreground">Organize prompts spatially with drag-and-drop</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Smart Templates</h3>
              <p className="text-sm text-muted-foreground">Pre-built project structures for common use cases</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                <Share2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Export & Share</h3>
              <p className="text-sm text-muted-foreground">Export projects and share with your team</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Enhanced Header - 2 Row Layout */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        {/* Row 1: Project Info and Actions */}
        <div className="flex h-14 items-center px-6 gap-4 border-b border-border/50">
          {/* Project Info */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">{currentProject.name}</h1>
            </div>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>{totalPrompts} prompts</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>{totalFolders} folders</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              <span>{totalNotes} notes</span>
            </div>
            <div className="flex items-center gap-1">
              <span>•</span>
              <span>{totalTokens} tokens</span>
            </div>
          </div>

          <div className="flex-1" />

          {/* Auto-save indicator */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {isAutoSaving ? (
              <>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                <span>Saving...</span>
              </>
            ) : lastSaved ? (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Saved {lastSaved.toLocaleTimeString()}</span>
              </>
            ) : null}
          </div>

          {/* Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={exportProject}>
                <Download className="h-4 w-4 mr-2" />
                Export Project
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Upload className="h-4 w-4 mr-2" />
                Import Project
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Project Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive className="h-4 w-4 mr-2" />
                Archive Project
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowTemplateDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Row 2: Search, Filters, and View Controls */}
        <div className="flex h-12 items-center px-6 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-80 h-8"
            />
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-44 h-8">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category!}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex-1" />

          {/* View Mode Toggle */}
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "canvas" | "list")}>
            <TabsList className="grid w-full grid-cols-2 h-8">
              <TabsTrigger value="canvas" className="gap-2 text-xs px-4">
                <LayoutGrid className="h-3 w-3" />
                Canvas
              </TabsTrigger>
              <TabsTrigger value="list" className="gap-2 text-xs px-4">
                <List className="h-3 w-3" />
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      {viewMode === "canvas" ? (
        <SlateCanvas
          items={filteredItems}
          onUpdateItem={updateItem}
          onDeleteItem={deleteItem}
          onCreateItem={createItem}
          onMoveItemToFolder={moveItemToFolder}
          onRemoveItemFromFolder={removeItemFromFolder}
          onUpdateItemInFolder={updateItemInFolder}
          onCopyPrompt={copyPromptToClipboard}
        />
      ) : (
        <SlateListView
          items={filteredItems}
          onUpdateItem={updateItem}
          onDeleteItem={deleteItem}
          onCreateItem={createItem}
          onCopyPrompt={copyPromptToClipboard}
          onMoveItemToFolder={moveItemToFolder}
          onRemoveItemFromFolder={removeItemFromFolder}
          onUpdateItemInFolder={updateItemInFolder}
        />
      )}

      {/* Keyboard shortcuts hint */}
      <div className="fixed bottom-4 right-4 z-10">
        <div className="bg-background/80 backdrop-blur border rounded-lg px-3 py-2 text-xs text-muted-foreground flex items-center gap-2">
          <Command className="h-3 w-3" />
          <span>Press</span>
          <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Cmd+K</kbd>
          <span>for shortcuts</span>
        </div>
      </div>
    </div>
  )
}
