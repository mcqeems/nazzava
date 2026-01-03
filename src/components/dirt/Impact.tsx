"use client";
import Image from "next/image";

// variabel image
const vector1 = "/image/dirt/impact/vector1.webp";
const vector2 = "/image/dirt/impact/vector2.webp";
const vector3 = "/image/dirt/impact/vector3.webp";
const vector4 = "/image/dirt/impact/vector4.webp";
const vector5 = "/image/dirt/impact/vector5.webp";
const vector6 = "/image/dirt/impact/vector6.webp";
const img1 = "/image/dirt/impact/img1.webp";
const img2 = "/image/dirt/impact/img2.webp";
const img3 = "/image/dirt/impact/img3.webp";
const img4 = "/image/dirt/impact/img4.webp";
const img5 = "/image/dirt/impact/img5.webp";
const img6 = "/image/dirt/impact/img6.webp";

const ImpactDataMobile = [
  {
    id: 1,
    image: img1,
    title: "Kesuburan Tanah Menurun",
    desc: "Tanah kehilangan nutrisi penting yang dibutuhkan tanaman. Akibatnya, hasil panen menurun dan ketahanan pangan terganggu.",
  },
  {
    id: 2,
    image: img2,
    title: "Tanah Kehilangan Mikroorganisme Baik",
    desc: "Pestisida dan limbah kimia membunuh mikroorganisme yang menjaga kesuburan tanah. Tanah pun menjadi mati dan tidak produktif.",
  },
  {
    id: 3,
    image: img3,
    title: "Menyumbang Krisis Pangan",
    desc: "Produksi pangan terus menurun saat tanah rusak dibiarkan. Ini bisa memperburuk kelangkaan makanan di masa depan.",
  },
  {
    id: 4,
    image: img4,
    title: "Memperparah Perubahan Iklim",
    desc: "Tanah rusak melepaskan karbon ke atmosfer. Hal ini mempercepat pemanasan global dan krisis iklim.",
  },
  {
    id: 5,
    image: img5,
    title: "Memicu Bencana Alam",
    desc: "Tanah yang gersang tidak mampu menyerap air hujan. Ini meningkatkan risiko banjir dan longsor.",
  },
  {
    id: 6,
    image: img6,
    title: "Mencemari Air Tanah",
    desc: "Limbah kimia dari tanah bisa meresap ke air tanah. Dampaknya, kualitas air minum dan ekosistem terganggu.",
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
            <span className="absolute left-0 bottom-0 w-full lg:h-5 h-3.5 -z-10 bg-[#CE8686] rounded-full"></span>
          </span>{" "}
          ambil{" "}
          <span className="relative inline-block">
            langkah
            <span className="absolute left-0 bottom-0 w-full lg:h-5 h-3.5 -z-10 bg-linear-to-r bg-[#CE8686] rounded-full"></span>
          </span>{" "}
          kecilnya
        </h1>
        <h1 className="font-semibold display-none-block text-center lg:text-4xl text-2xl lg:mt-0 mt-4">
          Rasakan {""}
          <span className="relative inline-block">
            dampak
            <span className="absolute left-0 bottom-0 w-full lg:h-5 h-3.5 -z-10 bg-linear-to-r bg-[#CE8686] rounded-full"></span>
          </span>{" "}
          besarnya{" "}
        </h1>
      </div>
      <div className="mt-16 font-poppins">
        <h1
          className="lg:text-2xl display-none-block text-lg w-fit mx-auto z-20 relative font-semibold text-white lg:px-18 px-12 py-2 rounded-xl bg-[radial-gradient(circle,#810000_0%,#5C0000_100%)]"
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
                backgroundImage: `url(${vector1})`,
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
                  Kesuburan Tanah Menurun
                </p>
                <p className="text-justify text-sm text-black">
                  Tanah kehilangan nutrisi penting yang dibutuhkan tanaman.
                  Akibatnya, hasil panen menurun dan ketahanan pangan terganggu.
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
                backgroundImage: `url(${vector2})`,
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
                  Tanah Kehilangan Mikroorganisme Baik
                </p>
                <p className="text-justify text-sm text-black">
                  Pestisida dan limbah kimia membunuh mikroorganisme yang
                  menjaga kesuburan tanah. Tanah pun menjadi mati dan tidak
                  produktif.
                </p>
              </div>
              <Image
                src={img2}
                width={200}
                height={200}
                alt="impact1"
                style={{ width: "260px" }}
                className="absolute -right-8 -bottom-4"
              />
            </div>
          </div>
          <div className="flex justify-center gap-14 items-start -mt-10">
            <div
              style={{
                backgroundImage: `url(${vector3})`,
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
                  Menyumbang Krisis Pangan
                </p>
                <p className="text-justify text-sm text-black">
                  Produksi pangan terus menurun saat tanah rusak dibiarkan. Ini
                  bisa memperburuk kelangkaan makanan di masa depan.
                </p>
              </div>
            </div>
            <div
              style={{
                backgroundImage: `url(${vector4})`,
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
                style={{ width: "190px" }}
                className="absolute -left-10 top-8"
              />
              <div className="-mt-2 flex flex-col items-center gap-2 mr-16">
                <p className="text-xl font-medium text-black">
                  Memperparah Perubahan Iklim
                </p>
                <p className="w-80 text-justify text-sm text-black">
                  Tanah rusak melepaskan karbon ke atmosfer. Hal ini mempercepat
                  pemanasan global dan krisis iklim.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 items-start -mt-18">
            <div
              style={{
                backgroundImage: `url(${vector5})`,
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
                  Memicu Bencana Alam
                </p>
                <p className="text-justify text-sm text-black">
                  Tanah yang gersang tidak mampu menyerap air hujan. Ini
                  meningkatkan risiko banjir dan longsor.
                </p>
              </div>
              <Image
                src={img5}
                width={200}
                height={200}
                alt="impact1"
                className="w-60 absolute right-4 -bottom-8"
              />
            </div>
            <div
              style={{
                backgroundImage: `url(${vector6})`,
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
                style={{ width: "220px" }}
                className="absolute left-6 -bottom-4"
              />
              <div
                className="mt-10 flex flex-col items-center gap-2 mr-16"
                style={{ width: "360px" }}
              >
                <p className="text-xl font-medium text-black">
                  Mencemari Air Tanah
                </p>
                <p className="text-justify text-sm text-black">
                  Limbah kimia dari tanah bisa meresap ke air tanah. Dampaknya,
                  kualitas air minum dan ekosistem terganggu.
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
              <Image src={item.image} width={180} height={180} alt="image" />
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
