'use client';

import { HiOutlinePhone, HiOutlineChatAlt, HiOutlineFire } from "react-icons/hi";
import { IoMdRadioButtonOff } from "react-icons/io";

export const EsimCardSkeleton: React.FC = () => {
    return (
        <div className="animate-pulse relative w-full px-3 p-2.5 md:p-3 md:pb-0 rounded-lg bg-white backdrop-blur-md border border-slate-200 flex flex-col justify-between gap-2 md:h-36">
            {/* Left */}
            <div className="flex justify-between md:grid md:grid-cols-1 gap-1 w-full md:mt-4">
                <div className="flex items-center gap-2">
                    <div className="md:hidden">
                        <IoMdRadioButtonOff className="w-4 h-4 text-slate-300" />
                    </div>
                    <div className="w-full space-y-2">
                        <div className="flex md:justify-center">
                            <div className=" h-4 w-3/4 md:w-20 md:mb-2.5 bg-slate-200 rounded"></div>
                        </div>

                        <div className="flex flex-wrap gap-1 items-center text-[11px] text-slate-300">
                            <div className="h-3 w-15 bg-slate-200 rounded"></div>
                            <div className="flex items-center gap-0.5">
                                <HiOutlinePhone className="w-3 h-3" />
                                <div className="h-3 w-9 bg-slate-200 rounded"></div>
                            </div>
                            <div className="flex items-center gap-0.5">
                                <HiOutlineChatAlt className="w-3 h-3" />
                                <div className="h-3 w-13 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-300 mt-1">
                            <div className="h-3 w-16 bg-slate-200 rounded"></div>
                            <div className="h-3 w-20 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="md:mt-2 md:pt-2 md:border-t border-slate-100 flex items-center justify-end md:justify-between gap-2">
                    <div className="h-4 w-17 bg-slate-200 rounded"></div>
                    <div className="hidden md:block h-4 w-10 bg-slate-200 rounded-full"></div>
                </div>
            </div>

            <div className="hidden md:block">
                <div className="absolute top-2 left-2 px-2 py-0.5 text-[8px] font-bold rounded-full bg-slate-200 flex items-center gap-1  h-4">
                    <HiOutlineFire className="w-2.5 h-2.5" />
                    <div className="w-8 md:mb-2.5 bg-slate-200 rounded"></div>
                </div>
            </div>
        </div>
    );
};
