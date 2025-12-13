'use client'

import { useCallback, useEffect, useMemo } from 'react'
import { useGetEsimsMutation } from '@/store/api/apiSlice';
import { RootState } from '@/store/store';
import { EsimFilters, filterAndSortEsim } from '@/utils/esimSort';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { DekstopFilter } from './DekstopFilter';
import { EsimCard } from '../common/card/EsimCard';
import { EsimCardSkeleton } from '../ui/skeleton/EsimCardSkeleton';

export const EsimBody = () => {

    const searchParams = useSearchParams();
    const destination = searchParams.get("destination") ?? "";
    const type = searchParams.get("type") ?? "";
    const code = searchParams.get("code") ?? "";

    const filters = useSelector((state: RootState) => state.esim);
    const { currency } = useSelector((state: RootState) => state.currency);

    const [getEsims, { isLoading, isError, data }] = useGetEsimsMutation();

    const fetchParams = useMemo(() => ({
        userId: "ae3d7846-c94c-4171-97df-4bdbb4fa4b38",
        type: type === "Global" ? "GLOBAL" : type === "Regions" ? "REGIONAL" : "LOCAL",
        countryCode: type === "Global" ? "" : code,
        region: type === "Global" ? "" : destination.toLowerCase(),
    }), [type, code, destination]);

    const fetchEsims = useCallback(async () => {
        try {
            await getEsims(fetchParams).unwrap();
        } catch (err) {
            console.error("Failed to fetch eSIMs:", err);
        }
    }, [getEsims, fetchParams]);

    useEffect(() => {
        fetchEsims();
    }, [fetchEsims]);

    const esim = useMemo(
        () => data?.data?.map((item: { day: any; }) => ({ ...item, day: Number(item.day ?? 0) })) ?? [],
        [data]
    );

    const sortedData = useMemo(
        () => filterAndSortEsim(esim as any, filters as unknown as EsimFilters, currency),
        [esim, filters, currency]
    );

    if (isError) {
        return (
            <div className="text-center py-20 text-red-500">
                Failed to load eSIM plans. Please try refreshing the page.
            </div>
        );
    }

    return (
        <>
            <DekstopFilter data={esim} />

            <div className="lg:col-span-8 xl:col-span-9">

                {/* Mobile Header */}
                <div className="md:hidden mt-4">
                    <div className="flex items-center gap-2 mb-1 p-2 bg-white rounded-md">
                        {code && <span className={`fi fi-${code.toLowerCase()} w-10 h-7 shrink-0`}></span>}
                        <span className='bg-linear-to-r from-(--primary) to-(--orange) text-transparent bg-clip-text truncate'>
                            {destination} eSIM
                        </span>
                    </div>
                    <p className="text-gray-600 text-[12px] mb-5">
                        Downloadable {destination} eSIM card with prepaid data
                    </p>
                </div>

                {/* Desktop Header */}
                <div className="hidden md:block">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                        <div className="flex-1 min-w-0">
                            <h1 className="flex gap-2 items-baseline text-2xl md:text-3xl font-extrabold leading-tight">
                                {code && <span className={`fi fi-${code.toLowerCase()} w-10 h-7 shrink-0`}></span>}
                                <span className="text-transparent bg-clip-text truncate" style={{ backgroundImage: "linear-gradient(to right, var( --primary), var(--orange))" }}>
                                    {destination} eSIM
                                </span>
                            </h1>
                            <p className="text-gray-600 max-w-xl mt-1">
                                Downloadable {destination} SIM card with prepaid data
                            </p>
                        </div>
                    </div>
                </div>

                {/* Esim Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-8">
                    {isLoading
                        ? Array.from({ length: 9 }).map((_, index) => <EsimCardSkeleton key={index} />)
                        : sortedData.length < 0
                            ? <div className="col-span-full text-center py-12 text-slate-500 font-medium">
                                No eSIM packages found
                            </div> : sortedData.map(item => <EsimCard key={item.id} data={item as any} />)

                    } 
                </div>

            </div>
        </>
    )
}
