"use client";

import { setCurrency } from "@/store/slice/currencySlice";
import { AppDispatch, RootState } from "@/store/store";
import Image from "next/image";
import { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";

export const TopNavigation = () => {

  const dispatch = useDispatch<AppDispatch>();

  const { currency } = useSelector((state: RootState) => state.currency);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={` 
         flex justify-between items-center py-3 sticky top-0 px-3 z-50 
        transition-all duration-500 ease-in-out
        ${isScrolled ? "border-b border-gray-200 shadow-sm backdrop-blur-sm bg-(--from)/50" : "bg-(--from)/10"}
      `}
    >
      <Image
        src="/assets/logo.png"
        alt="SimWindy"
        width={100}
        height={80}
        className="h-10 w-auto"
      />

      <div className="flex items-center gap-3 text-sm">
        <select
          className="focus:outline-none"
          value={currency}
          onChange={(e) =>
            dispatch(setCurrency(e.target.value as "BDT" | "USD" | "AED"))
          }
        >
          <option value="BDT">{`৳ `}BDT</option>
          <option value="USD">{`$ `}USD</option>
          <option value="AED">{`'د.إ `}AED</option>
        </select>
      </div>
    </header>
  );
};
