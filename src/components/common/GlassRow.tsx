import React from 'react';
import { HiOutlineChevronRight, HiOutlineInformationCircle } from 'react-icons/hi';

type GlassRowProps = {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  hasInfo: boolean;
};

export const GlassRow: React.FC<GlassRowProps> = ({ icon, label, value, hasInfo }) => {
  return (
    <div className="flex items-center gap-3 bg-(--dark-teal)/80 backdrop-blur-md p-3 rounded-lg border border-white/20 cursor-pointer hover:bg-(--dark-teal)/50 transition-all duration-200">
      <div className="bg-white/20 text-white p-2 rounded-xl shadow-inner flex items-center justify-center">
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-300 font-semibold truncate">{label}</p>
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          {value}
          {hasInfo && <HiOutlineInformationCircle className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />}
        </div>
      </div>

      {(value === 'View all' || hasInfo) && (
        <HiOutlineChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
      )}
    </div>
  );
};
