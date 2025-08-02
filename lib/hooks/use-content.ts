"use client"

/**
 * Content Hooks
 * Custom React hooks for managing content state and operations
 * These hooks provide a clean interface for components to interact with content
 */

import { useState, useEffect, useCallback, useMemo } from "react"
import { contentService } from "@/lib/services/content-service"
import type { SearchFilters, SearchResult } from "@/lib/core/types"

// Generic hook for content operations
function useContent<T>(fetchFn: (filters?: SearchFilters) => Promise<SearchResult<T>>, initialFilters?: SearchFilters) {
  const [data, setData] = useState<SearchResult<T> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<SearchFilters>(initialFilters || {})

  const fetchData = useCallback(
    async (newFilters?: SearchFilters) => {
      try {
        setLoading(true)
        setError(null)
        const result = await fetchFn(newFilters || filters)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    },
    [fetchFn, filters],
  )

  const updateFilters = useCallback(
    (newFilters: SearchFilters) => {
      setFilters(newFilters)
      fetchData(newFilters)
    },
    [fetchData],
  )

  const clearFilters = useCallback(() => {
    const clearedFilters: SearchFilters = {}
    setFilters(clearedFilters)
    fetchData(clearedFilters)
  }, [fetchData])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    refetch: fetchData,
  }
}

// Specific hooks for each content type
export function usePatterns(initialFilters?: SearchFilters) {
  return useContent(contentService.getPatterns.bind(contentService), initialFilters)
}

export function usePrompts(initialFilters?: SearchFilters) {
  return useContent(contentService.getPrompts.bind(contentService), initialFilters)
}

export function useExamples(initialFilters?: SearchFilters) {
  return useContent(contentService.getExamples.bind(contentService), initialFilters)
}

// Hook for individual content items
export function useContentItem<T>(id: string, fetchFn: (id: string) => Promise<T | null>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchItem = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await fetchFn(id)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchItem()
  }, [id, fetchFn])

  return { data, loading, error }
}

// Specific hooks for individual items
export function usePattern(id: string) {
  return useContentItem(id, contentService.getPattern.bind(contentService))
}

export function usePrompt(id: string) {
  return useContentItem(id, contentService.getPrompt.bind(contentService))
}

export function useExample(id: string) {
  return useContentItem(id, contentService.getExample.bind(contentService))
}

// Hook for search functionality with debouncing
export function useSearch<T>(searchFn: (filters: SearchFilters) => Promise<SearchResult<T>>, debounceMs = 300) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult<T> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debouncedSearch = useMemo(() => {
    let timeoutId: NodeJS.Timeout

    return (searchQuery: string, filters?: Omit<SearchFilters, "query">) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(async () => {
        if (!searchQuery.trim()) {
          setResults(null)
          return
        }

        try {
          setLoading(true)
          setError(null)
          const result = await searchFn({ ...filters, query: searchQuery })
          setResults(result)
        } catch (err) {
          setError(err instanceof Error ? err.message : "Search failed")
        } finally {
          setLoading(false)
        }
      }, debounceMs)
    }
  }, [searchFn, debounceMs])

  const search = useCallback(
    (searchQuery: string, filters?: Omit<SearchFilters, "query">) => {
      setQuery(searchQuery)
      debouncedSearch(searchQuery, filters)
    },
    [debouncedSearch],
  )

  const clearSearch = useCallback(() => {
    setQuery("")
    setResults(null)
    setError(null)
  }, [])

  return {
    query,
    results,
    loading,
    error,
    search,
    clearSearch,
  }
}

// Hook for analytics and interactions
export function useAnalytics() {
  const trackView = useCallback(async (contentType: "pattern" | "prompt" | "example", contentId: string) => {
    try {
      await contentService.trackInteraction({
        action: "view",
        contentType,
        contentId,
        timestamp: new Date(),
      })
    } catch (err) {
      console.warn("Failed to track view:", err)
    }
  }, [])

  const trackCopy = useCallback(async (contentType: "pattern" | "prompt" | "example", contentId: string) => {
    try {
      await contentService.trackInteraction({
        action: "copy",
        contentType,
        contentId,
        timestamp: new Date(),
      })
    } catch (err) {
      console.warn("Failed to track copy:", err)
    }
  }, [])

  const trackLike = useCallback(async (contentType: "pattern" | "prompt" | "example", contentId: string) => {
    try {
      await contentService.trackInteraction({
        action: "like",
        contentType,
        contentId,
        timestamp: new Date(),
      })
    } catch (err) {
      console.warn("Failed to track like:", err)
    }
  }, [])

  const trackDownload = useCallback(async (contentType: "pattern" | "prompt" | "example", contentId: string) => {
    try {
      await contentService.trackInteraction({
        action: "download",
        contentType,
        contentId,
        timestamp: new Date(),
      })
    } catch (err) {
      console.warn("Failed to track download:", err)
    }
  }, [])

  return {
    trackView,
    trackCopy,
    trackLike,
    trackDownload,
  }
}
