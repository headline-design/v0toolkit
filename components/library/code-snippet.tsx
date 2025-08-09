"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CopyButton } from "./copy-button"

interface CodeSnippetProps {
language?: string
value: string
className?: string
minHeight?: number | string
maxHeight?: number | string
wrap?: boolean
}

export function CodeSnippet({
language,
value,
className,
minHeight = 160,
maxHeight = 384, // 24rem default
wrap = true,
}: CodeSnippetProps) {
const containerStyle: React.CSSProperties = {
  minHeight: typeof minHeight === "number" ? `${minHeight}px` : minHeight,
  maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
  scrollbarGutter: "stable both-edges",
}

return (
  <Card className={cn("overflow-hidden", className)}>
    <div className="flex items-center justify-between border-b px-3 py-2">
      <div className="flex items-center gap-2">
        {language ? <Badge variant="outline">{language}</Badge> : null}
      </div>
      <CopyButton value={value} />
    </div>
    <CardContent className="p-0">
      {/* Internal scrollbars with native overflow handling, both axes */}
      <div
        className="relative w-full overflow-x-auto overflow-y-auto resize-y"
        role="region"
        aria-label="Code snippet"
        tabIndex={0}
        dir="ltr"
        style={containerStyle}
      >
        <pre
          className={cn(
            "m-0 p-4 text-sm leading-relaxed font-mono",
            wrap ? "whitespace-pre-wrap break-words" : "whitespace-pre",
            // Ensure long lines create a horizontal scrollbar
            "min-w-full w-max"
          )}
        >
          <code>{value}</code>
        </pre>
      </div>
    </CardContent>
  </Card>
)
}
