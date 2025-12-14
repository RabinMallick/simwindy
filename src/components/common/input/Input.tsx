import { ChangeEvent, useState } from 'react';
import { Field } from 'formik';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
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
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="grid gap-1 relative">
      {!no && (
        <label className="font-medium text-sm md:text-xs">{title}</label>
      )}
      <Field
        type={inputType}
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
      {/* Password toggle icon */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 transform translate-y-0 text-gray-500"
        >
          {showPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
        </button>
      )}
      {hasError && <ErrorMessage errors={error} />}
    </div>
  );
};

export default Input;
