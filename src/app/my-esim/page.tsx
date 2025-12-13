import { Suspense } from "react";
import { TopHeader } from "@/components/include/TopHeader";
import { BottomNavigation } from "@/components/include/BottomNavigation";
import PackageCardSkeleton from "@/components/ui/skeleton/PackageCardSkeleton";
import PackageCard from "@/components/common/card/PackageCard";
import { packages } from "@/utils/packages";

const PackageGridSkeleton = () => {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <PackageCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default function ESim() {
  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      
      {/* Top Header */}
      <TopHeader title="My eSIM" />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        
        {/* Page Intro */}
        <div className="mb-4">
          <h1 className="text-sm md:text-xl font-bold text-(--primary) ">
            My eSIM List
          </h1>
          <p className="text-[10px] md:text-[12px] text-(--vivid-orang)">
            Manage and view all your active eSIM packages
          </p>
        </div>

        {/* Package List */}
        <Suspense fallback={<PackageGridSkeleton />}>
          {packages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {packages.map((pkg) => (
                <PackageCard key={pkg.id} data={pkg as any} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-gray-500 text-sm">
                No eSIM packages found
              </p>
            </div>
          )}
        </Suspense>

      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden">
        <BottomNavigation />
      </div>

    </div>
  );
}
