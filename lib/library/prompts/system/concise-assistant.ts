import type { LibraryItem } from "../../types"

export const conciseAssistant: LibraryItem = {
  id: "concise-assistant",
  title: "Concise assistant system prompt",
  description: "Steer models to be brief, structured, and to cite sources when present.",
  section: "system",
  code: {
    language: "markdown",
    filename: "system.md",
    value: `You are a highly concise assistant.
- Prefer bullet points.
- Keep answers short and factual.
- Ask clarifying questions if needed.
- If you cite sources, place them inline like [1].`,
  },
  tags: ["system", "style"],
}
