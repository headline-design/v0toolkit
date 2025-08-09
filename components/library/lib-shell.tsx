"use client"

import * as React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function LibShell({
  header,
  sidebar,
  content,
  className,
}: {
  header: React.ReactNode
  sidebar: React.ReactNode
  content: React.ReactNode
  className?: string
}) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-0">{header}</CardHeader>
      <CardContent className="pt-4">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <div>{sidebar}</div>
          <div>{content}</div>
        </div>
      </CardContent>
    </Card>
  )
}
