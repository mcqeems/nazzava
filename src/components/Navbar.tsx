"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { dropdownList } from "@/app/data/Element";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/app/context/themeContext";
import { Sun, Moon, Menu as MenuIcon, X } from "lucide-react";

export default function Navbar() {
  const [navbarFiltered, setNavbarFiltered] = useState<any>([]);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [thisNav, setThisNav] = useState("");
  const [colorNav, setColorNav] = useState("");
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const filteredNavbar = () => {
      const filteredData = dropdownList.filter((item) => {
        const data = item.path != pathname;
        return data;
      });

      const filteredThisNav = dropdownList.filter((item) => {
        const data = item.path === pathname;
        return data;
      });

      const currentNav = filteredThisNav[0];
      setThisNav(currentNav?.label ?? "Menu");
      setNavbarFiltered(filteredData.length ? filteredData : dropdownList);
      setColorNav(
        currentNav?.color ?? "linear-gradient(90deg, #27272a, #71717a)"
      );
    };

    filteredNavbar();
  }, [pathname]);

  const closeNav = () => setIsOpenNav(false);
  const handleOpenNav = () => setIsOpenNav((prev) => !prev);

  const handleDropdownEnter = (dropdown: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setOpenDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setOpenDropdown(null);
    }, 300); // delay 300ms sebelum menutup
    setDropdownTimeout(timeout);
  };

  useEffect(() => {
    // Lock scroll when mobile nav is open so the menu stays in view.
    if (isOpenNav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
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
          <Link
            href="/"
            className="text-xl lg:text-2xl font-semibold text-primary tracking-tight"
          >
            Nazzava
          </Link>
          <div
            className={`flex lg:flex-row flex-col lg:w-auto  py-4 px-2 max-w-full text-[16px] lg:h-auto min-h-12 justify-center items-center gap-6 lg:text-[18px] font-medium duration-300 ease-out lg:static absolute right-3 left-3 top-20 lg:top-auto rounded-2xl lg:rounded-none bg-card lg:bg-transparent shadow-[0_0_15px_rgba(0,0,0,0.12)] lg:shadow-none ${
              isOpenNav
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto"
            }`}
          >
            <Link
              href="/"
              className="relative link-gradient text-foreground font-medium lg:text-[16px] text-[16px] hover-text-primary whitespace-nowrap"
              style={{ ["--gradient" as any]: colorNav }}
              onClick={closeNav}
            >
              Beranda
            </Link>

            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter("fitur")}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className="relative link-gradient text-foreground font-medium lg:text-[16px] text-[16px] hover-text-primary whitespace-nowrap flex items-center gap-1"
                style={{ ["--gradient" as any]: colorNav }}
              >
                Fitur Fitur
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openDropdown === "fitur" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openDropdown === "fitur" && (
                <div className="absolute top-full mt-2 left-0 min-w-40 bg-card rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.15)] overflow-hidden backdrop-blur-xl z-50">
                  <Link
                    href="/cek-emisi"
                    onClick={() => {
                      setOpenDropdown(null);
                      closeNav();
                    }}
                    className="block px-4 py-2.5 text-foreground hover:bg-primary/10 hover:text-primary hover:pl-5 transition-all duration-200 text-[15px]"
                  >
                    Cek Emisi
                  </Link>
                  <Link
                    href="/chatbot"
                    onClick={() => {
                      setOpenDropdown(null);
                      closeNav();
                    }}
                    className="block px-4 py-2.5 text-foreground hover:bg-primary/10 hover:text-primary hover:pl-5 transition-all duration-200 text-[15px]"
                  >
                    Chatbot
                  </Link>
                  <Link
                    href="/permainan"
                    onClick={() => {
                      setOpenDropdown(null);
                      closeNav();
                    }}
                    className="block px-4 py-2.5 text-foreground hover:bg-primary/10 hover:text-primary hover:pl-5 transition-all duration-200 text-[15px]"
                  >
                    Permainan
                  </Link>
                  <Link
                    href="/scan"
                    onClick={() => {
                      setOpenDropdown(null);
                      closeNav();
                    }}
                    className="block px-4 py-2.5 text-foreground hover:bg-primary/10 hover:text-primary hover:pl-5 transition-all duration-200 text-[15px]"
                  >
                    Scan
                  </Link>
                </div>
              )}
            </div>
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter("elemen")}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className="relative link-gradient text-foreground font-medium lg:text-[16px] text-[16px] hover-text-primary whitespace-nowrap flex items-center gap-1"
                style={{ ["--gradient" as any]: colorNav }}
              >
                Elemen
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openDropdown === "elemen" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openDropdown === "elemen" && (
                <div className="absolute top-full mt-2 left-0 min-w-40 bg-card rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.15)] overflow-hidden backdrop-blur-xl z-50">
                  <Link
                    href="/air"
                    onClick={() => {
                      setOpenDropdown(null);
                      closeNav();
                    }}
                    className="block px-4 py-2.5 text-foreground hover:bg-primary/10 hover:text-primary hover:pl-5 transition-all duration-200 text-[15px]"
                  >
                    💧 Air dan daun
                  </Link>
                  <Link
                    href="/tanah"
                    onClick={() => {
                      setOpenDropdown(null);
                      closeNav();
                    }}
                    className="block px-4 py-2.5 text-foreground hover:bg-primary/10 hover:text-primary hover:pl-5 transition-all duration-200 text-[15px]"
                  >
                    🏔️ Tanah
                  </Link>
                  <Link
                    href="/udara"
                    onClick={() => {
                      setOpenDropdown(null);
                      closeNav();
                    }}
                    className="block px-4 py-2.5 text-foreground hover:bg-primary/10 hover:text-primary hover:pl-5 transition-all duration-200 text-[15px]"
                  >
                    💨 Udara
                  </Link>
                  <Link
                    href="/pohon"
                    onClick={() => {
                      setOpenDropdown(null);
                      closeNav();
                    }}
                    className="block px-4 py-2.5 text-foreground hover:bg-primary/10 hover:text-primary hover:pl-5 transition-all duration-200 text-[15px]"
                  >
                    🌳 Pohon
                  </Link>
                </div>
              )}
            </div>
            <Link
              href="/#tentangkami"
              className="relative link-gradient text-foreground font-medium lg:text-[16px] text-[16px] hover-text-primary whitespace-nowrap"
              style={{ ["--gradient" as any]: colorNav }}
              onClick={closeNav}
            >
              Tentang Kami
            </Link>
            <Link
              href="/informasi"
              className="relative link-gradient text-foreground font-medium lg:text-[16px] text-[16px] hover-text-primary whitespace-nowrap"
              style={{ ["--gradient" as any]: colorNav }}
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
              {theme === "dark" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
              <span>Ubah tema</span>
            </button>
          </div>
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-black shadow-[0_0_10px_rgba(0,0,0,0.12)] hover-bg-muted transition-colors duration-200"
          >
            {theme === "dark" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>

          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={isOpenNav}
            onClick={handleOpenNav}
            className="flex items-center justify-center p-3 rounded-full lg:hidden bg-background/80 shadow-[0_0_10px_rgba(0,0,0,0.12)] backdrop-blur-lg transition-colors hover:bg-muted"
          >
            {isOpenNav ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <MenuIcon className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
