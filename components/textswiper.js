import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
// import images from "./../data/images.json";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// import { useState, useEffect } from 'react';
// export default function Myswiper({ data }) {

export const slide_img = [
  {
    image: '/swiper/adultbook.jpg',
    title: 'کتاب های بزرگسال',
  },
  {
    image: '/swiper/audiobook.jpg',
    title: 'کتاب های صوتی',
  },
  {
    image: '/swiper/childbook.jpg',
    title: 'کتاب های کودک',
  },
  {
    image: '/swiper/scientificbook.jpg',
    title: 'کتابهای علمی',
  },
  {
    image: '/swiper/childbook.jpg',
    title: 'کتاب های کودک',
  },
  {
    image: '/swiper/scientificbook.jpg',
    title: 'کتابهای علمی',
  },
];

export default function Myswipernotitle() {
  // console.log("6666666666666666666666666666666666666666", data);
  // console.log("6666666666666666666666666666666666666666", data[0].image);
  return (
    <Swiper
      className="flex bg-transparent  h-auto mt-2  rounded-xl"
      // install Swiper modules
      // install Swiper modules
      // spaceBetween={0}
      centeredSlides={false}
      autoplay={{
        delay: 6500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        type: 'progressbar',
        nextEl: '.next',
        prevEl: '.prev',
      }}
      navigation={{ navigation: true }}
      style={{
        '--swiper-navigation-color': 'transparent',
        '--swiper-pagination-color': 'yellow',
        '--swiper-background-color': 'red',
      }}
      // fadeEffect={true}
      // effect="fade"

      slidesPerView={2}
      spaceBetween={0}
      breakpoints={{
        320: { slidesPerView: 1, spaceBetween: 20 },
        480: { slidesPerView: 1, spaceBetween: 20 },
        640: { slidesPerView: 1, spaceBetween: 30 },
        1008: { slidesPerView: 1, spaceBetween: 40 },
      }}
      modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y, EffectFade]}

      // pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
    >
      <Swiper
        effect={'coverflow'}
        autoplay={{
          delay: 6500,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          // slideShadows: false,
        }}
        pagination={true}
        className="mySwiper   "
      >
        <div
          className="text-center  text-sm   font-bold    
               mt-0.5   "
        >
          {/* using Array */}
          {slide_img.map((image, i) => {
            return (
              <SwiperSlide key={i}>
                <Image
                  className=" rounded-lg  text-center   cursor-pointer
                     hover:brightness-75 transition-all  
                      shadow-lg shadow-slate-600 
                     "
                  width={250}
                  height={180}
                  src={image.image}
                  alt=""
                  sizes="(max-width: 450px) 100vw,
                     (max-width: 1200px) 50vw,33vw"
                  style={{ width: '100%', height: '100%' }} //The point is right there!
                  //OR className='w-100 h-100'
                />
                {/* <div className="text-sm font-bold px-2  text-center">
                    {image.title}
                  </div> */}
                {/* <img src={image} alt="" /> */}
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </Swiper>
  );
}
