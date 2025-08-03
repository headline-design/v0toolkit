"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Settings,
  Edit,
  Calendar,
  Zap,
  Star,
  Copy,
  Share,
  Download,
  Play,
  History,
  User,
  Wand2,
  CheckCircle,
  FileText,
  Plus,
  X,
} from "lucide-react"
import { v0ProfileService } from "@/lib/services/v0-profile-service"
import type { V0Profile, ComposedPrompt } from "@/lib/types/v0-profile"
import { useToast } from "@/hooks/use-toast"
import { ProfileEditDialog } from "@/components/profile-edit-dialog"

export default function ProfilePage() {
  const router = useRouter()
  const params = useParams()
  const profileId = params.profileId as string

  const [profile, setProfile] = useState<V0Profile | null>(null)
  const [activeTab, setActiveTab] = useState("compose")
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null) // Updated default value to be a non-empty string
  const [taskVariables, setTaskVariables] = useState<Record<string, any>>({})
  const [composedPrompt, setComposedPrompt] = useState<ComposedPrompt | null>(null)
  const [composedHistory, setComposedHistory] = useState<ComposedPrompt[]>([])
  const [isComposing, setIsComposing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  // Core tasks from service
  const CORE_TASKS = [
    {
      id: "create",
      name: "Create",
      description: "Build new components, features, or complete applications from scratch",
      prompt:
        "Today your job is to create {creation_request}. Build this as a complete, production-ready implementation with proper error handling, accessibility, and responsive design.",
      category: "Development",
      variables: [
        {
          id: "creation_request",
          name: "creation_request",
          label: "What you want to create",
          type: "textarea" as const,
          required: true,
          placeholder:
            "• a user dashboard with analytics charts\n• a complete e-commerce checkout flow\n• a real-time chat component with WebSocket\n• a drag-and-drop file upload system\n• a multi-step form with validation",
        },
      ],
      examples: ["Create a user dashboard", "Build a checkout system", "Design a chat interface"],
      estimatedTokens: 100,
      isActive: true,
    },
    {
      id: "refine",
      name: "Refine",
      description: "Improve, enhance, or modify existing code, designs, or implementations",
      prompt:
        "I want you to refine {refinement_request}. Prioritize best practices from your expertise and provide the complete refined implementation.",
      category: "Development",
      variables: [
        {
          id: "refinement_request",
          name: "refinement_request",
          label: "What you want to refine",
          type: "textarea" as const,
          required: true,
          placeholder:
            "• the user experience when they click on the home page because there is a slight delay\n• the UI/UX on the dashboard and settings pages\n• the user workflow from login to checkout\n• the database queries for better performance\n• the component architecture for better maintainability",
        },
      ],
      examples: ["Refine the checkout flow", "Enhance the dashboard", "Improve form validation"],
      estimatedTokens: 90,
      isActive: true,
    },
    {
      id: "analyze",
      name: "Analyze",
      description: "Review, audit, and provide detailed analysis of code, designs, or systems",
      prompt:
        "Today your job is to analyze {analysis_target} and provide a comprehensive review covering {analysis_focus}. Include specific recommendations for improvement.",
      category: "Analysis",
      variables: [
        {
          id: "analysis_target",
          name: "analysis_target",
          label: "What you want to analyze",
          type: "textarea" as const,
          required: true,
          placeholder:
            "• the current user authentication system\n• the React component architecture\n• the database schema and queries\n• the API endpoint design\n• the overall user experience flow",
        },
        {
          id: "analysis_focus",
          name: "analysis_focus",
          label: "Analysis focus areas",
          type: "select" as const,
          required: true,
          options: [
            "Performance and optimization",
            "Security and best practices",
            "User experience and accessibility",
            "Code quality and maintainability",
            "Architecture and scalability",
            "All aspects (comprehensive review)",
          ],
        },
      ],
      examples: ["Analyze component structure", "Review API design", "Audit security practices"],
      estimatedTokens: 110,
      isActive: true,
    },
  ]

  // Load profile data
  useEffect(() => {
    const loadProfile = () => {
      try {
        const loadedProfile = v0ProfileService.getProfile(profileId)
        if (!loadedProfile) {
          router.push("/profiles")
          return
        }

        setProfile(loadedProfile)

        // Load composed prompts history for this profile
        const history = v0ProfileService.getComposedPromptsHistory().filter((prompt) => prompt.profileId === profileId)
        setComposedHistory(history)
      } catch (error) {
        console.error("Failed to load profile:", error)
        router.push("/profiles")
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [profileId, router])

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  // Handle task variable changes
  const handleVariableChange = (variableId: string, value: any) => {
    setTaskVariables((prev) => ({
      ...prev,
      [variableId]: value,
    }))
  }

  // Compose prompt
  const handleComposePrompt = async () => {
    if (!profile) return

    setIsComposing(true)
    try {
      const composed = v0ProfileService.composePrompt(profile, selectedTaskId || undefined, taskVariables)
      setComposedPrompt(composed)

      // Refresh history
      const history = v0ProfileService.getComposedPromptsHistory().filter((prompt) => prompt.profileId === profileId)
      setComposedHistory(history)
    } catch (error) {
      console.error("Failed to compose prompt:", error)
      alert("Failed to compose prompt. Please try again.")
    } finally {
      setIsComposing(false)
    }
  }

  // Copy prompt to clipboard
  const handleCopyPrompt = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt)
      // You could add a toast notification here
    } catch (error) {
      console.error("Failed to copy prompt:", error)
    }
  }

  // Save profile with toast feedback
  const saveProfileWithToast = async (updatedProfile: V0Profile, message = "Profile updated") => {
    setIsSaving(true)
    try {
      v0ProfileService.saveProfile(updatedProfile)
      toast({
        title: "Saved",
        description: message,
        duration: 2000,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 mx-auto bg-muted rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-muted-foreground animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Loading Profile...</h3>
              <p className="text-sm text-muted-foreground">Setting up your AI assistant</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold">Profile not found</h3>
          <Button onClick={() => router.push("/profiles")}>Back to Profiles</Button>
        </div>
      </div>
    )
  }

  const allTasks = [...CORE_TASKS, ...profile.tasks]
  const selectedTask = selectedTaskId ? allTasks.find((t) => t.id === selectedTaskId) : null

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="border-b ">
        <div className="container mx-auto p-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/profiles")} className="h-9">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Profiles
            </Button>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-3">
              <Badge variant="outline">{profile.category}</Badge>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{profile.usageCount || 0} uses</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              {isSaving && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </div>
              )}
              <ProfileEditDialog
                profile={profile}
                onProfileUpdate={(updatedProfile) => {
                  setProfile(updatedProfile)
                  saveProfileWithToast(updatedProfile, "Profile updated")
                }}
                trigger={
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                }
              />
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-8">
        {/* Profile Header - Social Media Style */}
        <Card className="overflow-hidden">
          {/* Cover Photo */}
          <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20" />

          <CardContent className="relative p-6">
            {/* Avatar */}
            <div className="absolute -top-16 left-6">
              <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                <AvatarImage src={`https://avatar.vercel.sh/${profile.id}?size=400`} />
                <AvatarFallback className="text-white font-bold text-xl bg-gradient-to-br from-primary to-primary/80">
                  {getInitials(profile.name)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Profile Info */}
            <div className="pt-10 space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">{profile.name}</h1>
                <p className="text-lg text-muted-foreground">{profile.description}</p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Created {profile.createdAt.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span>{profile.usageCount || 0} total uses</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  <span>{profile.traits.filter((t) => t.isActive).length} active traits</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {profile.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="compose" className="flex items-center gap-2">
              <Wand2 className="h-5 w-5" />
              Compose Prompt
            </TabsTrigger>
            <TabsTrigger value="setup" className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Profile Setup
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-5 w-5" />
              History ({composedHistory.length})
            </TabsTrigger>
          </TabsList>

          {/* Compose Tab */}
          <TabsContent value="compose" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Task Selection */}
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Play className="h-5 w-5" />
                      Select Task
                    </CardTitle>
                    <CardDescription>
                      Choose what you want {profile.name} to do. These tasks are designed for starting new V0 threads.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Task Type (Optional)</Label>
                      <Select
                        value={selectedTaskId || "none"}
                        onValueChange={(value) => setSelectedTaskId(value === "none" ? null : value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a task or leave blank for general use" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No specific task</SelectItem>
                          {allTasks.map((task) => (
                            <SelectItem key={task.id} value={task.id}>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{task.name}</span>
                                <Badge variant="outline" className="text-xs">
                                  {task.category}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedTask && (
                      <div className="p-3 bg-muted/50 rounded-lg space-y-2">
                        <div className="font-medium">{selectedTask.name}</div>
                        <div className="text-sm text-muted-foreground">{selectedTask.description}</div>
                      </div>
                    )}

                    {/* Task Variables */}
                    {selectedTask && selectedTask.variables && (
                      <div className="space-y-4">
                        <div className="text-sm font-medium">Task Configuration</div>
                        {selectedTask.variables.map((variable) => (
                          <div key={variable.id} className="space-y-2">
                            <Label htmlFor={variable.id}>
                              {variable.label}
                              {variable.required && <span className="text-destructive">*</span>}
                            </Label>
                            {variable.type === "textarea" ? (
                              <Textarea
                                id={variable.id}
                                placeholder={variable.placeholder}
                                value={taskVariables[variable.id] || ""}
                                onChange={(e) => handleVariableChange(variable.id, e.target.value)}
                                rows={5}
                                className="min-h-[120px]"
                              />
                            ) : variable.type === "select" ? (
                              <Select
                                value={taskVariables[variable.id] || ""}
                                onValueChange={(value) => handleVariableChange(variable.id, value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder={`Select ${variable.label.toLowerCase()}`} />
                                </SelectTrigger>
                                <SelectContent>
                                  {variable.options?.map((option) => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input
                                id={variable.id}
                                placeholder={variable.placeholder}
                                value={taskVariables[variable.id] || ""}
                                onChange={(e) => handleVariableChange(variable.id, e.target.value)}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    <Button
                      onClick={handleComposePrompt}
                      disabled={
                        isComposing ||
                        (!!selectedTask &&
                          selectedTask.variables?.some((v) => v.required && !taskVariables[v.id]?.toString().trim()))
                      }
                      className="w-full"
                      size="lg"
                    >
                      {isComposing ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 mr-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Composing...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Wand2 className="h-4 w-4 mr-2" />
                          Compose Prompt
                        </div>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Composed Prompt Display */}
              <div className="lg:col-span-2">
                {composedPrompt ? (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            Composed Prompt
                          </CardTitle>
                          <CardDescription>
                            Ready to use in V0 • ~{composedPrompt.estimatedTokens} tokens
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyPrompt(composedPrompt.fullPrompt)}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                          <div className="whitespace-pre-wrap text-sm leading-relaxed">{composedPrompt.fullPrompt}</div>
                        </ScrollArea>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div>Generated: {composedPrompt.generatedAt.toLocaleString()}</div>
                          <div>Estimated tokens: {composedPrompt.estimatedTokens}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                          <Wand2 className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">Ready to compose</h3>
                          <p className="text-muted-foreground">
                            Select a task and configure the parameters, then click "Compose Prompt" to generate your
                            personalized V0 prompt.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Setup Tab */}
          <TabsContent value="setup" className="space-y-6">
            {/* Base Prompt Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Base Prompt Foundation
                </CardTitle>
                <CardDescription>
                  Select or update the generated prompt that serves as the foundation for {profile.name}'s personality
                  and expertise.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Base Prompt Source</Label>
                  <Select
                    value={profile.basePromptId || "custom"}
                    onValueChange={(value) => {
                      if (value === "custom") {
                        const updatedProfile = { ...profile, basePromptId: undefined }
                        setProfile(updatedProfile)
                        saveProfileWithToast(updatedProfile, "Base prompt updated")
                      } else {
                        const generatedPrompts = v0ProfileService.getAvailableBasePrompts()
                        const selectedPrompt = generatedPrompts.find((p) => p.id === value)
                        if (selectedPrompt) {
                          const updatedProfile = { ...profile, basePromptId: value }
                          setProfile(updatedProfile)
                          saveProfileWithToast(updatedProfile, "Base prompt updated")
                        }
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select base prompt source..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom">Custom Base Prompt</SelectItem>
                      {v0ProfileService.getAvailableBasePrompts().map((prompt) => (
                        <SelectItem key={prompt.id} value={prompt.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{prompt.category || "Untitled"}</span>
                            <span className="text-xs text-muted-foreground truncate max-w-[300px]">
                              {prompt.prompt ? prompt.prompt.substring(0, 80) + "..." : "No content"}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {!profile.basePromptId && (
                  <div className="space-y-2">
                    <Label htmlFor="basePrompt">Custom Base Prompt</Label>
                    <Textarea
                      id="basePrompt"
                      placeholder="Enter your custom base prompt that defines this AI assistant's core personality and expertise..."
                      value={profile.basePrompt || ""}
                      onChange={(e) => {
                        const updatedProfile = { ...profile, basePrompt: e.target.value }
                        setProfile(updatedProfile)
                      }}
                      onBlur={() => saveProfileWithToast(profile)}
                      rows={6}
                      className="min-h-[150px]"
                    />
                  </div>
                )}

                {profile.basePromptId && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="text-sm font-medium mb-2">Selected Generated Prompt</div>
                    <ScrollArea className="h-[120px]">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {v0ProfileService.getAvailableBasePrompts().find((p) => p.id === profile.basePromptId)
                          ?.prompt || "Prompt not found"}
                      </p>
                    </ScrollArea>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Profile Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Details
                </CardTitle>
                <CardDescription>Update your AI assistant's basic information and appearance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="profileName">Assistant Name</Label>
                    <Input
                      id="profileName"
                      placeholder="e.g., Bob, Alice, DevBot..."
                      value={profile.name}
                      onChange={(e) => {
                        const updatedProfile = { ...profile, name: e.target.value, displayName: e.target.value }
                        setProfile(updatedProfile)
                      }}
                      onBlur={() => saveProfileWithToast(profile, "Profile name updated")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profileCategory">Category</Label>
                    <Select
                      value={profile.category}
                      onValueChange={(value) => {
                        const updatedProfile = { ...profile, category: value }
                        setProfile(updatedProfile)
                        saveProfileWithToast(updatedProfile, "Category updated")
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Development">Development</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Analysis">Analysis</SelectItem>
                        <SelectItem value="Writing">Writing</SelectItem>
                        <SelectItem value="Research">Research</SelectItem>
                        <SelectItem value="General">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profileDescription">Description</Label>
                  <Textarea
                    id="profileDescription"
                    placeholder="Describe what this AI assistant specializes in and how it helps you..."
                    value={profile.description}
                    onChange={(e) => {
                      const updatedProfile = { ...profile, description: e.target.value }
                      setProfile(updatedProfile)
                    }}
                    onBlur={() => saveProfileWithToast(profile, "Description updated")}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {profile.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                        <button
                          onClick={() => {
                            const updatedProfile = { ...profile, tags: profile.tags.filter((_, i) => i !== index) }
                            setProfile(updatedProfile)
                            saveProfileWithToast(updatedProfile, "Tags updated")
                          }}
                          className="ml-1 hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.currentTarget.value.trim()) {
                          const newTag = e.currentTarget.value.trim()
                          if (!profile.tags.includes(newTag)) {
                            const updatedProfile = { ...profile, tags: [...profile.tags, newTag] }
                            setProfile(updatedProfile)
                            saveProfileWithToast(updatedProfile, "Tags updated")
                          }
                          e.currentTarget.value = ""
                        }
                      }}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        const input = e.currentTarget.parentElement?.querySelector("input")
                        if (input && input.value.trim()) {
                          const newTag = input.value.trim()
                          if (!profile.tags.includes(newTag)) {
                            const updatedProfile = { ...profile, tags: [...profile.tags, newTag] }
                            setProfile(updatedProfile)
                            saveProfileWithToast(updatedProfile, "Tags updated")
                          }
                          input.value = ""
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Traits Management */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Personality Traits
                    </CardTitle>
                    <CardDescription>
                      Add traits that modify how {profile.name} behaves and responds. These are layered on top of the
                      base prompt.
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newTrait = {
                        id: `trait-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                        name: "New Trait",
                        description: "Describe what this trait does",
                        value: "Add the specific behavior or instruction here",
                        category: "personality" as const,
                        isActive: true,
                        insertionPoint: "after_base" as const,
                        priority: profile.traits.length + 1,
                      }
                      const updatedProfile = { ...profile, traits: [...profile.traits, newTrait] }
                      setProfile(updatedProfile)
                      saveProfileWithToast(updatedProfile, "Traits updated")
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Trait
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {profile.traits.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No traits added yet. Click "Add Trait" to customize {profile.name}'s personality.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {profile.traits.map((trait, index) => (
                      <Card key={trait.id} className="p-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const updatedTraits = profile.traits.map((t) =>
                                    t.id === trait.id ? { ...t, isActive: !t.isActive } : t,
                                  )
                                  const updatedProfile = { ...profile, traits: updatedTraits }
                                  setProfile(updatedProfile)
                                  saveProfileWithToast(updatedProfile, "Traits updated")
                                }}
                              >
                                {trait.isActive ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <div className="h-4 w-4 border-2 border-muted-foreground rounded-full" />
                                )}
                              </Button>
                              <div className="space-y-1">
                                <Input
                                  value={trait.name}
                                  onChange={(e) => {
                                    const updatedTraits = profile.traits.map((t) =>
                                      t.id === trait.id ? { ...t, name: e.target.value } : t,
                                    )
                                    const updatedProfile = { ...profile, traits: updatedTraits }
                                    setProfile(updatedProfile)
                                  }}
                                  onBlur={() => saveProfileWithToast(profile, "Traits updated")}
                                  className="font-medium"
                                />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Select
                                value={trait.category}
                                onValueChange={(value) => {
                                  const updatedTraits = profile.traits.map((t) =>
                                    t.id === trait.id ? { ...t, category: value as any } : t,
                                  )
                                  const updatedProfile = { ...profile, traits: updatedTraits }
                                  setProfile(updatedProfile)
                                  saveProfileWithToast(updatedProfile, "Traits updated")
                                }}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="personality">Personality</SelectItem>
                                  <SelectItem value="expertise">Expertise</SelectItem>
                                  <SelectItem value="communication">Communication</SelectItem>
                                  <SelectItem value="behavior">Behavior</SelectItem>
                                  <SelectItem value="constraints">Constraints</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const updatedProfile = {
                                    ...profile,
                                    traits: profile.traits.filter((t) => t.id !== trait.id),
                                  }
                                  setProfile(updatedProfile)
                                  saveProfileWithToast(updatedProfile, "Traits updated")
                                }}
                              >
                                <X className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>

                          <Textarea
                            placeholder="Describe what this trait does..."
                            value={trait.description}
                            onChange={(e) => {
                              const updatedTraits = profile.traits.map((t) =>
                                t.id === trait.id ? { ...t, description: e.target.value } : t,
                              )
                              const updatedProfile = { ...profile, traits: updatedTraits }
                              setProfile(updatedProfile)
                            }}
                            onBlur={() => saveProfileWithToast(profile, "Traits updated")}
                            rows={2}
                            className="text-sm"
                          />

                          <Textarea
                            placeholder="The actual instruction or behavior to add to prompts..."
                            value={trait.value}
                            onChange={(e) => {
                              const updatedTraits = profile.traits.map((t) =>
                                t.id === trait.id ? { ...t, value: e.target.value } : t,
                              )
                              const updatedProfile = { ...profile, traits: updatedTraits }
                              setProfile(updatedProfile)
                            }}
                            onBlur={() => saveProfileWithToast(profile, "Traits updated")}
                            rows={3}
                            className="font-mono text-sm"
                          />

                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Label className="text-xs">Position:</Label>
                              <Select
                                value={trait.insertionPoint}
                                onValueChange={(value) => {
                                  const updatedTraits = profile.traits.map((t) =>
                                    t.id === trait.id ? { ...t, insertionPoint: value as any } : t,
                                  )
                                  const updatedProfile = { ...profile, traits: updatedTraits }
                                  setProfile(updatedProfile)
                                  saveProfileWithToast(updatedProfile, "Traits updated")
                                }}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="before_base">Before Base</SelectItem>
                                  <SelectItem value="after_base">After Base</SelectItem>
                                  <SelectItem value="replace_section">Replace Section</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex items-center gap-2">
                              <Label className="text-xs">Priority:</Label>
                              <Input
                                type="number"
                                min="1"
                                max="10"
                                value={trait.priority}
                                onChange={(e) => {
                                  const updatedTraits = profile.traits.map((t) =>
                                    t.id === trait.id ? { ...t, priority: Number.parseInt(e.target.value) || 1 } : t,
                                  )
                                  const updatedProfile = { ...profile, traits: updatedTraits }
                                  setProfile(updatedProfile)
                                }}
                                onBlur={() => saveProfileWithToast(profile, "Traits updated")}
                                className="w-16"
                              />
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Custom Tasks Management */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Custom Tasks
                    </CardTitle>
                    <CardDescription>
                      Create specialized tasks for {profile.name}. These appear alongside the core Create/Refine/Analyze
                      tasks.
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newTask = {
                        id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                        name: "New Task",
                        description: "Describe what this task does",
                        prompt: "Today your job is to {task_input}. Provide a detailed and helpful response.",
                        category: "Custom",
                        isActive: true,
                        variables: [
                          {
                            id: "task_input",
                            name: "task_input",
                            label: "Task Input",
                            type: "textarea" as const,
                            required: true,
                            placeholder: "Describe what you want the AI to do...",
                          },
                        ],
                        examples: [],
                        estimatedTokens: 100,
                      }
                      const updatedProfile = { ...profile, tasks: [...profile.tasks, newTask] }
                      setProfile(updatedProfile)
                      saveProfileWithToast(updatedProfile, "Tasks updated")
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {profile.tasks.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>
                      No custom tasks created yet. Add specialized tasks for {profile.name} to handle specific
                      workflows.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {profile.tasks.map((task, index) => (
                      <Card key={task.id} className="p-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const updatedTasks = profile.tasks.map((t) =>
                                    t.id === task.id ? { ...t, isActive: !t.isActive } : t,
                                  )
                                  const updatedProfile = { ...profile, tasks: updatedTasks }
                                  setProfile(updatedProfile)
                                  saveProfileWithToast(updatedProfile, "Tasks updated")
                                }}
                              >
                                {task.isActive ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <div className="h-4 w-4 border-2 border-muted-foreground rounded-full" />
                                )}
                              </Button>
                              <div className="space-y-1">
                                <Input
                                  value={task.name}
                                  onChange={(e) => {
                                    const updatedTasks = profile.tasks.map((t) =>
                                      t.id === task.id ? { ...t, name: e.target.value } : t,
                                    )
                                    const updatedProfile = { ...profile, tasks: updatedTasks }
                                    setProfile(updatedProfile)
                                  }}
                                  onBlur={() => saveProfileWithToast(profile, "Tasks updated")}
                                  className="font-medium"
                                />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Input
                                value={task.category}
                                onChange={(e) => {
                                  const updatedTasks = profile.tasks.map((t) =>
                                    t.id === task.id ? { ...t, category: e.target.value } : t,
                                  )
                                  const updatedProfile = { ...profile, tasks: updatedTasks }
                                  setProfile(updatedProfile)
                                }}
                                onBlur={() => saveProfileWithToast(profile, "Tasks updated")}
                                placeholder="Category"
                                className="w-32"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const updatedProfile = {
                                    ...profile,
                                    tasks: profile.tasks.filter((t) => t.id !== task.id),
                                  }
                                  setProfile(updatedProfile)
                                  saveProfileWithToast(updatedProfile, "Tasks updated")
                                }}
                              >
                                <X className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>

                          <Textarea
                            placeholder="Describe what this task does..."
                            value={task.description}
                            onChange={(e) => {
                              const updatedTasks = profile.tasks.map((t) =>
                                t.id === task.id ? { ...t, description: e.target.value } : t,
                              )
                              const updatedProfile = { ...profile, tasks: updatedTasks }
                              setProfile(updatedProfile)
                            }}
                            onBlur={() => saveProfileWithToast(profile, "Tasks updated")}
                            rows={2}
                            className="text-sm"
                          />

                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Task Prompt Template</Label>
                            <Textarea
                              placeholder="Today your job is to {variable_name}. Use {variable_name} syntax for user inputs..."
                              value={task.prompt}
                              onChange={(e) => {
                                const updatedTasks = profile.tasks.map((t) =>
                                  t.id === task.id ? { ...t, prompt: e.target.value } : t,
                                )
                                const updatedProfile = { ...profile, tasks: updatedTasks }
                                setProfile(updatedProfile)
                              }}
                              onBlur={() => saveProfileWithToast(profile, "Tasks updated")}
                              rows={4}
                              className="font-mono text-sm"
                            />
                            <p className="text-xs text-muted-foreground">
                              Use {"{variable_name}"} syntax to create input fields. Variables will be automatically
                              detected.
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Prompt History
                </CardTitle>
                <CardDescription>
                  View all prompts you've composed with {profile.name}. Click any prompt to copy it.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {composedHistory.length === 0 ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                      <History className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">No prompts yet</h3>
                      <p className="text-muted-foreground">
                        Compose your first prompt with {profile.name} to see it appear here.
                      </p>
                    </div>
                    <Button onClick={() => setActiveTab("compose")}>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Compose First Prompt
                    </Button>
                  </div>
                ) : (
                  <ScrollArea className="h-[600px]">
                    <div className="space-y-4">
                      {composedHistory.map((prompt, index) => (
                        <Card
                          key={index}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => handleCopyPrompt(prompt.fullPrompt)}
                        >
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                  <div className="text-sm font-medium">
                                    {prompt.taskPrompt ? "Task-based prompt" : "General prompt"}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {prompt.generatedAt.toLocaleString()} • ~{prompt.estimatedTokens} tokens
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm">
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="text-sm text-muted-foreground line-clamp-3">{prompt.fullPrompt}</div>
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
        </Tabs>
      </div>
    </div>
  )
}
