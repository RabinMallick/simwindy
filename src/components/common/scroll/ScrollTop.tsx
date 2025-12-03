"use client";

import React, { FC, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScrollState {
  scrolled: boolean;
  percent: number;
}

export const ScrollTop: FC = () => {
  const [scroll, setScroll] = useState<ScrollState>({
    scrolled: false,
    percent: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setScroll({ scrolled: scrollTop > 50, percent });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scroll.percent / 100) * circumference;

  return (
    <AnimatePresence>
      {mounted && scroll.scrolled && (
        <motion.button
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="
            fixed bottom-8 right-6 md:bottom-10 md:right-8
            w-12 h-12 flex items-center justify-center rounded-full
            bg-(--dark-teal) text-white shadow-lg z-50 cursor-pointer
            hover:bg-var(--orange) transition-colors duration-300
          "
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Circular Progress Indicator */}
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 56 56"
          >
            <circle
              cx="28"
              cy="28"
              r={radius}
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="4"
              fill="transparent"
            />
            <circle
              cx="28"
              cy="28"
              r={radius}
              stroke="white"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 28 28)"
            />
          </svg>

          <span className="relative text-xl font-bold">↑</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
