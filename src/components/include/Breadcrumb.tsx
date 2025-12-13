'use client';
import React from "react";
import { HiOutlineHome, HiOutlineChevronRight } from "react-icons/hi";

interface BreadcrumbProps {
  type: string;
  destination: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ type, destination }) => {
  return (
    <div className="hidden md:block">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 capitalize">
        <HiOutlineHome className="w-4 h-4" />
        <HiOutlineChevronRight className="w-3 h-3" />
        <span>{type}</span>
        <HiOutlineChevronRight className="w-3 h-3" />
        <span className="text-slate-900 font-medium truncate">
          {destination}
        </span>
      </nav>
    </div>
  );
};
