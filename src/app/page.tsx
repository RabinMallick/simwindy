'use client';

import { CountrySelector } from "@/components/landing/CountrySelector";
import { Destinations } from "@/components/landing/Destinations";
import EsimPage from "@/components/landing/EsimPage";
import { FAQ } from "@/components/landing/FAQ";
import { Hero } from "@/components/landing/Hero";
import Service from "@/components/landing/Service";

export default function Home() {

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      <div className="hidden md:block">
        {/* Hero Section */}
        <section id="" className="scroll-offset bg-linear-to-b from-(--from) to-(--to)">
          <Hero />
        </section>

        {/* Services Section */}
        <section id="services" className="scroll-offset">
          <div className="max-w-7xl mx-auto px-3 md:px-6">
            <Service />
          </div>
        </section>

        {/* Destinations Section */}
        <section id="destinations" className="scroll-offset bg-(--primary)/5">
          <div className="max-w-7xl mx-auto px-3 md:px-6">
            <Destinations />
          </div>
        </section>

        {/* Country Selector Section */}
        <section id="countries" className="scroll-offset">
          <div className="max-w-7xl mx-auto px-3 md:px-6">
            <CountrySelector />
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="scroll-offset bg-(--primary)/5">
          <div className="max-w-7xl mx-auto px-3 md:px-6">
            <FAQ />
          </div>
        </section>
      </div>

      <div className="md:hidden">
        <EsimPage/>
      </div>

    </div>
  );
}
