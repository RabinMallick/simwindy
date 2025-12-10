'use client';
import { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setCurrency } from '@/store/slice/currencySlice';

export const Navbar: FC = () => {
  const dispatch = useDispatch();
   const { currency } = useSelector((state: RootState) => state.currency);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const router = useRouter();
  const pathname = usePathname();

  const sections = ['services', 'countries', 'rate', 'faq', 'contact'];

  const handleClose = () => setIsOpen(false);

  const scrollToSection = (id: string) => {
    handleClose();

    if (pathname === '/') {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
      window.history.replaceState(null, '', `#${id}`);
    } else {
      // Navigate to home with hash, not query param
      router.push(`/#${id}`);
    }
  };

  // Smooth scroll after navigating to home with hash
  useEffect(() => {
    if (pathname === '/' && window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      const el = document.getElementById(hashId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveSection(hashId);
      window.history.replaceState(null, '', `#${hashId}`);
    }
  }, [pathname]);

  // ScrollSpy: track section in viewport
  useEffect(() => {
    if (pathname !== '/') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
            window.history.replaceState(null, '', `#${id}`);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el!);
      });
    };
  }, [pathname]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 hidden md:block">
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src="/assets/logo.png"
              alt="Company Logo"
              width={145}
              height={80}
              className="cursor-pointer w-auto h-10"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`hover:text-( --primary) transition-colors cursor-pointer ${activeSection === section ? 'text-( --primary) ' : ''
                }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
          <select
            className="focus:outline-none"
            value={currency}
            onChange={(e) =>
              dispatch(setCurrency(e.target.value as "BDT" | "USD" | "AED"))
            }
          >
            <option value="BDT">BDT</option>
            <option value="USD">USD</option>
            <option value="AED">AED</option>
          </select>
          <Link
            href="/apply"
            className="px-3 py-1.5 cursor-pointer rounded-lg text-[#3A220F] bg-linear-to-b from-(--peach) to-(--light-gray) hover:from-orange-200 border border-(--peach) hover:to-orange-100 transition-all duration-500"
          >
            Buy Now
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden px-3 md:px-6 bg-white shadow-sm overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
          }`}
      >
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={`block text-( --primary) text-sm py-2 hover:opacity-80 w-full text-left ${activeSection === section ? ' ' : ''
              }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}


        <select
          className="focus:outline-none"
          value={currency}
          onChange={(e) =>
            dispatch(setCurrency(e.target.value as "BDT" | "USD" | "AED"))
          }
        >
          <option value="BDT">BDT</option>
          <option value="USD">USD</option>
          <option value="AED">AED</option>
        </select>

        <Link
          href="/apply"
          onClick={handleClose}
          className="block px-3 py-2 rounded-lg text-[#3A220F] font-medium bg-linear-to-r from-orange-300 to-orange-200 hover:from-orange-200 hover:to-orange-100 transition-all duration-500 text-sm mt-2"
        >
          Apply Now
        </Link>
      </div>
    </header>
  );
};
