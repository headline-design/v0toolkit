"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

type Size = "default" | "sm" | "lg" | "icon"

export function CopyButton({
  value,
  size = "default",
  className,
  label = "Copy",
}: {
  value: string
  size?: Size
  className?: string
  label?: string
}) {
  const [copied, setCopied] = React.useState(false)
  const { toast } = useToast()

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      toast({ title: "Copied", description: "Snippet copied to clipboard." })
      setTimeout(() => setCopied(false), 1200)
    } catch {
      toast({ title: "Copy failed", description: "Unable to copy to clipboard.", variant: "destructive" })
    }
  }

  return (
    <Button
      type="button"
      onClick={onCopy}
      size={size as any}
      variant="outline"
      className={cn("gap-2", className)}
      aria-label={label}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      <span className="sr-only">{label}</span>
    </Button>
  )
}
