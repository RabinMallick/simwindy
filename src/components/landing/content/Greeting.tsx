'use client';

import Image from 'next/image'; 
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import countries from 'world-countries';
import { MdOutlineSearch } from 'react-icons/md';

interface Country {
  name: string;
  code?: string;
  icon?: string;
}

export const Greeting = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<
    { region: string; name: string; code?: string; icon?: string }[]
  >([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prepare countries data
  const allCountries: Record<string, Country[]> = {
    Local: countries.map((c) => ({ name: c.name.common, code: c.cca2 })),
    Regions: [
      { name: 'Asia', icon: '/assets/asia.png' },
      { name: 'Europe', icon: '/assets/europe.png' },
      { name: 'North-America', icon: '/assets/north-america.png' },
      { name: 'Oceania', icon: '/assets/oceania.png' },
      { name: 'Africa', icon: '/assets/africa.png' },
      { name: 'Caribbean-Islands', icon: '/assets/caribbean.png' },
      { name: 'Middle-East-And-North-Africa', icon: '/assets/middle-east.png' },
    ],
    Global: [{ name: 'Global', icon: '/assets/global.png' }],
  };

  const getSuggestions = (value: string) => {
    if (!value) return [];
    const lowerQuery = value.toLowerCase();
    const matched: { region: string; name: string; code?: string; icon?: string }[] = [];

    // Show regions if query matches
    if (['reg', 'regions', 'regional'].some((q) => lowerQuery.includes(q))) {
      allCountries.Regions.forEach((c) => matched.push({ region: 'Regions', ...c }));
      return matched;
    }

    // Normal search across all countries
    Object.entries(allCountries).forEach(([region, countries]) => {
      countries.forEach((c) => {
        if (c.name.toLowerCase().includes(lowerQuery)) {
          matched.push({ region, ...c });
        }
      });
    });

    return matched;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSuggestions(getSuggestions(value));
  };

  const handleSelectSuggestion = (name: string, region: string, code?: string) => {
    const url = `/esim?destination=${encodeURIComponent(name)}${
      region ? `&type=${encodeURIComponent(region)}` : ''
    }${code ? `&code=${encodeURIComponent(code)}` : ''}`;
    router.push(url);
  };

  // Group suggestions by region
  const groupedSuggestions = suggestions.reduce((acc: Record<string, typeof suggestions>, sugg) => {
    if (!acc[sugg.region]) acc[sugg.region] = [];
    acc[sugg.region].push(sugg);
    return acc;
  }, {});

  return (
    <div className="mb-5">
      <div className="mb-4">
        <h2 className="font-semibold text-lg">Hi traveler!</h2>
        <p className="text-sm text-gray-600">Welcome to SimWindy!</p>
      </div>

      <div className="w-full relative" ref={wrapperRef}>
        <MdOutlineSearch
          size={30}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-red-500 p-1 text-white rounded-md"
        />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for your destination in over 200+ countries"
          className="w-full pl-12 pr-4 py-3 rounded-lg border text-sm bg-white border-gray-300 focus:outline-none hover:border-[#f5a623] placeholder-gray-400"
        />

        {Object.entries(groupedSuggestions).length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg text-sm">
            {Object.entries(groupedSuggestions).map(([region, countries]) => (
              <li key={region}>
                <div className="px-4 py-2 font-bold bg-gray-100">{region}</div>
                {countries.map((sugg, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                    onClick={() => handleSelectSuggestion(sugg.name, region, sugg.code)}
                  >
                    <div className="flex items-center gap-2">
                      {sugg.code && sugg.code.length === 2 && (
                        <span className={`fi fi-${sugg.code.toLowerCase()}`}></span>
                      )}
                      {sugg.icon && (
                        <Image src={sugg.icon} alt={sugg.name} width={20} height={20} className="h-5 w-auto" />
                      )}
                      <span className="capitalize">{sugg.name}</span>
                    </div>
                    <span className="text-gray-400 text-xs capitalize">{sugg.region}</span>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
