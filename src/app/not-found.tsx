import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Nazzava",
  description: "Halaman yang Anda cari tidak dapat ditemukan.",
};

export default function NotFound() {
  return (
    <div className="font-poppins min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bold text-primary leading-none">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Oops! Halaman Tidak Ditemukan
          </h2>
          <p className="text-lg text-muted-text max-w-md mx-auto">
            Sepertinya halaman yang Anda cari hilang seperti sampah yang sudah
            didaur ulang. Mari kembali ke jalur yang benar!
          </p>
        </div>

        {/* Illustration or Icon */}
        <div className="mb-10">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary-light">
            <svg
              className="w-16 h-16 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white bg-primary hover:bg-primary-hover transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Kembali ke Beranda
          </Link>

          <Link
            href="/tentang-kami"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-foreground bg-card hover:bg-border border border-border transition-colors duration-200"
          >
            Tentang Kami
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-text mb-4">
            Atau kunjungi halaman lainnya:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/informasi"
              className="text-sm text-primary hover:text-primary-hover transition-colors"
            >
              Informasi
            </Link>
            <span className="text-muted-text">•</span>
            <Link
              href="/chatbot"
              className="text-sm text-primary hover:text-primary-hover transition-colors"
            >
              Chatbot
            </Link>
            <span className="text-muted-text">•</span>
            <Link
              href="/scan"
              className="text-sm text-primary hover:text-primary-hover transition-colors"
            >
              Scan Sampah
            </Link>
            <span className="text-muted-text">•</span>
            <Link
              href="/permainan"
              className="text-sm text-primary hover:text-primary-hover transition-colors"
            >
              Permainan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
