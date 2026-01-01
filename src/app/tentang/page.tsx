"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function TentangPage() {
  return (
    <div className="font-poppins">
      <Navbar />

      <div className="container mx-auto px-4 pb-8 lg:px-8 pt-28 lg:pt-38 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-20" data-aos="fade-up">
          <h1 className="text-4xl lg:text-6xl font-bold text-primary-hover dark:text-primary mb-6">
            Tentang Kami
          </h1>
          <div className="flex justify-center gap-8 text-base">
            <a
              href="/"
              className="text-muted-text hover:text-primary transition-colors duration-300"
            >
              Beranda
            </a>
            <span className="text-primary font-semibold">Tentang Kami</span>
          </div>
        </div>

        {/* Nazzava dalam Lingkungan Section */}
        <div className="mb-10 lg:mb-10" data-aos="fade-up" data-aos-delay="100">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-hover dark:text-primary mb-8">
            Arti Nazzava
          </h2>
          <div className="text-foreground space-y-5 text-justify leading-relaxed text-base lg:text-lg">
            <p>
              <strong className="text-primary">Nazzava</strong> berasal dari
              bahasa Arab <strong className="text-success">"نَظَّفَ"</strong>{" "}
              (naẓẓafa) yang berarti{" "}
              <strong className="text-success">"membersihkan"</strong> atau{" "}
              <strong className="text-success">"menyucikan"</strong>. Nama ini
              mencerminkan misi kami untuk membersihkan dan menjaga kelestarian
              lingkungan.
            </p>
            <p>
              Dalam konteks platform kami, Nazzava merepresentasikan{" "}
              <strong className="text-primary">"proses pembersihan"</strong> dan{" "}
              <strong className="text-success">"pemurnian"</strong> yang tidak
              hanya terbatas pada sampah fisik, tetapi juga mencakup{" "}
              <strong>edukasi untuk membersihkan kebiasaan buruk</strong> yang
              merusak lingkungan. Setiap langkah kecil dalam membersihkan bumi
              adalah bagian dari upaya kolektif untuk masa depan yang lebih
              berkelanjutan.
            </p>
          </div>
        </div>

        {/* Logo Section */}
        <div
          className="flex justify-center"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
            <Image
              src="/logo/nazzava-logo.webp"
              alt="Nazzava Logo"
              width={300}
              height={300}
              className="w-48 h-48 lg:w-80 lg:h-80 object-contain"
            />
        </div>

        {/* What is Nazzava Section */}
        <div className="mb-20 lg:mb-24" data-aos="fade-up" data-aos-delay="300">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-hover dark:text-primary mb-8">
            Apa itu Nazzava?
          </h2>
          <div className="text-foreground space-y-5 text-justify leading-relaxed text-base lg:text-lg">
            <p>
              <strong className="text-primary">Nazzava</strong> adalah sebuah{" "}
              <strong>platform digital</strong> yang berfokus pada{" "}
              <strong className="text-success">
                edukasi dan aksi lingkungan
              </strong>
              . Dengan makna "membersihkan" dari bahasa Arab, Nazzava hadir
              sebagai solusi modern untuk membantu masyarakat{" "}
              <strong>membersihkan kebiasaan buruk</strong>, memahami dampak
              lingkungan, dan mengambil langkah nyata menuju{" "}
              <strong>kehidupan yang berkelanjutan</strong>.
            </p>
            <p>
              Melalui Nazzava, kami menghadirkan berbagai alat interaktif
              seperti <strong>kalkulator emisi karbon</strong>,{" "}
              <strong>pengenal sampah</strong>,{" "}
              <strong>chatbot eco-friendly</strong>, hingga{" "}
              <strong>permainan edukatif</strong> yang membantu pengguna belajar
              tentang gaya hidup rendah emisi dengan cara yang mudah dan
              menyenangkan.
            </p>
            <p>
              Lebih dari sekadar portal informasi, Nazzava adalah{" "}
              <strong>platform digital</strong> yang memudahkan perjalanan
              menuju <strong>gaya hidup berkelanjutan</strong>. Dengan
              pendekatan yang <strong>edukatif</strong>,{" "}
              <strong>interaktif</strong>, dan <strong>mudah diakses</strong>,
              kami membantu setiap individu mengambil langkah nyata dalam
              membersihkan dan menjaga bumi. Dengan perkembangan teknologi
              digital, Nazzava hadir sebagai jembatan antara{" "}
              <strong>kesadaran lingkungan</strong> dan{" "}
              <strong>aksi nyata</strong>, sehingga siapa pun dapat
              berkontribusi untuk masa depan bumi yang lebih baik.
            </p>
          </div>
        </div>

        {/* Features List */}
        <div
          className="bg-primary-light dark:bg-card rounded-3xl p-10 lg:p-16 shadow-xl mb-20 lg:mb-24 hover:shadow-2xl transition-shadow duration-300"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="space-y-7 lg:space-y-8">
            <FeatureItem text="Penghitungan langsung tentang emisi karbon dari aktivitas sehari-hari" />
            <FeatureItem text="Koleksi edukasi digital tentang perubahan iklim dan dampak lingkungan" />
            <FeatureItem text="Platform interaktif untuk belajar memilah sampah dan mengenal kategorinya" />
            <FeatureItem text="Fitur klasifikasi otomatis untuk membantu identifikasi jenis sampah yang dapat didaur ulang" />
            <FeatureItem text="Game & quiz untuk membuat belajar tentang lingkungan lebih seru dan interaktif" />
            <FeatureItem text="Teknologi chatbot untuk menjawab pertanyaan seputar gaya hidup ramah lingkungan" />
          </div>
        </div>

        {/* Mission Statement */}
        <div
          className="text-foreground space-y-5 text-justify leading-relaxed text-base lg:text-lg"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <p>
            Dalam menghadirkan <strong>teknologi digital</strong>, kami percaya
            bahwa setiap orang memiliki peran penting dalam menjaga{" "}
            <strong>keberlanjutan bumi</strong>. Melalui{" "}
            <strong className="text-primary">Nazzava</strong>, kami ingin
            menumbuhkan <strong>kesadaran</strong> bahwa langkah kecil yang
            tepat akan berdampak besar bagi lingkungan. Untuk itu, kami
            berkomitmen menghadirkan konten dan fitur yang{" "}
            <strong>mudah dipahami</strong> dan{" "}
            <strong>dapat dipraktikkan</strong> sehari-hari.
          </p>
          <p>
            Kami percaya bahwa dengan semangat <strong>"membersihkan"</strong>{" "}
            yang menjadi filosofi Nazzava, setiap individu dapat berkontribusi
            dalam membangun masa depan yang lebih hijau dan berkelanjutan. Mari
            bersama-sama membersihkan dan menjaga{" "}
            <strong className="text-success">planet kita</strong> untuk generasi
            mendatang.
          </p>
        </div>

        {/* Vision Section */}
        <div
          className="mt-20 lg:mt-24 bg-linear-to-r from-primary to-primary-hover rounded-3xl p-10 lg:p-16 text-white text-center shadow-2xl hover:shadow-3xl transition-all duration-300"
          data-aos="zoom-in"
          data-aos-delay="600"
        >
          <h3 className="text-3xl lg:text-4xl font-bold mb-6">Visi Kami</h3>
          <p className="text-xl lg:text-2xl leading-relaxed">
            Menjadikan setiap individu sebagai <strong>agen perubahan</strong>{" "}
            dalam menjaga kelestarian lingkungan melalui edukasi digital yang{" "}
            <strong>mudah diakses</strong>, <strong>interaktif</strong>, dan{" "}
            <strong>berdampak nyata</strong>.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-5 lg:gap-6 group hover:translate-x-2 transition-transform duration-300">
      <CheckCircle2 className="w-7 h-7 lg:w-8 lg:h-8 text-primary shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
      <p className="text-foreground text-base lg:text-xl leading-relaxed">
        {text}
      </p>
    </div>
  );
}
