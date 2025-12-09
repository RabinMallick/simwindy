"use client";

import { useState } from "react";
import { HiOutlineFire } from "react-icons/hi";
export default function EsimDetails({ data }) {

    const [numSim, setNumSim] = useState(1);
    const retail = data?.prices?.recommended_retail_price?.[data?.currency] ?? "0";
    const agent = data?.prices?.agentPrice?.[data?.currency] ?? "0";

    const handleIncrement = () => setNumSim((prev) => prev + 1);
    const handleDecrement = () => setNumSim((prev) => Math.max(1, prev));

    const totalPrice = data?.price * numSim;



    return (
        <div className="min-h-100 max-h-[calc(100vh-80px)] overflow-y-auto text-xs">
            <div className="p-4 space-y-6 mb-24 md:mb-4">


                {/* Header */}
                <div className="flex items-center gap-3">
                    <div>
                        <h1 className="text-[15px] font-bold">{data?.title}</h1>
                        <p className="text-[12px] text-gray-600">
                            {data?.operatorTitle} • {data?.countryTitle}
                        </p>
                    </div>

                    <div className="px-2 py-0.5 text-[8px] font-bold rounded-full bg-linear-to-r from-slate-200 to-orange-400/20 text-(--primary) flex items-center gap-1 capitalize">
                        <HiOutlineFire className="w-2.5 h-2.5" />
                        {data?.slug}
                    </div>
                </div>

                {/* Price Section */}
                <div className="bg-white border border-gray-200 rounded-md  p-3 text-[12px]">
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
                </div>

                {/* Basic Details */}
                <div className="bg-white border border-gray-200 rounded-md  p-3 space-y-1 text-[12px]">
                    <h2 className="text-[14px] font-semibold">Basic Info</h2>
                    <div className="grid grid-cols-2 gap-2">
                        <p><b>Data:</b> {data?.data}</p>
                        <p><b>Validity:</b> {data?.day} Days</p>
                        <p><b>Amount MB:</b> {data?.amount}</p>
                        <p><b>Unlimited:</b> {data?.isUnlimited ? "Yes" : "No"}</p>
                        <p><b>eSIM Type:</b> {data?.esimType}</p>
                        <p><b>Operator Type:</b> {data?.operatorType}</p>
                        <p><b>Plan Type:</b> {data?.planType}</p>
                        <p><b>Rechargeable:</b> {data?.rechargeability ? "Yes" : "No"}</p>
                        <p><b>KYC Required:</b> {data?.isKycVerify ? "Yes" : "No"}</p>
                        <p><b>Activation Policy:</b> {data?.activationPolicy}</p>
                    </div>
                </div>

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
                <div className="p-4 bg-white border-t  flex flex-wrap justify-between items-center">

                    {/* Number of Sim Cards */}
                    <div className="flex items-center gap-2 mb-4">
                        <span>Number of Sim Cards</span>
                        <div className="flex items-center border rounded-md ml-auto">
                            <button
                                onClick={handleDecrement}
                                className="px-2 py-1 text-lg font-bold"
                            >
                                -
                            </button>
                            <span className="px-4">{numSim}</span>
                            <button
                                onClick={handleIncrement}
                                className="px-2 py-1 text-lg font-bold"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <span>{totalPrice.toFixed(2)} USD</span>
                </div>
            </div>
        </div>
    );
}
