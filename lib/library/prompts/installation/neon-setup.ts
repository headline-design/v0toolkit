import type { LibraryItem } from "../../types"

export const installNeonSetup: LibraryItem = {
  id: "install-neon-setup",
  title: "Add Neon (Postgres) to Next.js via @neondatabase/serverless",
  description:
    "Prompt template to set DATABASE_URL, install @neondatabase/serverless, and run basic SQL without an ORM.",
  section: "installation",
  code: {
    language: "markdown",
    filename: "neon-setup.md",
    value: `Role
You are a senior backend engineer. Configure Neon (Postgres) for a Next.js App Router app without an ORM.

Task
Install @neondatabase/serverless, set DATABASE_URL, and provide a minimal query example.

Output format
- Sections: Install, Env, Client, Example Query, Notes.

--- Prompt ---

# Install
\`\`\`bash
npm install @neondatabase/serverless
\`\`\`

# Env
Set in your platform's dashboard (server-only):
- DATABASE_URL=postgres://user:password@host/db?sslmode=require

# Client (app/lib/neon.ts)
\`\`\`ts
import { neon } from "@neondatabase/serverless"

let sql: ReturnType<typeof neon> | null = null

export function getSql() {
  if (!sql) {
    const url = process.env.DATABASE_URL!
    sql = neon(url)
  }
  return sql
}
\`\`\`

# Example Query (Server Action)
\`\`\`ts
"use server"
import { getSql } from "@/app/lib/neon"

export async function createCompany(name: string) {
  const sql = getSql()
  const rows = await sql\`
    INSERT INTO companies (name)
    VALUES (\${name})
    RETURNING id, name;
  \`
  return rows[0]
}
\`\`\`

Notes
- Use parameterized queries with the tagged template to avoid SQL injection.
- Prefer server actions/route handlers for DB access.
`,
  },
  tags: ["installation", "neon", "postgres", "database"],
}
