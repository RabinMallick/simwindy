 
import ESimPageClient from "@/components/eSim/ESimPageClient";
import { Suspense } from "react";

export default function ESim() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ESimPageClient />
    </Suspense>
  );
}
