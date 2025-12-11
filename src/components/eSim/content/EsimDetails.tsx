"use client";

import EsimCheckoutBar from "./EsimCheckoutBar";
import { useSearchParams } from "next/navigation";
import BasicInfo from "./BasicInfo";
import { RxCrossCircled } from "react-icons/rx";

// ----------------------
// Types
// ----------------------
interface Network {
  name: string;
  types: string[];
}

interface Coverage {
  name: string;
  code: string;
  networks: Network[];
}

interface Country {
  title: string;
  countryCode?: string;
}

interface APN {
  ios?: { apn_type: string };
  android?: { apn_type: string };
}

export interface EsimData {
  coverages?: Coverage[];
  title?: string;
  slug?: string;
  shortInfo?: string;
  apn?: APN;
  otherInfo?: string;
  countries?: Country[];
  qrInstallation?: string;
  manualInstallation?: string;
}

interface EsimDetailsProps {
  data: EsimData;
  onClick: () => void;   // <-- Add this line
}
// ----------------------
// SectionHeader Component
// ----------------------
const SectionHeader = ({ title }: { title: string }) => (
  <div className="w-full flex items-center justify-between p-2 md:px-4 bg-gray-50 hover:bg-gray-100 transition-colors">
    <h2 className="text-[13px] md:text-[14px] font-semibold text-gray-800">{title}</h2>
  </div>
);

// ----------------------
// Main Component
// ----------------------
export default function EsimDetails({ data, onClick }: EsimDetailsProps) {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination") ?? "";
  const code = searchParams.get("code") ?? "";

  const {
    coverages,
    title,
    shortInfo,
    apn,
    otherInfo,
    countries,
    qrInstallation,
    manualInstallation,
  } = data ?? {};

  const coverageText = coverages?.length
    ? coverages.length === 1
      ? "single country"
      : `${coverages.length} Countries`
    : title;

  return (
    <div className="min-h-100 max-h-[calc(100vh-80px)] overflow-y-auto text-xs">
      {/* Header */}
      <div className="px-4 border-b-2 border-(--primary) pt-2.5 md:sticky md:top-0 md:py-2 md:pt-3 bg-white">
        <div className="flex justify-between items-center">
          <div className="">
            <div className="flex items-center text-sm md:text-xl font-bold gap-2 mb-1 bg-white">
              {code && (
                <span className={`fi fi-${code.toLowerCase()} border border-gray-200 md:w-10! w-6.5! md:h-7 shrink-0`}></span>
              )}
              <span className="bg-linear-to-r from-(--primary) to-(--orange) text-transparent bg-clip-text truncate">
                {destination} eSIM

                {data?.slug?.toLowerCase() !== destination?.toLowerCase() &&
                  <span className="text-sm capitalize ps-1">({data?.slug})</span>
                }
              </span>
            </div>
            <p className="text-gray-600 text-[12px] pb-2" >
              Best for {coverageText ?? "single country"} e-SIM 4G/5G Connectivity.
            </p>
          </div>
          <div onClick={onClick} className="hidden md:block text-(--primary) text-xl hover:text-red-500 cursor-pointer"><RxCrossCircled /></div>
        </div>
      </div>



      <div className="p-4 space-y-6 mb-40 md:mb-4">
        {/* Basic Details */}
        <BasicInfo data={data} />

        {/* Short Info */}
        {shortInfo && (
          <div>
            <SectionHeader title="Short Info" />
            <p className="text-[12px] md:text-[13px] text-gray-700 p-2 md:px-4">{shortInfo}</p>
          </div>
        )}

        {/* APN Info */}
        <div>
          <SectionHeader title="APN Settings" />
          <p className="text-[12px] md:text-[13px] text-gray-700 px-2 mb-0.5 md:px-4 mt-1 capitalize">
            <b>iOS:</b> {apn?.ios?.apn_type}
          </p>
          <p className="text-[12px] md:text-[13px] text-gray-700 px-2 md:px-4 capitalize">
            <b>Android:</b> {apn?.android?.apn_type}
          </p>
        </div>

        {/* Other Info */}
        {otherInfo && (
          <div>
            <SectionHeader title="Other Info" />
            <p className="text-[12px] md:text-[13px] text-gray-700 p-2 md:px-4">{otherInfo}</p>
          </div>
        )}

        {/* Network Coverage */}
        {coverages && (
          <div>
            <SectionHeader title="Network Coverage" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
              {coverages.map((c: Coverage, i: number) => (
                <div key={i} className="border border-gray-100 pb-2 rounded-md p-2 hover:bg-gray-100">
                  <p className="font-semibold text-[13px]">{c.name}</p>
                  {c.networks.map((n: Network, idx: number) => (
                    <p key={idx} className="text-[12px] text-gray-700">
                      {n.name} — {n.types.join(", ")}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Countries Covered */}
        {countries && (
          <div>
            <SectionHeader title="Countries Covered" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3 md:px-4">
              {countries.map((c: Country, i: number) => (
                <div key={i} className="flex gap-1 items-center hover:bg-gray-100 p-1 border border-gray-50">
                  {c.countryCode && <span className={`fi fi-${c.countryCode.toLowerCase()}`}></span>}
                  <p className="text-[11px] mt-1">{c.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* QR Installation */}
        {qrInstallation && (
          <div>
            <SectionHeader title="QR Installation" />
            <div
              className="prose prose-sm text-[12px] md:text-[13px] text-gray-700 p-2 md:px-4"
              dangerouslySetInnerHTML={{ __html: qrInstallation.replace(/airalo/gi, "simwindy") }}
            />
          </div>
        )}

        {/* Manual Installation */}
        {manualInstallation && (
          <div>
            <SectionHeader title="Manual Installation" />
            <div
              className="prose prose-sm text-[12px] md:text-[13px] text-gray-700 p-2 md:px-4"
              dangerouslySetInnerHTML={{ __html: manualInstallation.replace(/airalo/gi, "simwindy") }}
            />
          </div>
        )}
      </div>

      {/* Checkout Bar */}
      <div className="fixed bottom-0 w-full">
        <EsimCheckoutBar data={data} />
      </div>
    </div>
  );
}
