import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Github, Globe } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand section - more refined */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">V0</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold leading-none">V0 Toolkit</span>
                <span className="text-xs text-muted-foreground leading-none">Professional</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Professional patterns and practices for V0 development. Built by the community, for teams shipping
              production software.
            </p>
            <div className="flex items-center space-x-4 mt-6">
              <a
                href="https://github.com/vercel/v0"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
              <a
                href="https://v0.dev"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="h-4 w-4" />
                <span>V0 Platform</span>
              </a>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <div className="space-y-3 text-sm">
              <Link href="/patterns" className="block text-muted-foreground hover:text-foreground transition-colors">
                Design Patterns
              </Link>
              <Link href="/prompts" className="block text-muted-foreground hover:text-foreground transition-colors">
                Prompt Templates
              </Link>
              <Link
                href="/architecture"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Architecture
              </Link>
              <Link href="/examples" className="block text-muted-foreground hover:text-foreground transition-colors">
                Examples
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Community</h3>
            <div className="space-y-3 text-sm">
              <Link
                href="/contributing"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Contributing
              </Link>
              <Link href="/changelog" className="block text-muted-foreground hover:text-foreground transition-colors">
                Changelog
              </Link>
              <a
                href="https://github.com/vercel/v0/discussions"
                className="block text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discussions
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2024 V0 Toolkit. Open source and community driven.</p>
          <p className="mt-2 sm:mt-0">Built with V0 by the community</p>
        </div>
      </div>
    </footer>
  )
}
