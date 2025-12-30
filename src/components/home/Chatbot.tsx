"use client";
import React from "react";
import Image from "next/image";
import chatbot from "../../../public/logo/diam.webp";
import Link from "next/link";

export default function Chatbot() {
  return (
    <div className="flex justify-center items-center">
      <div
        className="font-poppins text-white w-full max-w-7xl"
        data-aos="fade-up"
        data-aos-duration="900"
      >
        <div className="bg-[linear-gradient(150deg,#58C229_30%,#C7DF67_100%)] flex lg:flex-row flex-col items-center lg:justify-between justify-center w-full mx-auto min-h-[20vh] lg:py-6 py-10 lg:px-20 px-6 mb-24 rounded-lg">
          <div className="flex justify-center items-center lg:flex-row flex-col gap-8">
            <Image
              src={chatbot.src}
              width={140}
              height={140}
              alt="image"
              className="w-35 h-auto"
            />
            <div className="flex flex-col lg:gap-2 gap-3">
              <h1 className="font-semibold lg:text-start text-center lg:text-[34px] text-[22px]">
                Halo, Aku Nazzava Bot!
              </h1>
              <p className="font-normal lg:text-[20px] text-[14px] lg:text-start text-justify lg:w-150 w-auto">
                Jalani Hari-harimu bersama Nazzava Bot. Jadikan Nazzava Bot
                teman bermainmu!{" "}
              </p>
            </div>
          </div>
          <Link href="/bot">
            <button className="bg-white border-2 border-white rounded-full cursor-pointer hover:bg-transparent duration-300 group px-10 py-2 lg:mt-0 mt-12">
              <p className="bg-clip-text bg-[linear-gradient(150deg,#58C229_30%,#C7DF67_100%)] group-hover:text-white duration-300 text-transparent text-[16px] lg:text-[20px] font-semibold">
                Coba
              </p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
