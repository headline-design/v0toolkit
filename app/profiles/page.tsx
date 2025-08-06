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
  ChevronRight,
  Clock,
  Target,
  Activity,
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
import { ProfileEditDialog } from "@/components/profile-edit-dialog"
import { useToast } from "@/hooks/use-toast"

export default function V0ProfilesPage() {
  const router = useRouter()
  const { toast } = useToast()
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
        return <UserCog className="h-3 w-3" />
      case "Palette":
        return <Palette className="h-3 w-3" />
      case "FileCode":
        return <FileCode className="h-3 w-3" />
      default:
        return <Users className="h-3 w-3" />
    }
  }

  const handleCreateProfile = (template?: ProfileTemplate) => {
    if (template) {
      router.push(`/profiles/create?template=${template.id}`)
    } else {
      router.push("/profiles/create")
    }
  }

  const handleUseProfile = (profileId: string) => {
    router.push(`/profile/${profileId}`)
  }

  const handleViewProfile = (profileId: string) => {
    router.push(`/profile/${profileId}`)
  }

  const handleDeleteProfile = async (profileId: string) => {
    if (confirm("Are you sure you want to delete this profile?")) {
      try {
        v0ProfileService.deleteProfile(profileId)
        setProfiles(profiles.filter((p) => p.id !== profileId))
        toast({
          title: "Profile Deleted",
          description: "Profile has been successfully deleted",
          duration: 3000,
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete profile",
          variant: "destructive",
          duration: 3000,
        })
      }
    }
  }

  const handleDuplicateProfile = (profile: V0Profile) => {
    try {
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
      setProfiles([duplicatedProfile, ...profiles])
      toast({
        title: "Profile Duplicated",
        description: `${duplicatedProfile.name} has been created`,
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to duplicate profile",
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

  const activeFiltersCount = [selectedCategory !== "all", searchQuery].filter(Boolean).length

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 mx-auto bg-muted rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-muted-foreground animate-pulse" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-medium">Loading V0 Profiles...</h3>
                <p className="text-sm text-muted-foreground">Setting up your personalized AI assistants</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show onboarding if no profiles exist
  if (profiles.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto p-4 space-y-8">
          {/* Header */}
          <div className="text-center space-y-6 py-8">
            <div className="w-16 h-16 mx-auto bg-foreground rounded-lg flex items-center justify-center">
              <Users className="h-8 w-8 text-background" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Welcome to V0 Profiles</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Create personalized AI assistants that understand your workflow and provide tailored V0 assistance.
              </p>
            </div>
          </div>

          {/* Onboarding Steps */}
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="text-center p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mx-auto bg-muted rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">1. Choose Your Base</h3>
                <p className="text-sm text-muted-foreground">
                  Start with a generated prompt from our Prompt Generator or use a pre-built template
                </p>
              </Card>
              <Card className="text-center p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mx-auto bg-muted rounded-lg flex items-center justify-center mb-4">
                  <Settings className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">2. Customize Traits</h3>
                <p className="text-sm text-muted-foreground">
                  Add personality traits and specialized knowledge to make your assistant unique
                </p>
              </Card>
              <Card className="text-center p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mx-auto bg-muted rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">3. Start Using</h3>
                <p className="text-sm text-muted-foreground">
                  Generate prompts tailored to your specific needs and copy them to V0
                </p>
              </Card>
            </div>
          </div>

          {/* Quick Start Options */}
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Get Started</h2>
              <p className="text-muted-foreground">Choose how you'd like to create your first profile</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => router.push("/prompt-generator")}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto bg-foreground rounded-lg flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-background" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Generate a Prompt First</h3>
                    <p className="text-sm text-muted-foreground">
                      Create a specialized prompt using our generator, then build a profile on top of it
                    </p>
                  </div>
                  <Button className="w-full h-8">
                    Start with Prompt Generator
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleCreateProfile()}>
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto bg-muted rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Use a Template</h3>
                    <p className="text-sm text-muted-foreground">
                      Start with a pre-built template designed for common V0 workflows
                    </p>
                  </div>
                  <Button variant="outline" className="w-full h-8 bg-transparent">
                    Browse Templates
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Popular Templates Preview */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center">Popular Templates</h3>
              <div className="grid gap-3">
                {templates.slice(0, 2).map((template) => (
                  <Card
                    key={template.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleCreateProfile(template)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                            {getProfileIcon(template.icon)}
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{template.name}</h4>
                            <p className="text-xs text-muted-foreground">{template.description}</p>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 space-y-6">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">V0 Profiles</h1>
                  <p className="text-muted-foreground">Personalized AI assistants for every workflow</p>
                </div>
              </div>
              <p className="text-muted-foreground max-w-3xl">
                Create and manage personalized AI assistants based on expert templates. Each profile can have custom
                traits, tasks, and specialized knowledge for different V0 use cases.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button onClick={() => handleCreateProfile()} size="sm" className="h-8 px-6">
                <Plus className="h-3 w-3 mr-2" />
                Create Profile
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">{profiles.length}</div>
                <div className="text-xs text-muted-foreground">Total Profiles</div>
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
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                    <Sparkles className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">{templates.length}</div>
                <div className="text-xs text-muted-foreground">Templates Available</div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">
                  {profiles.reduce((sum, p) => sum + (p.usageCount || 0), 0)}
                </div>
                <div className="text-xs text-muted-foreground">Total Uses</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="profiles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2 h-9">
            <TabsTrigger value="profiles" className="flex items-center gap-2 text-sm">
              <Users className="h-3 w-3" />
              My Profiles ({profiles.length})
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2 text-sm">
              <Sparkles className="h-3 w-3" />
              Templates ({templates.length})
            </TabsTrigger>
          </TabsList>

          {/* My Profiles Tab */}
          <TabsContent value="profiles" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search profiles by name, description, or tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 h-9"
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>

                  {/* Filter Toggle */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setShowFilters(!showFilters)}
                      size="sm"
                      className="gap-2 h-7"
                    >
                      <Filter className="h-3 w-3" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <Badge variant="secondary" className="ml-1 h-4 w-4 rounded-full p-0 text-xs">
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
                        className="text-muted-foreground hover:text-foreground h-7 text-xs"
                      >
                        Clear all filters
                      </Button>
                    )}
                  </div>

                  {/* Filters */}
                  {showFilters && (
                    <div className="grid gap-3 md:grid-cols-2 p-4 bg-muted/50 rounded-lg">
                      <div className="space-y-1">
                        <label className="text-xs font-medium">Category</label>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger className="h-8">
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

                      <div className="space-y-1">
                        <label className="text-xs font-medium">Sort By</label>
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger className="h-8">
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
              <Card className="border-dashed">
                <CardContent className="p-8 text-center">
                  <div className="space-y-4">
                    <div className="w-12 h-12 mx-auto bg-muted rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">No profiles found</h3>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto">
                        Try adjusting your search criteria or filters to find what you're looking for.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchQuery("")
                          setSelectedCategory("all")
                        }}
                        size="sm"
                        className="h-8 px-6"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredProfiles.map((profile) => (
                  <Card key={profile.id} className="cursor-pointer transition-shadow hover:shadow-md">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`https://avatar.vercel.sh/${profile.id}?size=400`} />
                            <AvatarFallback className="text-xs font-medium">{getInitials(profile.name)}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <CardTitle className="text-sm line-clamp-1 mb-1">{profile.name}</CardTitle>
                            <div className="flex items-center gap-1 flex-wrap">
                              <Badge variant="outline" className="text-xs h-4 px-1">
                                {profile.category}
                              </Badge>
                              {!profile.isActive && (
                                <Badge variant="secondary" className="text-xs h-4 px-1">
                                  Inactive
                                </Badge>
                              )}
                              {profile.usageCount && profile.usageCount > 50 && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs h-4 px-1 bg-yellow-50 text-yellow-700 border-yellow-200"
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
                              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem onClick={() => handleViewProfile(profile.id)}>
                              <Eye className="h-3 w-3 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUseProfile(profile.id)}>
                              <Play className="h-3 w-3 mr-2" />
                              Use Profile
                            </DropdownMenuItem>
                            <ProfileEditDialog
                              profile={profile}
                              onProfileUpdate={(updatedProfile) => {
                                setProfiles(profiles.map((p) => (p.id === updatedProfile.id ? updatedProfile : p)))
                              }}
                              trigger={
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <Edit className="h-3 w-3 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                              }
                            />
                            <DropdownMenuItem onClick={() => handleDuplicateProfile(profile)}>
                              <Copy className="h-3 w-3 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteProfile(profile.id)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="h-3 w-3 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3" onClick={() => handleViewProfile(profile.id)}>
                      <CardDescription className="text-xs leading-relaxed line-clamp-2">
                        {profile.description}
                      </CardDescription>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
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
                          <TrendingUp className="h-3 w-3" />
                          <span>{profile.usageCount || 0} uses</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {profile.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs h-4 px-1">
                            {tag}
                          </Badge>
                        ))}
                        {profile.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs h-4 px-1">
                            +{profile.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleUseProfile(profile.id)
                          }}
                          className="flex-1 h-7 text-xs"
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Use
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleViewProfile(profile.id)
                          }}
                          className="flex-1 h-7 text-xs"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </div>

                      {/* Last used */}
                      {profile.lastUsed && (
                        <div className="text-xs text-muted-foreground pt-2 border-t flex items-center gap-1">
                          <Clock className="h-3 w-3" />
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className="cursor-pointer transition-shadow hover:shadow-md"
                  onClick={() => handleCreateProfile(template)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                          {getProfileIcon(template.icon)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-sm line-clamp-1 mb-1">{template.name}</CardTitle>
                          <div className="flex items-center gap-1 flex-wrap">
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
                      <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <CardDescription className="text-xs leading-relaxed line-clamp-2">
                      {template.description}
                    </CardDescription>

                    {/* Template Stats */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
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
                        <Badge key={tag} variant="secondary" className="text-xs h-4 px-1">
                          {tag}
                        </Badge>
                      ))}
                      {template.tags.length > 4 && (
                        <Badge variant="secondary" className="text-xs h-4 px-1">
                          +{template.tags.length - 4}
                        </Badge>
                      )}
                    </div>

                    <Button className="w-full h-7 text-xs" size="sm">
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
