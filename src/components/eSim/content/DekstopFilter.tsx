'use client';

import { useCallback, useEffect, useState } from 'react';
import { HiOutlineGlobeAlt, HiOutlinePhone } from 'react-icons/hi';
import { HiBolt } from 'react-icons/hi2';
import { Button } from '../../common/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setDynamicFilters, setDynamicPriceRange, setFilters } from '@/store/slice/esimSlice';
import { GlassRow } from '../../common/GlassRow';
import { RootState } from '@/store/store';
import { PriceSlider } from './PriceSlider';

interface FiltersState {
  priceRange: [number, number];
  planSize: string | number;
  validity: string | number;
  voice: string | number;
  text: string | number;
  uniquePlanSizes?: string[];
  uniqueValidities?: number[];
  uniqueVoice?: number[];
  uniqueText?: number[];
}

interface DekstopFilterProps {
  data?: Array<{ netPrice: string | number; prices?: Record<string, number | string>; [key: string]: any }>;
}

export const DekstopFilter: React.FC<DekstopFilterProps> = ({ data = [] }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.esim) as FiltersState;
  const currency = useSelector((state: RootState) => state.currency.currency);

  const prices: number[] = Array.isArray(data)
    ? data
        .map((item) => {
          const priceRaw = (item.prices?.recommended_retail_price as Record<string, number | string> | undefined)?.[currency] ?? item.netPrice ?? '0';
          const price = typeof priceRaw === 'number' ? priceRaw : parseFloat(String(priceRaw));
          return isNaN(price) || price < 0 ? null : price;
        })
        .filter((price): price is number => price !== null)
    : [];

  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 100;
  const [range, setRange] = useState<[number, number]>([minPrice, maxPrice]);
  const length = Array.isArray(data) ? data.length : 0;

  useEffect(() => {
    if (!Array.isArray(data) || data.length === 0) return;
    const sortedData = [...data].sort((a, b) => Number(a.netPrice) - Number(b.netPrice));
    dispatch(setDynamicPriceRange(sortedData));
    dispatch(setDynamicFilters({ data }));
    dispatch(setFilters({ priceRange: [minPrice, maxPrice] }));
  }, [data, dispatch, minPrice, maxPrice]);

  useEffect(() => setRange([minPrice, maxPrice]), [minPrice, maxPrice]);

  const handlePriceChange = useCallback(
    (newRange: [number, number]) => {
      setRange(newRange);
      dispatch(setFilters({ priceRange: newRange }));
    },
    [dispatch]
  );

  type FilterKeys = keyof FiltersState;
  const handleToggleFilter = (key: FilterKeys, value: string | number) => {
    dispatch(setFilters({ [key]: filters[key] === value ? '' : value }));
  };

  const renderFilterSection = (title: string, key: FilterKeys, values?: (string | number)[], unit = '') => {
    if (!values || !values.length) return null;
    return (
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-(--primary) mb-2">{title}</h2>
        <div className="grid grid-cols-3 gap-2">
          {values.map((value) => (
            <Button
              key={value}
              onClick={() => handleToggleFilter(key, value)}
              className={`text-xs! px-1! py-1.5 rounded-md transition-colors flex items-center justify-center border-0 ${
                filters[key] === value
                  ? 'text-[#3A220F] font-medium bg-linear-to-r from-orange-300 to-orange-200 hover:from-orange-200 hover:to-orange-100 shadow-md'
                  : 'bg-(--primary)/8 text-(--black)  hover:bg-(--primary)/15'
              }`}
            >
              {value} {unit}
            </Button>
          ))} 
        </div>
      </div>
    );
  };

  return (
    <div className="hidden md:block lg:col-span-4 xl:col-span-3 ">
      <div className="bg-white backdrop-blur-md p-5 rounded-lg flex flex-col justify-between space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-(--primary) px-3 py-1.5 rounded-full text-white text-xs font-semibold">
          <HiOutlineGlobeAlt className="w-4 h-4" />
          <span>{length} packages</span>
        </div>

        {/* Price Slider */}
        <div className="bg-(--tan-orange) p-4 rounded-lg">
          <h3 className="text-sm font-medium text-(--primary) mb-2">Price Range ({currency})</h3>
          <PriceSlider minPrice={minPrice} maxPrice={maxPrice} range={range} setRange={handlePriceChange} currency={currency} />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>{range[0]}</span>
            <span>{range[1]}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          {renderFilterSection('Plan Size', 'planSize', filters.uniquePlanSizes)}
          {renderFilterSection('Validity (days)', 'validity', filters.uniqueValidities, 'days')}
          {renderFilterSection('Voice (minutes)', 'voice', filters.uniqueVoice, 'mins')}
          {renderFilterSection('SMS (count)', 'text', filters.uniqueText, 'SMS')}
        </div>

        {/* Bottom Features */}
        <div className="space-y-3">
          <GlassRow icon={<HiOutlineGlobeAlt className="w-5 h-5" />} label="Supported countries" value="View all" hasInfo={false} />
          <GlassRow icon={<HiBolt className="w-5 h-5" />} label="Network" value="View all" hasInfo={false} />
          <GlassRow icon={<HiOutlinePhone className="w-5 h-5" />} label="Phone Number" value="Calling & Texting" hasInfo />
          <GlassRow icon={<HiBolt className="w-5 h-5" />} label="Speed" value="LTE/5G" hasInfo={false} />
        </div>
      </div>
    </div>
  );
};
