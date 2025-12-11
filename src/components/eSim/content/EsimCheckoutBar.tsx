'use client';

import { Button } from '@/components/common/button/Button';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';
import { decrement, increment } from '@/store/slice/checkoutSlice';
import { useRouter } from 'next/navigation';

interface EsimCheckoutBarProps {
    data: any;
}

export default function EsimCheckoutBar({ data }: EsimCheckoutBarProps) {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { currency  } = useSelector((state: RootState) => state.currency);
    const numSim = useSelector((state: RootState) => state.checkout.numSim);

    const retail = Number(data?.prices?.recommended_retail_price?.[currency ?? data?.currency] ?? 0);
    const totalPrice = retail * numSim;   

     const coverageText = data?.coverages?.length
    ? data?.coverages.length === 1
      ? "single country"
      : `${data?.coverages.length} Countries`
    : '';

    const BDT = data?.prices?.recommended_retail_price?.["BDT"]  
    const USD = data?.prices?.recommended_retail_price?.["USD"]  
    const AED = data?.prices?.recommended_retail_price?.["AED"]  

    return (
        <div className="
            fixed bottom-0 left-0 right-0
            bg-white/90 backdrop-blur-md
            border-t border-gray-200 
            shadow-[0_-2px_20px_rgba(0,0,0,0.05)]
            px-4 py-4 md:px-8 
            flex justify-between items-center
            z-50
        ">
            {/* LEFT SECTION */}
            <div className="flex flex-col">
                <p className="text-lg md:text-xl font-semibold text-gray-800 leading-tight">
                    Total: <span className="font-bold">{currency} {totalPrice.toFixed(2)}</span>
                </p>

                {/* SIM Counter */}
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-[13px] font-medium text-gray-500">SIMs:</span>

                    <div className="
                        flex items-center overflow-hidden
                        border border-gray-200 rounded-full
                        bg-gray-50
                    ">
                        {/* Decrease */}
                        <button
                            onClick={() => dispatch(decrement())}
                            disabled={numSim <= 1}
                            className={`
                                px-3 py-1 text-sm font-bold transition
                                hover:bg-gray-200
                                ${numSim <= 1 ? 'opacity-40 cursor-not-allowed' : ''}
                            `}
                        >
                            −
                        </button>

                        {/* Count */}
                        <div className="
                            w-10 md:w-8
                            text-center text-sm font-semibold
                            text-gray-700
                        ">
                            {numSim}
                        </div>

                        {/* Increase */}
                        <button
                            onClick={() => dispatch(increment())}
                            className="
                                px-3 py-1 text-sm font-bold transition hover:bg-gray-200
                            "
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            {/* BUY BUTTON */}
            <Button
                onClick={() => {
                    const query = new URLSearchParams({
                        id: data?.id,
                        title: data?.title,
                        data: data?.data,
                        text: data?.text ?? '',
                        voice: data?.voice ?? '',
                        day: data?.day, 
                        esimType: data?.esimType, 
                        operatorType: data?.operatorType, 
                        country: data?.countryTitle,  
                         
                        code: data?.countryCode, 
                        coverages: coverageText,
                        BDT: BDT,
                        AED: AED,
                        USD: USD,
                    });

                    router.push(`/esim/review-purchase?${query.toString()}`);
                }}
                className="
                    bg-(--primary) text-white
                    px-6 py-3 md:py-2  shadow-sm
                    hover:shadow-md hover:opacity-90
                    transition-all duration-150
                "
            >
                Buy now
            </Button>
        </div>
    );
}
