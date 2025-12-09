"use client";

import { HiOutlineChevronRight, HiOutlineHome } from "react-icons/hi";
import { useSearchParams } from "next/navigation";
import { EsimBody } from "@/components/eSim/EsimBody";
import { Suspense } from "react";

export default function ESimPageClient() {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination") ?? "";
  const type = searchParams.get("type") ?? "";

  return (
    <div className="min-h-screen bg-gray-100 text-slate-900 font-sans pt-4 md:p-8">
      <div className="max-w-7xl mx-auto px-3 md:px-6">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 capitalize">
          <HiOutlineHome className="w-4 h-4" />
          <HiOutlineChevronRight className="w-3 h-3" />
          <span>{type}</span>
          <HiOutlineChevronRight className="w-3 h-3" />
          <span className="text-slate-900 font-medium truncate">{destination}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Suspense fallback={<div>Loading...</div>}>
            <EsimBody />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
