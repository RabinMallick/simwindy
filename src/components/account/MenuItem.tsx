import React from 'react';

export const MenuItem = ({
  icon,
  label,
  danger,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-md bg-white border border-gray-200 text-left
            transition active:scale-[0.98] cursor-pointer
            ${danger ? 'text-red-500' : 'text-gray-700'}`}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};
