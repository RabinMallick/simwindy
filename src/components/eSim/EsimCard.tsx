"use client";

import { RootState } from "@/store/store";
import {
  HiOutlineCheckCircle,
  HiOutlineFire,
  HiOutlinePhone,
  HiOutlineChatAlt,
} from "react-icons/hi";
import { IoMdRadioButtonOff } from "react-icons/io";
import { useSelector } from "react-redux";

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

  const priceStr = data?.prices?.recommended_retail_price?.[currency] ?? "0";
  const priceNum = parseFloat(priceStr); 
  const isSelected = selectedId === String(data?.id);
  const totalSimCards = 1;

  const handleSelect = () => onSelect(String(data.id), priceNum);

  return (
    <button
      className={`
        relative w-full p-3 md:pb-0 rounded-lg
        bg-white/95 backdrop-blur-md
        border transition-all duration-300
        flex flex-col justify-between gap-2
        hover:-translate-y-0.5
        ${isSelected 
          ? 'border-(--dark-teal) ring-1 ring-(--dark-teal)/50 bg-linear-to-b from-teal-50/80 to-white' 
          : 'border-slate-200'}
      `}
    >
      {/* Main content */}
      <div className="grid grid-cols-2 md:grid-cols-1 gap-1">
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            {isSelected ? (
              <HiOutlineCheckCircle className="w-4 h-4 text-(--dark-teal)" />
            ) : (
              <IoMdRadioButtonOff className="w-4 h-4 text-(--dark-teal)" />
            )}
          </div>

          <div className="w-full">
            <h3
              onClick={handleSelect}
              className="text-start md:text-center text-sm font-extrabold text-(--dark-teal) mb-2 md:mt-4"
            >
              {data?.data || data?.title}
            </h3>

            <div
              onClick={handleSelect}
              className="flex flex-wrap gap-1 items-center text-[9px] text-slate-500"
            >
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
                {data?.coverages?.length
                  ? `${data.coverages.length} ${
                      data.coverages.length === 1 ? "Country" : "Countries"
                    }`
                  : data?.title}
                ,
                <span className="capitalize md:hidden">( {data?.slug})</span>
                <span className="cursor-pointer px-1.5 bg-amber-400/20 rounded-full">
                  view
                </span>
              </span>
            </div>
          </div>
        </div>

        <div
          onClick={handleSelect}
          className="md:mt-2 md:pt-2 md:border-t border-slate-100 flex items-center justify-end md:justify-between gap-2 cursor-pointer"
        >
          <span className="text-sm font-bold text-(--dark-teal) flex items-baseline gap-1">
            {currency} {(priceNum * totalSimCards).toFixed(2)}
            <span className="text-[9px] font-light text-slate-400 hidden md:block">
              / {totalSimCards} SIM
            </span>
          </span>

          <div className="hidden md:block">
            {isSelected && (
              <HiOutlineCheckCircle className="w-4 h-4 text-(--dark-teal)" />
            )}
          </div>
        </div>
      </div>

      {/* Badge */}
      {data?.slug && (
        <div className="hidden md:block">
          <div className="absolute top-2 left-2 px-2 py-0.5 text-[8px] font-bold rounded-full bg-linear-to-r from-slate-200 to-orange-400/20 text-(--dark-teal) flex items-center gap-1 capitalize">
            <HiOutlineFire className="w-2.5 h-2.5" />
            {data?.slug}
          </div>
        </div>
      )}
    </button>
  );
};
