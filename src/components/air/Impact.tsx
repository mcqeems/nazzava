"use client";
import React from "react";
import Image from "next/image";

const vector1 = "/image/air/impact/vector1.webp";
const vector2 = "/image/air/impact/vector2.webp";
const vector3 = "/image/air/impact/vector3.webp";
const vector4 = "/image/air/impact/vector4.webp";
const vector5 = "/image/air/impact/vector5.webp";
const vector6 = "/image/air/impact/vector6.webp";
const img1 = "/image/air/impact/img1.webp";
const img2 = "/image/air/impact/img2.webp";
const img3 = "/image/air/impact/img3.webp";
const img4 = "/image/air/impact/img4.webp";
const img5 = "/image/air/impact/img5.webp";
const img6 = "/image/air/impact/img6.webp";


const ImpactDataMobile = [
  {
    id: 1,
    image: img1,
    title: "Penyakit Pernapasan & Kanker Paru",
    desc: "Udara kotor mengandung partikel halus dan zat kimia berbahaya. Ini dapat menyebabkan asma, bronkitis kronis, hingga kanker paru-paru.",
  },
  {
    id: 2,
    image: img2,
    title: " Hujan Asam Merusak Tanaman",
    desc: "Polutan seperti sulfur dioksida menciptakan hujan asam. Akibatnya, daun tanaman rusak dan tanah menjadi asam.",
  },
  {
    id: 3,
    image: img3,
    title: "Perubahan Iklim Semakin Cepat",
    desc: "Gas rumah kaca dari polusi mempercepat pemanasan global. Ini mengganggu iklim dan memperparah bencana alam.",
  },
  {
    id: 4,
    image: img4,
    title: "Produktivitas & Konsentrasi Menurun",
    desc: "Menghirup udara tercemar membuat tubuh cepat lelah. Fokus belajar dan kerja ikut terganggu.",
  },
  {
    id: 5,
    image: img5,
    title: "Gangguan Mental & Kognitif",
    desc: "Paparan polutan tinggi dikaitkan dengan stres dan gangguan memori. Beberapa studi juga menghubungkannya dengan risiko demensia.",
  },
  {
    id: 6,
    image: img6,
    title: "Merusak Bangunan & Material",
    desc: "Polutan asam mempercepat korosi pada bangunan dan logam. Ini memperpendek umur infrastruktur dan menambah biaya perawatan.",
  },
];

