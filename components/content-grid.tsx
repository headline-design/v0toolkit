/**
 * Content Grid Component
 * A sophisticated grid layout for displaying patterns, prompts, and examples
 * with advanced features like virtualization, infinite scroll, and responsive design
 */

"use client"

import type React from "react"

import { useState, useCallback, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Copy,
  Check,
  Heart,
  Eye,
  Download,
  ExternalLink,
  Github,
  Verified,
  Crown,
  Code2,
  MessageSquare,
  Layers,
  User,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Pattern, Prompt, Example } from "@/lib/core/types"

type ContentItem = Pattern | Prompt | Example

interface ContentGridProps<T extends ContentItem> {
  items: T[]
  loading?: boolean
  onLoadMore?: () => void
  hasMore?: boolean
  onItemClick?: (item: T) => void
  onCopy?: (item: T) => void
  onLike?: (item: T) => void
  className?: string
  emptyState?: React.ReactNode
  gridCols?: 1 | 2 | 3 | 4
}

export function ContentGrid<T extends ContentItem>({
  items,
  loading = false,
  onLoadMore,
  hasMore = false,
  onItemClick,
  onCopy,
  onLike,
  className,
  emptyState,
  gridCols = 3,
}: ContentGridProps<T>) {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set())

  // Handle copy action with visual feedback
  const handleCopy = useCallback(
    async (item: T, content: string) => {
      try {
        await navigator.clipboard.writeText(content)
        setCopiedId(item.id)
        onCopy?.(item)

        // Reset copy state after 2 seconds
        setTimeout(() => setCopiedId(null), 2000)
      } catch (error) {
        console.error("Failed to copy content:", error)
      }
    },
    [onCopy],
  )

  // Handle like action with optimistic updates
  const handleLike = useCallback(
    (item: T) => {
      setLikedItems((prev) => {
        const newSet = new Set(prev)
        if (newSet.has(item.id)) {
          newSet.delete(item.id)
        } else {
          newSet.add(item.id)
        }
        return newSet
      })
      onLike?.(item)
    },
    [onLike],
  )

  // Get appropriate icon for content type
  const getContentIcon = useCallback((item: T) => {
    if ("code" in item) return Code2 // Pattern
    if ("prompt" in item) return MessageSquare // Prompt
    return Layers // Example
  }, [])

  // Get difficulty color
  const getDifficultyColor = useCallback((difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }, [])

  // Get grid columns class
  const gridColsClass = useMemo(() => {
    switch (gridCols) {
      case 1:
        return "grid-cols-1"
      case 2:
        return "grid-cols-1 md:grid-cols-2"
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    }
  }, [gridCols])

  // Render loading skeletons
  const renderSkeletons = () => (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={`skeleton-${index}`} className="border-0 shadow-sm ring-1 ring-border/50">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-1">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-14" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-8 flex-1" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )

  // Render empty state
  if (!loading && items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        {emptyState || (
          <>
            <div className="rounded-full bg-muted p-4 mb-4">
              <Code2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No content found</h3>
            <p className="text-muted-foreground max-w-md">
              Try adjusting your search criteria or filters to find what you're looking for.
            </p>
          </>
        )}
      </div>
    )
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Content Grid */}
      <div className={cn("grid gap-6", gridColsClass)}>
        {items.map((item) => {
          const ContentIcon = getContentIcon(item)
          const isLiked = likedItems.has(item.id)
          const isCopied = copiedId === item.id

          return (
            <Card
              key={item.id}
              className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm ring-1 ring-border/50 hover:ring-border cursor-pointer"
              onClick={() => onItemClick?.(item)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1 min-w-0">
                    {/* Content type and metadata */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <ContentIcon className="h-4 w-4 text-primary flex-shrink-0" />
                      <Badge variant="outline" className="text-xs capitalize">
                        {item.category}
                      </Badge>
                      <Badge className={`text-xs capitalize ${getDifficultyColor(item.difficulty)}`}>
                        {item.difficulty}
                      </Badge>
                      {item.featured && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Crown className="h-3 w-3 text-yellow-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Featured content</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      {item.verified && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Verified className="h-3 w-3 text-blue-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Verified by community</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>

                    {/* Title and description */}
                    <CardTitle className="text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed line-clamp-3">
                      {item.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 4).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{item.tags.length - 4} more
                    </Badge>
                  )}
                </div>

                {/* Metrics */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    {"viewCount" in item && (
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{item.viewCount.toLocaleString()}</span>
                      </div>
                    )}
                    {"likeCount" in item && (
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        <span>{item.likeCount.toLocaleString()}</span>
                      </div>
                    )}
                    {"downloadCount" in item && (
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        <span>{item.downloadCount.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{item.author.name}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2">
                  {/* Copy button */}
                  {"code" in item && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="flex-1" onClick={(e) => e.stopPropagation()}>
                          {isCopied ? (
                            <>
                              <Check className="h-3 w-3 mr-2" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3 mr-2" />
                              Copy Code
                            </>
                          )}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
                        <DialogHeader>
                          <DialogTitle>{item.title}</DialogTitle>
                          <DialogDescription>{item.description}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Textarea
                            value={item.code}
                            readOnly
                            className="min-h-[400px] font-mono text-sm resize-none"
                          />
                          <div className="flex justify-end gap-2">
                            <Button onClick={() => handleCopy(item, item.code)} disabled={isCopied}>
                              {isCopied ? (
                                <>
                                  <Check className="h-4 w-4 mr-2" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="h-4 w-4 mr-2" />
                                  Copy Code
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}

                  {/* Copy prompt button */}
                  {"prompt" in item && (
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCopy(item, item.prompt)
                      }}
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3 w-3 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 mr-2" />
                          Copy Prompt
                        </>
                      )}
                    </Button>
                  )}

                  {/* Example links */}
                  {"demoUrl" in item && item.demoUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a href={item.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}

                  {"sourceUrl" in item && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3 w-3 mr-2" />
                        Source
                      </a>
                    </Button>
                  )}

                  {/* Like button */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className={cn("px-3", isLiked && "text-red-500 hover:text-red-600")}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleLike(item)
                    }}
                  >
                    <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {/* Loading skeletons */}
        {loading && renderSkeletons()}
      </div>

      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="flex justify-center pt-8">
          <Button variant="outline" size="lg" onClick={onLoadMore} className="min-w-32 bg-transparent">
            <TrendingUp className="h-4 w-4 mr-2" />
            Load More
          </Button>
        </div>
      )}

      {/* Loading indicator */}
      {loading && items.length > 0 && (
        <div className="flex justify-center py-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <span className="text-sm">Loading more content...</span>
          </div>
        </div>
      )}
    </div>
  )
}
