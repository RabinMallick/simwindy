'use client';
import { FC } from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";

const Footer: FC = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="relative hidden md:block">

            {/* Top linear Line */}
            <div className="absolute -top-1 left-0 w-full h-2 bg-linear-to-r from-(--from) via-blue-300 to-amber-100" />

            {/* Main Footer */}
            <div className="bg-(--primary) text-white py-14 pb-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-3 md:px-6">

                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold bg-linear-to-r from-white to-green-200 bg-clip-text text-transparent">
                            SimWindy
                        </h2>
                        <p className="mt-3 text-gray-300 text-sm leading-relaxed">
                            Fast, secure & affordable global eSIM connectivity for travelers.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-2 mt-4">
                            {[
                                { icon: <FaFacebookF />, name: "Facebook" },
                                { icon: <FaInstagram />, name: "Instagram" },
                                { icon: <FaXTwitter />, name: "Twitter" },
                                { icon: <FaYoutube />, name: "YouTube" },
                            ].map((s, i) => (
                                <button
                                    key={i}
                                    aria-label={s.name}
                                    className="w-9 h-9 rounded-lg flex items-center justify-center
                             bg-white/10 backdrop-blur border border-white/10
                             hover:bg-white/20 hover:scale-105 transition"
                                >
                                    {s.icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-base font-semibold mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            {["Home", "Services", "Destinations", "FAQ", "Pricing"].map((item, i) => (
                                <li key={i}>
                                    <a className="hover:text-white hover:translate-x-1 transition inline-block" href="#">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-base font-semibold mb-3">Support</h3>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            {["Help Center", "Refund Policy", "Privacy Policy", "Terms & Conditions", "Contact"].map((item, i) => (
                                <li key={i}>
                                    <a className="hover:text-white hover:translate-x-1 transition inline-block" href="#">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-base font-semibold mb-3">Stay Updated</h3>
                        <p className="text-gray-300 mb-3 text-sm">
                            Get offers & eSIM updates.
                        </p>

                        <div className="flex items-center bg-white/10 rounded-lg backdrop-blur border border-white/10 overflow-hidden">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full px-3 py-2 bg-transparent text-white placeholder-gray-300 outline-none text-sm"
                            />

                            <button className="bg-linear-to-r from-green-300 to-teal-300 text-(--primary)
                                 px-4 py-2 text-sm font-bold hover:opacity-90 transition">
                                Join
                            </button>
                        </div>
                    </div>

                </div>

                {/* Footer Bottom */}
                <div className="border-t border-white/10 mt-10 pt-4 text-center text-gray-300 text-xs">
                    © {year} SimWindy — All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
