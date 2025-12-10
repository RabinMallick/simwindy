import React from 'react';
import { MdArrowBackIos } from 'react-icons/md';
import { useRouter } from 'next/navigation';

interface TopHeaderProps {
  title: string;
  onClick?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ title, onClick }) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50">
      {/* Mobile Header */}
      <div className="relative md:hidden text-center bg-amber-50 ">
        <div className="p-3 font-medium text-amber-900 text-[15px]">{title}</div>

        {/* Back Button */}
        <button
          onClick={onClick || (() => router.back())}
          className="absolute top-0 left-0 h-12 w-12 flex items-center justify-center"
        >
          <MdArrowBackIos className="text-amber-800 text-xl transition-transform duration-200 active:scale-95 hover:opacity-90" />
        </button>
      </div>
    </header>
  );
};
