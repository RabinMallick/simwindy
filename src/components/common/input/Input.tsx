import { FC, ChangeEvent } from 'react';
import { Field } from 'formik';
import ErrorMessage from '@/components/ui/ErrorMessage';

type InputProps<T> = {
  title: string;
  type: string;
  field: keyof T;
  value: string | null;
  placeholder?: string;
  onChange: (field: keyof T, value: string) => void;
  error?: string;
  showError: (field: keyof T) => boolean;
  no?: boolean;
};

const Input = <T,>({
  title,
  field,
  value,
  onChange,
  error,
  showError,
  type,
  placeholder = '',
  no = false,
}: InputProps<T>) => {
  const hasError = showError(field);

  return (
    <div className="grid gap-1">
      {!no && (
        <label className="font-medium text-sm md:text-xs">{title}</label>
      )}
      <Field
        type={type || 'text'}
        name={field as string}
        placeholder={placeholder || `Enter ${title.toLowerCase()}`}
        value={value || ''}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(field, e.target.value)
        }
        className={`w-full text-[13px] md:text-sm rounded-md px-3 py-1.5 h-[35px]! pr-10 bg-white placeholder-gray-400 text-gray-700
          border border-gray-100
          focus:outline-none focus:border-transparent focus:ring-1 focus:ring-(--primary)
          transition-all duration-300 placeholder:font-300
          ${hasError ? 'border-red-500 focus:ring-red-500' : ''}`}
      />

      {hasError && <ErrorMessage errors={error} />}
    </div>
  );
};

export default Input;
