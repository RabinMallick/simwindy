'use client';

import { Suspense } from "react";
import { EsimBody } from "@/components/eSim/EsimBody";
import { TopHeader } from "@/components/include/TopHeader";
import { TopEsimBreadcrumb } from "@/components/eSim/TopEsimBreadcrumb";

export default function ESim() {
  return (
    <>
      <div className="min-h-screen bg-linear-to-b from-(--peach)/30 to-(--light-gray) md:bg-gray-100  text-slate-900 font-sans md:p-8">

        <TopHeader title="Available plans" />

        <div className="max-w-7xl mx-auto px-3 md:px-6 ">

          <Suspense fallback={<div>Loading...</div>}>
            <TopEsimBreadcrumb />
          </Suspense>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <Suspense >
              <EsimBody />
            </Suspense>
          </div>
        </div>

      </div>
    </>
  );
}
