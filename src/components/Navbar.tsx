/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { dropdownList } from '@/app/data/Element';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/app/context/themeContext';
import { Sun, Moon, Menu as MenuIcon, X } from 'lucide-react';

export default function Navbar() {
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const [colorNav, setColorNav] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    // Detect if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const filteredNavbar = () => {
      const filteredThisNav = dropdownList.filter((item) => {
        const data = item.path === pathname;
        return data;
      });

      const currentNav = filteredThisNav[0];

      setColorNav(currentNav?.color ?? 'linear-gradient(90deg, #27272a, #71717a)');
    };

    filteredNavbar();
  }, [pathname]);

  const closeNav = () => setIsOpenNav(false);
  const handleOpenNav = () => setIsOpenNav((prev) => !prev);

  const handleDropdownClick = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleDropdownEnter = (dropdown: string) => {
    if (isMobile) return; // Skip hover on mobile
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setOpenDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    if (isMobile) return; // Skip hover on mobile
    const timeout = setTimeout(() => {
      setOpenDropdown(null);
    }, 300); // delay 300ms sebelum menutup
    setDropdownTimeout(timeout);
  };

  useEffect(() => {
    // Lock scroll when mobile nav is open so the menu stays in view.
    if (isOpenNav) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [isOpenNav, dropdownTimeout]);

  useEffect(() => {
    // Close nav when navigating to a new route.
    closeNav();
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-3">
        <div className="relative mt-4 flex items-center justify-between gap-4 rounded-full bg-card px-5 py-3 shadow-[0_0_20px_rgba(0,0,0,0.15)] backdrop-blur-xl transition-colors duration-200 z-50">
          <div>
            <Link href="/" className="flex items-center text-foreground">
              <Image src="/logo/nazzava-logo.webp" width={24} height={24} alt="Nazzava" className="block" />
              <div className="mt-1 lg:mb-0.5">
                <span className="sm:flex text-xl font-[1000] leading-none tracking-tight">
                  <span className="text-foreground dark:text-foreground">
                    <span className="hoverText text-hover-primary">A</span>
                    <span className="hoverText text-hover-primary">Z</span>
                    <span className="hoverText text-hover-primary">Z</span>
                  </span>
                  <span className="text-primary dark:text-primary">
                    <span className="hoverText text-hover-light">A</span>
                    <span className="hoverText text-hover-light">V</span>
                    <span className="hoverText text-hover-light">A</span>
                  </span>
                </span>
              </div>
            </Link>
          </div>
          <div
            className={`flex lg:flex-row flex-col lg:w-auto  py-4 px-2 max-w-full text-[16px] lg:h-auto min-h-12 justify-center items-center gap-6 lg:text-[18px] font-medium duration-300 ease-out lg:static absolute right-3 left-3 top-20 lg:top-auto rounded-2xl lg:rounded-none bg-card lg:bg-transparent shadow-[0_0_15px_rgba(0,0,0,0.12)] lg:shadow-none ${
              isOpenNav
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-2 pointer-events-none lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto'
            }`}
          >
            <Link
              href="/"
              className={`md:p-0 px-4 w-full text-center relative link-gradient font-medium lg:text-[16px] text-[16px] hover-text-primary whitespace-nowrap transition-all duration-200 ${
                pathname === '/' ? 'text-primary font-bold scale-105' : 'text-foreground'
              }`}
              style={{ ['--gradient' as any]: colorNav }}
              onClick={closeNav}
            >
              Beranda
            </Link>

            <div
              className="relative md:p-0 px-4 w-full flex justify-center items-center"
              onMouseEnter={() => handleDropdownEnter('fitur')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                onClick={() => handleDropdownClick('fitur')}
                className={`relative w-full justify-center text-center link-gradient font-medium lg:text-[16px] text-[16px] hover-text-primary whitespace-nowrap flex items-center gap-1 transition-all duration-200 ${
                  ['/cek-emisi', '/chatbot', '/permainan', '/scan'].includes(pathname)
                    ? 'text-primary font-bold scale-105'
                    : 'text-foreground'
                }`}
                style={{ ['--gradient' as any]: colorNav }}
              >
                Fitur Fitur
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openDropdown === 'fitur' ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'fitur' && (
                <div className="absolute top-full mt-2 left-0 min-w-full md:min-w-40 border border-border bg-card rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.15)] overflow-hidden backdrop-blur-xl z-50">
                  <Link
                    href="/cek-emisi"
                    onClick={() => {
                      setOpenDropdown(null);
                      closeNav();
                    }}
                    className={`block px-4 py-2.5 hover:bg-primary/10 hover:text-primary hover:pl-5 transition-all duration-200 text-[15px] ${
                      pathname === '/cek-emisi' ? 'bg-primary/10 text-primary font-semibold pl-5' : 'text-foreground'
                    }`}
                  >
                    Cek Emisi
                  </Link>
                  <Link
                    href="/chatbot"
                    onClick={() => {
                      setOpenDropdown(null);
                      closeNav();
                    }}
                    className={`block px-4 py-2.5 hover:bg-primary/10 hover:text-primary hover:pl-5 transition-all duration-200 text-[15px] ${
                      pathname === '/chatbot' ? 'bg-primary/10 text-primary font-semibold pl-5' : 'text-foreground'
                    }`}
                  >
                    Chatbot
                  </Link>
                  <Link
                    href="/permainan"
                    onClick={() => {
                      setOpenDropdown(null);
                      closeNav();
                    }}
                    className={`block px-4 py-2.5 hover:bg-primary/10 hover:text-primary hover:pl-5 transition-all duration-200 text-[15px] ${
                      pathname === '/permainan' ? 'bg-primary/10 text-primary font-semibold pl-5' : 'text-foreground'
                    }`}
                  >
                    Permainan
                  </Link>
                  <Link
                    href="/scan"
                    onClick={() => {
                      setOpenDropdown(null);
                      closeNav();
                    }}
                    className={`block px-4 py-2.5 hover:bg-primary/10 hover:text-primary hover:pl-5 transition-all duration-200 text-[15px] ${
                      pathname.startsWith('/scan') ? 'bg-primary/10 text-primary font-semibold pl-5' : 'text-foreground'
                    }`}
                  >
                    Scan
                  </Link>
                </div>
              )}
            </div>
            <div
              className="relative flex justify-center items-center w-full"
              onMouseEnter={() => handleDropdownEnter('elemen')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                onClick={() => handleDropdownClick('elemen')}
                className={`w-full text-center justify-center relative link-gradient font-medium lg:text-[16px] text-[16px] hover-text-primary whitespace-nowrap flex items-center gap-1 transition-all duration-200 ${
                  ['/air', '/tanah', '/udara', '/pohon'].includes(pathname)
                    ? 'text-primary font-bold scale-105'
                    : 'text-foreground'
                }`}
                style={{ ['--gradient' as any]: colorNav }}
              >
                Elemen
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openDropdown === 'elemen' ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'elemen' && (
                <div className="absolute top-full min-w-full border border-border mt-2 left-0 md:min-w-40 bg-card rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.15)] overflow-hidden backdrop-blur-xl z-50">
                  <Link
                    href="/air"
                    onClick={() => {
                      setOpenDropdown(null);
                      closeNav();
                    }}
                    className={`block px-4 py-2.5 hover:bg-primary/10 hover:text-primary hover:pl-5 transition-all duration-200 text-[15px] ${
                      pathname === '/air' ? 'bg-primary/10 text-primary font-semibold pl-5' : 'text-foreground'
                    }`}
                  >
                    💧 Air
                  </Link>
                  <Link
                    href="/tanah"
                    onClick={() => {
                      setOpenDropdown(null);
                      closeNav();
                    }}
                    className={`block px-4 py-2.5 hover:bg-primary/10 hover:text-primary hover:pl-5 transition-all duration-200 text-[15px] ${
                      pathname === '/tanah' ? 'bg-primary/10 text-primary font-semibold pl-5' : 'text-foreground'
                    }`}
                  >
                    🏔️ Tanah
                  </Link>
                  <Link
                    href="/udara"
                    onClick={() => {
                      setOpenDropdown(null);
                      closeNav();
                    }}
                    className={`block px-4 py-2.5 hover:bg-primary/10 hover:text-primary hover:pl-5 transition-all duration-200 text-[15px] ${
                      pathname === '/udara' ? 'bg-primary/10 text-primary font-semibold pl-5' : 'text-foreground'
                    }`}
                  >
                    💨 Udara
                  </Link>
                  <Link
                    href="/pohon"
                    onClick={() => {
                      setOpenDropdown(null);
                      closeNav();
                    }}
                    className={`block px-4 py-2.5 hover:bg-primary/10 hover:text-primary hover:pl-5 transition-all duration-200 text-[15px] ${
                      pathname === '/pohon' ? 'bg-primary/10 text-primary font-semibold pl-5' : 'text-foreground'
                    }`}
                  >
                    🌳 Pohon
                  </Link>
                </div>
              )}
            </div>
            <Link
              href="/tentang-kami"
              className={`md:p-0 px-4 w-full text-center relative link-gradient font-medium lg:text-[16px] text-[16px] hover-text-primary whitespace-nowrap transition-all duration-200 ${
                pathname === '/tentang-kami' ? 'text-primary font-bold scale-105' : 'text-foreground'
              }`}
              style={{ ['--gradient' as any]: colorNav }}
              onClick={closeNav}
            >
              Tentang Kami
            </Link>
            <Link
              href="/informasi"
              className={`md:p-0 px-4 w-full text-center relative link-gradient font-medium lg:text-[16px] text-[16px] hover-text-primary whitespace-nowrap transition-all duration-200 ${
                pathname === '/informasi' ? 'text-primary font-bold scale-105' : 'text-foreground'
              }`}
              style={{ ['--gradient' as any]: colorNav }}
              onClick={closeNav}
            >
              Informasi
            </Link>
            <button
              type="button"
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="lg:hidden w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-green-500 text-black shadow-[0_0_10px_rgba(0,0,0,0.12)] hover-bg-muted transition-colors duration-200"
            >
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              <span>Ubah tema</span>
            </button>
          </div>
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-black shadow-[0_0_10px_rgba(0,0,0,0.12)] hover-bg-muted transition-colors duration-200"
          >
            {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={isOpenNav}
            onClick={handleOpenNav}
            className="flex items-center justify-center p-3 rounded-full lg:hidden bg-background/80 shadow-[0_0_10px_rgba(0,0,0,0.12)] backdrop-blur-lg transition-colors hover:bg-muted"
          >
            {isOpenNav ? <X className="w-6 h-6 text-foreground" /> : <MenuIcon className="w-6 h-6 text-foreground" />}
          </button>
        </div>
      </div>
    </div>
  );
}
