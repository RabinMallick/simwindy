'use client';

import { Button } from '@/components/common/button/Button';
import { RootState } from '@/store/store';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';

const PriceSummary = () => {
  const numSim = useSelector((state: RootState) => state.checkout.numSim);

  const { currency, symbol } = useSelector((state: RootState) => state.currency);
  const params = useSearchParams();

  const dataAmount = params.get('data');
  const coverages = params.get('coverages');
  const day = params.get('day');
  
  const BDT = params.get('BDT');
  const USD = params.get('USD');
  const AED = params.get('AED');

  const priceType = { BDT, USD, AED }
  const price = priceType[currency]


  // Convert price to number safely
  const priceNumber = price ? Number(price) : 0;
  const totalPrice = (priceNumber * numSim).toFixed(2);

  return (
    <div className="p-5 h-fit space-y-2 rounded-md w-full">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 border border-gray-300 rounded-xl bg-linear-to-br from-purple-50 to-indigo-50 flex items-center justify-center text-sm font-semibold shadow-inner">
          eSIM
        </div>

        <div>
          <h3 className="text-[11px] md:text-[14px] font-semibold text-base text-gray-900">
            {dataAmount} - {day} days{' '}
          </h3>
          <p className="text-[13px] text-gray-500">Coverage: {coverages}</p>
        </div>
      </div>

      {/* Title */}
      <h4 className="text-[13px] font-semibold text-gray-800 border-b border-gray-200 pb-1 mt-4">
        eSIM Price Summary
      </h4>

      {/* Price Row */}
      <div className="flex justify-between text-[13px]">
        <span className="text-gray-600">Price per eSIM:</span>
        <span className="font-medium">
          {symbol} {` `} {price}
        </span>
      </div>

      {/* Quantity */}
      <div className="flex justify-between text-[13px]">
        <span className="text-gray-600">eSIM Quantity:</span>
        <span className="font-medium">{numSim}</span>
      </div>

      {/* Divider */}
      <div className="flex justify-between py-3 text-[15px] font-bold border-t border-gray-100">
        <span className="text-gray-700">Total</span>
        <span className="text-(--primary)">
          {totalPrice} {currency}
        </span>
      </div>

      {/* Pay Button */}
      <Button
        className="w-full bg-(--primary) text-white py-2 font-semibold rounded-md! shadow-sm flex! justify-center! text-center!
    hover:bg-(--primary)/80"
      >
        Pay Now
      </Button>
    </div>
  );
};

export default PriceSummary;
