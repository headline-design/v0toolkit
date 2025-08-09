import type { LibraryItem } from "../../types"

export const installNextjsAppRouter: LibraryItem = {
  id: "install-nextjs-app-router",
  title: "Install Next.js (App Router) project",
  description:
    "Template prompt to generate a clean, step-by-step installation guide for Next.js App Router with TypeScript, Tailwind, ESLint, and shadcn/ui.",
  section: "installation",
  code: {
    language: "markdown",
    filename: "nextjs-app-router-installation.md",
    value: `Role
You are a senior Next.js engineer. Produce precise, copy-pasteable installation steps.

Task
Create a new Next.js 15 App Router project with:
- TypeScript, ESLint, Tailwind CSS
- App Router enabled
- shadcn/ui initialized

Constraints
- Use create-next-app.
- Show commands first, then brief notes.
- Keep it deterministic and reproducible.

Inputs
- {projectName}: The project name (default: app-starter)

Output format
- Use markdown with sections: Prereqs, Create App, Tailwind, shadcn/ui, Run.
- Use fenced code blocks for commands.

--- Prompt ---

# Prereqs
- Node.js 18.18+ installed
- pnpm or npm (choose one and stay consistent)

# Create App
\`\`\`bash
npx create-next-app@latest {projectName} \\
  --ts \\
  --eslint \\
  --tailwind \\
  --app \\
  --src-dir=false \\
  --use-npm
\`\`\`

Notes:
- Accept defaults unless specified above.
- App Router is enabled with --app.

# Tailwind (already configured by the flag)
- Confirm tailwind.config.ts and globals.css are generated.

# shadcn/ui
\`\`\`bash
cd {projectName}
npx shadcn@latest init
\`\`\`
When prompted:
- Style: Default
- Base color: Neutral or Slate
- CSS variables: Yes

Add a component (example):
\`\`\`bash
npx shadcn@latest add button card input
\`\`\`

# Run
\`\`\`bash
npm run dev
\`\`\`
Open http://localhost:3000

# Verify
- App Router pages in /app
- Tailwind classes working
- shadcn/ui components imported from "@/components/ui"
`,
  },
  tags: ["installation", "nextjs", "app-router", "tailwind", "shadcn"],
}
