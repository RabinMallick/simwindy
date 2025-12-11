import React, { ReactNode } from "react";

interface ButtonProps {
  className?: string;
  width?: string;
  children: ReactNode; 
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  className = "",
  width = "",
  children, 
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex  items-center gap-2 text-[12px] md:text-sm px-2 md:px-4 py-2 
      transition-all duration-200 active:scale-95 hover:opacity-90 cursor-pointer  rounded-lg
      ${className || 'bg-linear-to-b from-[#fce9d8] to-[#e0bd9e27]  border border-(--vivid-orange) text-[#3A220F]'} ${width || 'w-auto'}`}
    > 
      {children}
    </button>
  );
};
