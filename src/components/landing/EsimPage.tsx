import Image from "next/image";
import { TopNavigation } from "../include/TopNavigation";
import { BottomNavigation } from "../include/BottomNavigation";
import { Greeting } from "./content/Greeting";

export default function EsimPage() {
    const countries = [
        { name: "Malaysia", flag: "/flags/my.png", price: 1.0 },
        { name: "Malaysia", flag: "/flags/my.png", price: 1.0 },
        { name: "Malaysia", flag: "/flags/my.png", price: 1.0 },
        { name: "Malaysia", flag: "/flags/my.png", price: 1.0 },
        { name: "Malaysia", flag: "/flags/my.png", price: 1.0 },
        { name: "Malaysia", flag: "/flags/my.png", price: 1.0 }
    ];

    return (
        <div className="min-h-screen  bg-linear-to-b from-(--peach) to-(--light-gray) pb-24">

            <TopNavigation />

            <div className="px-3"> 
                
                {/* Greeting */}
                <Greeting />

                {/* Banner */}
                <div className="mb-6">
                    <Image
                        src="/assets/banner.png"
                        alt="Mobile App"
                        width={100}
                        height={80}
                        className="rounded-xl w-full shadow"
                    />
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-4 text-sm">
                    <button className="px-4 py-2 rounded-lg bg-black text-white">Local Sim</button>
                    <button className="px-4 py-2 rounded-lg bg-white border">Regional</button>
                    <button className="px-4 py-2 rounded-lg bg-white border">Global</button>
                </div>

                <p className="text-gray-600 text-sm mb-3">
                    Best for single country e-SIM with 5G Connectivity.
                </p>

                {/* Country List */}
                <div className="flex flex-col gap-3">
                    {countries.map((c, i) => (
                        <div
                            key={i}
                            className="bg-white flex justify-between items-center p-4 rounded-xl shadow-sm border"
                        >
                            <div className="flex items-center gap-3">
                                <Image src={c.flag} alt={c.name} width={32} height={20} className="h-6 w-8 rounded" />
                                <span className="font-medium text-sm">{c.name}</span>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-500 text-xs">Starting from</p>
                                <p className="font-semibold text-sm">USD {c.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Navigation */}
            <BottomNavigation />

        </div>
    );
}
