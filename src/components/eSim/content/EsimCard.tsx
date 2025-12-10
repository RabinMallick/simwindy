"use client";

import { RootState } from "@/store/store";
import { useState, useEffect } from "react";
import {
  HiOutlineCheckCircle,
  HiOutlineFire,
  HiOutlinePhone,
  HiOutlineChatAlt,
} from "react-icons/hi";
import { IoMdRadioButtonOff } from "react-icons/io";
import { useSelector } from "react-redux";
import EsimDetails from "../EsimDetails";
import { TopHeader } from "@/components/include/TopHeader";

interface EsimData {
  id: string;
  type?: string;
  currency?: string;
  prices?: {
    recommended_retail_price: {
      [key in "BDT" | "USD" | "AED"]?: string;
    };
  };
  amount?: number;
  day?: number;
  isUnlimited?: boolean;
  title?: string;
  data?: string;
  shortInfo?: string | null;
  slug?: string;
  countryTitle?: string;
  countryFlag?: string;
  voice?: string;
  text?: string;
  coverages?: unknown[];
  operatorType?: string;
}

interface EsimCardProps {
  data: EsimData;
  selectedId: string;
  onSelect: (id: string, price: number) => void;
}

export const EsimCard: React.FC<EsimCardProps> = ({
  data,
  selectedId,
  onSelect,
}) => {
  const currency = useSelector((state: RootState) => state.currency.currency);

  const priceNum = parseFloat(
    data?.prices?.recommended_retail_price?.[currency] ?? "0"
  );
  const isSelected = selectedId === String(data?.id);
  const totalSimCards = 1;

  const [simItem, setSimItem] = useState<EsimData | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleSelect = () => onSelect(String(data.id), priceNum);

  const coverageText = data?.coverages?.length
    ? `${data.coverages.length} ${data.coverages.length === 1 ? "Country" : "Countries"}`
    : data?.title;

  const cardClasses = `relative w-full p-3 md:pb-0 rounded-lg bg-white/95 backdrop-blur-md border transition-all duration-300 flex flex-col justify-between gap-2 hover:-translate-y-0.5 ${
    isSelected
      ? "border-(--primary) ring-1 ring-(--primary)/50 bg-linear-to-b from-teal-50/80 to-white"
      : "border-slate-200"
  }`;

  /** Smooth Drawer Close */
  const handleDrawerClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSimItem(null);
      setIsClosing(false);
    }, 300); // match animation time
  };

  return (
    <>
      <button className={cardClasses}>
        <div
          onClick={handleSelect}
          className="flex justify-between md:grid md:grid-cols-1 gap-1 w-full"
        >
          {/* Left */}
          <div className="flex items-center gap-2">
            <div className="md:hidden">
              {isSelected ? (
                <HiOutlineCheckCircle className="w-4 h-4 text-(--primary)" />
              ) : (
                <IoMdRadioButtonOff className="w-4 h-4 text-(--primary)" />
              )}
            </div>

            <div className="w-full">
              <h3 className="text-start md:text-center text-sm font-extrabold text-(--primary) mb-2 md:mt-4">
                {data?.data || data?.title}
              </h3>

              <div className="flex flex-wrap gap-1 items-center text-[9px] text-slate-500">
                <span>Valid {data?.day ?? 0} days</span>
                <span className="flex items-center gap-0.5">
                  <HiOutlinePhone className="w-3 h-3" />
                  {data?.voice ? `${data.voice} Min` : "No Call"}
                </span>
                <span className="flex items-center gap-0.5">
                  <HiOutlineChatAlt className="w-3 h-3" />
                  {data?.text ? `${data.text} SMS` : "No Text"}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[9px] text-slate-600 mt-1">
                {data?.countryFlag && (
                  <div
                    className="h-4 w-7 rounded bg-cover bg-center border border-slate-200 hidden md:block"
                    style={{
                      backgroundImage: `url(https://airalo.com/images/${data.countryFlag})`,
                    }}
                  />
                )}

                <span className="flex items-center gap-1 flex-wrap">
                  {coverageText},
                  <span className="capitalize md:hidden">({data?.slug})</span>

                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setSimItem(data);
                    }}
                    className="capitalize md:hidden px-1.5 bg-(--primary)/50 text-white rounded-full"
                  >
                    Details
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setSimItem(data);
                    }}
                    className="cursor-pointer px-1.5 bg-amber-400/20 rounded-full absolute right-3 hidden md:block"
                  >
                    Details
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="md:mt-2 md:pt-2 md:border-t border-slate-100 flex items-center justify-end md:justify-between gap-2 cursor-pointer">
            <span className="text-sm font-bold text-(--primary) flex items-baseline gap-1">
              {currency} {(priceNum * totalSimCards).toFixed(2)}
              <span className="text-[9px] font-light text-slate-400 hidden md:block">
                / {totalSimCards} SIM
              </span>
            </span>

            {isSelected && (
              <div className="hidden md:block">
                <HiOutlineCheckCircle className="w-4 h-4 text-(--primary)" />
              </div>
            )}
          </div>
        </div>

        {/* Badge */}
        {data?.slug && (
          <div className="hidden md:block">
            <div className="absolute top-2 left-2 px-2 py-0.5 text-[8px] font-bold rounded-full bg-linear-to-r from-slate-200 to-orange-400/20 text-(--primary) flex items-center gap-1 capitalize">
              <HiOutlineFire className="w-2.5 h-2.5" />
              {data?.slug}
            </div>
          </div>
        )}
      </button>

      {/* Drawer */}
      {simItem && (
        <div className="fixed inset-0 z-50 flex">

          {/* Backdrop */}
          <div
            onClick={handleDrawerClose}
            className="absolute inset-0 bg-black/40 transition-opacity duration-300"
          />

          {/* Drawer Panel */}
          <div
            className={`ml-auto w-full md:w-[600px] h-full bg-white shadow-xl relative z-50 
              ${isClosing ? "drawer-close" : "drawer-open"}
            `}
          >
            <TopHeader title="E-Sim Details" onClick={handleDrawerClose} />
            <EsimDetails data={simItem} currency={currency}/>
          </div>
        </div>
      )}
    </>
  );
};
