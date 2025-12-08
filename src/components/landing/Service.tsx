'use client';

import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { Button } from '../common/button/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Country {
  name: string;
  code?: string;
  price: number;
  countries?: number;
  icon?: string;
}

// ✅ All countries and regions
const allCountries: Record<string, Country[]> = {
  Regions: [
    { name: 'Global', price: 10.0, countries: 149, icon: '/assets/asia.png' },
    { name: 'Asia', price: 5.0, countries: 13, icon: '/assets/asia.png' },
    { name: 'Europe', price: 5.0, countries: 20, icon: '/assets/europe.png' },
    { name: 'North-America', price: 5.0, countries: 20, icon: '/assets/europe.png' },
    { name: 'World', price: 5.0, countries: 149, icon: '/assets/asia.png' },
    { name: 'Oceania', price: 5.0, countries: 149, icon: '/assets/asia.png' },
    { name: 'Africa', price: 5.0, countries: 149, icon: '/assets/asia.png' },
    { name: 'Caribbean-Islands', price: 5.0, countries: 149, icon: '/assets/asia.png' },
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
  'North-America': [
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
  const router = useRouter();

  const tabs = [
    'All',
    'Global',
    'Regions',
    'Popular',
    'Asia',
    'Europe',
    'North-America',
  ] as const;

  const [tab, setTab] = useState<typeof tabs[number]>('All');

  // 🔹 FILTERED LIST BASED ON TAB
  const selectedCountries: Country[] = (() => {
    if (tab === 'All') {
      return Object.values(allCountries).flat().sort((a, b) => a.name.localeCompare(b.name));
    }
    if (tab === 'Global') {
      return allCountries['Regions'].filter(c => c.name === 'Global');
    }
    return (allCountries[tab] || []).sort((a, b) => a.name.localeCompare(b.name));
  })();

  // 🔹 BUILD URL HELPER
  const buildEsimUrl = (country: Country, type: string) =>
    `/esim?destination=${encodeURIComponent(country.name)}&type=${encodeURIComponent(type)}${country.code ? `&code=${encodeURIComponent(country.code)}` : ''}`;

  // 🔹 HANDLE CLICK
  const handleItemClick = (country: Country) => {
    switch (true) {
      // Global
      case country.name === 'Global':
        router.push(buildEsimUrl(country, 'Global'));
        break;

      // World (if separate)
      case country.name === 'World':
        router.push(buildEsimUrl(country, 'Global'));
        break;

      // Popular tab
      case tab === 'Popular':
        router.push(buildEsimUrl(country, 'Popular'));
        break;

      // Specific region tabs
      case !['All', 'Global', 'Regions', 'Popular'].includes(tab):
        router.push(buildEsimUrl(country, tab));
        break;

      // Regions tab
      case tab === 'Regions':
        router.push(buildEsimUrl(country, 'Regions'));
        break;

      // All tab → auto detect region
      default:
        const region = Object.keys(allCountries).find(key =>
          allCountries[key].some(c => c.name === country.name)
        ) || 'All';
        router.push(buildEsimUrl(country, region));
    }
  };

  return (
    <div className="mx-auto py-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-black">eSIMs</h2>
        <p className="text-sm text-gray-500 mt-1 md:mt-0">Best eSIMs by country and region</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map(t => (
          <Button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1 rounded-md font-medium border ${tab === t ? 'bg-(--dark-teal) text-white border-(--dark-teal)' : 'bg-white text-gray-700 border-gray-300'}`}
          >
            {t}
          </Button>
        ))}
      </div>

      {/* Countries List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {selectedCountries.map((country, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(country)}
            className="flex justify-between items-center bg-white border border-gray-200 rounded-md p-3 hover:shadow-md cursor-pointer transition"
          >
            <div className="flex items-center gap-3">
              {country.code && <span className={`fi fi-${country.code.toLowerCase()}`}></span>}

              {country.icon && (
                <Image src={country.icon} alt={country.name} width={145} height={80} className="cursor-pointer w-auto h-6" />
              )}

              <span className="font-medium">{country.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">
                {country.countries ? `Countries ${country.countries}` : 'Starting from'}
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
