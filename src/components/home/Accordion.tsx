/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react'
import { HomeAccordion } from '@/app/data/Accordion'
import Image from 'next/image';
import accordion from '../../../public/image/home/accordion.webp'

export default function Accordion() {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index: any) => {
      setActiveIndex(activeIndex === index ? null : index);
    };

  return (
    <div className='font-poppins flex flex-col items-center lg:pb-28 pb-20 lg:px-0 px-6'>
      <div className='flex lg:flex-row flex-col-reverse lg:items-start items-center justify-center lg:gap-20 gap-10' data-aos-duration="800">
        <div className='w-82.5 lg:w-165'>
          <div className="flex mb-8 flex-col gap-4" data-aos="fade-right" data-aos-duration="800">
              <h1 className='text-primary font-semibold lg:text-[26px] text-[24px]'>5 Dampak Baik Mengurangi Emisi Karbon Kamu untuk Dunia yang Lebih Baik</h1>
              <p className='lg:text-[14px] text-[12px] font-medium text-justify'>Mengurangi emisi karbon memberikan dampak positif bagi dunia, mulai dari udara yang lebih bersih dan sehat, iklim yang lebih stabil, hingga alam yang lebih terlindungi dari kerusakan. Selain itu, gaya hidup rendah karbon juga mendorong pola hidup yang lebih sehat, seperti konsumsi makanan nabati dan penggunaan transportasi ramah lingkungan.</p>
          </div>
          {HomeAccordion.map((item, i) => (
            <div key={i} className='mt-5' data-aos="fade-up" data-aos-duration="700" data-aos-delay="200">
              <div className={`bg-card hover:bg-primary-light rounded-2xl overflow-hidden transition-all duration-700 block mx-auto ${activeIndex === i ? 'max-h-125' : 'lg:max-h-16.25 max-h-15'} ${activeIndex !== null ? 'shadow-lg' : ''}`}>
                <div 
                  className='flex justify-between items-center px-6 py-4 cursor-pointer font-poppins transition-all duration-500 hover:bg-primary-light hover:text-purple focus:text-purple' 
                  onClick={() => handleToggle(i)} 
                >
                  <h1 className='text-lg font-semibold transition-all duration-500 lg:text-[18px] text-[16px] lg:w-full w-62.5'>{item.title}</h1>
                  <i className={`bx ${activeIndex === i ? 'bx-chevron-up' : 'bx-chevron-up rotate-180'} text-3xl transition-transform duration-500 font-poppins1 text-[33px]`}></i>
                </div>
                <div className={`p-6 transition-opacity duration-500 ${activeIndex === i ? 'opacity-100' : 'opacity-0'}`}>
                  <p className='lg:w-150 font-poppins2 lg:text-[14px] text-[12px] text-justify'>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div data-aos="fade-up" data-aos-duration="900">
          <Image src={accordion} width={500} height={500} alt='solution' className='lg:w-105 w-full h-auto rounded-2xl transition-transform duration-500 hover:scale-105'/>
        </div>
      </div>
    </div>
  )
}
