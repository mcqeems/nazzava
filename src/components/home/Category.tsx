"use client";
import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import tree from "../../../public/image/home/tree.webp";
import water from "../../../public/image/home/water.webp";
import air from "../../../public/image/home/air.webp";
import dirt from "../../../public/image/home/dirt.webp";

const CategoryData = [
  {
    id: 1,
    image: tree,
    title: "Pohon",
    desc: "Pohon adalah tumbuhan yang batangnya berkayu dan bercabang. Batang pohon berfungsi sebagai penopang utama bagi ranting dll.",
    link: "/pohon",
    width: 170,
  },
  {
    id: 2,
    image: water,
    title: "Air",
    desc: "Air adalah senyawa kimia dengan rumus H₂O, terdiri dari dua atom hidrogen dan satu atom oksigen yang terikat secara kovalen. ",
    link: "/air",
    width: 110,
  },
  {
    id: 3,
    image: dirt,
    title: "Tanah",
    desc: "Tanah adalah lapisan teratas dari kerak bumi yang terdiri dari mineral, bahan organik, air, dan udara.",
    link: "/tanah",
    width: 200,
  },
  {
    id: 4,
    image: air,
    title: "Udara",
    desc: "Udara adalah atmosfer yang mengelilingi bumi, campuran gas yang tidak berwarna, tidak berbau, dan tidak berasa.",
    link: "/udara",
    width: 200,
  },
];

const CategoryCard = ({ item }: { item: (typeof CategoryData)[0] }) => (
  <Link
    href={item.link}
    className="flex flex-col h-full bg-[linear-gradient(150deg,#58C229_30%,#C7DF67_100%)] w-full rounded-lg px-4 py-8 md:px-6 md:py-10 text-center shadow-md hover:shadow-lg transition-shadow"
  >
    <div className="flex-1 flex flex-col">
      <Image
        src={item.image}
        alt="image"
        width={item.width}
        height={160}
        className="mb-4 mx-auto"
      />
      <h1 className="text-white text-[28px] font-semibold mb-3">
        {item.title}
      </h1>
      <p className="text-white text-sm text-[12px] text-justify flex-grow line-clamp-3">
        {item.desc}
      </p>
    </div>
    <span className="block w-full h-10 mt-6 rounded-md text-[#AEA46B] bg-white leading-10 font-semibold">
      Pilih
    </span>
  </Link>
);

export default function Category() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className="w-full container mx-auto px-4 font-poppins pb-26"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <h1 className="text-[#00AD03] lg:text-[36px] text-[28px] lg:w-full w-75 mx-auto font-semibold text-center mb-14">
        Pilih Kategori Lingkungan!
      </h1>

      {/* Mobile View - Swiper */}
      {isMobile && (
        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow]}
          effect="coverflow"
          centeredSlides={true}
          grabCursor={true}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 2.5,
            slideShadows: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.1,
              centeredSlides: true,
            },
            640: {
              slidesPerView: 1.5,
              centeredSlides: true,
            },
          }}
        >
          {CategoryData.map((item) => (
            <SwiperSlide key={item.id}>
              <CategoryCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Tablet & Desktop View - Responsive Grid */}
      {!isMobile && (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 auto-rows-fr">
          {CategoryData.map((item) => (
            <div key={item.id}>
              <CategoryCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
