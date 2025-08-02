/**
 * Advanced Search Component
 * A sophisticated search interface with real-time filtering, faceted search,
 * and intelligent suggestions. Built for the V0 Toolkit professional experience.
 */

"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Search, Filter, X, Sparkles, Clock, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SearchFilters, SearchFacets } from "@/lib/core/types"

interface AdvancedSearchProps {
  onFiltersChange: (filters: SearchFilters) => void
  facets?: SearchFacets
  loading?: boolean
  placeholder?: string
  showSuggestions?: boolean
  className?: string
}

interface SearchSuggestion {
  type: "recent" | "popular" | "suggestion"
  text: string
  count?: number
}

export function AdvancedSearch({
  onFiltersChange,
  facets,
  loading = false,
  placeholder = "Search patterns, prompts, and examples...",
  showSuggestionsProp = true,
  className,
}: AdvancedSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showSuggestions, setShowSuggestions] = useState(showSuggestionsProp) // Declared setShowSuggestions

  // State management
  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [filters, setFilters] = useState<SearchFilters>({
    query: searchParams.get("q") || "",
    categories: searchParams.getAll("category"),
    difficulty: searchParams.getAll("difficulty") as any[],
    tags: searchParams.getAll("tag"),
    featured: searchParams.get("featured") === "true" ? true : undefined,
    verified: searchParams.get("verified") === "true" ? true : undefined,
  })

  const [showFilters, setShowFilters] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  // Mock suggestions - in a real app, these would come from an API
  const suggestions: SearchSuggestion[] = useMemo(
    () => [
      { type: "popular", text: "dashboard layout", count: 234 },
      { type: "popular", text: "data table", count: 189 },
      { type: "popular", text: "authentication form", count: 156 },
      { type: "suggestion", text: "responsive navigation" },
      { type: "suggestion", text: "chart components" },
      ...recentSearches.slice(0, 3).map((text) => ({ type: "recent" as const, text })),
    ],
    [recentSearches],
  )

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const newFilters = { ...filters, query }
      setFilters(newFilters)
      onFiltersChange(newFilters)
      updateURL(newFilters)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query]) // eslint-disable-line react-hooks/exhaustive-deps

  // Update URL with current filters
  const updateURL = useCallback(
    (currentFilters: SearchFilters) => {
      const params = new URLSearchParams()

      if (currentFilters.query) params.set("q", currentFilters.query)
      currentFilters.categories?.forEach((cat) => params.append("category", cat))
      currentFilters.difficulty?.forEach((diff) => params.append("difficulty", diff))
      currentFilters.tags?.forEach((tag) => params.append("tag", tag))
      if (currentFilters.featured) params.set("featured", "true")
      if (currentFilters.verified) params.set("verified", "true")

      const newURL = params.toString() ? `?${params.toString()}` : ""
      router.replace(newURL, { scroll: false })
    },
    [router],
  )

  // Handle filter changes
  const handleFilterChange = useCallback(
    (key: keyof SearchFilters, value: any) => {
      const newFilters = { ...filters, [key]: value }
      setFilters(newFilters)
      onFiltersChange(newFilters)
      updateURL(newFilters)
    },
    [filters, onFiltersChange, updateURL],
  )

  // Handle array filter changes (categories, tags, etc.)
  const handleArrayFilterChange = useCallback(
    (key: "categories" | "difficulty" | "tags", value: string, checked: boolean) => {
      const currentArray = filters[key] || []
      const newArray = checked ? [...currentArray, value] : currentArray.filter((item) => item !== value)

      handleFilterChange(key, newArray.length > 0 ? newArray : undefined)
    },
    [filters, handleFilterChange],
  )

  // Handle search submission
  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery)
    setShowSuggestions(false)

    // Add to recent searches
    setRecentSearches((prev) => {
      const updated = [searchQuery, ...prev.filter((s) => s !== searchQuery)].slice(0, 5)
      localStorage.setItem("v0toolkit-recent-searches", JSON.stringify(updated))
      return updated
    })
  }, [])

  // Load recent searches on mount
  useEffect(() => {
    const saved = localStorage.getItem("v0toolkit-recent-searches")
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved))
      } catch (e) {
        console.warn("Failed to parse recent searches")
      }
    }
  }, [])

  // Clear all filters
  const clearFilters = useCallback(() => {
    const clearedFilters: SearchFilters = { query }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
    updateURL(clearedFilters)
  }, [query, onFiltersChange, updateURL])

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.categories?.length) count += filters.categories.length
    if (filters.difficulty?.length) count += filters.difficulty.length
    if (filters.tags?.length) count += filters.tags.length
    if (filters.featured) count += 1
    if (filters.verified) count += 1
    return count
  }, [filters])

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowFilters(true)}
            placeholder={placeholder}
            className="pl-10 pr-12 h-12 text-base"
            disabled={loading}
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
              onClick={() => {
                setQuery("")
                handleFilterChange("query", "")
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border rounded-md shadow-lg">
            <Command>
              <CommandList className="max-h-64">
                {suggestions.filter((s) => s.type === "recent").length > 0 && (
                  <CommandGroup heading="Recent Searches">
                    {suggestions
                      .filter((s) => s.type === "recent")
                      .map((suggestion, index) => (
                        <CommandItem
                          key={`recent-${index}`}
                          onSelect={() => handleSearch(suggestion.text)}
                          className="flex items-center gap-2"
                        >
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          {suggestion.text}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                )}

                {suggestions.filter((s) => s.type === "popular").length > 0 && (
                  <CommandGroup heading="Popular Searches">
                    {suggestions
                      .filter((s) => s.type === "popular")
                      .map((suggestion, index) => (
                        <CommandItem
                          key={`popular-${index}`}
                          onSelect={() => handleSearch(suggestion.text)}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-3 w-3 text-muted-foreground" />
                            {suggestion.text}
                          </div>
                          {suggestion.count && (
                            <Badge variant="secondary" className="text-xs">
                              {suggestion.count}
                            </Badge>
                          )}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                )}

                {suggestions.filter((s) => s.type === "suggestion").length > 0 && (
                  <CommandGroup heading="Suggestions">
                    {suggestions
                      .filter((s) => s.type === "suggestion")
                      .map((suggestion, index) => (
                        <CommandItem
                          key={`suggestion-${index}`}
                          onSelect={() => handleSearch(suggestion.text)}
                          className="flex items-center gap-2"
                        >
                          <Sparkles className="h-3 w-3 text-muted-foreground" />
                          {suggestion.text}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </div>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="h-9">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </Button>

          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9 text-muted-foreground">
              Clear all
            </Button>
          )}
        </div>

        {/* Active Filter Tags */}
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            {filters.categories?.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="h-6 text-xs cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => handleArrayFilterChange("categories", category, false)}
              >
                {category}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
            {filters.difficulty?.map((difficulty) => (
              <Badge
                key={difficulty}
                variant="secondary"
                className="h-6 text-xs cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => handleArrayFilterChange("difficulty", difficulty, false)}
              >
                {difficulty}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
            {filters.tags?.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="h-6 text-xs cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => handleArrayFilterChange("tags", tag, false)}
              >
                {tag}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
            {filters.featured && (
              <Badge
                variant="secondary"
                className="h-6 text-xs cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => handleFilterChange("featured", undefined)}
              >
                Featured
                <X className="h-3 w-3 ml-1" />
              </Badge>
            )}
            {filters.verified && (
              <Badge
                variant="secondary"
                className="h-6 text-xs cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => handleFilterChange("verified", undefined)}
              >
                Verified
                <X className="h-3 w-3 ml-1" />
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Advanced Filters Panel */}
      <Collapsible open={showFilters} onOpenChange={setShowFilters}>
        <CollapsibleContent className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 p-4 border rounded-lg bg-muted/30">
            {/* Categories Filter */}
            {facets?.categories && facets.categories.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Categories</Label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {facets.categories.map(({ value, count }) => (
                    <div key={value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${value}`}
                        checked={filters.categories?.includes(value) || false}
                        onCheckedChange={(checked) => handleArrayFilterChange("categories", value, checked as boolean)}
                      />
                      <Label
                        htmlFor={`category-${value}`}
                        className="text-sm font-normal cursor-pointer flex-1 flex items-center justify-between"
                      >
                        <span className="capitalize">{value}</span>
                        <span className="text-xs text-muted-foreground">({count})</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Difficulty Filter */}
            {facets?.difficulty && facets.difficulty.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Difficulty</Label>
                <div className="space-y-2">
                  {facets.difficulty.map(({ value, count }) => (
                    <div key={value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`difficulty-${value}`}
                        checked={filters.difficulty?.includes(value as any) || false}
                        onCheckedChange={(checked) => handleArrayFilterChange("difficulty", value, checked as boolean)}
                      />
                      <Label
                        htmlFor={`difficulty-${value}`}
                        className="text-sm font-normal cursor-pointer flex-1 flex items-center justify-between"
                      >
                        <span className="capitalize">{value}</span>
                        <span className="text-xs text-muted-foreground">({count})</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags Filter */}
            {facets?.tags && facets.tags.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Popular Tags</Label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {facets.tags.slice(0, 10).map(({ value, count }) => (
                    <div key={value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tag-${value}`}
                        checked={filters.tags?.includes(value) || false}
                        onCheckedChange={(checked) => handleArrayFilterChange("tags", value, checked as boolean)}
                      />
                      <Label
                        htmlFor={`tag-${value}`}
                        className="text-sm font-normal cursor-pointer flex-1 flex items-center justify-between"
                      >
                        <span>{value}</span>
                        <span className="text-xs text-muted-foreground">({count})</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quality Filters */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Quality</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={filters.featured || false}
                    onCheckedChange={(checked) => handleFilterChange("featured", checked ? true : undefined)}
                  />
                  <Label htmlFor="featured" className="text-sm font-normal cursor-pointer">
                    Featured Content
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="verified"
                    checked={filters.verified || false}
                    onCheckedChange={(checked) => handleFilterChange("verified", checked ? true : undefined)}
                  />
                  <Label htmlFor="verified" className="text-sm font-normal cursor-pointer">
                    Verified by Community
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
