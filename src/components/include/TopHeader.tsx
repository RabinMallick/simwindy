'use client'

import React from 'react';
import { MdArrowBackIos } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { RxCross1 } from 'react-icons/rx';

interface TopHeaderProps {
  title: string;
  onClick?: () => void;
  cross?: boolean;
  show?: boolean;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  title,
  onClick,
  cross,
  show = false
}) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50">
      {/* Mobile Header */}
      <div className={`relative ${show || 'md:hidden'} ${cross ? '' : 'text-center'}  bg-(--from) border-b border-amber-900/2`}>
        <div className="p-3 font-medium text-amber-900 text-[15px]">
          {title}
        </div>

        {cross ? (
          <div
            onClick={onClick || (() => router.back())}
            className="absolute top-0 right-0 h-12 w-12 flex items-center "
          >
            <RxCross1 className="text-amber-800 text-lg transition-transform duration-200 active:scale-95 hover:opacity-90" />
          </div>
        ) : (
          <>
            <button
              onClick={onClick || (() => router.back())}
              className="absolute top-0 left-0 h-12 w-12 flex items-center justify-center"
            >
              <MdArrowBackIos className="text-amber-800 text-xl transition-transform duration-200 active:scale-95 hover:opacity-90" />
            </button>
          </>
        )}
      </div>
    </header>
  );
};
