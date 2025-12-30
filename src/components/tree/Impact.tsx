"use client";
import React from "react";
import Image from "next/image";
import vector1 from "../../../public/image/tree/impact/vector1.webp";
import vector2 from "../../../public/image/tree/impact/vector2.webp";
import vector3 from "../../../public/image/tree/impact/vector3.webp";
import vector4 from "../../../public/image/tree/impact/vector4.webp";
import vector5 from "../../../public/image/tree/impact/vector5.webp";
import vector6 from "../../../public/image/tree/impact/vector6.webp";
import img1 from "../../../public/image/tree/impact/img1.webp";
import img2 from "../../../public/image/tree/impact/img2.webp";
import img3 from "../../../public/image/tree/impact/img3.webp";
import img4 from "../../../public/image/tree/impact/img4.webp";
import img5 from "../../../public/image/tree/impact/img5.webp";
import img6 from "../../../public/image/tree/impact/img6.webp";

const ImpactDataMobile = [
  {
    id: 1,
    image: img1,
    title: "Suhu bumi meningkat",
    desc: "Perubahan iklim membuat suhu global naik, memicu gelombang panas, kekeringan ekstrem, dan kebakaran hutan lebih sering.",
  },
  {
    id: 2,
    image: img2,
    title: "Banjir & Longsor Sering Terjadi",
    desc: "Penebangan pohon memperparah erosi tanah. Air hujan nggak lagi diserap dengan baik, akibatnya banjir bandang & longsor jadi lebih sering.",
  },
  {
    id: 3,
    image: img3,
    title: "Habitat Satwa Punah",
    desc: "Deforestasi menghancurkan rumah alami hewan. Banyak spesies kehilangan tempat tinggal, kesulitan mencari makan, bahkan terancam punah.",
  },
  {
    id: 4,
    image: img4,
    title: "Siklus Air Terganggu",
    desc: "Pohon berperan besar menjaga siklus air. Hutan gundul bikin sungai kering di musim kemarau, banjir di musim hujan.",
  },
  {
    id: 5,
    image: img5,
    title: "Kualitas Udara Memburuk",
    desc: "Tanpa pohon, polusi udara sulit disaring. CO₂ meningkat, debu & polutan makin bebas beterbangan, risiko penyakit pernapasan naik.",
  },
  {
    id: 6,
    image: img6,
    title: "Gangguan Kehidupan Masyarakat Lokal",
    desc: "Hilangnya hutan mempengaruhi ekonomi & budaya masyarakat adat yang bergantung pada hutan untuk pangan, obat, dan kehidupan sehari-hari.",
  },
];

