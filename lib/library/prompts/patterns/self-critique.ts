import type { LibraryItem } from "../../types"

export const selfCritique: LibraryItem = {
  id: "critique-pattern",
  title: "Self-critique pattern",
  description:
    "Ask the model to produce an answer, critique it, then revise: a simple chain-of-thought alternative.",
  section: "patterns",
  code: {
    language: "markdown",
    filename: "pattern.md",
    value: `1) Draft an answer.
2) Provide a brief critique: {2-4 bullets}.
3) Produce a final improved answer.`,
  },
  tags: ["pattern"],
}
