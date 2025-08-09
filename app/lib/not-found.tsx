import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container max-w-screen-md px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">Library page not found</h1>
      <p className="text-muted-foreground mt-2">The library type you requested does not exist.</p>
      <div className="mt-6">
        <Link href="/lib" className="underline underline-offset-4">
          Back to Library
        </Link>
      </div>
    </div>
  )
}
