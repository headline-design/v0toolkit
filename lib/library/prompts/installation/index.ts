import type { LibraryItem } from "../../types"
import { installNextjsAppRouter } from "./nextjs-app-router"
import { installSupabaseSetup } from "./supabase-setup"
import { installNeonSetup } from "./neon-setup"

export const installationItems: LibraryItem[] = [
  installNextjsAppRouter,
  installSupabaseSetup,
  installNeonSetup,
]
