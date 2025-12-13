'use client'

import { RootState } from "@/store/store";
import Link from "next/link";
import React from "react";
import { HiOutlinePhone } from "react-icons/hi";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { useSelector } from "react-redux";

interface CurrencyPrice {
  BDT?: string;
  USD?: string;
  AED?: string;
}

interface PackagePrice {
  recommended_retail_price?: CurrencyPrice;
}

interface PackageData {
  id: string;
  code: string;
  data: string;
  validity: string;
  voice?: number;
  text?: number;
  coverage?: string;
  status?: "Active" | "Inactive";
  prices?: PackagePrice;
}

interface PackageCardProps {
  data: PackageData;
  currency?: keyof CurrencyPrice;
}

const PackageCard: React.FC<PackageCardProps> = ({
  data
}) => {


  const { currency } = useSelector((state: RootState) => state.currency);

  const rawPrice = data.prices?.recommended_retail_price?.[currency];
  const price = rawPrice ? Number(rawPrice).toFixed(2) : "0.00";

  return (
    <Link href={`my-esim/details?id=${data?.id}`} className="relative w-full px-3 py-2 rounded-md bg-white border border-slate-200 cursor-pointer transition-all duration-300 flex flex-col gap-2 hover:-translate-y-0.5 hover:shadow-md">

      {/* Header */}
      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <span className={`fi fi-${data.code} text-2xl`} />

          <div>
            <p className="text-sm font-semibold text-(--primary)">
              {data.data}
              <span className="text-xs text-slate-500">
                {" "}· {data.validity}
              </span>
            </p>

            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
              {data.voice ? (
                <span className="flex items-center gap-1">
                  <HiOutlinePhone /> {data.voice} Min
                </span>
              ) : (
                <span>No Call</span>
              )}

              {data.text ? (
                <span className="flex items-center gap-1">
                  <HiOutlineChatBubbleLeftRight /> {data.text} SMS
                </span>
              ) : (
                <span>No Text</span>
              )}
            </div>

            <p className="text-[11px] text-slate-400">
              Coverage: {data.coverage ?? "N/A"}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="text-right">
          <span
            className={`inline-block text-[9px] px-2 py-0.5 rounded-full
              ${data.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
              }`}
          >
            {data.status ?? "Active"}
          </span>

          <p className="text-sm font-extrabold text-(--primary) mt-1">
            {currency} {price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;
