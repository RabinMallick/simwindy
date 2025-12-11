import Image from "next/image";
import { TopNavigation } from "../include/TopNavigation";
import { BottomNavigation } from "../include/BottomNavigation";
import { Greeting } from "./content/Greeting";
import { EsimTab } from "./content/EsimTab";

export default function EsimPage() {

    return (
        <div className="min-h-screen  bg-linear-to-b from-(--peach)/30 to-(--light-gray) pb-24">

            <TopNavigation />

            <div className="px-3 mt-3">

                {/* Greeting */}
                <Greeting />

                {/* Banner */}
                <div className="mb-6">
                    <Image src="/assets/banner.png" alt="Mobile App"
                        width={100}
                        height={80} className="rounded-xl w-full shadow"
                    />
                </div>

                {/* Tabs */}
                <EsimTab />

            </div>

            {/* Bottom Navigation */}
            <BottomNavigation />

        </div>
    );
}
