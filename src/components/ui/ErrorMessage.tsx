import React from 'react';

type Props = {
  errors?: string;
  className?: string;
};

const ErrorMessage: React.FC<Props> = ({ errors, className = '' }) => {
  if (!errors) return null; // Don't render if no errors
  return <span className={`${className} text-red-500 text-[12px]`}>{errors}</span>;
};

export default ErrorMessage;
