'use client';

import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Autoplay, Navigation } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';

interface Destination {
    name: string;
    img: string;
    tag?: string;
}

const destinations: Destination[] = [
    { name: "China", img: "https://picsum.photos/seed/china/400/250", tag: "Popular" },
    { name: "Kenya", img: "https://picsum.photos/seed/kenya/400/250" },
    { name: "UAE", img: "https://picsum.photos/seed/uae/400/250" },
    { name: "Schengen", img: "https://picsum.photos/seed/schengen/400/250", tag: "Popular" },
    { name: "United Kingdom", img: "https://picsum.photos/seed/uk/400/250" },
    { name: "Thailand", img: "https://picsum.photos/seed/thailand/400/250" },
    { name: "Japan", img: "https://picsum.photos/seed/japan/400/250" },
    { name: "Australia", img: "https://picsum.photos/seed/australia/400/250" },
    { name: "Canada", img: "https://picsum.photos/seed/canada/400/250" },
    { name: "Singapore", img: "https://picsum.photos/seed/singapore/400/250" },
    { name: "Germany", img: "https://picsum.photos/seed/germany/400/250" },
    { name: "France", img: "https://picsum.photos/seed/france/400/250" },
    { name: "Italy", img: "https://picsum.photos/seed/italy/400/250" },
    { name: "South Korea", img: "https://picsum.photos/seed/korea/400/250" },
    { name: "Brazil", img: "https://picsum.photos/seed/brazil/400/250" },
    { name: "India", img: "https://picsum.photos/seed/india/400/250", tag: "Popular" }
];


export const Destinations: FC = () => {
    return (
        <div className="relative py-6 pb-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-black">Popular Destinations</h2>
                    <p className="text-xs text-gray-500">Quick processing with clear checklists</p>
                </div>
                {/* <a className="text-sm text-gray-500 border border-gray-300 px-2 py-1 transition-all duration-200 active:scale-95 hover:opacity-90 cursor-pointer rounded-lg">
                    See all
                </a> */}
            </div>

            {/* Navigation Arrows (hidden on small screens) */}
            <div className="hidden md:flex absolute inset-y-0 left-0 items-center z-20 mt-15 ">
                <button className="swiper-button-prev p-2 bg-[#ffffff50] shadow rounded-full transition-all duration-200 active:scale-95 hover:opacity-90">
                    <FiChevronLeft className="text-[10px] text-gray-700" />
                </button>
            </div>
            <div className="hidden md:flex absolute inset-y-0 right-0 items-center z-20 mt-15 ">
                <button className="swiper-button-next p-2 bg-[#ffffff50] shadow rounded-full transition-all duration-200 active:scale-95 hover:opacity-90">
                    <FiChevronRight className="text-[10px] text-gray-700" />
                </button>
            </div>

            <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop
                spaceBetween={12}
                slidesPerView={1.2} // default for mobile
                breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 12 },
                    768: { slidesPerView: 4, spaceBetween: 16 }, // md → 4 slides
                    1024: { slidesPerView: 6, spaceBetween: 16 }, // lg → 4 slides
                }}
            >
                {destinations.map((d) => (
                    <SwiperSlide key={d.name} className="w-[70%] sm:w-[calc(50%-6px)] md:w-auto mt-6">
                        <div className="relative  overflow-hidden bg-white rounded-lg border border-gray-100">
                            {/* Badge */}
                            {d.tag && (
                                <span className="absolute top-2 right-3 text-[8px] font-semibold text-white 
                                 bg-(--primary-text) to-green-600 
                                 px-3 py-1 rounded-full shadow-md z-10">
                                    {d.tag}
                                </span>
                            )}
                            <Image
                                src={d.img}
                                alt={d.name}
                                width={400}
                                height={250}
                                className="w-full h-46 md:h-32 object-cover"
                            />
                            <div className="p-3 text-sm  line-clamp-2 absolute bottom-0 w-full  text-white bg-[rgba(0,0,0,0.12)] 
                                 px-3 py-1 z-10">{d.name}</div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
