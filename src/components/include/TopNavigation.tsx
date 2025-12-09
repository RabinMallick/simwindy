"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export const TopNavigation = () => {
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
        ${isScrolled ? "border-b border-gray-200 shadow-sm backdrop-blur-sm bg-(--peach)/50" : "bg-(--peach)/10"}
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
        <button className="px-3 py-1 border rounded-full">Support</button>
        <button className="px-3 py-1 border rounded-full">Eng</button>
      </div>
    </header>
  );
};
