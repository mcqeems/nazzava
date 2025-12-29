"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { dropdownList } from "@/app/data/Element";
import Link from "next/link";
import { useTheme } from "@/app/context/themeContext";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [navbarFiltered, setNavbarFiltered] = useState<any>([]);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [thisNav, setThisNav] = useState("");
  const [colorNav, setColorNav] = useState("");
  const { theme, toggleTheme } = useTheme();
  const navigate = useRouter();
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

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenNav = () => {
    setIsOpenNav(!isOpenNav);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-3">
        <div className="mt-4 flex items-center justify-between gap-4 rounded-full bg-card px-5 py-3 shadow-[0_0_20px_rgba(0,0,0,0.15)] backdrop-blur-xl transition-colors duration-200">
          <Link
            href="/"
            className="text-xl lg:text-2xl font-semibold text-primary tracking-tight"
          >
            Nazzava
          </Link>
          <div
            className={`flex lg:flex-row flex-col lg:w-auto w-[78vw] max-w-sm text-[16px] lg:h-auto min-h-12 justify-center items-center gap-6 lg:text-[18px] font-medium duration-300 ease-out lg:static absolute right-3 top-18.5 lg:top-auto rounded-2xl lg:rounded-none shadow-[0_0_15px_rgba(0,0,0,0.12)] lg:shadow-none ${
              isOpenNav
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto"
            }`}
          >
            <Link
              href="/"
              className="relative link-gradient text-foreground font-medium lg:text-[16px] text-[16px] hover-text-primary whitespace-nowrap"
              style={{ ["--gradient" as any]: colorNav }}
            >
              Beranda
            </Link>
            <a
              href="#tentangkami"
              className="relative link-gradient text-foreground font-medium lg:text-[16px] text-[16px] hover-text-primary whitespace-nowrap"
              style={{ ["--gradient" as any]: colorNav }}
            >
              Tentang Kami
            </a>
            <Link
              href="/cek-emisi"
              className="relative link-gradient text-foreground font-medium lg:text-[16px] text-[16px] hover-text-primary whitespace-nowrap"
              style={{ ["--gradient" as any]: colorNav }}
            >
              Kalkulator
            </Link>

            <Link
              href="/chatbot"
              className="relative link-gradient text-foreground font-medium lg:text-[16px] text-[16px] hover-text-primary whitespace-nowrap"
              style={{ ["--gradient" as any]: colorNav }}
            >
              Chatbot
            </Link>
            <Link
              href="/permainan"
              className="relative link-gradient text-foreground font-medium lg:text-[16px] text-[16px] hover-text-primary whitespace-nowrap"
              style={{ ["--gradient" as any]: colorNav }}
            >
              Permainan
            </Link>
            {/* Dropdown Menu */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="relative link-gradient text-foreground font-medium lg:text-[16px] text-[16px] hover-text-primary whitespace-nowrap flex items-center gap-1"
                style={{ ["--gradient" as any]: colorNav }}
              >
                Elemen
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
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
              {isDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 min-w-40 bg-card rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.15)] overflow-hidden backdrop-blur-xl">
                  <Link
                    href="/air"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2.5 text-foreground hover:bg-muted transition-colors text-[15px]"
                  >
                    💧 Air dan daun
                  </Link>
                  <Link
                    href="/tanah"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2.5 text-foreground hover:bg-muted transition-colors text-[15px]"
                  >
                    🏔️ Tanah
                  </Link>
                  <Link
                    href="/udara"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2.5 text-foreground hover:bg-muted transition-colors text-[15px]"
                  >
                    💨 Udara
                  </Link>
                  <Link
                    href="/pohon"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2.5 text-foreground hover:bg-muted transition-colors text-[15px]"
                  >
                    🌳 Pohon
                  </Link>
                </div>
              )}
            </div>
          </div>
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-black shadow-[0_0_10px_rgba(0,0,0,0.12)] hover-bg-muted transition-colors duration-200"
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
            className="flex flex-col justify-center items-center gap-1.5 display-flex rounded-full bg-background/80 px-3 py-2 shadow-[0_0_10px_rgba(0,0,0,0.12)] backdrop-blur-lg transition-colors hover:bg-muted"
          >
            <span
              className={`block h-0.5 w-5.5 bg-foreground transition-all duration-300 ${
                isOpenNav ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5.5 bg-foreground transition-all duration-300 ${
                isOpenNav ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-5.5 bg-foreground transition-all duration-300 ${
                isOpenNav ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