export default function Impact() {
  return (
    <div className="flex flex-col items-center font-poppins lg:mt-0 -mt-4 min-h-screen mb-20 lg:px-0 px-6 pb-20">
      <div className="" data-aos="fade-up" data-aos-duration="800">
        <h1 className="font-semibold text-center lg:text-4xl text-2xl">
          Kenali {""}
          <span className="relative inline-block">
            masalahnya
            <span className="absolute left-0 bottom-0 w-full lg:h-5 h-3.5 -z-10 bg-[linear-gradient(150deg,#58C229_30%,#C7DF67_100%)] rounded-full"></span>
          </span>{" "}
          ambil{" "}
          <span className="relative inline-block">
            langkah
            <span className="absolute left-0 bottom-0 w-full lg:h-5 h-3.5 -z-10 bg-linear-to-r bg-[linear-gradient(150deg,#58C229_30%,#C7DF67_100%)] rounded-full"></span>
          </span>{" "}
          kecilnya
        </h1>
        <h1 className="font-semibold display-none-block text-center lg:text-4xl text-2xl lg:mt-0 mt-4">
          Rasakan {""}
          <span className="relative inline-block">
            dampak
            <span className="absolute left-0 bottom-0 w-full lg:h-5 h-3.5 -z-10 bg-linear-to-r bg-[linear-gradient(150deg,#58C229_30%,#C7DF67_100%)] rounded-full"></span>
          </span>{" "}
          besarnya{" "}
        </h1>
      </div>
      <div className="mt-16 font-poppins">
        <h1
          className="lg:text-2xl display-none-block text-lg w-fit mx-auto z-20 relative font-semibold text-white lg:px-18 px-12 py-2 rounded-xl bg-[linear-gradient(150deg,#58C229_30%,#C7DF67_100%)]"
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
              style={{
                backgroundImage: `url(${vector1.src})`,
                width: "650px",
                minHeight: "210px",
              }}
              className="flex relative -mr-10 justify-start items-center gap-4 object-cover bg-center bg-cover"
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-delay="200"
            >
              <div
                className="-mt-16 flex flex-col items-center gap-2 ml-10"
                style={{ width: "340px" }}
              >
                <p className="text-xl font-medium text-black">
                  Suhu bumi meningkat
                </p>
                <p className="text-justify text-sm text-black">
                  Perubahan iklim membuat suhu global naik, memicu gelombang
                  panas, kekeringan ekstrem, dan kebakaran hutan lebih sering.
                </p>
              </div>
              <Image
                src={img1}
                width={200}
                height={200}
                alt="impact1"
                className="w-50 absolute right-14"
              />
            </div>
            <div
              style={{
                backgroundImage: `url(${vector2.src})`,
                width: "650px",
                minHeight: "280px",
              }}
              className="flex relative -ml-10 justify-start items-center gap-4 object-cover bg-center bg-cover"
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="200"
            >
              <div className="-mt-8 flex flex-col items-center gap-2 ml-30 w-80">
                <p className="text-xl font-medium text-black">
                  Banjir & Longsor Sering Terjadi
                </p>
                <p className="text-justify text-sm text-black">
                  Penebangan pohon memperparah erosi tanah. Air hujan nggak lagi
                  diserap dengan baik, akibatnya banjir bandang & longsor jadi
                  lebih sering.
                </p>
              </div>
              <Image
                src={img2}
                width={200}
                height={200}
                alt="impact1"
                style={{ width: "220px" }}
                className="absolute -right-8 -bottom-4"
              />
            </div>
          </div>
          <div className="flex justify-center gap-14 items-start -mt-10">
            <div
              style={{
                backgroundImage: `url(${vector3.src})`,
                width: "620px",
                minHeight: "280px",
              }}
              className="flex relative mr-0 -mt-22 justify-end items-center gap-4 object-cover bg-center bg-cover"
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
              <div
                className="flex flex-col items-center gap-2 mr-10"
                style={{ width: "380px" }}
              >
                <p className="text-xl font-medium text-black">
                  Habitat Satwa Punah
                </p>
                <p className="text-justify text-sm text-black">
                  Deforestasi menghancurkan rumah alami hewan. Banyak spesies
                  kehilangan tempat tinggal, kesulitan mencari makan, bahkan
                  terancam punah.
                </p>
              </div>
            </div>
            <div
              style={{
                backgroundImage: `url(${vector4.src})`,
                width: "540px",
                minHeight: "280px",
              }}
              className="flex relative ml-0 justify-end items-center gap-4 object-cover bg-center bg-cover"
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="300"
            >
              <Image
                src={img4}
                width={200}
                height={200}
                alt="impact1"
                style={{ width: "180px" }}
                className="absolute -left-10 top-0"
              />
              <div className="-mt-2 flex flex-col items-center gap-2 mr-16">
                <p className="text-xl font-medium text-black">
                  Siklus Air Terganggu
                </p>
                <p className="w-80 text-justify text-sm text-black">
                  Pohon berperan besar menjaga siklus air. Hutan gundul bikin
                  sungai kering di musim kemarau, banjir di musim hujan.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 items-start -mt-18">
            <div
              style={{
                backgroundImage: `url(${vector5.src})`,
                width: "560px",
                minHeight: "280px",
              }}
              className="flex relative mr-0 justify-start -mt-20 items-center gap-4 object-cover bg-center bg-cover"
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-delay="400"
            >
              <div
                className="mt-6 flex flex-col items-center gap-2 ml-10"
                style={{ width: "280px" }}
              >
                <p className="text-xl font-medium text-black">
                  Kualitas Udara Memburuk
                </p>
                <p className="text-justify text-sm text-black">
                  Tanpa pohon, polusi udara sulit disaring. CO₂ meningkat, debu
                  & polutan makin bebas beterbangan, risiko penyakit pernapasan
                  naik.
                </p>
              </div>
              <Image
                src={img5}
                width={200}
                height={200}
                alt="impact1"
                className="w-50 absolute right-14 bottom-0"
              />
            </div>
            <div
              style={{
                backgroundImage: `url(${vector6.src})`,
                width: "670px",
                minHeight: "200px",
              }}
              className="flex relative -ml-6 justify-end items-center gap-4 object-cover bg-center bg-cover"
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="400"
            >
              <Image
                src={img6}
                width={200}
                height={200}
                alt="impact1"
                style={{ width: "140px" }}
                className="absolute left-6 -bottom-4"
              />
              <div
                className="mt-10 flex flex-col items-center gap-2 mr-16"
                style={{ width: "420px" }}
              >
                <p className="text-xl font-medium text-black">
                  Gangguan Kehidupan Masyarakat Lokal
                </p>
                <p className="text-justify text-sm text-black">
                  Hilangnya hutan mempengaruhi ekonomi & budaya masyarakat adat
                  yang bergantung pada hutan untuk pangan, obat, dan kehidupan
                  sehari-hari.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex display-flex mb-8 flex-col gap-8 justify-center items-center">
          {ImpactDataMobile.map((item) => (
            <div
              className="bg-[#D9D9D9] rounded-lg w-80 p-6 flex flex-col gap-8 justify-center items-center"
              style={{ minHeight: "400px" }}
              key={item.id}
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="200"
            >
              <Image src={item.image} width={160} height={160} alt="image" />
              <div className="flex flex-col justify-center items-center gap-2">
                <h1 className="font-medium text-xl text-center text-black">
                  {item.title}
                </h1>
                <p className="font-normal text-sm text-justify text-black">
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
