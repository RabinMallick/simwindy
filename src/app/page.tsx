
'use client'
import Footer from "@/components/include/Footer";
import { Navbar } from "@/components/include/Navbar";
import { CountrySelector } from "@/components/landing/CountrySelector";
import { Destinations } from "@/components/landing/Destinations";
import { FAQ } from "@/components/landing/FAQ";
import { Hero } from "@/components/landing/Hero";
import Service from "@/components/landing/Service";

export default function Home() {


  return (
    <>

      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <section id="hero" className="scroll-offset bg-linear-to-b from-(--peach) to-(--light-gray)">
          <Hero />
        </section>

        <section id="services" className="scroll-offset">
          <div className="max-w-7xl mx-auto px-6 ">
            <Service />
          </div>
        </section>


        <section id="destinations" className="scroll-offset  bg-(--light-gray)">
          <div className="max-w-7xl mx-auto px-6 ">
            <Destinations />
          </div>
        </section>

        <section id="countries" className="scroll-offset bg-(--dark-teal)/10">
          <div className="max-w-7xl mx-auto px-6 ">
            <CountrySelector />
          </div>
        </section>


        <section id="faq" className="scroll-offset">
          <div className="max-w-7xl mx-auto px-6 ">
            <FAQ />
          </div>
        </section>


        <Footer />

      </div>

    </>
  );
}
