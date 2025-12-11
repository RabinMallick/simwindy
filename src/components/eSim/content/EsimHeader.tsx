"use client";
import { useSearchParams } from "next/navigation";
 
export default function EsimHeader( ) {

     const params = useSearchParams();
    
      const esimType = params.get("esimType");
      const code = params.get("code");
      const country = params.get("country");

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center  bg-gray-100 p-3 px-4">

      {/* LEFT SIDE */}
      <div className="flex-1 min-w-0 space-y-1">
        
        {/* Title */}
        <h1 className="flex gap-2 items-center font-extrabold leading-tight">

          {code && (
            <span
              className={`fi fi-${code.toLowerCase()} w-10 h-7`}
            ></span>
          )}

          <span className="text-md md:text-xl bg-linear-to-r from-(--primary) to-(--orange) bg-clip-text text-transparent truncate drop-shadow">
            {country} eSIM
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600  text-[12px] md:text-[13px]">
          Downloadable {country} SIM card with{" "}
          <span className="font-semibold text-gray-800">{esimType?.toLowerCase()}</span> data
        </p>
      </div>

    </div>
  );
}
