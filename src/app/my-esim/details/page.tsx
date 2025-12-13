'use client'

import { useEffect, useState, useMemo } from "react";
import QRCode from "qrcode";
import { BsFillCloudPlusFill } from "react-icons/bs";
import { IoMdDownload } from "react-icons/io";
import { AiOutlineFileText, AiOutlineCopy } from "react-icons/ai";
import { TopHeader } from '@/components/include/TopHeader';
import { toast } from 'react-hot-toast';
import Image from "next/image";
import { HiOutlinePhone } from "react-icons/hi";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

interface EsimProps {
  id: string;
  country: string;
  code: string;
  data: string;
  voice: string;
  text: string;
  validity: string;
}

const topUpPackages = [
  { id: "pkg-1", data: "5 GB", price: "BDT 100", validity: "7 days", },
  { id: "pkg-2", data: "10 GB", price: "BDT 180", validity: "14 days" },
  { id: "pkg-3", data: "20 GB", price: "BDT 350", validity: "30 days" },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState<string>("Add Data");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const esim: EsimProps = useMemo(() => ({
    id: 'sdfsdfsd-fsdf',
    country: "Bangladesh",
    code: "bd",
    data: "10 GB",
    validity: "3 days",
  }), []);

  // Generate QR code dynamically
  useEffect(() => {
    if (activeTab === "Install") {
      const url = `https://esim.example.com/install/${esim.id}${selectedPackage ? `?pkg=${selectedPackage}` : ''}`;
      QRCode.toDataURL(url)
        .then((url) => setQrCodeUrl(url))
        .catch((err) => console.error(err));
    }
  }, [activeTab, esim.id, selectedPackage]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-(--from) md:from-(--from)/60 to-(--to) pb-16 md:pb-0">
      <TopHeader title="eSIM Details" />

      <div className="p-4 pt-8 flex justify-center">
        <div className="max-w-md w-full md:p-6 transition-all duration-300">
          {/* Country & Data */}
          <div className="flex flex-col items-center mb-2 md:mb-6">
            <span className={`fi fi-${esim.code} text-5xl rounded-md mb-2`}></span>
            <p className="text-gray-500 text-sm font-medium">{esim.country}</p>
            <h1 className="text-3xl font-bold text-gray-800 my-2">{esim.data}</h1>
            <p className="text-[12px] md:text-[14px] text-gray-400 flex items-center gap-1">

              {esim.validity}, 

              <span className="flex items-center gap-1">
                <HiOutlinePhone /> {esim.voice ?? 'No'} Min,
              </span>

              <span className="flex items-center gap-1">
                <HiOutlineChatBubbleLeftRight /> {esim.text ?? 'No'} SMS
              </span> 


            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-between mb-3 md:mb-6 border-b border-gray-200">
            {["Add Data", "Install", "Details"].map((tab) => {
              const isActive = activeTab === tab;
              const icons = {
                "Add Data": <BsFillCloudPlusFill size={24} />,
                "Install": <IoMdDownload size={24} />,
                "Details": <AiOutlineFileText size={24} />
              };
              return (
                <button
                  key={tab}
                  className={`flex-1 flex flex-col items-center py-2 transition-colors duration-300  cursor-pointer
                    ${isActive ? "text-orange-500 border-b-4 border-orange-500" : "text-gray-400 hover:text-orange-500"}`}
                  onClick={() => setActiveTab(tab)}
                >
                  <span className="bg-white p-1 h-12 w-12 rounded-full flex items-center justify-center">{icons[tab as keyof typeof icons]}</span>
                  <span className="text-[12px] md:text-xs mt-1">{tab}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="text-gray-700 space-y-2 transition-all duration-500">
            {activeTab === "Add Data" && (
              <div className="space-y-3">
                <p className="font-semibold text-orange-500">Add Data Packages</p>
                <div className="grid grid-cols-3 gap-3">
                  {topUpPackages.map((pkg) => (
                    <button
                      key={pkg.id}
                      className={`bg-white p-3 rounded-md border transition-all duration-300 hover:shadow cursor-pointer
                        ${selectedPackage === pkg.id ? "border-orange-400 bg-orange-50" : "border-gray-200 hover:border-orange-300"}`}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      <p className=" font-medium text-gray-700">{pkg.data}</p>
                      <p className="text-(--primary) font-bold text-sm mt-1">{pkg.price}</p>
                      <p className="text-gray-300 text-xs mt-1">{pkg.validity}</p>
                    </button>
                  ))}
                </div>
                {selectedPackage && (
                  <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition mt-2">
                    Add {topUpPackages.find(p => p.id === selectedPackage)?.data}
                  </button>
                )}

                <div className="space-y-2">
                  <p className="font-semibold text-orange-500">Installation Instructions</p>
                  <p className="text-gray-500 text-sm">
                    To activate the eSIM on a supported device:
                  </p>
                  <ol className="list-decimal list-inside text-gray-500 text-sm mt-2 space-y-1">
                    <li>Settings &gt; Cellular/Mobile &gt; Add eSIM</li>
                    <li>Scan QR Code or enter eSIM ID manually</li>
                    <li>Wait for activation</li>
                    <li>Switch data to this eSIM in settings</li>
                  </ol>
                </div>

              </div>
            )}

            {activeTab === "Install" && (
              <div className="text-center space-y-4">
                <p className="font-semibold text-orange-500">Scan QR Code</p>
                {qrCodeUrl ? (
                  <>
                    <div>
                      <Image src={qrCodeUrl} alt="eSIM QR Code" width={200} height={200} className="rounded-lg mx-auto" />
                      <p className="text-xs mt-1">eSIM ID:  98739459384590</p>
                    </div>
                    <div className="flex justify-center mt-2 gap-2">
                      <a
                        href={qrCodeUrl}
                        download={`esim-${esim.id}.png`}
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition"
                      >
                        <IoMdDownload /> Download QR
                      </a>
                      <button
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
                        onClick={() => handleCopy(`98739459384590`)}
                      >
                        <AiOutlineCopy /> Copy eSIM ID
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="h-40 w-40 mx-auto bg-gray-100 rounded-xl animate-pulse"></div>
                )}

                <p className="text-gray-500 text-sm mt-2">
                  Follow your device instructions to install this eSIM.
                </p>
              </div>
            )}

            {activeTab === "Details" && (
              <div className="space-y-2">
                <p className="font-semibold text-orange-500">Installation Instructions</p>
                <p className="text-gray-500 text-sm">
                  To activate the eSIM on a supported device:
                </p>
                <ol className="list-decimal list-inside text-gray-500 text-sm mt-2 space-y-1">
                  <li>Settings &gt; Cellular/Mobile &gt; Add eSIM</li>
                  <li>Scan QR Code or enter eSIM ID manually</li>
                  <li>Wait for activation</li>
                  <li>Switch data to this eSIM in settings</li>
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
