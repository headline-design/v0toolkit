export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header Skeleton */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto p-6">
          <div className="flex items-center gap-4">
            <div className="h-9 w-24 bg-muted rounded animate-pulse" />
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-3">
              <div className="h-6 w-20 bg-muted rounded animate-pulse" />
              <div className="h-4 w-4 bg-muted rounded animate-pulse" />
              <div className="h-4 w-16 bg-muted rounded animate-pulse" />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="h-9 w-20 bg-muted rounded animate-pulse" />
              <div className="h-9 w-24 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-8">
        {/* Profile Header Skeleton */}
        <div className="bg-white rounded-lg border overflow-hidden">
          {/* Cover Photo */}
          <div className="h-32 bg-muted animate-pulse" />

          <div className="relative p-6">
            {/* Avatar */}
            <div className="absolute -top-16 left-6">
              <div className="h-24 w-24 bg-muted rounded-full border-4 border-background animate-pulse" />
            </div>

            {/* Profile Info */}
            <div className="pt-10 space-y-4">
              <div className="space-y-2">
                <div className="h-8 w-48 bg-muted rounded animate-pulse" />
                <div className="h-5 w-96 bg-muted rounded animate-pulse" />
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6">
                <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                <div className="h-4 w-28 bg-muted rounded animate-pulse" />
              </div>

              {/* Tags */}
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-muted rounded animate-pulse" />
                <div className="h-6 w-20 bg-muted rounded animate-pulse" />
                <div className="h-6 w-18 bg-muted rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="space-y-6">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            <div className="h-10 w-32 bg-background rounded animate-pulse" />
            <div className="h-10 w-32 bg-muted rounded animate-pulse" />
            <div className="h-10 w-32 bg-muted rounded animate-pulse" />
          </div>

          {/* Content Skeleton */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border p-6 space-y-4">
                <div className="h-6 w-32 bg-muted rounded animate-pulse" />
                <div className="h-4 w-full bg-muted rounded animate-pulse" />
                <div className="h-10 w-full bg-muted rounded animate-pulse" />
                <div className="h-12 w-full bg-muted rounded animate-pulse" />
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border p-6 space-y-4">
                <div className="h-6 w-40 bg-muted rounded animate-pulse" />
                <div className="h-64 w-full bg-muted rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
