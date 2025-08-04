import { Skeleton } from "@/components/ui/skeleton"

export default function SlateLoading() {
  return (
    <div className="h-screen flex flex-col">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-12 items-center px-4">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-12" />
            <div className="h-4 w-px bg-border" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
      </div>
      <div className="flex-1 relative">
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <div className="absolute inset-0 p-6">
          <div className="flex gap-4">
            <Skeleton className="h-32 w-48" />
            <Skeleton className="h-32 w-48" />
            <Skeleton className="h-32 w-48" />
          </div>
        </div>
      </div>
    </div>
  )
}
