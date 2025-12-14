import { FC, ReactNode } from 'react';

// --- Props ---
interface OffcanvaseProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export const Offcanvase: FC<OffcanvaseProps> = ({
  open,
  onClose,
  children, 
  className
}) => {
  return (
    <div
      className={`fixed inset-0 z-100 transition-all duration-300 ${
        open ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Offcanvas content wrapper */}
      <div
        className={`fixed top-0 right-0 h-full w-full ${className || ' max-w-md'} bg-white shadow-xl transform transition-transform duration-300
        ${open ? 'translate-x-0' : 'translate-x-full'} 
          right-0 top-0 overflow-auto max-h-full min-h-full`}
      > 
          {children} 
      </div>
    </div>
  );
};
