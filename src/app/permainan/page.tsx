"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import smartBin from "../../../public/image/game/smart-bin.webp";
import monsterJunk from "../../../public/image/game/monster-junk.webp";
import { ButtonBack } from "@/components/ui/button-back";

export default function Page() {
  return (
    <div className="" data-aos="fade-up" data-aos-duration="900">
      <div className="hidden lg:block">
        <ButtonBack />
      </div>
      <div className="flex flex-col justify-center items-center font-poppins min-h-screen pb-20 pt-10 container mx-auto">
        <div className="w-full bg-linear-to-br from-[#0F8A3B] via-[#8AD362] to-[#E5F4D2] rounded-2xl p-px shadow-[0_20px_80px_rgba(7,53,11,0.18)]">
          <div className="w-full h-full bg-[#0C1F11]/50 backdrop-blur-xl rounded-2xl overflow-hidden">
            <div className="relative w-full h-40 overflow-hidden lg:hidden">
              <div className="absolute top-4 left-4">
                <ButtonBack />
              </div>
            </div>
            <div className="relative w-full h-40 overflow-hidden hidden lg:block">
              <div className="absolute inset-0 bg-[radial-linear(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_35%),radial-linear(circle_at_80%_30%,rgba(255,255,255,0.12),transparent_30%)]"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-6 text-center">
                <p className="uppercase tracking-[0.35em] text-xs lg:text-sm font-semibold">
                  Permainan
                </p>
                <h1 className="lg:text-[34px] text-[24px] font-bold leading-tight drop-shadow">
                  Mainkan & Pelajari
                </h1>
                <p className="text-sm lg:text-base text-white/80 max-w-2xl mt-2">
                  Nikmati berbagai permainan edukatif yang seru dan interaktif.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-8 p-6 lg:p-10">
              <div className="space-y-4">
                <Link href="/kenali-sampah">
                  <button className="group relative w-full overflow-hidden rounded-2xl border border-[#E6F0DF] transition-all duration-300 hover:border-[#0F8A3B]">
                    <Image
                      src={smartBin.src}
                      width={1200}
                      height={600}
                      alt="Smart Bin"
                      className="w-full h-75 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0C1F11] via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8">
                      <div className="text-left">
                        <p className="uppercase tracking-[0.25em] text-xs lg:text-sm font-semibold text-white/80">
                          Game 1
                        </p>
                        <h2 className="text-2xl lg:text-3xl font-bold text-white mt-2">
                          Smart Bin
                        </h2>
                        <p className="text-sm text-white/80 mt-2">
                          Pelajari cara mengelola sampah dengan benar dan
                          cerdas.
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="px-4 py-2 rounded-full bg-[#0F8A3B] text-white text-sm font-semibold group-hover:bg-white group-hover:text-[#0F8A3B] transition-all">
                          Mainkan Sekarang →
                        </span>
                      </div>
                    </div>
                  </button>
                </Link>
              </div>

              <div className="space-y-4">
                <Link href="/monster-junk">
                  <button className="group relative w-full overflow-hidden rounded-2xl border border-[#E6F0DF] transition-all duration-300 hover:border-[#0F8A3B]">
                    <Image
                      src={monsterJunk.src}
                      width={1200}
                      height={600}
                      alt="Monster Junk"
                      className="w-full h-75 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0C1F11] via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8">
                      <div className="text-left">
                        <p className="uppercase tracking-[0.25em] text-xs lg:text-sm font-semibold text-white/80">
                          Game 2
                        </p>
                        <h2 className="text-2xl lg:text-3xl font-bold text-white mt-2">
                          Monster Junk
                        </h2>
                        <p className="text-sm text-white/80 mt-2">
                          Tantang dirimu mengatasi dan memilah sampah dengan
                          cepat.
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="px-4 py-2 rounded-full bg-[#0F8A3B] text-white text-sm font-semibold group-hover:bg-white group-hover:text-[#0F8A3B] transition-all">
                          Mainkan Sekarang →
                        </span>
                      </div>
                    </div>
                  </button>
                </Link>
              </div>

              <div className="bg-[#0C1F11] text-white rounded-2xl p-6 lg:p-8 space-y-4 mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Tips Bermain</h3>
                  <span className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/15">
                    Baca ±15 detik
                  </span>
                </div>
                <ul className="space-y-3 text-sm text-white/90 list-disc list-inside">
                  <li>Pahami kategori sampah sebelum memulai setiap game.</li>
                  <li>Coba ulangi level yang sulit untuk meningkatkan skor.</li>
                  <li>Pantau waktu dan akurasi untuk hasil terbaik.</li>
                  <li>
                    Bagikan skor tinggimu dengan teman untuk tantangan seru.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
