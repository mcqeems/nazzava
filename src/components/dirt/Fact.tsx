'use client'
import Image from 'next/image'

export default function Fact() {
  return (
    <div className='flex flex-col items-center font-poppins min-h-screen mb-32 -mt-12 lg:px-0 px-6' id='fakta'>
      <h1 className="font-semibold lg:text-[32px] text-[24px] lg:text-start text-center" data-aos="fade-up" data-aos-duration="800">
        Tanah juga memiliki banyak {''}
        <span className="relative inline-block">
          fakta unik
          <span className="absolute left-0 bottom-px w-full lg:h-5 h-3.5 -z-10 bg-[#CE8686] rounded-full"></span>
        </span>
      </h1>
      <div className="flex lg:flex-row flex-col justify-center items-center gap-12 text-foreground">
        <div className="flex flex-col mt-16 justify-center items-center lg:gap-28 gap-50 lg:mr-0 mr-12">
          <div data-aos="fade-up" data-aos-duration="800">
            <div className="bg-cover relative hover:-translate-y-4 duration-500 object-cover w-[320px] lg:w-145 lg:h-45 h-25 flex justify-center items-center gap-6" style={{backgroundImage: `url('/image/dirt/comment.webp')`}}>
              <div className="lg:w-75 w-55 lg:mr-12 mr-2">
                <h1 className='font-medium lg:text-[18px] text-[12px]'>Lebih dari 95% makanan yang kita konsumsi berasal dari tanah yang sehat dan subur</h1>
                <p className='font-normal mt-2 lg:text-[16px] text-[10px]'>Source : greeners.co</p>
              </div>
              <Image width={200} height={200} className='absolute lg:w-50 w-25 -bottom-2 lg:-right-15 -right-10' src='/image/dirt/fact1.webp' alt='fact'/>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">            
            <div className="bg-cover relative hover:-translate-y-4 duration-500 object-cover w-[320px] lg:w-145 lg:h-45 h-25 flex justify-center items-center gap-6" style={{backgroundImage: `url('/image/dirt/comment.webp')`}}>
              <div className="lg:w-75 w-55 lg:mr-12 mr-2">
                <h1 className='font-medium lg:text-[20px] text-[12px]'>40% Tanah di Dunia Sudah Terdegradasi</h1>
                <p className='font-normal mt-2 lg:text-[16px] text-[10px]'>Source : forestdigest.com</p>
              </div>
              <Image width={220} height={220} className='absolute lg:w-65 w-35 lg:-bottom-11.5 -bottom-6 lg:-right-15 -right-10' src='/image/dirt/fact3.webp' alt='fact'/>
            </div>
          </div>
        </div>
        <div className='lg:ml-0 ml-12' data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">          
          <div className="bg-cover relative hover:-translate-y-4 duration-500 object-cover w-[320px] lg:w-145 lg:h-45 h-25 lg:mt-0 -mt-76 flex justify-center items-center gap-6" style={{backgroundImage: `url('/image/dirt/comment-reverse.webp')`}}>
            <Image width={200} height={200} className='absolute lg:w-45 w-25 bottom-2 lg:-left-10 -left-10px' src='/image/dirt/fact2.webp' alt='fact'/>
            <div className="lg:w-70 w-55 ml-12">
              <h1 className='font-medium lg:text-[18px] text-[12px]'>24 Miliar Ton Tanah Subur Hilang Setiap Tahun</h1>
              <p className='font-normal mt-2 lg:text-[16px] text-[10px]'>Source : satuplatform.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
