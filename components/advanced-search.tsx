"use client"

import type React from "react"

import { useState, useCallback, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Search, X, Filter, Tag, Clock } from "lucide-react"

interface SearchSuggestion {
  id: string
  text: string
  category: string
  type: "recent" | "suggestion" | "tag"
}

interface AdvancedSearchProps {
  placeholder?: string
  onSearch?: (query: string, filters: string[]) => void
  suggestions?: SearchSuggestion[]
  recentSearches?: string[]
  className?: string
}

const defaultSuggestions: SearchSuggestion[] = [
  { id: "1", text: "React components", category: "Components", type: "suggestion" },
  { id: "2", text: "Authentication", category: "Features", type: "suggestion" },
  { id: "3", text: "Dashboard layout", category: "Layouts", type: "suggestion" },
  { id: "4", text: "Form validation", category: "Forms", type: "suggestion" },
  { id: "5", text: "API integration", category: "Integration", type: "tag" },
]

export function AdvancedSearch({
  placeholder = "Search prompts, profiles, and patterns...",
  onSearch,
  suggestions = defaultSuggestions,
  recentSearches = [],
  className,
}: AdvancedSearchProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const filteredSuggestions = useMemo(() => {
    if (!query.trim()) {
      return suggestions.slice(0, 8)
    }

    return suggestions
      .filter(
        (suggestion) =>
          suggestion.text.toLowerCase().includes(query.toLowerCase()) ||
          suggestion.category.toLowerCase().includes(query.toLowerCase()),
      )
      .slice(0, 6)
  }, [query, suggestions])

  const recentSuggestions = useMemo(() => {
    return recentSearches.slice(0, 4).map((search, index) => ({
      id: `recent-${index}`,
      text: search,
      category: "Recent",
      type: "recent" as const,
    }))
  }, [recentSearches])

  const handleSearch = useCallback(
    (searchQuery?: string) => {
      const finalQuery = searchQuery || query
      if (finalQuery.trim()) {
        onSearch?.(finalQuery, selectedFilters)
        setIsOpen(false)
      }
    },
    [query, selectedFilters, onSearch],
  )

  const handleSuggestionClick = useCallback(
    (suggestion: SearchSuggestion) => {
      setQuery(suggestion.text)
      handleSearch(suggestion.text)
    },
    [handleSearch],
  )

  const toggleFilter = useCallback((filter: string) => {
    setSelectedFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }, [])

  const clearFilters = useCallback(() => {
    setSelectedFilters([])
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSearch()
      } else if (e.key === "Escape") {
        setIsOpen(false)
      }
    },
    [handleSearch],
  )

  return (
    <div className={cn("relative w-full max-w-2xl", className)}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-10 pr-10 h-12 text-base bg-background border-border"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuery("")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {selectedFilters.length > 0 && (
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {selectedFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="cursor-pointer hover:bg-muted"
              onClick={() => toggleFilter(filter)}
            >
              {filter}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Search Dropdown */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <Card className="absolute top-full left-0 right-0 mt-2 z-20 border border-border bg-background shadow-lg">
            <CardContent className="p-0">
              <ScrollArea className="max-h-96">
                <div className="p-4 space-y-4">
                  {/* Recent Searches */}
                  {recentSuggestions.length > 0 && !query && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">Recent</span>
                      </div>
                      <div className="space-y-1">
                        {recentSuggestions.map((suggestion) => (
                          <button
                            key={suggestion.id}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full text-left px-3 py-2 rounded-md hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-foreground">{suggestion.text}</span>
                              <Badge variant="outline" className="text-xs">
                                {suggestion.category}
                              </Badge>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggestions */}
                  {filteredSuggestions.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">
                          {query ? "Suggestions" : "Popular"}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {filteredSuggestions.map((suggestion) => (
                          <button
                            key={suggestion.id}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full text-left px-3 py-2 rounded-md hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-foreground">{suggestion.text}</span>
                              <Badge variant={suggestion.type === "tag" ? "default" : "outline"} className="text-xs">
                                {suggestion.category}
                              </Badge>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* No Results */}
                  {query && filteredSuggestions.length === 0 && (
                    <div className="text-center py-6">
                      <p className="text-sm text-muted-foreground">No suggestions found for "{query}"</p>
                      <Button variant="ghost" size="sm" onClick={() => handleSearch()} className="mt-2">
                        Search anyway
                      </Button>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
