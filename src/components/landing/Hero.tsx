import Image from 'next/image';
import { MdSupportAgent } from 'react-icons/md';
import { FiGlobe, FiSearch, FiShield } from 'react-icons/fi';

export const Hero = () => {
    const features = [
        {
            icon: <FiGlobe className="text-lg text-(--primary-text)" />,
            title: '200+ countries',
            subLabel: 'coverage',
        },
        {
            icon: <MdSupportAgent className="text-lg text-(--primary-text)" />,
            title: '24x7',
            subLabel: 'Support window',
        },
        {
            icon: <FiShield className="text-lg text-(--primary-text)" />,
            title: 'Secure',
            subLabel: 'Data handling',
        },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto px-6 py-12  ">
            {/* Left Content */}
            <div className="lg:col-span-7">
                <div className="inline-block px-3 py-1 rounded-full bg-linear-to-r from-[#dae5e5] to-[#fce9d8] text-xs text-[#182122] font-bold">
                    Fast • Transparent • Reliable
                </div>

                <h1 className="text-(--black) mt-6 text-2xl md:text-4xl font-extrabold leading-tight">
                    eSIM For international, <br />
                    <span className="bg-linear-to-r from-(--primary-text) to-(--orange) text-transparent bg-clip-text">
                        More Data SMS and Calls.
                    </span>
                </h1>

                <p className="mt-4 text-gray-600 max-w-xl">
                    Stay connected 200+ destinations with international eSIM — enjoy seamless SMS, data, and call services worldwide.
                </p>

                {/* Buttons */}


                <div className="w-full  mx-auto mt-6">
                    {/* Label */}
                    <label className="block mb-2 text-gray-700 font-medium">
                        Where do you require mobile data?
                    </label>

                    {/* Search Input */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for your destination in over 200+ countries"
                            className="w-full pr-12 pl-4 py-3 rounded-lg border bg-white border-gray-300 focus:outline-none hover:border-(--peach)  placeholder-gray-400"
                        />
                        {/* Search Button */}
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-brand text-white p-2 rounded-lg bg-red-500 hover:bg-[#093c3e] transition-colors">
                            <FiSearch size={20} />
                        </button>
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="mt-6 flex flex-col md:flex-row md:flex-wrap md:gap-4 text-sm text-(--primary-text)  p-2 py-0 md:p-3 rounded-lg ">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 border-b border-gray-200 last:border-b-0 md:border-b-0 md:border-r md:pr-4 last:md:border-0 p-2 md:p-0 "
                        >
                            <div>{feature.icon}</div>
                            <div className='flex flex-col'>
                                <div className='font-bold text-md md:text-[1rem]'>{feature.title}</div>
                                <div className='text-[0.8rem] md:text-xs text-gray-500'>{feature.subLabel}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="mt-1 text-xs text-gray-400">
                    Trusted by thousands of travellers across Worldwide.
                </p>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 flex justify-end">
                <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden">
                    <Image
                        src={`/assets/hero.png`}
                        width={500}
                        height={360}
                        alt="hero"
                        className="w-full h-[360px] object-cover"
                        loading="lazy"  // <-- lazy load added
                        placeholder="blur" // <-- optional: requires blurDataURL
                        blurDataURL={`/assets/hero-blur.png`} // small blurred version
                    />
                </div>
            </div>
        </div>
    );
};
