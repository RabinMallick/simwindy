'use client';

import { useRouter } from "next/navigation";
import { FcGlobe } from "react-icons/fc";
import { MdKeyboardArrowRight } from "react-icons/md";
import countries from 'world-countries'; 

export default function Countries() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      <section id="countries" className="scroll-offset">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="flex gap-2 text-lg font-semibold text-black">
                  <FcGlobe className="w-6 h-6" />
                   {countries.length} Countries
                </h2>
                <p className="text-xs text-gray-500">
                  Buy data for the whole globe or select individual countries.
                </p>
              </div>
            </div>

            {/* All Countries */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">All Countries</h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mb-3">
                {countries.map((country, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      router.push(
                        `/esim?destination=${encodeURIComponent(country.name.common)}&type=Local&code=${country.cca2}`
                      )
                    }
                    className="flex items-center justify-between p-3 pl-4 bg-white border rounded-lg text-left cursor-pointer transition-shadow duration-200 border-gray-200 hover:shadow-sm"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      {country.cca2 && (
                        <span className={`fi fi-${country.cca2.toLowerCase()}`}></span>
                      )}
                      <span className="font-medium truncate text-sm">
                        {country.name.common}
                      </span>
                    </div>
                    <MdKeyboardArrowRight className="w-4 h-4 text-gray-300" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
