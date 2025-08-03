"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Wand2,
  Users,
  BookOpen,
  Target,
  Sparkles,
  Clock,
  Star,
  ChevronRight,
  Lightbulb,
  Zap,
  Settings,
  Code,
  Palette,
  UserCog,
  Plus,
  Eye,
  Copy,
  Download,
} from "lucide-react"
import { v0ProfileService } from "@/lib/services/v0-profile-service"
import { promptGeneratorService } from "@/lib/services/prompt-generator-service"
import type { V0Profile } from "@/lib/types/v0-profile"
import type { GeneratedPrompt } from "@/lib/types/prompt-generator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function HomePage() {
  const router = useRouter()
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
        return <UserCog className="h-4 w-4" />
      case "Palette":
        return <Palette className="h-4 w-4" />
      case "FileCode":
        return <Code className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const handleCopyPrompt = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt)
    } catch (error) {
      console.error("Failed to copy prompt:", error)
    }
  }

  const createQuickProfile = () => {
    try {
      const newProfile = v0ProfileService.createQuickProfile()
      setProfiles((prev) => [newProfile, ...prev])
      router.push(`/profile/${newProfile.id}`)
    } catch (error) {
      console.error("Failed to create quick profile:", error)
    }
  }

  // Get initials from name
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
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-muted-foreground animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Loading V0 Toolkit...</h3>
                <p className="text-muted-foreground">Setting up your workspace</p>
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
        <div className="container mx-auto p-6 space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-8 py-12">
            <div className="space-y-4">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="h-12 w-12 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">Welcome to V0 Toolkit</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Your comprehensive toolkit for creating sophisticated V0 prompts and managing personalized AI
                  assistants
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => router.push("/prompt-generator")} className="h-12 px-8">
                <Wand2 className="h-5 w-5 mr-2" />
                Start with Prompt Generator
              </Button>
              <Button size="lg" variant="outline" onClick={() => router.push("/profiles")} className="h-12 px-8">
                <Users className="h-5 w-5 mr-2" />
                Explore V0 Profiles
              </Button>
            </div>
          </div>

          {/* Features Overview */}
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Everything You Need</h2>
              <p className="text-lg text-muted-foreground">
                Professional tools designed for modern V0 development workflows
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card
                className="text-center p-6 border-2 hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => router.push("/prompt-generator")}
              >
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Wand2 className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="mb-2">Prompt Generator</CardTitle>
                <CardDescription className="mb-4">
                  Create sophisticated AI prompts using professional templates designed for V0 and modern development
                  workflows
                </CardDescription>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Target className="h-4 w-4" />
                  <span>Expert templates</span>
                </div>
              </Card>

              <Card
                className="text-center p-6 border-2 hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => router.push("/profiles")}
              >
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="mb-2">V0 Profiles</CardTitle>
                <CardDescription className="mb-4">
                  Create personalized AI assistants with custom traits, tasks, and specialized knowledge for different
                  use cases
                </CardDescription>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Settings className="h-4 w-4" />
                  <span>Personalized assistants</span>
                </div>
              </Card>

              <Card className="text-center p-6 border-2 hover:shadow-lg transition-all duration-200">
                <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="mb-2">Best Practices</CardTitle>
                <CardDescription className="mb-4">
                  Learn from expert patterns, templates, and proven strategies for effective V0 development
                </CardDescription>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4" />
                  <span>Expert guidance</span>
                </div>
              </Card>
            </div>
          </div>

          {/* Getting Started Steps */}
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Get Started in 3 Steps</h2>
              <p className="text-lg text-muted-foreground">Follow these simple steps to create your first V0 prompt</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h3 className="text-xl font-semibold">Choose a Template</h3>
                <p className="text-muted-foreground">
                  Select from expert-crafted templates designed for different V0 use cases and expertise levels
                </p>
                <Button variant="outline" onClick={() => router.push("/prompt-generator")}>
                  Browse Templates
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <h3 className="text-xl font-semibold">Configure Settings</h3>
                <p className="text-muted-foreground">
                  Fill in the template fields to customize V0's expertise, personality, and response style
                </p>
                <Button variant="outline" disabled>
                  Configure Prompt
                  <Settings className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <h3 className="text-xl font-semibold">Copy & Use</h3>
                <p className="text-muted-foreground">
                  Generate your prompt and copy it to V0 for immediate use in your development workflow
                </p>
                <Button variant="outline" disabled>
                  Copy to V0
                  <Copy className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-6 py-12">
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <Lightbulb className="h-12 w-12 mx-auto text-primary" />
                  <h3 className="text-2xl font-bold">Ready to Get Started?</h3>
                  <p className="text-muted-foreground">
                    Create your first professional V0 prompt in under 2 minutes using our expert templates
                  </p>
                  <Button size="lg" onClick={() => router.push("/prompt-generator")} className="h-12 px-8">
                    <Wand2 className="h-5 w-5 mr-2" />
                    Create Your First Prompt
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
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">V0 Toolkit Dashboard</h1>
              <p className="text-lg text-muted-foreground">Manage your prompts, profiles, and development workflow</p>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={() => router.push("/prompt-generator")}>
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Prompt
              </Button>
              <Button variant="outline" onClick={() => router.push("/profiles/create")}>
                <Plus className="h-4 w-4 mr-2" />
                Create Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-1">{profiles.length}</div>
              <div className="text-sm text-muted-foreground">V0 Profiles</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-1">{recentPrompts.length}</div>
              <div className="text-sm text-muted-foreground">Generated Prompts</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-1">{profiles.filter((p) => p.isActive).length}</div>
              <div className="text-sm text-muted-foreground">Active Profiles</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                {profiles.reduce((sum, p) => sum + (p.usageCount || 0), 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Uses</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Recent Profiles */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recent Profiles</h2>
              <Button variant="outline" onClick={() => router.push("/profiles")}>
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {profiles.length === 0 ? (
              <Card className="border-2 border-dashed">
                <CardContent className="p-8 text-center">
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">No profiles yet</h3>
                      <p className="text-muted-foreground">
                        Create your first V0 profile to get personalized AI assistance
                      </p>
                    </div>
                    <Button onClick={createQuickProfile}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {profiles.slice(0, 3).map((profile) => (
                  <Card
                    key={profile.id}
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => router.push(`/profile/${profile.id}`)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar  className="h-16 w-16 border-4 border-background shadow-lg">
                <AvatarImage src={`https://avatar.vercel.sh/${profile.id}?size=400`} />
                <AvatarFallback className="text-white font-bold text-xl bg-gradient-to-br from-primary to-primary/80">
                  {getInitials(profile.name)}
                </AvatarFallback>
              </Avatar>
                          <div>
                            <h3 className="font-medium">{profile.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">{profile.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {profile.category}
                          </Badge>
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
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recent Prompts</h2>
              <Button variant="outline" onClick={() => router.push("/prompt-generator")}>
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {recentPrompts.length === 0 ? (
              <Card className="border-2 border-dashed">
                <CardContent className="p-6 text-center">
                  <div className="space-y-4">
                    <div className="w-12 h-12 mx-auto bg-muted rounded-full flex items-center justify-center">
                      <Wand2 className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">No prompts yet</h3>
                      <p className="text-sm text-muted-foreground">Generate your first V0 prompt</p>
                    </div>
                    <Button size="sm" onClick={() => router.push("/prompt-generator")}>
                      <Wand2 className="h-3 w-3 mr-1" />
                      Generate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {recentPrompts.map((prompt) => (
                  <Card key={prompt.id} className="hover:shadow-sm transition-shadow">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {prompt.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{prompt.createdAt.toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="bg-muted/30 p-3 rounded text-xs">
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
                          className="h-7 text-xs px-2"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => createQuickProfile()}
                          className="h-7 text-xs px-2"
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
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common tasks to help you get the most out of V0 Toolkit</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button
                variant="outline"
                className="h-auto p-4 flex-col gap-2 bg-transparent"
                onClick={() => router.push("/prompt-generator")}
              >
                <Wand2 className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">Generate Prompt</div>
                  <div className="text-xs text-muted-foreground">Create a new V0 prompt</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-auto p-4 flex-col gap-2 bg-transparent"
                onClick={() => router.push("/profiles/create")}
              >
                <Users className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">Create Profile</div>
                  <div className="text-xs text-muted-foreground">Build a personalized assistant</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-auto p-4 flex-col gap-2 bg-transparent"
                onClick={() => router.push("/profiles")}
              >
                <Eye className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">Browse Profiles</div>
                  <div className="text-xs text-muted-foreground">View all your profiles</div>
                </div>
              </Button>

              <Button variant="outline" className="h-auto p-4 flex-col gap-2 bg-transparent">
                <Download className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">Export Data</div>
                  <div className="text-xs text-muted-foreground">Download your prompts</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
