"use client";
import React from "react";
import bgWelcome from "../../../public/image/home/bg-welcome.svg";
import globe from "../../../public/image/home/globe.webp";
import suggest from "../../../public/image/home/suggest.webp";
import search from "../../../public/image/home/search.webp";
import Image from "next/image";
import Link from "next/link";

export default function Welcome() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen font-poppins lg:pb-10 lg:pt-28 pb-24 pt-12 container mx-auto px-4">
        {/* Desktop Version */}
        <div
          className="w-full max-w-7xl h-auto py-16 px-12 flex relative justify-between items-center gap-12 display-none bg-background overflow-hidden"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          {/* Decorative Elements */}

          {/* Content */}
          <div className="flex-1 z-10 space-y-6">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-sm font-semibold text-primary">
                🌍 Untuk Bumi yang Lebih Baik
              </span>
            </div>
            <h1 className="font-extrabold text-[56px] leading-[1.1] text-foreground">
              Jelajahi Gaya Hidup
              <span className="block text-primary mt-2">Rendah Emisi</span>
            </h1>
            <p className="text-[18px] text-muted-text leading-relaxed max-w-xl">
              Temukan cara hidup yang lebih ramah lingkungan dengan mengurangi
              jejak karbon harianmu. Setiap langkah kecil membawa perubahan
              besar.
            </p>
            <a
              href="#cek-emisi"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 group"
            >
              Mulai Sekarang
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>

          {/* Globe Image */}
          <div className="flex-1 flex justify-center items-center relative z-10">
            <div className="relative">
              <Image
                src={globe.src}
                className="bounce drop-shadow-2xl"
                width={480}
                height={480}
                alt="globe illustration"
                priority
              />
            </div>
          </div>
        </div>

        {/* Mobile Version */}
        <div
          className="w-full flex flex-col pt-8 justify-center items-center gap-8 display-flex"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <div className="w-full rounded-3xl p-4">
            {/* Globe */}
            <div className="relative mb-8 flex justify-center">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl"></div>
              <Image
                src={globe.src}
                width={240}
                height={240}
                className="relative z-10 bounce drop-shadow-xl"
                alt="globe illustration"
                priority
              />
            </div>

            {/* Title */}
            <h1 className="font-extrabold text-[36px] leading-tight text-foreground mb-4">
              Jelajahi Gaya Hidup
              <span className="block text-primary mt-1">Rendah Emisi</span>
            </h1>

            {/* Description */}
            <p className="text-[15px] text-muted-text leading-relaxed mb-8">
              Temukan cara hidup yang lebih ramah lingkungan dengan mengurangi
              jejak karbon harianmu. Mulai dari transportasi hingga energi,
              setiap langkah kecil berarti untuk bumi kita.
            </p>

            {/* CTA Button */}
            <a
              href="#cek-emisi"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-primary hover:bg-primary-hover text-white rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg active:scale-95 group"
            >
              <Image
                src={search.src}
                width={24}
                height={24}
                alt="explore icon"
                className="group-hover:rotate-12 transition-transform"
              />
              Mulai Jelajahi
            </a>
          </div>
        </div>
      </div>
      <div
        className="flex lg:flex-row flex-col justify-center items-center lg:pb-16 lg:gap-16 gap-6 lg:mt-20 -mt-6"
        id="cek-emisi"
      >
        <Image
          src={suggest}
          className="lg:w-137.5 w-70"
          width={550}
          height={500}
          alt="suggest"
          data-aos="fade-right"
          data-aos-duration="800"
          data-aos-delay="100"
        />
        <div
          className="flex flex-col items-start lg:w-130 w-[320px]"
          data-aos="fade-left"
          data-aos-duration="800"
          data-aos-delay="100"
        >
          <h1 className="lg:text-[32px] text-[24px] font-semibold text-primary">
            Ayo Cek Emisi Karbon Kamu Sekarang!
          </h1>
          <p className="lg:text-[14px] text-[12px] font-normal mt-4 text-justify">
            Langkah awal mengurangi karbon dimulai dari menghitung emisi karbon
            pribadi kita berapa banyak tiap tahunnya. Caranya mudah, tinggal
            masukin data aktivitas harian mulai dari pilihan transportasi,
            penggunaan listrik dan peralatan elektronik, serta pilihan menu
            makan. <br /> <br /> Hasil hitunganya bisa dilihat langsung. Kamu
            juga bisa bandingin emisi kamu dengan rata-rata orang Indonesia,
            ASEAN, Global, atau bahkan dengan teman kamu yang juga mencoba
          </p>
          <Link href="/cek-emisi">
            <button className="font-semibold border-2 text-primary border-[#437655] rounded-lg mt-6 px-4 py-3 text-[16px] w-full lg:w-auto hover:scale-105 hover:bg-[#437655] hover:text-white duration-300 cursor-pointer">
              Mulai Hitung Emisi Karbon Kamu!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
