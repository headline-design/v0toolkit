import { Suspense } from "react";
import CreateProfileClientPage from "./client-page";

export default function CreateProfilePage() {

  return (
   <Suspense fallback={<div>Loading...</div>}>
     <CreateProfileClientPage />
   </Suspense>
  )
}
