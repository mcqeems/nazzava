/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react'
import bis from '../../../public/image/emisi/bis.png';
import car from '../../../public/image/emisi/car.png';
import motorcycle from '../../../public/image/emisi/motorcycle.png';
import eletric from '../../../public/image/emisi/eletric.png';
import gasoline from '../../../public/image/emisi/gasoline.png';
import solar from '../../../public/image/emisi/solar.png';
import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { ButtonBack } from '@/components/ui/button-back';

const transportasiData = [
    {
        id: 1,
        name: "Mobil",
        image: car,
        emisi: [
            {
                id: 1,
                name: "Listrik",
                emisi: 0.050,
                image: eletric
            },
            {
                id: 2,
                name: "Bensin",
                emisi: 0.192,
                image: gasoline
            },
            {
                id: 3,
                name: "Solar",
                emisi: 0.171,
                image: solar
            },
        ]
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
                image: eletric
            },
            {
                id: 2,
                name: "Bensin",
                emisi: 0.072,
                image: gasoline
            },
        ]
    },
    {
        id: 3,
        name: "Bis",
        image: bis,
        emisi: [
            {
                id: 1,
                name: "Listrik",
                emisi: 0.130,
                image: eletric
            },
            {
                id: 2,
                name: "Solar",
                emisi: 0.822,
                image: solar
            },
        ]
    },
];

export default function Page() {
    const [total, setTotal] = useState(0);
    const [filteredEmisiData, setFilteredEmisiData] = useState<any[]>([]);
    const [distance, setDistance] = useState('');
    const [emisiValue, setEmisiValue] = useState('');
    const [checkedTransport, setCheckedTransport] = useState(0);
    const [checkedEmisi, setCheckedEmisi] = useState(0);

    const handleChooseTransport = (id: number) => {
        const filteredDataTransport = transportasiData.filter((item) => {
            const data = id ? item.id == id : true;
            return data;
        });

        setCheckedTransport(id);
        setFilteredEmisiData(filteredDataTransport);
    }

    const handleEmisi = (emisi: string, id: number) => {
        setEmisiValue(emisi);
        setCheckedEmisi(id);
    }

    const handleTotalEmisi = async() => {
        if (checkedTransport === 0) {
            Swal.fire({
                title: "Harap Masukkan Transportasi",
                icon: 'error',
                confirmButtonText: "Oke",
                confirmButtonColor: 'red',
            });
            return;
        }

        if (checkedEmisi === 0) {
            Swal.fire({
                title: "Harap Masukkan Jenis Emisi",
                icon: 'error',
                confirmButtonText: "Oke",
                confirmButtonColor: 'red',
            });
            return;
        }

        if (distance === "") {
            Swal.fire({
                title: "Harap Masukkan Jarak Tempuh",
                icon: 'error',
                confirmButtonText: "Oke",
                confirmButtonColor: 'red',
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
            showConfirmButton: false
        });

        await new Promise(resolve => setTimeout(resolve, 3000));
        Swal.fire({
            title: "Hitungan Berhasil",
            icon: 'success',
            confirmButtonText: "Oke",
            confirmButtonColor: 'green',
        });

        setTotal(emisiTotal);
    }

  return (
    <div className="" data-aos="fade-up" data-aos-duration="900">
      <ButtonBack/>
        <div className='flex flex-col justify-center items-center font-poppins min-h-screen pb-20 lg:pt-30 pt-24 lg:px-40 px-6 container mx-auto'>
          <h1 className='lg:text-[34px] text-[20px] lg:text-start text-center font-semibold text-[#00AD03]'>Ayo Hitung Emisi Karbon Kamu Sekarang!</h1>
          <div className="bg-[linear-gradient(150deg,#58C229_30%,#C7DF67_100%)] w-full min-h-[70vh] rounded-lg mt-10 text-white py-12">
            <div className="flex flex-col justify-center items-center gap-8">
                <h1 className='lg:text-[30px] text-[20px] font-semibold'>Jenis Transportasi</h1>
                <div className="flex justify-center flex-wrap items-center lg:gap-10 gap-4">
                    {transportasiData.map((item) => (
                        <div onClick={() => handleChooseTransport(item.id)} className={`bg-white lg:w-auto w-20 px-6 py-8 rounded-lg flex flex-col justify-center items-center gap-6 duration-400 hover:scale-95 cursor-pointer hover:opacity-80 ${checkedTransport == item.id ? 'opacity-80 scale-95' : ''}`} key={item.id}>
                            <Image src={item.image} width={160} height={160} className="lg:w-40 w-12.5 h-auto" alt='image' />
                            <p className='text-[#00AD03] font-semibold lg:text-[24px] text-[14px]'>{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={`flex flex-col justify-center items-center gap-8 pt-12 ${filteredEmisiData.length > 0 ? 'flex' : 'show-none'}`}>
                <h1 className='lg:text-[30px] text-[20px] font-semibold'>Jenis Bahan Bakar</h1>
                <div className="flex justify-center items-center lg:gap-10 gap-4">
                    {filteredEmisiData[0]?.emisi.map((item: any) => (
                        <div onClick={() => handleEmisi(item.emisi, item.id)} className={`bg-white lg:w-auto w-20 lg:px-6 px-2 py-8 rounded-lg flex flex-col justify-center items-center gap-6 duration-400 hover:scale-95 cursor-pointer hover:opacity-80 ${checkedEmisi == item.id ? 'opacity-80 scale-95' : ''}`} key={item.id}>
                            <Image src={item.image} width={160} height={160} className="lg:w-40 w-12.5 h-auto" alt='image' />
                            <p className='text-[#00AD03] font-semibold lg:text-[24px] text-[14px]'>{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-4 pt-12">
                <h1 className='lg:text-[26px] text-[18px] font-semibold'>Jarak Tempuh (Km)</h1>
                <input value={distance} onChange={(e) => setDistance(e.target.value)} type="number" className='lg:text-[16px] lg:w-75 w-50 text-[14px] border-4 border-white rounded-xl px-3 outline-none py-2' />
            </div>
          </div>
          <button onClick={handleTotalEmisi} className='bg-[#548D2E] text-white outline-none lg:text-[24px] text-[16px] font-medium rounded-lg px-16 py-2 duration-200 border-2 border-[#548D2E] hover:bg-transparent hover:text-[#548D2E] cursor-pointer mt-12'>Hitung</button>
          <div className="flex flex-col gap-4 mt-12 w-full">
            <h1 className='text-[#00AD03] font-medium lg:text-[28px] text-[18px]'>Total</h1>
            <input type="text" value={`${total} kg CO₂e`} disabled className='lg:text-[16px] text-[14px] border-4 border-[#00AD03] rounded-xl px-3 outline-none py-3' />
          </div>
        </div>
    </div>
  )
}
