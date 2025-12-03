'use client';

import React, { FC, useState, useMemo } from 'react';
import { FcGlobe } from 'react-icons/fc';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Destinations } from '@/components/landing/Destinations';

interface Country {
  name: string;
  code: string;
}

// List of popular countries
const popularCountries: Country[] = [
  { name: 'Bangladesh', code: 'BD' },
  { name: 'India', code: 'IN' },
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'Canada', code: 'CA' },
  { name: 'Australia', code: 'AU' },
];

// Full list of countries
const countries: Country[] = [
  ...popularCountries,
  { name: 'Malaysia', code: 'MY' },
  { name: 'Singapore', code: 'SG' },
  { name: 'China', code: 'CN' },
  { name: 'Russia', code: 'RU' },
  { name: 'Germany', code: 'DE' },
  { name: 'France', code: 'FR' },
  { name: 'Brazil', code: 'BR' },
  { name: 'Indonesia', code: 'ID' },
  { name: 'Pakistan', code: 'PK' },
  { name: 'Nigeria', code: 'NG' },
  { name: 'Mexico', code: 'MX' },
  { name: 'Philippines', code: 'PH' },
  { name: 'Vietnam', code: 'VN' },
  { name: 'Turkey', code: 'TR' },
  { name: 'Egypt', code: 'EG' },
  { name: 'South Africa', code: 'ZA' },
  { name: 'Japan', code: 'JP' },
  { name: 'South Korea', code: 'KR' },
  { name: 'Argentina', code: 'AR' },
  { name: 'Colombia', code: 'CO' },
  { name: 'Saudi Arabia', code: 'SA' },
  { name: 'Spain', code: 'ES' },
  { name: 'Italy', code: 'IT' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'Sweden', code: 'SE' },
  { name: 'Norway', code: 'NO' },
  { name: 'Denmark', code: 'DK' },
  { name: 'Switzerland', code: 'CH' },
  { name: 'Austria', code: 'AT' },
  { name: 'Belgium', code: 'BE' },
  { name: 'Poland', code: 'PL' },
  { name: 'Ukraine', code: 'UA' },
  { name: 'Thailand', code: 'TH' },
  { name: 'New Zealand', code: 'NZ' },
  { name: 'Israel', code: 'IL' },
  { name: 'United Arab Emirates', code: 'AE' },
  { name: 'Qatar', code: 'QA' },
  { name: 'Kuwait', code: 'KW' },
  { name: 'Jordan', code: 'JO' },
  { name: 'Morocco', code: 'MA' },
  { name: 'Kenya', code: 'KE' },
  { name: 'Ethiopia', code: 'ET' },
  { name: 'Iran', code: 'IR' },
  { name: 'Iraq', code: 'IQ' },
];

interface CountrySelectorProps {
  multiSelect?: boolean;
}

export const CountrySelector: FC<CountrySelectorProps> = () => {


  return (
    <div className="relative py-8">
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
              className='flex items-center justify-between p-3 pl-4 bg-white border rounded-lg text-left cursor-pointer transition-shadow duration-200 border-gray-200 hover:shadow-sm'
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <span className={`fi fi-${country.code.toLowerCase()}`}></span>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {countries.map((country, index) => (
            <button
              key={index}
              className='flex items-center justify-between p-3 pl-4 bg-white border rounded-lg text-left cursor-pointer transition-shadow duration-200 border-gray-200 hover:shadow-sm'
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <span className={`fi fi-${country.code.toLowerCase()}`}></span>
                <span className="font-medium truncate text-sm">{country.name}</span>
              </div>
              <MdKeyboardArrowRight className="w-4 h-4 text-gray-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
