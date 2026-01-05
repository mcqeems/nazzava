/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useMemo, useState } from "react";
import bis from "../../../../public/image/emisi/bis.webp";
import car from "../../../../public/image/emisi/car.webp";
import motorcycle from "../../../../public/image/emisi/motorcycle.webp";
import eletric from "../../../../public/image/emisi/eletric.webp";
import gasoline from "../../../../public/image/emisi/gasoline.webp";
import solar from "../../../../public/image/emisi/solar.webp";
import Image from "next/image";
import Swal from "sweetalert2";
import { ButtonBack } from "@/components/ui/button-back";

const transportasiData = [
  {
    id: 1,
    name: "Mobil",
    image: car,
    emisi: [
      {
        id: 1,
        name: "Listrik",
        emisi: 0.05,
        image: eletric,
      },
      {
        id: 2,
        name: "Bensin",
        emisi: 0.192,
        image: gasoline,
      },
      {
        id: 3,
        name: "Solar",
        emisi: 0.171,
        image: solar,
      },
    ],
  },
  {
    id: 2,
    name: "Motor",
    image: motorcycle,
    emisi: [
      {
        id: 1,
        name: "Listrik",
        emisi: 0.025,
        image: eletric,
      },
      {
        id: 2,
        name: "Bensin",
        emisi: 0.072,
        image: gasoline,
      },
    ],
  },
  {
    id: 3,
    name: "Bis",
    image: bis,
    emisi: [
      {
        id: 1,
        name: "Listrik",
        emisi: 0.13,
        image: eletric,
      },
      {
        id: 2,
        name: "Solar",
        emisi: 0.822,
        image: solar,
      },
    ],
  },
];

