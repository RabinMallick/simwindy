'use client'

import { useEffect, useState } from "react";
import { TopHeader } from "@/components/include/TopHeader";
import { BottomNavigation } from "@/components/include/BottomNavigation";
import PackageCardSkeleton from "@/components/ui/skeleton/PackageCardSkeleton";
import PackageCard from "@/components/common/card/PackageCard";
import { packages as mockPackages } from "@/utils/packages";

const PackageGridSkeleton = () => {
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 18 }).map((_, i) => (
        <PackageCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default function ESim() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // If packages is an array, no need to call as function
    setTimeout(() => {
      setData(mockPackages);
      setIsLoading(false);
    }, 1000); // Simulate API delay
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <TopHeader title="My eSIM" />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="mb-4">
          <h1 className="text-sm md:text-xl font-bold" style={{ color: "var(--primary)" }}>
            My eSIM List
          </h1>
          <p className="text-[10px] md:text-[12px]" style={{ color: "var(--vivid-orang)" }}>
            Manage and view all your active eSIM packages
          </p>
        </div>

        {isLoading ? (
          <PackageGridSkeleton />
        ) : data.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-500 font-medium">
            No eSIM packages found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((pkg) => <PackageCard key={pkg.id} data={pkg as any} />)}
          </div>
        )}
      </main>

      <div className="md:hidden">
        <BottomNavigation />
      </div>
    </div>
  );
}
