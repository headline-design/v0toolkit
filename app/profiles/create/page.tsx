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
import { Progress } from "@/components/ui/progress"
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
import type { V0Profile, ProfileTemplate, GeneratedPrompt } from "@/lib/types/v0-profile"
import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

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
  const [currentStep, setCurrentStep] = useState(1)

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
            setProfileName(template.name ?? "Bob")
            setProfileDescription(template.description ?? "Custom V0 profile based on template")
            setCurrentStep(2)
          }
        }

        // If no generated prompts, suggest going to prompt generator first
        if (loadedGeneratedPrompts.length === 0 && !templateId) {
          setActiveTab("template")
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
      (prompt.category && prompt.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (prompt.tags && prompt.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()) || tag === "all"))

    const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...new Set(generatedPrompts.map((p) => p.category))]

  const getProfileIcon = (iconName?: string) => {
    switch (iconName) {
      case "UserCog":
        return <UserCog className="h-3 w-3" />
      case "Palette":
        return <Palette className="h-3 w-3" />
      case "FileCode":
        return <FileCode className="h-3 w-3" />
      default:
        return <Users className="h-3 w-3" />
    }
  }

  const getCompletionPercentage = () => {
    let completed = 0
    const total = 3

    if (activeTab === "generated" && selectedGeneratedPrompt) completed++
    else if (activeTab === "template" && selectedTemplate) completed++
    else if (activeTab === "scratch") completed++

    if (profileName.trim()) completed++
    if (profileDescription.trim()) completed++

    return Math.round((completed / total) * 100)
  }

  const canProceed = () => {
    const hasBase =
      (activeTab === "generated" && selectedGeneratedPrompt) ||
      (activeTab === "template" && selectedTemplate) ||
      activeTab === "scratch"

    return hasBase && profileName.trim()
  }

  const handleCreateProfile = async () => {
    if (!canProceed()) {
      return
    }

    setIsCreating(true)

    try {
      let newProfile: V0Profile

      if (activeTab === "generated" && selectedGeneratedPrompt) {
        // Create profile from generated prompt
        newProfile = v0ProfileService.createProfileFromTemplate(
          {
            ...selectedGeneratedPrompt,
            tags: selectedGeneratedPrompt.tags ?? [],
          } as ProfileTemplate,
          profileName,
        )
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
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 mx-auto bg-muted rounded-lg flex items-center justify-center">
              <Plus className="h-5 w-5 text-muted-foreground animate-pulse" />
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">Loading Profile Creation...</h3>
              <p className="text-sm text-muted-foreground">Setting up your options</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.push("/profiles")} className="h-8">
            <ArrowLeft className="h-3 w-3 mr-2" />
            Back to Profiles
          </Button>
          <div className="h-4 w-px bg-border" />
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <div className="p-1 bg-muted rounded-lg">
                <Plus className="h-4 w-4" />
              </div>
              Create V0 Profile
            </h1>
            <p className="text-muted-foreground">
              Create a personalized AI assistant by building on your generated prompts or starting from templates.
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Setup Progress</span>
                <span className="text-muted-foreground">{getCompletionPercentage()}% complete</span>
              </div>
              <Progress value={getCompletionPercentage()} className="h-1" />
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div
                  className={cn(
                    "flex items-center gap-2 p-2 rounded-lg transition-colors",
                    (activeTab === "generated" && selectedGeneratedPrompt) ||
                      (activeTab === "template" && selectedTemplate) ||
                      activeTab === "scratch"
                      ? "bg-muted text-foreground"
                      : "bg-muted/50 text-muted-foreground",
                  )}
                >
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full flex items-center justify-center text-xs font-bold",
                      (activeTab === "generated" && selectedGeneratedPrompt) ||
                        (activeTab === "template" && selectedTemplate) ||
                        activeTab === "scratch"
                        ? "bg-foreground text-background"
                        : "bg-muted-foreground text-background",
                    )}
                  >
                    1
                  </div>
                  <span>Choose Base</span>
                </div>
                <div
                  className={cn(
                    "flex items-center gap-2 p-2 rounded-lg transition-colors",
                    profileName.trim() ? "bg-muted text-foreground" : "bg-muted/50 text-muted-foreground",
                  )}
                >
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full flex items-center justify-center text-xs font-bold",
                      profileName.trim() ? "bg-foreground text-background" : "bg-muted-foreground text-background",
                    )}
                  >
                    2
                  </div>
                  <span>Name Profile</span>
                </div>
                <div
                  className={cn(
                    "flex items-center gap-2 p-2 rounded-lg transition-colors",
                    canProceed() ? "bg-muted text-foreground" : "bg-muted/50 text-muted-foreground",
                  )}
                >
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full flex items-center justify-center text-xs font-bold",
                      canProceed() ? "bg-foreground text-background" : "bg-muted-foreground text-background",
                    )}
                  >
                    3
                  </div>
                  <span>Create</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Configuration */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="sticky top-4">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="h-4 w-4" />
                Profile Details
              </CardTitle>
              <CardDescription className="text-sm">Configure your new V0 profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="profileName" className="text-sm">
                  Profile Name *
                </Label>
                <Input
                  id="profileName"
                  placeholder="e.g., Bob, Alice, DevRel Expert..."
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="h-8"
                />
                <p className="text-xs text-muted-foreground">
                  This will be the name of your AI assistant (e.g., "Your name is Bob...")
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profileDescription" className="text-sm">
                  Description
                </Label>
                <Textarea
                  id="profileDescription"
                  placeholder="Describe what this profile is for..."
                  value={profileDescription}
                  onChange={(e) => setProfileDescription(e.target.value)}
                  rows={3}
                  className="text-sm"
                />
              </div>

              {/* Avatar Preview */}
              {profileName && (
                <div className="space-y-2">
                  <Label className="text-sm">Avatar Preview</Label>
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/preview-${profileName.toLowerCase().replace(/\s+/g, "-")}?size=400`}
                      />
                      <AvatarFallback className="text-xs font-medium">
                        {profileName
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-xs text-muted-foreground">Your profile will have a unique avatar</div>
                  </div>
                </div>
              )}

              {/* Preview */}
              {profileName && (
                <div className="p-3 bg-muted/50 rounded-lg space-y-1">
                  <div className="text-xs font-medium">Preview:</div>
                  <div className="text-xs text-muted-foreground">
                    "Your name is {profileName}.{" "}
                    {selectedGeneratedPrompt
                      ? selectedGeneratedPrompt.prompt.slice(0, 100) + "..."
                      : selectedTemplate
                        ? (selectedTemplate.basePrompt ? selectedTemplate.basePrompt.slice(0, 100) + "..." : "You are a helpful AI assistant...")
                        : "You are a helpful AI assistant..."}
                    "
                  </div>
                </div>
              )}

              <Button
                onClick={handleCreateProfile}
                disabled={isCreating || !canProceed()}
                className="w-full h-8"
                size="sm"
              >
                {isCreating ? (
                  <div className="flex items-center">
                    <div className="w-3 h-3 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Creating Profile...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Plus className="h-3 w-3 mr-2" />
                    Create Profile
                  </div>
                )}
              </Button>

              {!canProceed() && (
                <div className="flex items-start gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertCircle className="h-3 w-3 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-yellow-800">
                    <p className="font-medium mb-1">Complete these steps:</p>
                    <ul className="text-xs space-y-0.5">
                      {!(
                        (activeTab === "generated" && selectedGeneratedPrompt) ||
                        (activeTab === "template" && selectedTemplate) ||
                        activeTab === "scratch"
                      ) && <li>• Choose a base prompt or template</li>}
                      {!profileName.trim() && <li>• Enter a profile name</li>}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Base Selection */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 h-9">
              <TabsTrigger value="generated" className="flex items-center gap-2 text-xs">
                <Wand2 className="h-3 w-3" />
                Generated ({generatedPrompts.length})
              </TabsTrigger>
              <TabsTrigger value="template" className="flex items-center gap-2 text-xs">
                <Sparkles className="h-3 w-3" />
                Templates ({templates.length})
              </TabsTrigger>
              <TabsTrigger value="scratch" className="flex items-center gap-2 text-xs">
                <FileText className="h-3 w-3" />
                From Scratch
              </TabsTrigger>
            </TabsList>

            {/* Generated Prompts Tab */}
            <TabsContent value="generated" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Wand2 className="h-4 w-4" />
                    Build on Generated Prompts
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Select a prompt you've generated to use as the foundation for your V0 profile. Your profile will
                    build on top of this prompt with additional traits and tasks.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {generatedPrompts.length === 0 ? (
                    <div className="text-center py-8 space-y-3">
                      <div className="w-12 h-12 mx-auto bg-muted rounded-lg flex items-center justify-center">
                        <Wand2 className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium">No generated prompts yet</h3>
                        <p className="text-sm text-muted-foreground max-w-md mx-auto">
                          Create some prompts using the Prompt Generator first, then come back to build profiles on top
                          of them.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <Button onClick={() => router.push("/prompt-generator")} size="sm" className="h-8">
                          <Wand2 className="h-3 w-3 mr-2" />
                          Go to Prompt Generator
                        </Button>
                        <Button variant="outline" onClick={() => setActiveTab("template")} size="sm" className="h-8">
                          <Sparkles className="h-3 w-3 mr-2" />
                          Use Templates Instead
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Search and Filters */}
                      <div className="space-y-3">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                          <Input
                            placeholder="Search generated prompts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8 h-8 text-sm"
                          />
                        </div>

                        <div className="flex gap-3">
                          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-[160px] h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category ?? "all"} className="capitalize">
                                  {category === "all" ? "All Categories" : category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Generated Prompts List */}
                      <ScrollArea className="h-[400px]">
                        <div className="space-y-2">
                          {filteredGeneratedPrompts.map((prompt) => (
                            <Card
                              key={prompt.id}
                              className={cn(
                                "cursor-pointer transition-shadow hover:shadow-md",
                                selectedGeneratedPrompt?.id === prompt.id
                                  ? "border-foreground bg-muted/50"
                                  : "hover:border-muted-foreground",
                              )}
                              onClick={() => setSelectedGeneratedPrompt(prompt)}
                            >
                              <CardContent className="p-3">
                                <div className="space-y-2">
                                  <div className="flex items-start justify-between">
                                    <div className="space-y-1 flex-1">
                                      <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-xs h-4 px-1">
                                          {prompt.category}
                                        </Badge>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                          <Calendar className="h-3 w-3" />
                                          {prompt.createdAt.toLocaleDateString()}
                                        </div>
                                      </div>
                                      <div className="text-xs text-muted-foreground line-clamp-2">{prompt.prompt}</div>
                                    </div>
                                    {selectedGeneratedPrompt?.id === prompt.id && (
                                      <CheckCircle className="h-4 w-4 text-foreground flex-shrink-0 ml-2" />
                                    )}
                                  </div>

                                  {/* Tags */}
                                  {prompt.tags && prompt.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                      {prompt.tags.slice(0, 3).map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs h-4 px-1">
                                          {tag}
                                        </Badge>
                                      ))}
                                      {prompt.tags.length > 3 && (
                                        <Badge variant="secondary" className="text-xs h-4 px-1">
                                          +{prompt.tags.length - 3} more
                                        </Badge>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Templates Tab */}
            <TabsContent value="template" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Sparkles className="h-4 w-4" />
                    Start from Template
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Choose from pre-built profile templates with suggested traits and tasks.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 md:grid-cols-2">
                    {templates.map((template) => (
                      <Card
                        key={template.id}
                        className={cn(
                          "cursor-pointer transition-shadow hover:shadow-md",
                          selectedTemplate?.id === template.id
                            ? "border-foreground bg-muted/50"
                            : "hover:border-muted-foreground",
                        )}
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <div className="p-1 bg-muted rounded-lg">{getProfileIcon(template.icon)}</div>
                              <div>
                                <CardTitle className="text-sm">{template.name}</CardTitle>
                                <div className="flex items-center gap-1 mt-1">
                                  <Badge variant="outline" className="text-xs h-4 px-1">
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
                                    className="text-xs h-4 px-1"
                                  >
                                    {template.difficulty}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            {selectedTemplate?.id === template.id && (
                              <CheckCircle className="h-4 w-4 text-foreground flex-shrink-0" />
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <CardDescription className="text-xs line-clamp-2">{template.description}</CardDescription>

                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Zap className="h-3 w-3" />
                                <span>{template?.suggestedTraits?.length} traits</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Settings className="h-3 w-3" />
                                <span>{template?.suggestedTasks?.length} tasks</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {template.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs h-4 px-1">
                                {tag}
                              </Badge>
                            ))}
                            {template.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs h-4 px-1">
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
            <TabsContent value="scratch" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-4 w-4" />
                    Create from Scratch
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Start with a blank profile and build everything from the ground up.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-4 bg-muted/30 rounded-lg text-center space-y-3">
                    <div className="w-12 h-12 mx-auto bg-background rounded-lg flex items-center justify-center border border-dashed border-muted-foreground/30">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">Blank Canvas</h3>
                      <p className="text-xs text-muted-foreground">
                        Create a completely custom profile with your own base prompt, traits, and tasks. Perfect for
                        specialized use cases or when you want full control.
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
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
