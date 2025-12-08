"use client";

import { useState, useMemo, useEffect } from "react";
import {
  HiOutlineChevronRight,
  HiOutlineHome,
} from "react-icons/hi";

import { DekstopFilter } from "@/components/eSim/DekstopFilter";
import { EsimCard } from "@/components/eSim/EsimCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { filterAndSortEsim } from "@/utils/esimSort";
import { useGetEsimsMutation } from "@/store/api/apiSlice";
import { EsimItem } from "@/types/esim";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function ESim() {
  const searchParams = useSearchParams();

  const destination = searchParams.get("destination");
  const type = searchParams.get("type");
  const code = searchParams.get("code");

  const filters = useSelector((state: RootState) => state.esim);
  const [getEsims, { isLoading, isError }] = useGetEsimsMutation();
  const [data, setData] = useState<EsimItem[]>([]);

  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const currency = useSelector((state: RootState) => state.currency.currency);

  // Fetch eSIM plans
  useEffect(() => {
    const fetchEsims = async () => {
      try {
        const res = await getEsims({
          userId: "ae3d7846-c94c-4171-97df-4bdbb4fa4b38",
          type:
            type === "Global"
              ? "GLOBAL"
              : type === "Regions"
                ? "REGIONAL"
                : "LOCAL",
          countryCode: type === "Global" ? "" : code ?? '',
          region: type === "Global" ? "" : destination?.toLowerCase(),
        }).unwrap();

        setData(res?.data ?? []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEsims();
  }, [getEsims, type, code, destination]);

  // Normalize `day` to always be a number
  const esim = useMemo(
    () => data.map(item => ({ ...item, day: item.day ?? 0 })),
    [data]
  );

  // Apply filters and sorting
  const sortedData = useMemo(
    () => filterAndSortEsim(esim, filters, currency),
    [esim, filters, currency]
  );

  // Compute selected price based on selected plan & currency
  const selectedPrice = useMemo(() => {
    const selectedPlan = sortedData.find((item) => item.id === selectedPlanId);
    if (!selectedPlan) return null;
    const priceStr = selectedPlan.prices?.recommended_retail_price?.[currency] ?? "0";
    return parseFloat(priceStr);
  }, [selectedPlanId, sortedData, currency]);

  const formattedPrice =
    selectedPrice !== null ? `$${selectedPrice.toFixed(2)}` : "--";

  if (isError)
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load eSIM plans.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 text-slate-900 font-sans pt-4 md:p-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 capitalize">
          <HiOutlineHome className="w-4 h-4" aria-hidden="true" />
          <HiOutlineChevronRight className="w-3 h-3 text-slate-400" />
          <span>{type}</span>
          <HiOutlineChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 font-medium">{destination}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <DekstopFilter data={esim} />

          {/* RIGHT SIDE */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div>
                <h1 className="flex gap-2 items-baseline text-baseline md:text-3xl font-extrabold leading-tight">
                  {code ? (
                    <span className={`fi fi-${code?.toLowerCase()} `}></span>
                  ) : (
                    <Image
                      src={`/assets/earth.png`}
                      alt={type ?? 'earth'}
                      width={145}
                      height={80}
                      className="w-auto h-7.5 border border-gray-200"
                    />
                  )}
                  <span
                    className="text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, var(--primary-text), var(--orange))",
                    }}
                  >
                    {destination} eSIM
                  </span>
                </h1>

                <p className="text-gray-600 max-w-xl">
                  Downloadable {destination} SIM card with prepaid data
                </p>
              </div>

              <div className="text-right">
                <div className="text-3xl font-bold">{formattedPrice}</div>
              </div>
            </div>

            {/* Esim Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-8">
              {sortedData.map((item) => (
                <EsimCard
                  key={item.id}
                  data={item}
                  selectedId={selectedPlanId}
                  onSelect={(id: string) => setSelectedPlanId(id)}
                />
              ))}

              {isLoading && "Loading eSIM plans..."}

              {!isLoading && sortedData.length === 0 && (
                <div className="text-center col-span-full py-10 text-slate-500 font-medium">
                  No plans match your filters.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
