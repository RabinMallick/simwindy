'use client';


import Image from 'next/image';
import { MdSupportAgent } from 'react-icons/md';
import { FiGlobe, FiSearch, FiShield } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import countries from 'world-countries';

interface Country {
    name: string;
    code?: string;
    countries?: number; // optional
    icon?: string; // optional
}

export const Hero = () => {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

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

    const data: Country[] = countries.map((c) => ({
        name: c.name.common,
        code: c.cca2,
    }));


    const allCountries: Record<string, Country[]> = {
        Local: data ?? [],
        Regions: [
            { name: 'Asia', code: '', countries: 13, icon: '/assets/asia.png' },
            { name: 'Europe', code: '', countries: 20, icon: '/assets/europe.png' },
            { name: 'North-America', code: '', countries: 20, icon: '/assets/europe.png' },
            { name: 'World', code: '', countries: 149, icon: '/assets/asia.png' },
            { name: 'Oceania', code: '', countries: 149, icon: '/assets/asia.png' },
            { name: 'Africa', code: '', countries: 149, icon: '/assets/asia.png' },
            { name: 'Caribbean-Islands', code: '', countries: 149, icon: '/assets/asia.png' },
            { name: 'Middle-East-And-North-Africa', code: '', countries: 149, icon: '/assets/asia.png' },
        ],

        Global: [{ name: 'Global', code: '', countries: 149, icon: '/assets/asia.png' }],
    };

    const getSuggestions = (value: string) => {
        if (!value) return [];
        const lowerQuery = value.toLowerCase();
        const matched: { region: string; name: string; code?: string; icon?: string }[] = [];

        // If user searches for 'reg', 'regions', 'regional', directly show Regions
        if (['reg', 'regions', 'regional'].some((q) => lowerQuery.includes(q))) {
            allCountries.Regions.forEach((country) => {
                matched.push({
                    region: 'Regions',
                    name: country.name,
                    code: country.code,
                    icon: country.icon,
                });
            });
            return matched;
        }

        // Normal search across allCountries
        Object.entries(allCountries).forEach(([region, countries]) => {
            countries.forEach((country) => {
                if (country.name.toLowerCase().includes(lowerQuery)) {
                    matched.push({
                        region,
                        name: country.name,
                        code: country.code,
                        icon: country.icon,
                    });
                }
            });
        });

        return matched;
    };



    // Input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        setSelectedRegion(null); // clear previous region
        setSelectedCountry(null);
        setSuggestions(getSuggestions(value));
    };

    // Search click
    const handleClick = () => {
        // Only navigate if a valid selection exists
        if (selectedRegion || selectedCountry) {
            const url = `/esim?destination=${encodeURIComponent(query)}${selectedRegion ? `&type=${encodeURIComponent(selectedRegion)}` : ''
                }${selectedCountry ? `&code=${encodeURIComponent(selectedCountry)}` : ''}`;
            router.push(url);
        } else {
            // Optionally, show a warning or do nothing
            console.log('No valid selection made, cannot navigate.');
        }
    };

    // Enter key triggers search
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleClick();
    };

    // Suggestion click
    const handleSelectSuggestion = (name: string, region: string, code?: string) => {
        setQuery(name);
        setSelectedRegion(region);
        setSelectedCountry(code || null);
        setSuggestions([]);
    };


    const features = [
        { icon: <FiGlobe style={{ color: 'var(--primary-text)' }} />, title: '200+ countries', subLabel: 'coverage' },
        { icon: <MdSupportAgent style={{ color: 'var(--primary-text)' }} />, title: '24x7', subLabel: 'Support window' },
        { icon: <FiShield style={{ color: 'var(--primary-text)' }} />, title: 'Secure', subLabel: 'Data handling' },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto px-6 py-12">
            {/* Left Content */}
            <div className="lg:col-span-7">
                <div className="inline-block px-3 py-1 rounded-full bg-linear-to-r from-[#dae5e5] to-[#fce9d8] text-xs font-bold">
                    Fast • Transparent • Reliable
                </div>

                <h1 className="mt-6 text-2xl md:text-4xl font-extrabold leading-tight text-black">
                    eSIM For international, <br />
                    <span className="bg-linear-to-r from-blue-500 to-orange-500 text-transparent bg-clip-text">
                        More Data SMS and Calls.
                    </span>
                </h1>

                <p className="mt-4 text-gray-600 max-w-xl">
                    Stay connected 200+ destinations with international eSIM — enjoy seamless SMS, data, and call services worldwide.
                </p>

                {/* Search Input */}
                <div className="w-full mx-auto mt-6 relative" ref={wrapperRef}>
                    <label className="block mb-2 text-gray-700 font-medium">
                        Where do you require mobile data?
                    </label>

                    <input
                        type="text"
                        value={query}
                        onChange={handleChange}
                        onKeyDown={handleKeyPress}
                        placeholder="Search for your destination in over 200+ countries"
                        className="w-full pr-12 pl-4 py-3 rounded-lg border bg-white border-gray-300 focus:outline-none hover:border-[#f5a623] placeholder-gray-400"
                    />

                    <button
                        onClick={handleClick}
                        className="absolute right-2 top-14.5 transform -translate-y-1/2 bg-red-500 text-white p-2 rounded-lg hover:bg-[#093c3e] transition-colors"
                    >
                        <FiSearch size={20} />
                    </button>

                    {/* Suggestions Dropdown */}
                    {suggestions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
                            {Object.entries(
                                suggestions.reduce((acc: Record<string, typeof suggestions>, sugg) => {
                                    if (!acc[sugg.region]) acc[sugg.region] = [];
                                    acc[sugg.region].push(sugg);
                                    return acc;
                                }, {})
                            ).map(([region, countries]) => (
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
                                                    <Image
                                                        src={sugg.icon}
                                                        alt={sugg.name}
                                                        width={20}
                                                        height={20}
                                                        className="w-auto h-6"
                                                    />
                                                )}
                                                <span className='capitalize'>{sugg.name}</span>
                                            </div>

                                            <span className="text-gray-400 text-xs capitalize">{sugg.region}</span>
                                        </div>
                                    ))}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Feature Cards */}
                <div className="mt-6 flex flex-col md:flex-row md:flex-wrap md:gap-4 text-sm p-2 md:p-3 rounded-lg">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 border-b border-gray-200 last:border-b-0 md:border-b-0 md:border-r md:pr-4 last:md:border-0 p-2 md:p-0"
                        >
                            <div>{feature.icon}</div>
                            <div className="flex flex-col">
                                <div className="font-bold text-md md:text-[1rem]">{feature.title}</div>
                                <div className="text-[0.8rem] md:text-xs text-gray-500">{feature.subLabel}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="mt-1 text-xs text-gray-400">
                    Trusted by thousands of travellers across Worldwide.
                </p>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 flex justify-end">
                <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden">
                    <Image
                        src="/assets/hero.png"
                        width={500}
                        height={360}
                        alt="hero"
                        className="w-full h-[360px] object-cover"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="/assets/hero-blur.png"
                    />
                </div>
            </div>
        </div>
    );
};
