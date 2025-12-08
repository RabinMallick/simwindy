'use client';

import { useEffect, useState } from 'react';
import { HiOutlineGlobeAlt, HiOutlinePhone } from 'react-icons/hi';
import { HiBolt } from 'react-icons/hi2';
import { Button } from '../common/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setDynamicFilters, setDynamicPriceRange, setFilters } from '@/store/slice/esimSlice';
import { GlassRow } from '../common/GlassRow';
import { RootState } from '@/store/store';
import { PriceSlider } from './PriceSlider';

// 🔹 Define Redux FiltersState type
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

// 🔹 Props for DekstopFilter
interface DekstopFilterProps {
    data?: Array<{ netPrice: string | number; prices?: Record<string, number | string>;[key: string]: any }>;
}

export const DekstopFilter: React.FC<DekstopFilterProps> = ({ data = [] }) => {
    const dispatch = useDispatch();
    const filters = useSelector((state: RootState) => state.esim) as FiltersState;
    const currency = useSelector((state: RootState) => state.currency.currency);

    // 🔹 Extract valid prices
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

    // 🔹 Initialize dynamic filters
    useEffect(() => {
        if (!Array.isArray(data) || data.length === 0) return;

        const sortedData = [...data].sort((a, b) => Number(a.netPrice) - Number(b.netPrice));
        dispatch(setDynamicPriceRange(sortedData));
        dispatch(setDynamicFilters({ data }));
        setRange([minPrice, maxPrice]);
        dispatch(setFilters({ priceRange: [minPrice, maxPrice] }));
    }, [data, dispatch, minPrice, maxPrice]);

    const handlePriceChange = (newRange: [number, number]) => {
        setRange(newRange); // local state for UI
        dispatch(setFilters({ priceRange: newRange })); // update Redux
    };


    // 🔹 Only allow valid keys of FiltersState
    type FilterKeys = keyof FiltersState;

    const handleToggleFilter = (key: FilterKeys, value: string | number) => {
        dispatch(
            setFilters({
                [key]: filters[key] === value ? '' : value
            })
        );
    };
    // 🔹 Render filter section
    const renderFilterSection = (
        title: string,
        key: FilterKeys,
        values?: (string | number)[],
        unit = ''
    ) => {
        if (!values || !values.length) return null;

        return (
            <div className="w-full mb-3">
                <h1 className="text-white pb-2">{title}</h1>
                <div className="grid grid-cols-3 gap-3">
                    {values.map((value) => (
                        <Button
                            key={value}
                            onClick={() => handleToggleFilter(key, value)}
                            className={`p-1! flex! px-2! backdrop-blur-md border border-white/10 group cursor-pointer transition-colors ${filters[key] === value
                                ? 'text-[#3A220F] bg-linear-to-b from-orange-200 to-orange-100 border border-orange-400'
                                : 'bg-white/10 text-white'
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
        <div className="lg:col-span-4 xl:col-span-3">
            <div className="relative h-auto p-4 w-full rounded-xl overflow-hidden flex flex-col justify-between bg-linear-to-b from-(--primary-text) to-(--dark-teal)/40">
                {/* Badge */}
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-1.5 bg-dark-teal px-3 py-1.5 rounded-full text-white text-xs font-bold border border-dark-teal">
                        <HiOutlineGlobeAlt className="w-4 h-4" />
                        <span>{length} packages</span>
                    </div>
                </div>

                {/* Price Range Slider */}
                <PriceSlider
                    minPrice={minPrice}
                    maxPrice={maxPrice} range={range} setRange={handlePriceChange} currency={currency}
                />

                {/* Filters */}
                <div className="relative z-10 my-4">
                    {renderFilterSection('Plane Size', 'planSize', filters.uniquePlanSizes)}
                    {renderFilterSection('Validity (days)', 'validity', filters.uniqueValidities, 'days')}
                    {renderFilterSection('Voice (minutes)', 'voice', filters.uniqueVoice, 'mins')}
                    {renderFilterSection('SMS (count)', 'text', filters.uniqueText, 'SMS')}
                </div>

                {/* Bottom Features */}
                <div className="relative z-10 space-y-3">
                    <GlassRow icon={<HiOutlineGlobeAlt className="w-5 h-5" />} label="Supported countries" value="View all" hasInfo={false} />
                    <GlassRow icon={<HiBolt className="w-5 h-5" />} label="Network" value="View all" hasInfo={false} />
                    <GlassRow icon={<HiOutlinePhone className="w-5 h-5" />} label="Phone Number" value="Calling & Texting" hasInfo />
                    <GlassRow icon={<HiBolt className="w-5 h-5" />} label="Speed" value="LTE/5G" hasInfo={false} />
                </div>
            </div>
        </div>
    );
};
