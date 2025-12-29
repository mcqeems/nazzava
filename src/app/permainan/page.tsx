"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import smartBin from '../../../public/image/game/smart-bin.webp'
import monsterJunk from '../../../public/image/game/monster-junk.webp'
import { ButtonBack } from '@/components/ui/button-back'

export default function Page() {
  return (
    <div className='bg-background font-poppins relative w-full min-h-screen flex flex-col justify-center items-center gap-8'>
      <ButtonBack/>
       <div className="flex flex-col justify-center items-center gap-10 pb-20 lg:px-0 px-6" data-aos="fade-up" data-aos-duration="900">
            <div className="relative border-2 border-white rounded-[26px]">
                <Image src={smartBin.src} width={1200} height={600} alt='image' className='lg:w-300 lg:rounded-none rounded-[26px] lg:h-auto w-full h-[40vh] bg-cover object-cover'/>
                <div className="flex justify-between items-center absolute bottom-[0.2px] lg:px-10 px-6 h-[12vh] w-full rounded-[26px] bg-white/20 backdrop-blur-md">
                    <p className="text-white font-semibold lg:text-[28px] text-[20px]">Smart Bin</p>
                    <Link href="/kenali-sampah">
                        <div className="p-0.5 rounded-lg bg-[linear-gradient(150deg,#58C229_30%,#C7DF67_100%)] inline-block cursor-pointer">
                          <button className="bg-[linear-gradient(150deg,#58C229_30%,#C7DF67_100%)] text-white font-medium lg:text-[18px] text-[12px] cursor-pointer lg:px-10 px-6 py-2 rounded-lg w-full h-full">
                            Mainkan
                          </button>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="relative border-2 border-white rounded-[26px]">
                <Image src={monsterJunk.src} width={1200} height={600} alt='image' className='lg:w-300 lg:rounded-none rounded-[26px] lg:h-auto w-full h-[40vh] bg-cover object-cover'/>
                <div className="flex justify-between items-center absolute bottom-[0.2px] lg:px-10 px-6 h-[12vh] w-full rounded-[26px] bg-white/20 backdrop-blur-md">
                    <p className="text-white font-semibold lg:text-[28px] text-[20px]">Monster Junk</p>
                    <Link href="/monster-junk">
                      <div className="p-0.5 rounded-lg bg-[linear-gradient(150deg,#58C229_30%,#C7DF67_100%)] inline-block cursor-pointer">
                        <button className="bg-[linear-gradient(150deg,#58C229_30%,#C7DF67_100%)] text-white font-medium lg:text-[18px] text-[12px] cursor-pointer lg:px-10 px-6 py-2 rounded-lg w-full h-full">
                          Mainkan
                        </button>
                      </div>
                    </Link>
                </div>
            </div>
       </div>
    </div>
  )
}
