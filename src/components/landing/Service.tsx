'use client';
import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { Button } from '../common/button/Button';
import Image from 'next/image';

interface Country {
  name: string;
  code?: string; // optional for regions/global
  price: number;
  countries?: number; // optional
  icon?: string;     // optional
}

// 🔹 All Countries List
const allCountries: Record<string, Country[]> = {
  Regions: [
    { name: 'Global', price: 10.0, countries: 149, icon: '/assets/asia.png' },
    { name: 'Asia', price: 5.0, countries: 13, icon: '/assets/asia.png' },
    { name: 'Europe', price: 6.5, countries: 20, icon: '/assets/europe.png' },
    { name: 'Central America', price: 10.0, countries: 6, icon: '/assets/asia.png' },
  ],
  Asia: [
    { name: 'Bangladesh', code: 'BD', price: 2.5 },
    { name: 'India', code: 'IN', price: 2.5 },
    { name: 'Malaysia', code: 'MY', price: 2.5 },
    { name: 'Singapore', code: 'SG', price: 2.4 },
    { name: 'Thailand', code: 'TH', price: 2.3 },
    { name: 'Japan', code: 'JP', price: 3.5 },
    { name: 'South Korea', code: 'KR', price: 3.2 },
    { name: 'China', code: 'CN', price: 3.4 },
  ],
  Europe: [
    { name: 'Germany', code: 'DE', price: 4.2 },
    { name: 'France', code: 'FR', price: 4.1 },
    { name: 'Italy', code: 'IT', price: 4.0 },
    { name: 'Spain', code: 'ES', price: 3.9 },
    { name: 'Netherlands', code: 'NL', price: 4.3 },
  ],
  'North America': [
    { name: 'United States', code: 'US', price: 5.99 },
    { name: 'Canada', code: 'CA', price: 5.5 },
    { name: 'Mexico', code: 'MX', price: 4.9 },
  ],
  Popular: [
    { name: 'Singapore', code: 'SG', price: 2.4 },
    { name: 'Germany', code: 'DE', price: 4.2 },
    { name: 'United States', code: 'US', price: 5.99 },
  ],
};

export default function Service() {
  const [tab, setTab] = useState<
    'All' | 'Locals' | 'Global' | 'Regions' | 'Popular' | 'Asia' | 'Europe' | 'North America'
  >('All');

  // 🔹 Filter and sort countries based on tab
  const selectedCountries: Country[] = (() => {
    let list: Country[] = [];
    switch (tab) {
      case 'All':
        list = Object.values(allCountries).flat();
        break;
      case 'Locals':
        list = allCountries['Asia'];
        break;
      case 'Regions':
        list = allCountries['Regions'];
        break;
      case 'Global':
        list = allCountries['Regions'].filter(c => c.name === 'Global');
        break;
      case 'Popular':
      case 'Asia':
      case 'Europe':
      case 'North America':
        list = allCountries[tab] || [];
        break;
      default:
        list = [];
    }

    // 🔹 Sort descending by name
    return list.sort((a, b) => a.name.localeCompare(b.name));
  })();

  return (
    <div className="mx-auto py-8 max-w-7xl ">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-black">eSIMs</h2>
        <p className="text-sm text-gray-500 mt-1 md:mt-0">
          Best eSIMs by country and region
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['All', 'Locals', 'Global', 'Regions', 'Popular', 'Asia', 'Europe', 'North America'].map((t) => (
          <Button
            key={t}
            onClick={() => setTab(t as any)}
            className={`px-4 py-1! rounded-md font-medium border ${
              tab === t
                ? 'bg-(--dark-teal) text-white border-(--dark-teal)'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            {t}
          </Button>
        ))}
      </div>

      {/* Country or Region List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {selectedCountries.map((country, index) => (
          <div
            key={index}
            className="flex justify-between items-center border border-gray-200 rounded-md p-3 hover:shadow-md cursor-pointer transition"
          >
            <div className="flex items-center gap-3">
              {country.code && (
                <span className={`fi fi-${country.code.toLowerCase()}`}></span>
              )}
              {country.icon && (
                <Image
                  src={country.icon}
                  alt={country.name}
                  width={145}
                  height={80}
                  className="cursor-pointer w-auto h-6"
                />
              )}
              <span className="font-medium">{country.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">
                {country?.countries ? 'Countries ' + country?.countries : 'Starting from'}
              </span>
              <span className="font-semibold">${country.price.toFixed(2)}</span>
              <FaChevronRight className="text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
