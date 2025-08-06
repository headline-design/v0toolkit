"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowRight,
  Wand2,
  Users,
  Target,
  Sparkles,
  Clock,
  ChevronRight,
  Zap,
  Settings,
  Code,
  Palette,
  UserCog,
  Plus,
  Eye,
  Copy,
  TrendingUp,
  Activity,
  Play,
  FileText,
  Folder,
} from "lucide-react"
import { v0ProfileService } from "@/lib/services/v0-profile-service"
import { promptGeneratorService } from "@/lib/services/prompt-generator-service"
import type { V0Profile } from "@/lib/types/v0-profile"
import { useToast } from "@/hooks/use-toast"
import { GeneratedPrompt } from "@/lib/core/types"

export default function HomePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [profiles, setProfiles] = useState<V0Profile[]>([])
  const [recentPrompts, setRecentPrompts] = useState<GeneratedPrompt[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const loadedProfiles = v0ProfileService.getProfiles()
      const loadedPrompts = promptGeneratorService.getHistory()

      setProfiles(loadedProfiles)
      setRecentPrompts(loadedPrompts.slice(0, 3)) // Show only 3 most recent
    } catch (error) {
      console.error("Failed to load data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getProfileIcon = (iconName?: string) => {
    switch (iconName) {
      case "UserCog":
        return <UserCog className="h-3 w-3" />
      case "Palette":
        return <Palette className="h-3 w-3" />
      case "FileCode":
        return <Code className="h-3 w-3" />
      default:
        return <Users className="h-3 w-3" />
    }
  }

  const handleCopyPrompt = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt)
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard",
        duration: 2000,
      })
    } catch (error) {
      console.error("Failed to copy prompt:", error)
      toast({
        title: "Error",
        description: "Failed to copy prompt",
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  const createQuickProfile = () => {
    try {
      const newProfile = v0ProfileService.createQuickProfile()
      setProfiles((prev) => [newProfile, ...prev])
      toast({
        title: "Profile Created!",
        description: `${newProfile.name} is ready to use`,
        duration: 3000,
      })
      router.push(`/profile/${newProfile.id}`)
    } catch (error) {
      console.error("Failed to create quick profile:", error)
      toast({
        title: "Error",
        description: "Failed to create profile",
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 mx-auto bg-muted rounded-lg flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-muted-foreground animate-pulse" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-medium">Loading V0 Toolkit...</h3>
                <p className="text-sm text-muted-foreground">Setting up your workspace</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show onboarding for new users
  const isNewUser = profiles.length === 0 && recentPrompts.length === 0

  if (isNewUser) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto p-4 space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-6 py-12">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-foreground rounded-lg flex items-center justify-center">
                <Palette className="h-8 w-8 text-background" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Welcome to V0 Toolkit</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Your freestyle scratchpad for V0 prompts and notes. Organize your ideas with drag-and-drop folders and
                  editable notes.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="sm" onClick={() => router.push("/slate")} className="h-9 px-6">
                <Palette className="h-4 w-4 mr-2" />
                Start with Slate
              </Button>
              <Button size="sm" variant="outline" onClick={() => router.push("/prompt-generator")} className="h-9 px-6">
                <Wand2 className="h-4 w-4 mr-2" />
                Try Prompt Generator
                <Badge variant="secondary" className="ml-2 text-xs h-4 px-1">
                  Experimental
                </Badge>
              </Button>
            </div>
          </div>

          {/* Features Overview */}
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Everything You Need</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Professional tools designed for modern V0 development workflows
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card
                className="text-center p-6 hover:shadow-md transition-shadow cursor-pointer border-2 border-primary/20"
                onClick={() => router.push("/slate")}
              >
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mb-2 text-lg flex items-center justify-center gap-2">
                  Slate
                  <Badge variant="default" className="text-xs h-4 px-1">
                    Primary
                  </Badge>
                </CardTitle>
                <CardDescription className="mb-4 text-sm">
                  Freestyle scratchpad for V0 prompts and notes. Drag and drop items into folders, edit inline, and
                  organize your workflow visually.
                </CardDescription>
                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <FileText className="h-3 w-3" />
                  <span>Visual organization</span>
                </div>
              </Card>

              <Card
                className="text-center p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => router.push("/prompt-generator")}
              >
                <div className="w-12 h-12 mx-auto bg-muted rounded-lg flex items-center justify-center mb-4">
                  <Wand2 className="h-6 w-6" />
                </div>
                <CardTitle className="mb-2 text-lg flex items-center justify-center gap-2">
                  Prompt Generator
                  <Badge variant="secondary" className="text-xs h-4 px-1">
                    Experimental
                  </Badge>
                </CardTitle>
                <CardDescription className="mb-4 text-sm">
                  Create sophisticated AI prompts using professional templates designed for V0 and modern development
                  workflows
                </CardDescription>
                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <Target className="h-3 w-3" />
                  <span>Expert templates</span>
                </div>
              </Card>

              <Card
                className="text-center p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => router.push("/profiles")}
              >
                <div className="w-12 h-12 mx-auto bg-muted rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle className="mb-2 text-lg flex items-center justify-center gap-2">
                  V0 Profiles
                  <Badge variant="secondary" className="text-xs h-4 px-1">
                    Experimental
                  </Badge>
                </CardTitle>
                <CardDescription className="mb-4 text-sm">
                  Create personalized AI assistants with custom traits, tasks, and specialized knowledge for different
                  use cases
                </CardDescription>
                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <Settings className="h-3 w-3" />
                  <span>Personalized assistants</span>
                </div>
              </Card>
            </div>
          </div>

          {/* Getting Started Steps */}
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Get Started with Slate</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Follow these simple steps to organize your V0 prompts and notes
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center space-y-4">
                <div className="w-10 h-10 mx-auto bg-foreground text-background rounded-lg flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h3 className="text-lg font-semibold">Create Notes & Folders</h3>
                <p className="text-muted-foreground text-sm">
                  Add notes for your V0 prompts and create folders to organize them by project or category
                </p>
                <Button variant="outline" size="sm" onClick={() => router.push("/slate")} className="h-8 px-4">
                  Open Slate
                  <ArrowRight className="h-3 w-3 ml-2" />
                </Button>
              </div>

              <div className="text-center space-y-4">
                <div className="w-10 h-10 mx-auto bg-muted text-muted-foreground rounded-lg flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <h3 className="text-lg font-semibold">Drag & Drop</h3>
                <p className="text-muted-foreground text-sm">
                  Organize your workspace by dragging notes around and dropping them into folders for better
                  organization
                </p>
                <Button variant="outline" size="sm" disabled className="h-8 px-4 bg-transparent">
                  Organize Items
                  <Folder className="h-3 w-3 ml-2" />
                </Button>
              </div>

              <div className="text-center space-y-4">
                <div className="w-10 h-10 mx-auto bg-muted text-muted-foreground rounded-lg flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <h3 className="text-lg font-semibold">Edit & Copy</h3>
                <p className="text-muted-foreground text-sm">
                  Click to edit notes inline, read content in folders via popover, and copy prompts to use with V0
                </p>
                <Button variant="outline" size="sm" disabled className="h-8 px-4 bg-transparent">
                  Copy to V0
                  <Copy className="h-3 w-3 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-6 py-12">
            <Card className="max-w-2xl mx-auto border-2 border-primary/20">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Ready to Get Started?</h3>
                  <p className="text-muted-foreground max-w-lg mx-auto">
                    Create your first note and start organizing your V0 prompts in a visual, intuitive workspace
                  </p>
                  <Button size="sm" onClick={() => router.push("/slate")} className="h-9 px-6">
                    <Palette className="h-4 w-4 mr-2" />
                    Open Slate Workspace
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Dashboard for existing users
  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">V0 Toolkit Dashboard</h1>
              <p className="text-muted-foreground">Manage your prompts, profiles, and development workflow</p>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => router.push("/slate")} size="sm" className="h-8 px-4">
                <Palette className="h-3 w-3 mr-2" />
                Open Slate
              </Button>
              <Button variant="outline" onClick={() => router.push("/prompt-generator")} size="sm" className="h-8 px-4">
                <Wand2 className="h-3 w-3 mr-2" />
                Generate Prompt
                <Badge variant="secondary" className="ml-2 text-xs h-4 px-1">
                  Experimental
                </Badge>
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-md transition-shadow border-2 border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Palette className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">Slate</div>
              <div className="text-xs text-muted-foreground">Primary Workspace</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">{profiles.length}</div>
              <div className="text-xs text-muted-foreground">V0 Profiles</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <Wand2 className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">{recentPrompts.length}</div>
              <div className="text-xs text-muted-foreground">Generated Prompts</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <Activity className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">{profiles.filter((p) => p.isActive).length}</div>
              <div className="text-xs text-muted-foreground">Active Profiles</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Profiles */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">Recent Profiles</h2>
                <Badge variant="secondary" className="text-xs h-4 px-1">
                  Experimental
                </Badge>
              </div>
              <Button variant="outline" onClick={() => router.push("/profiles")} size="sm" className="h-7 px-3 text-xs">
                View All
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>

            {profiles.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="p-8 text-center">
                  <div className="space-y-4">
                    <div className="w-12 h-12 mx-auto bg-muted rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">No profiles yet</h3>
                      <p className="text-sm text-muted-foreground">
                        Create your first V0 profile to get personalized AI assistance
                      </p>
                    </div>
                    <Button onClick={createQuickProfile} size="sm" className="h-8 px-4">
                      <Plus className="h-3 w-3 mr-2" />
                      Create Your First Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {profiles.slice(0, 3).map((profile) => (
                  <Card
                    key={profile.id}
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => router.push(`/profile/${profile.id}`)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`https://avatar.vercel.sh/${profile.id}?size=400`} />
                            <AvatarFallback className="text-xs font-medium">{getInitials(profile.name)}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <h3 className="font-medium text-sm">{profile.name}</h3>
                            <p className="text-xs text-muted-foreground line-clamp-1">{profile.description}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs h-5 px-2">
                                {profile.category}
                              </Badge>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <TrendingUp className="h-3 w-3" />
                                <span>{profile.usageCount || 0} uses</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              router.push(`/profile/${profile.id}`)
                            }}
                            className="h-7 px-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Play className="h-3 w-3 mr-1" />
                            Use
                          </Button>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Recent Prompts */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">Recent Prompts</h2>
                <Badge variant="secondary" className="text-xs h-4 px-1">
                  Experimental
                </Badge>
              </div>
              <Button
                variant="outline"
                onClick={() => router.push("/prompt-generator")}
                size="sm"
                className="h-7 px-3 text-xs"
              >
                View All
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>

            {recentPrompts.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="p-6 text-center">
                  <div className="space-y-3">
                    <div className="w-10 h-10 mx-auto bg-muted rounded-lg flex items-center justify-center">
                      <Wand2 className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium text-sm">No prompts yet</h3>
                      <p className="text-xs text-muted-foreground">Generate your first V0 prompt</p>
                    </div>
                    <Button onClick={() => router.push("/prompt-generator")} size="sm" className="h-7 px-3 text-xs">
                      <Wand2 className="h-3 w-3 mr-1" />
                      Generate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {recentPrompts.map((prompt) => (
                  <Card key={prompt.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-3 space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs h-5 px-2">
                          {prompt.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{prompt.createdAt.toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="bg-muted p-3 rounded text-xs">
                        <pre className="whitespace-pre-wrap line-clamp-3 font-mono">{prompt.prompt}</pre>
                      </div>

                      <div className="flex items-center justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleCopyPrompt(prompt.prompt)
                          }}
                          className="h-6 text-xs px-2"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/profiles/create?prompt=${prompt.id}`)}
                          className="h-6 text-xs px-2"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-4 w-4" />
              Quick Actions
            </CardTitle>
            <CardDescription className="text-sm">
              Common tasks to help you get the most out of V0 Toolkit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button
                variant="outline"
                className="h-auto p-4 flex-col gap-2 bg-transparent border-2 border-primary/20"
                onClick={() => router.push("/slate")}
              >
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Palette className="h-4 w-4 text-primary" />
                </div>
                <div className="text-center space-y-1">
                  <div className="font-medium text-sm">Open Slate</div>
                  <div className="text-xs text-muted-foreground">Visual prompt workspace</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-auto p-4 flex-col gap-2 bg-transparent"
                onClick={() => router.push("/prompt-generator")}
              >
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <Wand2 className="h-4 w-4" />
                </div>
                <div className="text-center space-y-1">
                  <div className="font-medium text-sm flex items-center gap-1">
                    Generate Prompt
                    <Badge variant="secondary" className="text-xs h-3 px-1">
                      Exp
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">Create a new V0 prompt</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-auto p-4 flex-col gap-2 bg-transparent"
                onClick={() => router.push("/profiles/create")}
              >
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4" />
                </div>
                <div className="text-center space-y-1">
                  <div className="font-medium text-sm flex items-center gap-1">
                    Create Profile
                    <Badge variant="secondary" className="text-xs h-3 px-1">
                      Exp
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">Build a personalized assistant</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-auto p-4 flex-col gap-2 bg-transparent"
                onClick={() => router.push("/profiles")}
              >
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <Eye className="h-4 w-4" />
                </div>
                <div className="text-center space-y-1">
                  <div className="font-medium text-sm flex items-center gap-1">
                    Browse Profiles
                    <Badge variant="secondary" className="text-xs h-3 px-1">
                      Exp
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">View all your profiles</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
