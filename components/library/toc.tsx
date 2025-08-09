import type { LibraryDefinition } from "@/lib/library/types"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Toc({ def }: { def: LibraryDefinition }) {
  if (!def.sections?.length) return null

  return (
    <nav className="space-y-2">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Sections</div>
      <ul className="space-y-1">
        {def.sections.map((s) => (
          <li key={s.id}>
            <Link
              href={`#${s.id}`}
              className={cn(
                "block rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {s.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
