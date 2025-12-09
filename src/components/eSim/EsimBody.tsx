'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useGetEsimsMutation } from '@/store/api/apiSlice';
import { RootState } from '@/store/store';
import { EsimFilters, filterAndSortEsim } from '@/utils/esimSort';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { DekstopFilter } from './content/DekstopFilter';
import { EsimCard } from './content/EsimCard';
import Image from 'next/image';

export const EsimBody = () => {

    const searchParams = useSearchParams();
    const destination = searchParams.get("destination") ?? "";
    const type = searchParams.get("type") ?? "";
    const code = searchParams.get("code") ?? "";

    const filters = useSelector((state: RootState) => state.esim);
    const currency = useSelector((state: RootState) => state.currency.currency);

    const [getEsims, { isLoading, isError, data }] = useGetEsimsMutation();
    const [selectedPlanId, setSelectedPlanId] = useState<string>("");

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
    const selectedPrice = useMemo(() => {
        const selectedPlan = sortedData.find(item => item.id === selectedPlanId);
        const priceStr = selectedPlan?.prices?.recommended_retail_price?.[currency] ?? "0";
        return parseFloat(priceStr);
    }, [selectedPlanId, sortedData, currency]);

    const formattedPrice = selectedPrice ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
    }).format(selectedPrice) : "--";

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

            {/* RIGHT SIDE */}
            <div className="lg:col-span-8 xl:col-span-9">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
                    <div className="flex-1 min-w-0">
                        <h1 className="flex gap-2 items-baseline text-2xl md:text-3xl font-extrabold leading-tight">
                            {code ? (
                                <span className={`fi fi-${code.toLowerCase()} w-10 h-7 shrink-0`}></span>
                            ) : (
                                <Image
                                    src="/assets/earth.png"
                                    alt={`${type} eSIM`}
                                    width={145}
                                    height={80}
                                    className="w-auto h-7.5 border border-gray-200 rounded shrink-0"
                                    priority={type === "Global"}
                                />
                            )}
                            <span
                                className="text-transparent bg-clip-text truncate"
                                style={{ backgroundImage: "linear-gradient(to right, var(--primary-text), var(--orange))" }}
                            >
                                {destination} eSIM
                            </span>
                        </h1>

                        <p className="text-gray-600 max-w-xl mt-1">
                            Downloadable {destination} SIM card with prepaid data
                        </p>
                    </div>

                    <div className="text-right shrink-0">
                        <div className="text-2xl md:text-3xl font-bold text-slate-900">
                            {formattedPrice}
                        </div>
                    </div>
                </div>

                {/* Esim Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-8">
                    {sortedData.map(item => (
                        <EsimCard key={item.id} data={item as any}
                            selectedId={selectedPlanId} onSelect={setSelectedPlanId} />
                    ))}

                    {isLoading && (
                        <div className="col-span-full flex items-center justify-center py-12 text-slate-500">
                            Loading eSIM plans...
                        </div>
                    )}

                    {!isLoading && sortedData.length === 0 && (
                        <div className="col-span-full text-center py-12 text-slate-500 font-medium">
                            No plans match your current filters. Try adjusting your search criteria.
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
