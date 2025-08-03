"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ArrowLeft,
  Plus,
  Users,
  Sparkles,
  UserCog,
  Palette,
  FileCode,
  Wand2,
  FileText,
  Search,
  Calendar,
  Zap,
  Settings,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { v0ProfileService } from "@/lib/services/v0-profile-service"
import type { V0Profile, ProfileTemplate } from "@/lib/types/v0-profile"
import type { GeneratedPrompt } from "@/lib/types/prompt-generator"
import { cn } from "@/lib/utils"

export default function CreateProfilePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template")

  const [activeTab, setActiveTab] = useState<"generated" | "template" | "scratch">("generated")
  const [profileName, setProfileName] = useState("")
  const [profileDescription, setProfileDescription] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<ProfileTemplate | null>(null)
  const [selectedGeneratedPrompt, setSelectedGeneratedPrompt] = useState<GeneratedPrompt | null>(null)
  const [generatedPrompts, setGeneratedPrompts] = useState<GeneratedPrompt[]>([])
  const [templates, setTemplates] = useState<ProfileTemplate[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isCreating, setIsCreating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load data
  useEffect(() => {
    const loadData = () => {
      try {
        const loadedGeneratedPrompts = v0ProfileService.getAvailableBasePrompts()
        const loadedTemplates = v0ProfileService.getProfileTemplates()

        setGeneratedPrompts(loadedGeneratedPrompts)
        setTemplates(loadedTemplates)

        // If template ID is provided, select it and switch to template tab
        if (templateId) {
          const template = loadedTemplates.find((t) => t.id === templateId)
          if (template) {
            setSelectedTemplate(template)
            setActiveTab("template")
            setProfileName(template.name)
            setProfileDescription(template.description)
          }
        }
      } catch (error) {
        console.error("Failed to load data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [templateId])

  // Filter generated prompts
  const filteredGeneratedPrompts = generatedPrompts.filter((prompt) => {
    const matchesSearch =
      prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prompt.tags && prompt.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))

    const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...new Set(generatedPrompts.map((p) => p.category))]

  const getProfileIcon = (iconName?: string) => {
    switch (iconName) {
      case "UserCog":
        return <UserCog className="h-4 w-4" />
      case "Palette":
        return <Palette className="h-4 w-4" />
      case "FileCode":
        return <FileCode className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const handleCreateProfile = async () => {
    if (!profileName.trim()) {
      alert("Please enter a profile name")
      return
    }

    setIsCreating(true)

    try {
      let newProfile: V0Profile

      if (activeTab === "generated" && selectedGeneratedPrompt) {
        // Create profile from generated prompt
        newProfile = v0ProfileService.createProfileFromGeneratedPrompt(selectedGeneratedPrompt, profileName)
        if (profileDescription.trim()) {
          newProfile.description = profileDescription
          v0ProfileService.saveProfile(newProfile)
        }
      } else if (activeTab === "template" && selectedTemplate) {
        // Create profile from template
        newProfile = v0ProfileService.createProfileFromTemplate(selectedTemplate, profileName)
        if (profileDescription.trim()) {
          newProfile.description = profileDescription
          v0ProfileService.saveProfile(newProfile)
        }
      } else if (activeTab === "scratch") {
        // Create profile from scratch
        newProfile = {
          id: `profile-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: profileName,
          displayName: profileName,
          description: profileDescription || "Custom V0 profile created from scratch",
          basePrompt: "You are a helpful AI assistant specialized in V0 development and best practices.",
          avatar: "Users",
          traits: [],
          tasks: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          isActive: true,
          tags: ["custom"],
          category: "Custom",
          usageCount: 0,
        }
        v0ProfileService.saveProfile(newProfile)
      } else {
        alert("Please select a base prompt or template")
        return
      }

      // Navigate to the new profile
      router.push(`/profile/${newProfile.id}`)
    } catch (error) {
      console.error("Failed to create profile:", error)
      alert("Failed to create profile. Please try again.")
    } finally {
      setIsCreating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Plus className="h-6 w-6 text-muted-foreground animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Loading Profile Creation...</h3>
              <p className="text-sm text-muted-foreground">Setting up your options</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/profiles")} className="h-9">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profiles
          </Button>
          <div className="h-6 w-px bg-border" />
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              Create V0 Profile
            </h1>
            <p className="text-lg text-muted-foreground">
              Create a personalized AI assistant by building on your generated prompts or starting from templates.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profile Configuration */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Profile Details
              </CardTitle>
              <CardDescription>Configure your new V0 profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profileName">Profile Name *</Label>
                <Input
                  id="profileName"
                  placeholder="e.g., Bob, Alice, DevRel Expert..."
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  This will be the name of your AI assistant (e.g., "Your name is Bob...")
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profileDescription">Description</Label>
                <Textarea
                  id="profileDescription"
                  placeholder="Describe what this profile is for..."
                  value={profileDescription}
                  onChange={(e) => setProfileDescription(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Preview */}
              {profileName && (
                <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                  <div className="text-sm font-medium">Preview:</div>
                  <div className="text-sm text-muted-foreground">
                    "Your name is {profileName}.{" "}
                    {selectedGeneratedPrompt
                      ? selectedGeneratedPrompt.prompt.slice(0, 100) + "..."
                      : selectedTemplate
                        ? selectedTemplate.basePrompt.slice(0, 100) + "..."
                        : "You are a helpful AI assistant..."}
                    "
                  </div>
                </div>
              )}

              <Button
                onClick={handleCreateProfile}
                disabled={
                  isCreating ||
                  !profileName.trim() ||
                  (!selectedGeneratedPrompt && !selectedTemplate && activeTab !== "scratch")
                }
                className="w-full"
                size="lg"
              >
                {isCreating ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 mr-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Creating Profile...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Profile
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Base Selection */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="generated" className="flex items-center gap-2">
                <Wand2 className="h-4 w-4" />
                Generated Prompts ({generatedPrompts.length})
              </TabsTrigger>
              <TabsTrigger value="template" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Templates ({templates.length})
              </TabsTrigger>
              <TabsTrigger value="scratch" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                From Scratch
              </TabsTrigger>
            </TabsList>

            {/* Generated Prompts Tab */}
            <TabsContent value="generated" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="h-5 w-5" />
                    Build on Generated Prompts
                  </CardTitle>
                  <CardDescription>
                    Select a prompt you've generated to use as the foundation for your V0 profile. Your profile will
                    build on top of this prompt with additional traits and tasks.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Search and Filters */}
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search generated prompts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    <div className="flex gap-4">
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category} className="capitalize">
                              {category === "all" ? "All Categories" : category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Generated Prompts List */}
                  {filteredGeneratedPrompts.length === 0 ? (
                    <div className="text-center py-12 space-y-4">
                      <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                        <Wand2 className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">
                          {generatedPrompts.length === 0 ? "No generated prompts yet" : "No prompts found"}
                        </h3>
                        <p className="text-muted-foreground">
                          {generatedPrompts.length === 0
                            ? "Create some prompts using the Prompt Generator first, then come back to build profiles on top of them."
                            : "Try adjusting your search criteria to find the prompt you're looking for."}
                        </p>
                      </div>
                      {generatedPrompts.length === 0 && (
                        <Button onClick={() => router.push("/prompt-generator")}>
                          <Wand2 className="h-4 w-4 mr-2" />
                          Go to Prompt Generator
                        </Button>
                      )}
                    </div>
                  ) : (
                    <ScrollArea className="h-[500px]">
                      <div className="space-y-3">
                        {filteredGeneratedPrompts.map((prompt) => (
                          <Card
                            key={prompt.id}
                            className={cn(
                              "cursor-pointer transition-all duration-200 hover:shadow-md",
                              selectedGeneratedPrompt?.id === prompt.id
                                ? "border-primary bg-primary/5"
                                : "hover:border-primary/50",
                            )}
                            onClick={() => setSelectedGeneratedPrompt(prompt)}
                          >
                            <CardContent className="p-4">
                              <div className="space-y-3">
                                <div className="flex items-start justify-between">
                                  <div className="space-y-1 flex-1">
                                    <div className="flex items-center gap-2">
                                      <Badge variant="outline" className="text-xs">
                                        {prompt.category}
                                      </Badge>
                                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Calendar className="h-3 w-3" />
                                        {prompt.createdAt.toLocaleDateString()}
                                      </div>
                                    </div>
                                    <div className="text-sm text-muted-foreground line-clamp-3">{prompt.prompt}</div>
                                  </div>
                                  {selectedGeneratedPrompt?.id === prompt.id && (
                                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 ml-2" />
                                  )}
                                </div>

                                {/* Tags */}
                                {prompt.tags && prompt.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1">
                                    {prompt.tags.slice(0, 3).map((tag) => (
                                      <Badge key={tag} variant="secondary" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                    {prompt.tags.length > 3 && (
                                      <Badge variant="secondary" className="text-xs">
                                        +{prompt.tags.length - 3} more
                                      </Badge>
                                    )}
                                  </div>
                                )}

                                {/* Stats */}
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Zap className="h-3 w-3" />
                                    <span>~{prompt.estimatedTokens} tokens</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Templates Tab */}
            <TabsContent value="template" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Start from Template
                  </CardTitle>
                  <CardDescription>
                    Choose from pre-built profile templates with suggested traits and tasks.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {templates.map((template) => (
                      <Card
                        key={template.id}
                        className={cn(
                          "cursor-pointer transition-all duration-200 hover:shadow-md",
                          selectedTemplate?.id === template.id
                            ? "border-primary bg-primary/5"
                            : "hover:border-primary/50",
                        )}
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-primary/10 rounded-lg">{getProfileIcon(template.icon)}</div>
                              <div>
                                <CardTitle className="text-base">{template.name}</CardTitle>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs">
                                    {template.category}
                                  </Badge>
                                  <Badge
                                    variant={
                                      template.difficulty === "Beginner"
                                        ? "default"
                                        : template.difficulty === "Intermediate"
                                          ? "secondary"
                                          : "destructive"
                                    }
                                    className="text-xs"
                                  >
                                    {template.difficulty}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            {selectedTemplate?.id === template.id && (
                              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <CardDescription className="text-sm line-clamp-2">{template.description}</CardDescription>

                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Zap className="h-3 w-3" />
                                <span>{template.suggestedTraits.length} traits</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Settings className="h-3 w-3" />
                                <span>{template.suggestedTasks.length} tasks</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {template.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {template.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{template.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* From Scratch Tab */}
            <TabsContent value="scratch" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Create from Scratch
                  </CardTitle>
                  <CardDescription>Start with a blank profile and build everything from the ground up.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-6 bg-muted/30 rounded-lg text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-background rounded-full flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Blank Canvas</h3>
                      <p className="text-sm text-muted-foreground">
                        Create a completely custom profile with your own base prompt, traits, and tasks. Perfect for
                        specialized use cases or when you want full control.
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <AlertCircle className="h-3 w-3" />
                      <span>You'll be able to customize everything after creation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
