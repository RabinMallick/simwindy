"use client";

import { useState } from "react";
import EsimCheckoutBar from "./content/EsimCheckoutBar";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { GiWorld } from "react-icons/gi";
import BasicInfo from "./content/BasicInfo";
export default function EsimDetails({ data, currency }) {

    const searchParams = useSearchParams();
    const destination = searchParams.get("destination") ?? "";
    const type = searchParams.get("type") ?? "";
    const code = searchParams.get("code") ?? "";

    const [numSim, setNumSim] = useState(1);
    const retail = data?.prices?.recommended_retail_price?.[currency ?? data?.currency] ?? "0";
    const agent = data?.prices?.agentPrice?.[currency ?? data?.currency] ?? "0";

    const handleIncrement = () => setNumSim((prev) => prev + 1);
    const handleDecrement = () => setNumSim((prev) => Math.max(1, prev));

    const totalPrice = data?.price * numSim;

    return (
        <div className="min-h-100 max-h-[calc(100vh-80px)] overflow-y-auto text-xs">

            {/* Header */}

            <div className="px-4 border-b-2 border-(--primary) pt-2.5 md:sticky md:top-0 md:py-2 md:pt-3 bg-white">
                {/* Country */}
                <div className="flex items-center text-sm md:text-xl font-bold gap-2 mb-1 bg-white">

                    {code ? <span className={`fi fi-${code.toLowerCase()} border border-gray-200 md:w-10! w-6.5! md:h-7 shrink-0`}></span>
                        :
                        <span className="border border-gray-200 md:w-10! w-6.5! h-5 md:h-7 shrink-0 flex items-center justify-center"><GiWorld className="p-0.5" /></span>
                    }
                    <span className='bg-linear-to-r  from-(--primary) to-(--orange) text-transparent bg-clip-text truncate'>{destination} eSIM</span>
                </div>
                <p className="text-gray-600 text-[10px]  pb-2">
                    Best for single country e-SIM 4G/5G Connectivity.
                </p></div>

            <div className="p-4 space-y-6 mb-24 md:mb-4">


                {/* Price Section */}
                {/* <div className="bg-white border border-gray-200 rounded-md  p-3 text-[12px]">
                    <h2 className="text-[14px] font-semibold mb-2">Pricing</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <p className="text-[10px] text-gray-600">Retail Price</p>
                            <p className="text-[14px] font-bold">{data?.currency} {retail}</p>
                        </div>
                        <div className="p-2 bg-green-50 rounded-lg">
                            <p className="text-[10px] text-gray-600">Agent Price</p>
                            <p className="text-[14px] font-bold">{data?.currency} {agent}</p>
                        </div>
                    </div>
                </div> */}

                {/* Basic Details */}
                <BasicInfo data={data }/> 

                {/* Quick Info */}
                {data?.shortInfo && (
                    <div className="bg-white border border-gray-200 rounded-md  p-3 text-[12px]">
                        <h2 className="text-[14px] font-semibold mb-2">Quick Info</h2>
                        <p className="text-[12px] text-gray-700">{data?.shortInfo}</p>
                    </div>
                )}

                {/* Network Coverage */}
                <div className="bg-white border border-gray-200 rounded-md  p-3 text-[12px]">
                    <h2 className="text-[14px] font-semibold mb-2">Network Coverage</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {data?.coverages?.map((c, i) => (
                            <div key={i} className="border  border-gray-100 pb-2 rounded-md p-2">
                                <p className="font-semibold text-[12px]">{c.name} ({c.code})</p>
                                {c.networks.map((n, idx) => (
                                    <p key={idx} className="text-[10px] text-gray-700">{n.name} — {n.types.join(", ")}</p>
                                ))}
                            </div>
                        ))}
                    </div>

                </div>

                {/* Installation QR */}
                <div className="bg-white border border-gray-200 rounded-md p-3 text-[12px]">
                    <h2 className="text-[14px] font-semibold mb-2">QR Installation</h2>
                    <div
                        className="prose prose-sm text-[12px]"
                        dangerouslySetInnerHTML={{
                            __html: data?.qrInstallation?.replace(/airalo\.com/gi, 'simwindy.com') ?? '',
                        }}
                    />
                </div>

                {/* Manual Installation */}
                <div className="bg-white border border-gray-200 rounded-md p-3 text-[12px]">
                    <h2 className="text-[14px] font-semibold mb-2">Manual Installation</h2>
                    <div
                        className="prose prose-sm text-[12px]"
                        dangerouslySetInnerHTML={{
                            __html: data?.manualInstallation?.replace(/airalo\.com/gi, 'simwindy.com') ?? '',
                        }}
                    />
                </div>

                {/* Countries Covered */}
                <div className="bg-white border border-gray-200 rounded-md  p-3 text-[12px]">
                    <h2 className="text-[14px] font-semibold mb-2">Countries Covered</h2>
                    <div className="grid  grid-cols-2 md:grid-cols-3 gap-2  ">
                        {data.countries?.map((c, i) => (
                            <div key={i} className="flex gap-1 items-center  ">
                                {c.countryCode && <span className={`fi fi-${c.countryCode.toLowerCase()}`}></span>}
                                <p className="text-[11px] mt-1">{c.title}</p>
                            </div>
                        ))}
                    </div>
                </div>


                {/* APN Info */}
                <div className="bg-white border border-gray-200 rounded-md  p-3 text-[12px]">
                    <h2 className="text-[14px] font-semibold mb-2">APN Settings</h2>
                    <p className="text-[10px]"><b>iOS:</b> {data?.apn?.ios?.apn_type}</p>
                    <p className="text-[10px]"><b>Android:</b> {data?.apn?.android?.apn_type}</p>
                </div>

                {/* Other Info */}
                <div className="bg-white border border-gray-200 rounded-md  p-3 text-[12px]">
                    <h2 className="text-[14px] font-semibold mb-2">Other Information</h2>
                    <p className="text-[12px]">{data?.otherInfo}</p>
                </div>
            </div>

            <div className="fixed bottom-0 w-full">

                <EsimCheckoutBar data={data} />

            </div>
        </div>
    );
}
