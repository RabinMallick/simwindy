'use client';

import { countries, popularCountries } from '@/utils/search';
import Link from 'next/link';
import { FC } from 'react';
import { FcGlobe } from 'react-icons/fc';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useRouter } from 'next/navigation';

interface Country {
  name: string;
  code?: string;
}

interface CountrySelectorProps {
  data?: Country[];
  multiSelect?: boolean;
}

export const CountrySelector: FC<CountrySelectorProps> = () => {
  const router = useRouter();
  const allCountries = countries;

  return (
    <div className="relative py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="flex gap-2 text-lg font-semibold text-black">
            <FcGlobe className="w-6 h-6" />
            Top {countries.length} Destinations
          </h2>
          <p className="text-xs text-gray-500">
            Buy data for the whole globe or select individual countries.
          </p>
        </div>
      </div>

      {/* Popular Countries */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Popular Countries</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {popularCountries.map((country, index) => (
            <button
              key={index}
              onClick={() => router.push(`/esim?destination=${country.name}&type=Popular${country.code ? `&code=${country.code}` : ''}`)}
              className="flex items-center justify-between p-3 pl-4 bg-white border rounded-lg text-left cursor-pointer transition-shadow duration-200 border-gray-200 hover:shadow-sm"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                {country.code && (
                  <span className={`fi fi-${country.code.toLowerCase()}`}></span>
                )}
                <span className="font-medium truncate text-sm">{country.name}</span>
              </div>
              <MdKeyboardArrowRight className="w-4 h-4 text-gray-300" />
            </button>
          ))}
        </div>
      </div>

      {/* All Countries */}
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-2">All Countries</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mb-3">
          {allCountries.map((country, index) => (
            <button
              key={index}
              onClick={() => router.push(`/esim?destination=${country.name}&type=${country.code ? 'Local' : 'Regions'}${country.code ? `&code=${country.code}` : ''}`)}
              className="flex items-center justify-between p-3 pl-4 bg-white border rounded-lg text-left cursor-pointer transition-shadow duration-200 border-gray-200 hover:shadow-sm"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                {country.code && (
                  <span className={`fi fi-${country.code.toLowerCase()}`}></span>
                )}
                <span className="font-medium truncate text-sm">{country.name}</span>
              </div>
              <MdKeyboardArrowRight className="w-4 h-4 text-gray-300" />
            </button>
          ))}
        </div>

        <div className="flex justify-end">
          <Link href="more-countries" className="text-sm text-gray-500 mt-1 md:mt-0 hover:underline">
            More Countries
          </Link>
        </div>
      </div>
    </div>
  );
};
