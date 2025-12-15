'use client';

import { FC, useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import ErrorMessage from '@/components/ui/ErrorMessage';

type PhoneInputFieldProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    showError?: boolean;
    no?: boolean;
};

const PhoneInputField: FC<PhoneInputFieldProps> = ({
    label,
    value,
    onChange,
    error,
    showError = false,
    no = false,
}) => {

    const [countryCode, setCountryCode] = useState<string>("bd"); 

    useEffect(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("ipAdd");
            if (stored) {
                setTimeout(() => {
                    setCountryCode(stored.toLowerCase());
                }, 0);
            }
        }
    }, []);


    return (
        <div className="grid gap-1">
            {!no && <label className="font-medium text-sm md:text-xs">{label}</label>}
            <PhoneInput
                country={countryCode}
                value={value}
                onChange={onChange}
                inputProps={{ required: true, name: 'phone' }}
                containerClass="!w-full"
                inputClass={`!w-full !h-[40px] !rounded-md !border !border-gray-100 !pl-[52px] !pr-[70px] !text-gray-700 !bg-white focus:ring-1 focus:ring-[var(--primary)] transition-all duration-300 ${showError ? 'border-red-500 focus:ring-red-500' : ''}`}
            />
            {showError && error && <ErrorMessage errors={error} />}
        </div>
    );
};

export default PhoneInputField;
