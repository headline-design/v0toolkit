"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, Wand2, Users, Target, Sparkles, Clock, ChevronRight, Zap, Activity, Play, Plus, Copy, TrendingUp } from 'lucide-react'
import { v0ProfileService } from "@/lib/services/v0-profile-service"
import { promptGeneratorService } from "@/lib/services/prompt-generator-service"
import type { V0Profile } from "@/lib/types/v0-profile"
import { useToast } from "@/hooks/use-toast"
import type { GeneratedPrompt } from "@/lib/core/types"
import HeroExpert from "@/components/hero-expert"
import ExpertRoleExplainer from "@/components/expert-role-explainer"
import FeaturedSection from "@/components/featured-section"
import BigFooter from "@/components/big-footer"

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
      setRecentPrompts(loadedPrompts.slice(0, 3))
    } catch (error) {
      console.error("Failed to load data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleCopyPrompt = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt)
      toast({ title: "Copied!", description: "Prompt copied to clipboard", duration: 2000 })
    } catch {
      toast({ title: "Error", description: "Failed to copy prompt", variant: "destructive", duration: 3000 })
    }
  }

  const createQuickProfile = () => {
    try {
      const newProfile = v0ProfileService.createQuickProfile()
      setProfiles((prev) => [newProfile, ...prev])
      toast({ title: "Profile Created!", description: `${newProfile.name} is ready to use`, duration: 3000 })
      router.push(`/profile/${newProfile.id}`)
    } catch {
      toast({ title: "Error", description: "Failed to create profile", variant: "destructive", duration: 3000 })
    }
  }

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto p-4">
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="space-y-3 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <Sparkles className="h-6 w-6 animate-pulse text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-medium">Loading V0 Toolkit…</h3>
                <p className="text-sm text-muted-foreground">Setting up your workspace</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const isNewUser = profiles.length === 0 && recentPrompts.length === 0

  if (isNewUser) {
    return (
      <div className="min-h-screen">
        <main className="flex flex-1 flex-col gap-24 md:gap-40">
          <HeroExpert />

          {/* Trusted by (placeholder copy block to match structure) */}
          <section className="container mx-auto max-w-[1120px] px-4 md:px-6">
            <p className="text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Trusted by engineers at
            </p>
          </section>

          <FeaturedSection />

          <ExpertRoleExplainer />

          {/* Focused CTA */}
          <section className="mx-auto max-w-[1120px] px-4 md:px-6">
            <Card className="border bg-background/70 shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Wand2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Ready to generate your expert prompt?</h3>
                <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
                  Define expertise, credibility, context, and deliverables—then reuse it across tasks.
                </p>
                <div className="mt-4">
                  <Button
                    size="sm"
                    className="h-9"
                    onClick={() => router.push("/prompt-generator/editor?template=expert-role-based")}
                  >
                    Use Expert Role‑Based Prompt
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
          <BigFooter />
        </main>
      </div>
    )
  }

  // Existing users
  return (
    <div className="min-h-screen">
      <main className="flex flex-1 flex-col gap-16 p-4 md:gap-24">
        <HeroExpert />
        <FeaturedSection />

        {/* Quick start */}
        <section className="mx-auto max-w-[1120px] rounded-xl border bg-background/70 p-4 shadow-sm md:p-6">
          <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Quick start</h2>
              <p className="text-sm text-muted-foreground">Generate, save, and reuse expert prompts.</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                size="sm"
                className="h-8"
                onClick={() => router.push("/prompt-generator/editor?template=expert-role-based")}
              >
                <Wand2 className="h-4 w-4" />
                <span className="ml-2">Use Expert Role Prompt</span>
                <Badge variant="secondary" className="ml-2 h-4 px-1 text-[10px]">
                  Primary
                </Badge>
              </Button>
              <Button size="sm" variant="outline" className="h-8" onClick={() => router.push("/prompt-generator")}>
                <Target className="h-4 w-4" />
                <span className="ml-2">Browse Templates</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mx-auto grid max-w-[1120px] grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard title="Expert Prompt" subtitle="Primary feature" icon={<Wand2 className="h-4 w-4 text-primary" />} highlight />
          <StatCard title={String(profiles.length)} subtitle="V0 Profiles" icon={<Users className="h-4 w-4" />} />
          <StatCard title={String(recentPrompts.length)} subtitle="Generated Prompts" icon={<Target className="h-4 w-4" />} />
          <StatCard title={String(profiles.filter((p) => p.isActive).length)} subtitle="Active Profiles" icon={<Activity className="h-4 w-4" />} />
        </section>

        <section className="mx-auto grid max-w-[1120px] gap-6 lg:grid-cols-3">
          {/* Recent Profiles */}
          <div className="lg:col-span-2 space-y-4">
            <HeaderRow title="Recent Profiles" actionLabel="View All" onAction={() => router.push("/profiles")} />
            {profiles.length === 0 ? (
              <Card className="border bg-background/70 shadow-sm">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                    <Users className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium">No profiles yet</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Create your first V0 profile to get personalized assistance.</p>
                  <div className="mt-4">
                    <Button size="sm" className="h-8" onClick={createQuickProfile}>
                      <Plus className="h-3.5 w-3.5" />
                      <span className="ml-2">Create Your First Profile</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {profiles.slice(0, 3).map((profile) => (
                  <Card
                    key={profile.id}
                    className="cursor-pointer border bg-background/70 shadow-sm transition-shadow hover:shadow-md"
                    onClick={() => router.push(`/profile/${profile.id}`)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`https://avatar.vercel.sh/${profile.id}?size=400`} alt="" />
                            <AvatarFallback className="text-xs font-medium">{getInitials(profile.name)}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <h3 className="text-sm font-medium">{profile.name}</h3>
                            <p className="line-clamp-1 text-xs text-muted-foreground">{profile.description}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="h-5 px-2 text-[11px]">
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
                            className="h-7 px-3 text-xs opacity-0 transition-opacity group-hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation()
                              router.push(`/profile/${profile.id}`)
                            }}
                          >
                            <Play className="h-3 w-3" />
                            <span className="ml-1">Use</span>
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
            <HeaderRow title="Recent Prompts" actionLabel="View All" onAction={() => router.push("/prompt-generator")} />
            {recentPrompts.length === 0 ? (
              <Card className="border bg-background/70 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Wand2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h3 className="text-sm font-medium">No prompts yet</h3>
                  <p className="mt-1 text-xs text-muted-foreground">Generate your first expert prompt.</p>
                  <div className="mt-3">
                    <Button
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => router.push("/prompt-generator/editor?template=expert-role-based")}
                    >
                      <Wand2 className="h-3 w-3" />
                      <span className="ml-1">Use Expert Prompt</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {recentPrompts.map((prompt) => (
                  <Card key={prompt.id} className="border bg-background/70 shadow-sm">
                    <CardContent className="space-y-3 p-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="h-5 px-2 text-[11px]">
                          {prompt.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{prompt.createdAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="rounded border bg-muted/40 p-3 text-xs">
                        <pre className="line-clamp-3 whitespace-pre-wrap font-mono">{prompt.prompt}</pre>
                      </div>
                      <div className="flex items-center justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleCopyPrompt(prompt.prompt)
                          }}
                        >
                          <Copy className="h-3 w-3" />
                          <span className="ml-1">Copy</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => router.push(`/profiles/create?prompt=${prompt.id}`)}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="ml-1">Profile</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        <ExpertRoleExplainer />
        <BigFooter />
      </main>
    </div>
  )
}

function StatCard({
  title,
  subtitle,
  icon,
  highlight,
}: {
  title: string
  subtitle: string
  icon: React.ReactNode
  highlight?: boolean
}) {
  return (
    <Card className={`border p-4 text-center shadow-sm ${highlight ? "border-primary/30" : ""}`}>
      <CardContent className="p-0">
        <div className="mb-2 flex items-center justify-center">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${highlight ? "bg-primary/10" : "bg-muted"}`}>
            {icon}
          </div>
        </div>
        <div className="text-2xl font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      </CardContent>
    </Card>
  )
}

function HeaderRow({
  title,
  actionLabel,
  onAction,
}: {
  title: string
  actionLabel: string
  onAction: () => void
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Badge variant="secondary" className="h-4 px-1 text-[10px]">
          Experimental
        </Badge>
      </div>
      <Button variant="outline" size="sm" className="h-7 px-3 text-xs" onClick={onAction}>
        {actionLabel}
        <ArrowRight className="ml-1 h-3 w-3" />
      </Button>
    </div>
  )
}
