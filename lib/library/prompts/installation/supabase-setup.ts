import type { LibraryItem } from "../../types"

export const installSupabaseSetup: LibraryItem = {
  id: "install-supabase-setup",
  title: "Add Supabase (client + server) to Next.js",
  description:
    "Prompt template for installing @supabase/supabase-js, configuring env vars, and creating separate server/client clients.",
  section: "installation",
  code: {
    language: "markdown",
    filename: "supabase-setup.md",
    value: `Role
You are a senior Full-Stack engineer. Produce accurate, minimal Supabase setup for a Next.js App Router app.

Task
Install @supabase/supabase-js and configure separate server and client clients.
Use environment variables. Do not expose service role keys on the client.

Output format
- Sections: Install, Env, Server Client, Client Client, Example Usage.
- Use fenced code blocks.

--- Prompt ---

# Install
\`\`\`bash
npm install @supabase/supabase-js
\`\`\`

# Env
Set in your platform's dashboard (no .env committed):
- NEXT_PUBLIC_SUPABASE_URL=<your-url>
- NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
- SUPABASE_SERVICE_ROLE_KEY=<server-only-key>  # Server only, never expose to client

# Server Client (app/lib/supabase/server.ts)
\`\`\`ts
import { createClient } from "@supabase/supabase-js"

export function createServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(url, serviceRoleKey, { auth: { persistSession: false } })
}
\`\`\`

# Client Client (app/lib/supabase/client.ts)
\`\`\`ts
import { createClient } from "@supabase/supabase-js"

let supabase: ReturnType<typeof createClient> | undefined

export function getClientSupabase() {
  if (supabase) return supabase
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  supabase = createClient(url, anon)
  return supabase
}
\`\`\`

# Example Usage (Server Action)
\`\`\`ts
"use server"
import { createServerSupabase } from "@/app/lib/supabase/server"

export async function listCompanies() {
  const db = createServerSupabase()
  const { data, error } = await db.from("companies").select("*").limit(20)
  if (error) throw error
  return data
}
\`\`\`

Notes
- Keep service role usage server-only.
- For auth: prefer cookie-based sessions, do not store secrets on the client.
`,
  },
  tags: ["installation", "supabase", "database", "env"],
}
