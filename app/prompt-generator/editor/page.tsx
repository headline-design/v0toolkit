import { Suspense } from "react"
import PromptGeneratorEditorClientPage from "./client-page"

export default function PromptGeneratorEditorPage() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PromptGeneratorEditorClientPage />
    </Suspense>
  )
}
