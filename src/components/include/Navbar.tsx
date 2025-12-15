'use client';

import { FC, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { setCurrency } from '@/store/slice/currencySlice';
import { setActiveSection } from '@/store/slice/navbarSlice'; // create a slice for active section
import { UserDropdown } from './UserDropdown';
import AuthLinks from './AuthLinks';

export const Navbar: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { activeSection } = useSelector((state: RootState) => state.navbar); // assume navbarSlice contains activeSection
  const { user } = useSelector((state: RootState) => state.auth); // if you manage user auth in redux
  const { currency } = useSelector((state: RootState) => state.currency); // if you manage user auth in redux

  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();



  const stored =
    typeof window !== "undefined"
      ? localStorage.getItem("loginForm")
      : null;


  const sections = ['services', 'countries', 'rate', 'faq', 'contact'];

  const scrollToSection = (id: string) => {
    if (pathname === '/') {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      dispatch(setActiveSection(id));
      window.history.replaceState(null, '', `#${id}`);
    } else {
      router.push(`/#${id}`);
    }
  };

  // ScrollSpy
  useEffect(() => {
    if (pathname !== '/') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            dispatch(setActiveSection(id));
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

    return () => observer.disconnect();
  }, [pathname, dispatch]);

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        dispatch({ type: 'navbar/closeUserMenu' }); // action in navbarSlice
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dispatch]);


  useEffect(() => {

  }, [stored])


  console.log('user', user)
  return (
    <header className="bg-white  border-b border-gray-100 sticky top-0 z-50 hidden md:block">
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-1.5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/assets/logo.png"
            alt="Company Logo"
            width={145}
            height={80}
            className="cursor-pointer w-auto h-10"
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm text-gray-700">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`cursor-pointer transition-colors hover:text-(--primary) ${activeSection === section ? 'text-(--primary)' : ''
                }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}

          {/* Currency */}
          <select
            className="focus:outline-none"
            value={currency}
            onChange={(e) =>
              dispatch(setCurrency(e.target.value as 'BDT' | 'USD' | 'AED'))
            }
          >
            <option value="BDT">৳ BDT</option>
            <option value="USD">$ USD</option>
            <option value="AED">د.إ AED</option>
          </select>

          {/* User Dropdown */}
          {stored ? <UserDropdown user={'User Name'} /> : (
            <AuthLinks />
          )}
        </nav>
      </div>
    </header>
  );
};
