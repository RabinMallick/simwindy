'use client'

import React from "react";

const PackageCardSkeleton: React.FC = () => {
  return (
    <div className="relative w-full px-3 py-3 rounded-md bg-white border border-slate-200 flex flex-col gap-2 animate-pulse">
      
      {/* Header */}
      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          {/* Flag / Icon Placeholder */}
          <div className="w-10 h-7 bg-slate-200 " />

          <div className="flex flex-col gap-1">
            {/* Title */}
            <div className="w-32 h-3 bg-slate-200 rounded" /> 
            {/* Voice/Text */}
            <div className="flex gap-2 mt-1">
              <div className="w-12 h-2 bg-slate-200 rounded" />
              <div className="w-12 h-2 bg-slate-200 rounded" />
            </div>
            {/* Coverage */}
            <div className="w-24 h-2 bg-slate-200 rounded mt-1" />
          </div>
        </div>

        {/* Price */}
        <div className="text-right flex flex-col gap-1 items-end">
          {/* Status Badge */}
          <div className="w-16 h-3 bg-slate-200 rounded-full" />
          {/* Price */}
          <div className="w-18 h-4 bg-slate-200 rounded mt-1" />
        </div>
      </div>
    </div>
  );
};

export default PackageCardSkeleton;
