'use client';
 

const PackageCardSkeleton = () => {
  return (
    <div className="relative w-full px-3 py-2 rounded-md bg-white border border-slate-200 animate-pulse">
      <div className="flex justify-between items-center gap-3">
        
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Flag */}
          <div className="w-8 h-6 bg-slate-200 rounded" />

          <div className="space-y-2">
            {/* Title */}
            <div className="h-4 w-40 bg-slate-200 rounded" />

            {/* Voice / SMS */}
            <div className="flex gap-3">
              <div className="h-3 w-16 bg-slate-200 rounded" />
              <div className="h-3 w-16 bg-slate-200 rounded" />
            </div>

            {/* Coverage */}
            <div className="h-3 w-28 bg-slate-200 rounded" />
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-end gap-2">
          {/* Status */}
          <div className="h-4 w-14 bg-slate-200 rounded-full" />

          {/* Price */}
          <div className="h-5 w-16 bg-slate-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default PackageCardSkeleton;
