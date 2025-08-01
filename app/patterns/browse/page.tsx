"use client"

import { useState } from "react"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter } from "lucide-react"
import { patterns } from "@/lib/data/patterns"

const sidebarItems = [
  {
    id: "all",
    title: "All Patterns",
    href: "/patterns/browse",
    count: patterns.length,
  },
  {
    id: "layout",
    title: "Layout",
    href: "/patterns/browse/layout",
    count: patterns.filter((p) => p.category === "layout").length,
  },
  {
    id: "navigation",
    title: "Navigation",
    href: "/patterns/browse/navigation",
    count: patterns.filter((p) => p.category === "navigation").length,
  },
  {
    id: "forms",
    title: "Forms",
    href: "/patterns/browse/forms",
    count: patterns.filter((p) => p.category === "forms").length,
  },
  {
    id: "data",
    title: "Data Display",
    href: "/patterns/browse/data",
    count: patterns.filter((p) => p.category === "data").length,
  },
  {
    id: "feedback",
    title: "Feedback",
    href: "/patterns/browse/feedback",
    count: patterns.filter((p) => p.category === "feedback").length,
  },
  {
    id: "commerce",
    title: "Commerce",
    href: "/patterns/browse/commerce",
    count: patterns.filter((p) => p.category === "commerce").length,
  },
]

export default function PatternsBrowsePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")

  const filteredPatterns = patterns.filter((pattern) => {
    const matchesSearch =
      pattern.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pattern.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pattern.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesDifficulty = selectedDifficulty === "all" || pattern.difficulty === selectedDifficulty

    return matchesSearch && matchesDifficulty
  })

  return (
    <SidebarLayout
      title="UI Patterns"
      description="Browse production-ready patterns"
      sidebarItems={sidebarItems}
      className="p-6"
    >
      <div className="space-y-6">
        {/* Search and Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search patterns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-1">
              <Button
                variant={selectedDifficulty === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty("all")}
              >
                All
              </Button>
              <Button
                variant={selectedDifficulty === "beginner" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty("beginner")}
              >
                Beginner
              </Button>
              <Button
                variant={selectedDifficulty === "intermediate" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty("intermediate")}
              >
                Intermediate
              </Button>
              <Button
                variant={selectedDifficulty === "advanced" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty("advanced")}
              >
                Advanced
              </Button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">All Patterns</h1>
            <p className="text-muted-foreground">
              {filteredPatterns.length} pattern{filteredPatterns.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <Badge variant="secondary">{filteredPatterns.length} results</Badge>
        </div>

        {/* Patterns Grid */}
        <div className="grid gap-6 lg:grid-cols-1 xl:grid-cols-2">
          {filteredPatterns.map((pattern) => (
            <div key={pattern.id}>
              {/* Individual pattern card would go here - simplified for now */}
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold">{pattern.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{pattern.description}</p>
                <div className="flex gap-1 mt-2">
                  {pattern.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SidebarLayout>
  )
}
