"use client"

import { Database, MessageSquare } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export function TypeHeader({
  title,
  description,
  icon,
  className,
}: {
  title: string
  description?: string
  icon: "Database" | "MessageSquare"
  className?: string
}) {
  const Icon = icon === "Database" ? Database : MessageSquare
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <div className="mt-0.5 rounded-md bg-muted p-2">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <h1 className="text-lg font-semibold leading-tight">{title}</h1>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
    </div>
  )
}
