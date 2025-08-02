"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Plus,
  Users,
  Star,
  ArrowRight,
  UserCog,
  Palette,
  Sparkles,
  Settings,
  Trash2,
  Copy,
  Play,
  MoreHorizontal,
  Eye,
  Edit,
  FileCode,
  Zap,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { v0ProfileService } from "@/lib/services/v0-profile-service"
import type { V0Profile, ProfileTemplate } from "@/lib/types/v0-profile"

export default function V0ProfilesPage() {
  const router = useRouter()
  const [profiles, setProfiles] = useState<V0Profile[]>([])
  const [templates, setTemplates] = useState<ProfileTemplate[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [isLoading, setIsLoading] = useState(true)

  // Load profiles and templates
  useEffect(() => {
    const loadData = () => {
      try {
        const loadedProfiles = v0ProfileService.getProfiles()
        const loadedTemplates = v0ProfileService.getProfileTemplates()
        setProfiles(loadedProfiles)
        setTemplates(loadedTemplates)
      } catch (error) {
        console.error("Failed to load profiles:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Filter and sort profiles
  const filteredProfiles = profiles
    .filter((profile) => {
      const matchesSearch =
        profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || profile.category === selectedCategory

      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "recent":
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        case "usage":
          return (b.usageCount || 0) - (a.usageCount || 0)
        case "category":
          return a.category.localeCompare(b.category)
        default:
          return 0
      }
    })

  const categories = ["all", ...new Set(profiles.map((p) => p.category))]

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

  const handleCreateProfile = (template?: ProfileTemplate) => {
    if (template) {
      router.push(`/profiles/create?template=${template.id}`)
    } else {
      router.push("/profiles/create")
    }
  }

  const handleEditProfile = (profileId: string) => {
    router.push(`/profiles/${profileId}/edit`)
  }

  const handleUseProfile = (profileId: string) => {
    router.push(`/profiles/${profileId}`)
  }

  const handleViewProfile = (profileId: string) => {
    router.push(`/profiles/${profileId}`)
  }

  const handleDeleteProfile = async (profileId: string) => {
    if (confirm("Are you sure you want to delete this profile?")) {
      v0ProfileService.deleteProfile(profileId)
      setProfiles(profiles.filter((p) => p.id !== profileId))
    }
  }

  const handleDuplicateProfile = (profile: V0Profile) => {
    const duplicatedProfile: V0Profile = {
      ...profile,
      id: `profile-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: `${profile.name} Copy`,
      createdAt: new Date(),
      updatedAt: new Date(),
      usageCount: 0,
      lastUsed: undefined,
    }

    v0ProfileService.saveProfile(duplicatedProfile)
    setProfiles([...profiles, duplicatedProfile])
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-muted-foreground animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Loading V0 Profiles...</h3>
              <p className="text-sm text-muted-foreground">Setting up your personalized AI assistants</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              V0 Profiles
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Create and manage personalized AI assistants based on expert templates. Each profile can have custom
              traits, tasks, and specialized knowledge for different V0 use cases.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={() => handleCreateProfile()} size="lg" className="h-12">
              <Plus className="h-4 w-4 mr-2" />
              Create Profile
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{profiles.length}</div>
              <div className="text-sm text-muted-foreground">Total Profiles</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{profiles.filter((p) => p.isActive).length}</div>
              <div className="text-sm text-muted-foreground">Active Profiles</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{templates.length}</div>
              <div className="text-sm text-muted-foreground">Templates Available</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {profiles.reduce((sum, p) => sum + (p.usageCount || 0), 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Uses</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="profiles" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
          <TabsTrigger value="profiles" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            My Profiles ({profiles.length})
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Templates ({templates.length})
          </TabsTrigger>
        </TabsList>

        {/* My Profiles Tab */}
        <TabsContent value="profiles" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search profiles by name, description, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="space-y-2 flex-1">
                    <label className="text-sm font-medium">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
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

                  <div className="space-y-2 flex-1">
                    <label className="text-sm font-medium">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Recently Updated</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="usage">Most Used</SelectItem>
                        <SelectItem value="category">Category</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profiles Grid */}
          {filteredProfiles.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">
                      {profiles.length === 0 ? "No profiles yet" : "No profiles found"}
                    </h3>
                    <p className="text-muted-foreground">
                      {profiles.length === 0
                        ? "Create your first V0 profile to get started with personalized AI assistance."
                        : "Try adjusting your search criteria or filters to find what you're looking for."}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button onClick={() => handleCreateProfile()}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Profile
                    </Button>
                    {profiles.length > 0 && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchQuery("")
                          setSelectedCategory("all")
                        }}
                      >
                        Clear Filters
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProfiles.map((profile) => (
                <Card
                  key={profile.id}
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/30"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <Avatar className="h-10 w-10 bg-primary/10">
                          <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{getProfileIcon(profile.avatar)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-1">
                            {profile.name}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {profile.category}
                            </Badge>
                            {!profile.isActive && (
                              <Badge variant="secondary" className="text-xs">
                                Inactive
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewProfile(profile.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUseProfile(profile.id)}>
                            <Play className="h-4 w-4 mr-2" />
                            Use Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditProfile(profile.id)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicateProfile(profile)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteProfile(profile.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <CardDescription className="text-sm leading-relaxed line-clamp-2">
                      {profile.description}
                    </CardDescription>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          <span>{profile.traits.filter((t) => t.isActive).length} traits</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Settings className="h-3 w-3" />
                          <span>{profile.tasks.filter((t) => t.isActive).length} tasks</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        <span>{profile.usageCount || 0} uses</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {profile.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {profile.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{profile.tags.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" onClick={() => handleUseProfile(profile.id)} className="flex-1">
                        <Play className="h-3 w-3 mr-1" />
                        Use
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewProfile(profile.id)}
                        className="flex-1"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>

                    {/* Last used */}
                    {profile.lastUsed && (
                      <div className="text-xs text-muted-foreground pt-2 border-t">
                        Last used: {profile.lastUsed.toLocaleDateString()}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <Card
                key={template.id}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/30"
                onClick={() => handleCreateProfile(template)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        {getProfileIcon(template.icon)}
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {template.name}
                        </CardTitle>
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
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed line-clamp-3">
                    {template.description}
                  </CardDescription>

                  {/* Template Stats */}
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

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {template.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {template.tags.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{template.tags.length - 4}
                      </Badge>
                    )}
                  </div>

                  <Button className="w-full" size="sm">
                    <Plus className="h-3 w-3 mr-2" />
                    Create from Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
