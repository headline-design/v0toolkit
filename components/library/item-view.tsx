"use client"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { LibraryItem } from "@/lib/library/types"
import { CodeViewer } from "./code-viewer"

export function ItemView({ item }: { item: LibraryItem }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-semibold">{item.title}</h2>
        {item.description ? (
          <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
        ) : null}
        {item.tags && item.tags.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <Badge key={t} variant="outline">
                {t}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>

      {item.code ? (
        <CodeViewer
          value={item.code.value}
          language={item.code.language}
          filename={item.code.filename}
          highlightLines={item.highlightLines}
          diff={item.diff}
          initialWrap={false}
          initialLineNumbers
        />
      ) : null}

      {item.tips && item.tips.length > 0 ? (
        <>
          <Separator />
          <div>
            <h3 className="text-sm font-medium">Tips</h3>
            <ul className="mt-2 list-disc pl-6 text-sm text-muted-foreground">
              {item.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        </>
      ) : null}

      {item.links && item.links.length > 0 ? (
        <>
          <Separator />
          <div className="flex flex-wrap gap-3">
            {item.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-primary underline underline-offset-4"
              >
                {l.label}
              </a>
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
