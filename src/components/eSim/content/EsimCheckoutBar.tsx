'use client';

import { Button } from '@/components/common/button/Button';
import { HiOutlineFire } from 'react-icons/hi';

export default function EsimCheckoutBar({ data, total = 18 }) {
    return (
        <div className="w-full bg-white flex items-center justify-between px-4 py-4 border-t border-gray-200 sticky bottom-0 z-50 shadow-sm">
            {/* Left Section */}
            <div className="flex flex-col gap-2">

                {/* Header */}
                <div className="flex items-center gap-3">
                    <div>
                        <h1 className="text-[15px] font-bold">{data?.title}</h1>
                        <p className="text-[12px] text-gray-600">
                            {data?.operatorTitle} • {data?.countryTitle}
                        </p>
                    </div>

                    <div className="px-2 py-0.5 text-[8px] font-bold rounded-full bg-linear-to-r from-slate-200 to-orange-400/20 text-(--primary) flex items-center gap-1 capitalize">
                        <HiOutlineFire className="w-2.5 h-2.5" />
                        {data?.slug}
                    </div>
                </div>

            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="text-[12px] text-gray-600">Total</p>
                    <p className="text-[16px] font-semibold">{total}.00 €</p>
                </div>
                <Button className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold text-base hover:bg-orange-600 active:scale-95 transition">
                    Buy now
                </Button>
            </div>
        </div>
    );
}

//   <div className="p-4 bg-white border-t  flex flex-wrap justify-between items-center">

//                     <div className="flex items-center gap-2 mb-4">
//                         <span>Number of Sim Cards</span>
//                         <div className="flex items-center border rounded-md ml-auto">
//                             <button
//                                 onClick={handleDecrement}
//                                 className="px-2 py-1 text-lg font-bold"
//                             >
//                                 -
//                             </button>
//                             <span className="px-4">{numSim}</span>
//                             <button
//                                 onClick={handleIncrement}
//                                 className="px-2 py-1 text-lg font-bold"
//                             >
//                                 +
//                             </button>
//                         </div>
//                     </div>

//                     <span>{totalPrice.toFixed(2)} USD</span>
//                 </div>
