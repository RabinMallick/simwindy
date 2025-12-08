import React from 'react'
import { HiOutlineChevronRight, HiOutlineInformationCircle } from 'react-icons/hi'

type GlassRowProps = {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  hasInfo: boolean;
};

export const GlassRow: React.FC<GlassRowProps> = ({ icon, label, value, hasInfo }) => {
  return (
   <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/10 group cursor-pointer hover:bg-white/20 transition-colors">
         <div className="bg-white text-slate-900 p-1.5 rounded-lg shadow-sm">
           {icon}
         </div>
   
         <div className="flex-1 min-w-0">
           <p className="text-xs text-slate-300 font-medium truncate">{label}</p>
           <div className="text-white text-sm font-bold flex items-center gap-1.5">
             {value}
             {hasInfo && (
               <HiOutlineInformationCircle className="w-4 h-4 text-slate-400" />
             )}
           </div>
         </div>
   
         {(value === "View all" || hasInfo) && (
           <HiOutlineChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white" />
         )}
       </div>
  )
}
