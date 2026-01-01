"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo/nazzava-logo.webp";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border font-poppins">
      <div className="container mx-auto px-6 lg:px-8 py-12 lg:py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={logo.src}
                width={40}
                height={40}
                alt="Nazzava Logo"
                className=""
              />
              <div>
                <h3 className="font-bold text-xl text-foreground">Nazzava</h3>
                <p className="text-xs text-muted-text">
                  Platform Edukasi Lingkungan
                </p>
              </div>
            </Link>
            <p className="text-sm text-muted-text leading-relaxed">
              Membersihkan bumi melalui edukasi dan aksi nyata untuk lingkungan
              yang berkelanjutan.
            </p>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <a
                href="mailto:info@nazzava.com"
                className="text-sm text-muted-text hover:text-primary transition-colors"
              >
                info@nazzava.com
              </a>
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="font-semibold text-base text-foreground mb-4">
              Navigasi
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-text hover:text-primary hover:pl-2 transition-all duration-200"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang"
                  className="text-sm text-muted-text hover:text-primary hover:pl-2 transition-all duration-200"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="/informasi"
                  className="text-sm text-muted-text hover:text-primary hover:pl-2 transition-all duration-200"
                >
                  Informasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Fitur Fitur */}
          <div>
            <h4 className="font-semibold text-base text-foreground mb-4">
              Fitur Fitur
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="/cek-emisi"
                  className="text-sm text-muted-text hover:text-primary hover:pl-2 transition-all duration-200"
                >
                  Cek Emisi
                </Link>
              </li>
              <li>
                <Link
                  href="/chatbot"
                  className="text-sm text-muted-text hover:text-primary hover:pl-2 transition-all duration-200"
                >
                  Chatbot
                </Link>
              </li>
              <li>
                <Link
                  href="/permainan"
                  className="text-sm text-muted-text hover:text-primary hover:pl-2 transition-all duration-200"
                >
                  Permainan
                </Link>
              </li>
              <li>
                <Link
                  href="/scan"
                  className="text-sm text-muted-text hover:text-primary hover:pl-2 transition-all duration-200"
                >
                  Scan
                </Link>
              </li>
            </ul>
          </div>

          {/* Elemen */}
          <div>
            <h4 className="font-semibold text-base text-foreground mb-4">
              Elemen
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="/air"
                  className="text-sm text-muted-text hover:text-primary hover:pl-2 transition-all duration-200 flex items-center gap-2"
                >
                  <span>💧</span> Air
                </Link>
              </li>
              <li>
                <Link
                  href="/tanah"
                  className="text-sm text-muted-text hover:text-primary hover:pl-2 transition-all duration-200 flex items-center gap-2"
                >
                  <span>🏔️</span> Tanah
                </Link>
              </li>
              <li>
                <Link
                  href="/udara"
                  className="text-sm text-muted-text hover:text-primary hover:pl-2 transition-all duration-200 flex items-center gap-2"
                >
                  <span>💨</span> Udara
                </Link>
              </li>
              <li>
                <Link
                  href="/pohon"
                  className="text-sm text-muted-text hover:text-primary hover:pl-2 transition-all duration-200 flex items-center gap-2"
                >
                  <span>🌳</span> Pohon
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-text text-center md:text-left">
            © 2025{" "}
            <span className="font-semibold text-foreground">Nazzava</span> —
            Semua hak dilindungi.
          </p>
          <p className="text-sm text-muted-text text-center md:text-right">
            Dibangun dengan <span className="text-red-500">❤️</span> untuk
            kelestarian lingkungan
          </p>
        </div>
      </div>
    </footer>
  );
}