export default function Impact() {
  return (
    <div className="flex flex-col items-center font-poppins lg:mt-0 -mt-4 min-h-screen mb-20 lg:px-0 px-6 pb-20">
      <div className="" data-aos="fade-up" data-aos-duration="800">
        <h1 className="font-semibold text-center lg:text-[32px] text-[24px]">
          Kenali {""}
          <span className="relative inline-block">
            masalahnya
            <span className="absolute left-0 bottom-px w-full lg:h-5 h-3.5 -z-10 bg-[#7499BB] rounded-full"></span>
          </span>{" "}
          ambil{" "}
          <span className="relative inline-block">
            langkah
            <span className="absolute left-0 bottom-px w-full lg:h-5 h-3.5 -z-10 bg-linear-to-r bg-[#7499BB] rounded-full"></span>
          </span>{" "}
          kecilnya
        </h1>
        <h1 className="font-semibold display-none-block text-center lg:text-[32px] text-[24px] lg:mt-0 mt-4">
          Rasakan {""}
          <span className="relative inline-block">
            dampak
            <span className="absolute left-0 bottom-px w-full lg:h-5 h-3.5 -z-10 bg-linear-to-r bg-[#7499BB] rounded-full"></span>
          </span>{" "}
          besarnya{" "}
        </h1>
      </div>
      <div className="mt-16 font-poppins">
        <h1
          className="lg:text-[24px] display-none-block text-[18px] w-fit mx-auto z-20 relative font-semibold text-white lg:px-18 px-12 py-2 rounded-xl bg-[radial-gradient(circle,#6BB3F6_0%,#7597B8_100%)]"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="100"
        >
          DAMPAK
        </h1>
        {/* Desktop */}
        <div className="flex flex-col gap-4 display-none -mt-2 items-start lg:px-0 lg:w-auto w-80 lg:overflow-x-visible overflow-x-auto">
          <div className="flex justify-center items-start">
            <div
              style={{ backgroundImage: `url(${vector1})` }}
              className="flex relative -mr-10 justify-start items-center gap-4 object-cover w-162.5 bg-center bg-cover min-h-52.5"
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-delay="200"
            >
              <div className="-mt-16 flex flex-col items-center gap-2 ml-10 w-95">
                <p className="text-[20px] font-medium text-black">
                  Penyakit Pernapasan & Kanker Paru
                </p>
                <p className="text-justify text-[14px] text-black">
                  Udara kotor mengandung partikel halus dan zat kimia berbahaya.
                  Ini dapat menyebabkan asma, bronkitis kronis, hingga kanker
                  paru-paru.
                </p>
              </div>
              <Image
                src={img1}
                width={200}
                height={200}
                alt="impact1"
                className="w-50 absolute bottom-1 right-14"
              />
            </div>
            <div
              style={{ backgroundImage: `url(${vector2})` }}
              className="flex relative -ml-10 justify-start items-center gap-4 object-cover w-162.5 bg-center bg-cover min-h-70"
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="200"
            >
              <div className="-mt-8 flex flex-col items-center gap-2 ml-30 w-80">
                <p className="text-[20px] font-medium text-black">
                  {" "}
                  Hujan Asam Merusak Tanaman
                </p>
                <p className="text-justify text-[14px] text-black">
                  Polutan seperti sulfur dioksida menciptakan hujan asam.
                  Akibatnya, daun tanaman rusak dan tanah menjadi asam.
                </p>
              </div>
              <Image
                src={img2}
                width={200}
                height={200}
                alt="impact1"
                className="w-65 absolute -right-12 -bottom-4"
              />
            </div>
          </div>
          <div className="flex justify-center gap-14 items-start -mt-10">
            <div
              style={{ backgroundImage: `url(${vector3})` }}
              className="flex relative mr-0 -mt-22 justify-end items-center gap-4 object-cover w-155 bg-center bg-cover min-h-70"
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-delay="300"
            >
              <Image
                src={img3}
                width={200}
                height={200}
                alt="impact1"
                className="w-50 absolute left-0 top-4"
              />
              <div className="flex flex-col items-center gap-2 mr-10 w-90">
                <p className="text-[20px] font-medium text-black">
                  Perubahan Iklim Semakin Cepat
                </p>
                <p className="text-justify text-[14px] text-black">
                  Gas rumah kaca dari polusi mempercepat pemanasan global. Ini
                  mengganggu iklim dan memperparah bencana alam.
                </p>
              </div>
            </div>
            <div
              style={{ backgroundImage: `url(${vector4})` }}
              className="flex relative ml-0 justify-end items-center gap-4 object-cover w-135 bg-center bg-cover min-h-70"
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="300"
            >
              <Image
                src={img4}
                width={200}
                height={200}
                alt="impact1"
                className="w-50 absolute -left-20 top-4"
              />
              <div className="-mt-2 flex flex-col items-center gap-2 mr-16">
                <p className="text-[20px] font-medium text-black">
                  Produktivitas & Konsentrasi Menurun
                </p>
                <p className="w-80 text-justify text-[14px] text-black">
                  Menghirup udara tercemar membuat tubuh cepat lelah. Fokus
                  belajar dan kerja ikut terganggu.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 items-start -mt-18">
            <div
              style={{ backgroundImage: `url(${vector5})` }}
              className="flex relative mr-0 justify-start -mt-20 items-center gap-4 object-cover w-140 bg-center bg-cover min-h-70"
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-delay="400"
            >
              <div className="mt-6 flex flex-col items-center gap-2 ml-10 w-75">
                <p className="text-[20px] font-medium text-black">
                  Gangguan Mental & Kognitif
                </p>
                <p className="text-justify text-[14px] text-black">
                  Paparan polutan tinggi dikaitkan dengan stres dan gangguan
                  memori. Beberapa studi juga menghubungkannya dengan risiko
                  demensia.
                </p>
              </div>
              <Image
                src={img5}
                width={200}
                height={200}
                alt="impact1"
                className="w-55 absolute right-4 -bottom-8"
              />
            </div>
            <div
              style={{ backgroundImage: `url(${vector6})` }}
              className="flex relative -ml-6 justify-end items-center gap-4 object-cover w-167.5 bg-center bg-cover min-h-50"
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="400"
            >
              <Image
                src={img6}
                width={200}
                height={200}
                alt="impact1"
                className="w-55 absolute left-6 -bottom-4"
              />
              <div className="mt-10 flex flex-col items-center gap-2 mr-24 w-85">
                <p className="text-[20px] font-medium text-black">
                  Merusak Bangunan & Material
                </p>
                <p className="text-justify text-[14px] text-black">
                  Polutan asam mempercepat korosi pada bangunan dan logam. Ini
                  memperpendek umur infrastruktur dan menambah biaya perawatan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex display-flex mb-8 flex-col gap-8 justify-center items-center">
          {ImpactDataMobile.map((item) => (
            <div
              className="bg-[#D9D9D9] rounded-lg w-80 min-h-100 p-6 flex flex-col gap-8 justify-center items-center"
              key={item.id}
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="200"
            >
              <Image src={item.image} width={180} height={180} alt="image" />
              <div className="flex flex-col justify-center items-center gap-2">
                <h1 className="font-medium text-[20px] text-center text-black">
                  {item.title}
                </h1>
                <p className="font-normal text-[14px] text-justify text-black">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
