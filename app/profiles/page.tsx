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
  TrendingUp,
  Filter,
  X,
  Crown,
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
  const [showFilters, setShowFilters] = useState(false)

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

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-gradient-to-br from-blue-500 to-blue-600",
      "bg-gradient-to-br from-purple-500 to-purple-600",
      "bg-gradient-to-br from-green-500 to-green-600",
      "bg-gradient-to-br from-orange-500 to-orange-600",
      "bg-gradient-to-br from-pink-500 to-pink-600",
      "bg-gradient-to-br from-indigo-500 to-indigo-600",
      "bg-gradient-to-br from-teal-500 to-teal-600",
      "bg-gradient-to-br from-red-500 to-red-600",
    ]
    const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[hash % colors.length]
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const activeFiltersCount = [selectedCategory !== "all", searchQuery].filter(Boolean).length

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-muted-foreground animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Loading V0 Profiles...</h3>
                <p className="text-muted-foreground">Setting up your personalized AI assistants</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">V0 Profiles</h1>
                  <p className="text-muted-foreground">Personalized AI assistants for every workflow</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                Create and manage personalized AI assistants based on expert templates. Each profile can have custom
                traits, tasks, and specialized knowledge for different V0 use cases.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => handleCreateProfile()}
                size="lg"
                className="h-12 px-8 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Profile
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-2">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">{profiles.length}</div>
                <div className="text-sm text-muted-foreground">Total Profiles</div>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">{profiles.filter((p) => p.isActive).length}</div>
                <div className="text-sm text-muted-foreground">Active Profiles</div>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">{templates.length}</div>
                <div className="text-sm text-muted-foreground">Templates Available</div>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {profiles.reduce((sum, p) => sum + (p.usageCount || 0), 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Uses</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="profiles" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2 h-12">
            <TabsTrigger value="profiles" className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4" />
              My Profiles ({profiles.length})
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4" />
              Templates ({templates.length})
            </TabsTrigger>
          </TabsList>

          {/* My Profiles Tab */}
          <TabsContent value="profiles" className="space-y-8">
            {/* Search and Filters */}
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search profiles by name, description, or tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-14 text-base border-2 focus:border-primary transition-colors"
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {/* Filter Toggle */}
                  <div className="flex items-center justify-between">
                    <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>

                    {activeFiltersCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSearchQuery("")
                          setSelectedCategory("all")
                        }}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        Clear all filters
                      </Button>
                    )}
                  </div>

                  {/* Filters */}
                  {showFilters && (
                    <div className="grid gap-4 md:grid-cols-2 p-4 bg-muted/30 rounded-lg border">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger className="h-10">
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

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Sort By</label>
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger className="h-10">
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
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Profiles Grid */}
            {filteredProfiles.length === 0 ? (
              <Card className="border-2 border-dashed">
                <CardContent className="p-12 text-center">
                  <div className="space-y-6">
                    <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
                      <Users className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">
                        {profiles.length === 0 ? "No profiles yet" : "No profiles found"}
                      </h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        {profiles.length === 0
                          ? "Create your first V0 profile to get started with personalized AI assistance."
                          : "Try adjusting your search criteria or filters to find what you're looking for."}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button onClick={() => handleCreateProfile()} className="h-12 px-8">
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
                          className="h-12 px-8"
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
                    className="group card-hover cursor-pointer border-2 hover:border-primary/30 transition-all duration-300"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <Avatar
                            className={`h-12 w-12 border-2 border-background shadow-lg ${getAvatarColor(profile.name)}`}
                          >
                            <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-white font-bold text-sm">
                              {getInitials(profile.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-1 mb-2">
                              {profile.name}
                            </CardTitle>
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="outline" className="text-xs border-primary/30">
                                {profile.category}
                              </Badge>
                              {!profile.isActive && (
                                <Badge variant="secondary" className="text-xs">
                                  Inactive
                                </Badge>
                              )}
                              {profile.usageCount && profile.usageCount > 50 && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs bg-amber-100 text-amber-700 border-amber-200"
                                >
                                  <Crown className="h-3 w-3 mr-1" />
                                  Popular
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
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
                              className="text-destructive focus:text-destructive"
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
                            <Zap className="h-3 w-3 text-primary" />
                            <span>{profile.traits.filter((t) => t.isActive).length} traits</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Settings className="h-3 w-3 text-primary" />
                            <span>{profile.tasks.filter((t) => t.isActive).length} tasks</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3 text-primary" />
                          <span>{profile.usageCount || 0} uses</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {profile.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {profile.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{profile.tags.length - 3} more
                          </Badge>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" onClick={() => handleUseProfile(profile.id)} className="flex-1 h-9">
                          <Play className="h-3 w-3 mr-1" />
                          Use
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewProfile(profile.id)}
                          className="flex-1 h-9"
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
          <TabsContent value="templates" className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className="group card-hover cursor-pointer border-2 hover:border-primary/30 transition-all duration-300"
                  onClick={() => handleCreateProfile(template)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                          {getProfileIcon(template.icon)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-1 mb-2">
                            {template.name}
                          </CardTitle>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="text-xs border-primary/30">
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
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
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
                          <Zap className="h-3 w-3 text-primary" />
                          <span>{template.suggestedTraits.length} traits</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Settings className="h-3 w-3 text-primary" />
                          <span>{template.suggestedTasks.length} tasks</span>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {template.tags.slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {template.tags.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{template.tags.length - 4}
                        </Badge>
                      )}
                    </div>

                    <Button className="w-full h-9 group-hover:shadow-md transition-all duration-200" size="sm">
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
    </div>
  )
}
