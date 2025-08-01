import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function PromptsLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-5 w-96" />
        </div>

        {/* Search and Filters Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-10 flex-1" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-18" />
          </div>
        </div>
      </div>

      {/* Results Count Skeleton */}
      <Skeleton className="h-4 w-32" />

      {/* Prompts Grid Skeleton */}
      <div className="grid gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="border-0 shadow-sm ring-1 ring-border/50">
            <CardHeader>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="h-6 w-64" />
                <Skeleton className="h-4 w-full" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-1">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-14" />
              </div>
              <Skeleton className="h-20 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-8 flex-1" />
                <Skeleton className="h-8 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