export default function CekEmisi() {
  const [total, setTotal] = useState(0);
  const [filteredEmisiData, setFilteredEmisiData] = useState<any[]>([]);
  const [distance, setDistance] = useState("");
  const [emisiValue, setEmisiValue] = useState("");
  const [checkedTransport, setCheckedTransport] = useState(0);
  const [checkedEmisi, setCheckedEmisi] = useState(0);

  const guideSteps = [
    {
      title: "Pilih transportasi",
      detail: "Klik kartu kendaraan yang kamu gunakan hari ini.",
    },
    {
      title: "Pilih bahan bakar",
      detail: "Sesuaikan dengan jenis energi yang dipakai.",
    },
    {
      title: "Masukkan jarak",
      detail: "Isi jarak tempuh dalam kilometer, lalu klik hitung.",
    },
  ];

  const isReadyToCalculate = useMemo(() => {
    return checkedTransport !== 0 && checkedEmisi !== 0 && distance !== "";
  }, [checkedTransport, checkedEmisi, distance]);

  const formattedTotal = useMemo(() => {
    if (!total) return "0,000 kg CO₂e";
    const value = new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(total);
    return `${value} kg CO₂e`;
  }, [total]);

  const handleChooseTransport = (id: number) => {
    const filteredDataTransport = transportasiData.filter((item) => {
      const data = id ? item.id == id : true;
      return data;
    });

    setCheckedTransport(id);
    setFilteredEmisiData(filteredDataTransport);
  };

  const handleEmisi = (emisi: string, id: number) => {
    setEmisiValue(emisi);
    setCheckedEmisi(id);
  };

  const handleTotalEmisi = async () => {
    if (checkedTransport === 0) {
      Swal.fire({
        title: "Harap Masukkan Transportasi",
        icon: "error",
        confirmButtonText: "Oke",
        confirmButtonColor: "red",
      });
      return;
    }

    if (checkedEmisi === 0) {
      Swal.fire({
        title: "Harap Masukkan Jenis Emisi",
        icon: "error",
        confirmButtonText: "Oke",
        confirmButtonColor: "red",
      });
      return;
    }

    if (distance === "") {
      Swal.fire({
        title: "Harap Masukkan Jarak Tempuh",
        icon: "error",
        confirmButtonText: "Oke",
        confirmButtonColor: "red",
      });
      return;
    }

    const emisiTotal = Number(emisiValue) * Number(distance);
    Swal.fire({
      title: "Sedang Menghitung...",
      didOpen: () => {
        Swal.showLoading();
      },
      timer: 2000,
      showConfirmButton: false,
    });

    await new Promise((resolve) => setTimeout(resolve, 3000));
    Swal.fire({
      title: "Hitungan Berhasil",
      icon: "success",
      confirmButtonText: "Oke",
      confirmButtonColor: "green",
    });

    setTotal(emisiTotal);
  };

  return (
    <div className="" data-aos="fade-up" data-aos-duration="900">
      <div className="hidden lg:block">
        <ButtonBack />
      </div>
      <div className="flex flex-col justify-center items-center font-poppins min-h-screen lg:pb-20 lg:pt-10 container mx-auto">
        <div className="w-full bg-linear-to-br from-primary via-accent to-primary-light rounded-2xl p-px shadow-[0_20px_80px_rgba(7,53,11,0.18)] dark:shadow-[0_20px_80px_rgba(74,222,128,0.15)]">
          <div className="w-full h-full bg-card/50 backdrop-blur-xl lg:rounded-2xl overflow-hidden">
            <div className="relative w-full h-40 overflow-hidden lg:hidden">
              <div className="absolute top-4 left-4">
                <ButtonBack />
              </div>
            </div>
            <div className="relative w-full h-40 overflow-hidden hidden lg:block">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.12),transparent_30%)]" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-foreground px-6 text-center">
                <p className="uppercase tracking-[0.35em] text-xs lg:text-sm font-semibold">
                  Cek Emisi
                </p>
                <h1 className="lg:text-[34px] text-[24px] font-bold leading-tight drop-shadow">
                  Hitung Emisi Karbon Kamu
                </h1>
                <p className="text-sm lg:text-base text-muted-text max-w-2xl mt-2">
                  UI baru yang ringan, interaktif, dan punya panduan singkat
                  supaya kamu bisa cek jejak karbon harian tanpa ribet.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:gap-10 p-6 lg:p-10">
              <div className="space-y-6 w-full">
                <div className="flex flex-wrap gap-3 items-center text-muted-text text-sm">
                  <span className="px-4 py-2 bg-card/50 rounded-full border border-border">
                    Langkah 1-3 selesai & hitung
                  </span>
                  <span className="px-4 py-2 bg-card/50 rounded-full border border-border">
                    Pilih, isi, langsung lihat hasil
                  </span>
                  <span className="px-4 py-2 bg-card/50 rounded-full border border-border">
                    Data di perangkatmu
                  </span>
                </div>

                <div className="bg-card rounded-2xl shadow-[0_20px_60px_rgba(10,60,20,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)] p-5 lg:p-7 space-y-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-xl lg:text-2xl font-semibold text-foreground">
                        Pilih Transportasi
                      </h2>
                      <p className="text-sm text-muted-text">
                        Klik salah satu kartu di bawah untuk memulai.
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold">
                      Real-time
                    </span>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {transportasiData.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleChooseTransport(item.id)}
                        className={`group relative overflow-hidden rounded-xl border transition-all duration-200 text-left ${
                          checkedTransport == item.id
                            ? "border-primary bg-primary-light shadow-[0_12px_30px_rgba(15,138,59,0.18)] dark:shadow-[0_12px_30px_rgba(74,222,128,0.25)]"
                            : "border-border bg-card hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(12,31,17,0.12)] dark:hover:shadow-[0_12px_30px_rgba(74,222,128,0.15)]"
                        }`}
                      >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_30%_20%,rgba(88,194,41,0.12),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(199,223,103,0.18),transparent_35%)]" />
                        <div className="relative flex flex-col items-start gap-3 p-4 lg:p-5">
                          <div className="w-full flex justify-between items-center">
                            <Image
                              src={item.image}
                              width={72}
                              height={72}
                              className="w-16 lg:w-20 h-auto drop-shadow"
                              alt="image"
                            />
                            <span className="text-xs font-semibold text-primary bg-primary-light rounded-full px-3 py-1">
                              #{item.id}
                            </span>
                          </div>
                          <p className="text-lg lg:text-xl font-semibold text-foreground">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-text">
                            Tap untuk melihat bahan bakarnya.
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {filteredEmisiData.length > 0 && (
                  <div className="bg-card rounded-2xl shadow-[0_20px_60px_rgba(10,60,20,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)] p-5 lg:p-7 space-y-6">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h2 className="text-xl lg:text-2xl font-semibold text-foreground">
                          Pilih Bahan Bakar
                        </h2>
                        <p className="text-sm text-muted-text">
                          Sesuaikan dengan energi yang dipakai kendaraanmu.
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-semibold">
                        Estimasi otomatis
                      </span>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredEmisiData[0]?.emisi.map((item: any) => (
                        <button
                          key={item.id}
                          onClick={() => handleEmisi(item.emisi, item.id)}
                          className={`group relative overflow-hidden rounded-xl border transition-all duration-200 text-left ${
                            checkedEmisi == item.id
                              ? "border-primary bg-primary-light shadow-[0_12px_30px_rgba(15,138,59,0.18)] dark:shadow-[0_12px_30px_rgba(74,222,128,0.25)]"
                              : "border-border bg-card hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(12,31,17,0.12)] dark:hover:shadow-[0_12px_30px_rgba(74,222,128,0.15)]"
                          }`}
                        >
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_30%_20%,rgba(88,194,41,0.12),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(199,223,103,0.18),transparent_35%)]" />
                          <div className="relative flex flex-col items-start gap-3 p-4 lg:p-5">
                            <div className="w-full flex justify-between items-center">
                              <Image
                                src={item.image}
                                width={72}
                                height={72}
                                className="w-16 lg:w-20 h-auto drop-shadow"
                                alt="image"
                              />
                              <span className="text-xs font-semibold text-primary bg-primary-light rounded-full px-3 py-1">
                                {item.emisi} kg/km
                              </span>
                            </div>
                            <p className="text-lg lg:text-xl font-semibold text-foreground">
                              {item.name}
                            </p>
                            <p className="text-xs text-muted-text">
                              Klik untuk pakai emisi ini.
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-card rounded-2xl shadow-[0_20px_60px_rgba(10,60,20,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)] p-5 lg:p-7 space-y-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-xl lg:text-2xl font-semibold text-foreground">
                        Jarak Tempuh
                      </h2>
                      <p className="text-sm text-muted-text">
                        Masukkan jarak tempuh hari ini.
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold">
                      Input km
                    </span>
                  </div>

                  <div className="flex flex-col gap-4 items-stretch">
                    <div className="relative text-foreground">
                      <input
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        type="number"
                        min={0}
                        placeholder="contoh: 12"
                        className="w-full text-base lg:text-lg border border-border focus:border-primary focus:ring-4 focus:ring-primary/15 rounded-xl px-4 py-3 outline-none transition-all bg-input text-foreground"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-primary bg-primary-light rounded-full px-3 py-1">
                        Km
                      </span>
                    </div>
                    <div className="bg-primary text-white rounded-xl p-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-white/70">
                          Status
                        </p>
                        <p className="text-base font-semibold">
                          {isReadyToCalculate
                            ? "Siap dihitung"
                            : "Lengkapi dulu"}
                        </p>
                      </div>
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold ${
                          isReadyToCalculate
                            ? "bg-white text-primary"
                            : "bg-white/15 text-white"
                        }`}
                      >
                        {isReadyToCalculate ? "✔" : "..."}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {guideSteps.map((step, idx) => (
                      <div
                        key={step.title}
                        className="flex items-start gap-3 bg-primary-light border border-border rounded-xl px-4 py-3"
                      >
                        <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {step.title}
                          </p>
                          <p className="text-xs text-muted-text">
                            {step.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4 w-full">
                <div className="bg-card rounded-2xl shadow-[0_18px_50px_rgba(10,60,20,0.12)] dark:shadow-[0_18px_50px_rgba(0,0,0,0.3)] p-5 lg:p-7 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-primary">
                        Ringkasan
                      </p>
                      <h3 className="text-xl font-semibold text-foreground">
                        Pilihanmu
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold">
                      Live preview
                    </span>
                  </div>
                  <div className="space-y-3 text-sm text-muted-text">
                    <div className="flex items-center justify-between">
                      <span>Transportasi</span>
                      <span className="font-semibold text-foreground">
                        {checkedTransport
                          ? transportasiData.find(
                              (t) => t.id === checkedTransport
                            )?.name
                          : "Belum dipilih"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Bahan bakar</span>
                      <span className="font-semibold text-foreground">
                        {checkedEmisi
                          ? filteredEmisiData[0]?.emisi.find(
                              (e: any) => e.id === checkedEmisi
                            )?.name
                          : "Belum dipilih"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Jarak</span>
                      <span className="font-semibold text-foreground">
                        {distance ? `${distance} km` : "Belum diisi"}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-primary">
                        Estimasi
                      </p>
                      <p className="text-3xl lg:text-4xl font-bold text-primary">
                        {formattedTotal}
                      </p>
                      <p className="text-xs text-muted-text">
                        dihitung dari emisi per km × jarak
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={handleTotalEmisi}
                        className="bg-primary text-white text-sm lg:text-base font-semibold rounded-xl px-5 py-3 transition-all hover:shadow-[0_12px_30px_rgba(15,138,59,0.25)] dark:hover:shadow-[0_12px_30px_rgba(74,222,128,0.3)] hover:-translate-y-0.5 border border-primary"
                      >
                        Hitung Sekarang
                      </button>
                      <button
                        onClick={() => {
                          setCheckedTransport(0);
                          setCheckedEmisi(0);
                          setFilteredEmisiData([]);
                          setDistance("");
                          setEmisiValue("");
                          setTotal(0);
                        }}
                        className="bg-card text-primary text-sm font-semibold rounded-xl px-5 py-3 border border-border hover:border-primary transition-all"
                      >
                        Reset Input
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-foreground/5 dark:bg-card text-foreground rounded-2xl p-5 lg:p-7 space-y-4 border border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Tips cepat</h3>
                    <span className="text-xs px-3 py-1 rounded-full bg-card/50 dark:bg-foreground/10 border border-border">
                      Baca ±20 detik
                    </span>
                  </div>
                  <ul className="space-y-3 text-sm text-muted-text list-disc list-inside">
                    <li>
                      Gunakan jarak aktual harian untuk hasil paling relevan.
                    </li>
                    <li>
                      Bandingkan bahan bakar berbeda untuk melihat dampak
                      instan.
                    </li>
                    <li>
                      Simpan hasil dengan screenshot untuk jejak mingguan.
                    </li>
                    <li>
                      Coba transportasi listrik untuk menurunkan angka CO₂e.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
