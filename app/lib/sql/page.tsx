import { LIBRARY } from "@/lib/library/registry"
import LibraryPageClient from "@/components/library/library-page-client"

export default function SQLLibraryPage() {
  const def = LIBRARY.sql
  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8">
      <LibraryPageClient definition={def} />
    </div>
  )
}
