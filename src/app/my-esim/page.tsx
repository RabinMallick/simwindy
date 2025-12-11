
import PackageCard from "@/components/common/PackageCard";
import { BottomNavigation } from "@/components/include/BottomNavigation";
import { TopHeader } from "@/components/include/TopHeader";
import { Suspense } from "react";


const packages = Array(7).fill({
  code: "BD", // place your flag image in public folder
  dataAmount: "1 GB",
  validity: "7 days",
  sms: 20,
  coverage: "Bangladesh",
  status: "Active",
  price: "USD 1.00",
});

export default function ESim() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen  ">
        <div className="max-w-6xl mx-auto mb-20 md:mb-0">

          <TopHeader title="Available plans" />
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4 px-4 xl:px-0">
            {packages.map((pkg, index) => (
              <PackageCard key={index} {...pkg} />
            ))}
          </div>
<div className="md:hidden">
  
          <BottomNavigation />
</div>
        </div>
      </div>
    </Suspense>
  );
}
