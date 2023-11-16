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
];

export default function Myswiper() {
  // console.log("6666666666666666666666666666666666666666", data);
  // console.log("6666666666666666666666666666666666666666", data[0].image);
  return (
    <Swiper
      className="flex bg-white bg-gradient-to-r from-indigo-100 rounded-md "
      // install Swiper modules
      // install Swiper modules
      // spaceBetween={0}
      centeredSlides={false}
      autoplay={{
        delay: 8500,
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

      slidesPerView={1}
      spaceBetween={10}
      breakpoints={{
        320: { slidesPerView: 2, spaceBetween: 20 },
        480: { slidesPerView: 2, spaceBetween: 20 },
        640: { slidesPerView: 3, spaceBetween: 30 },
        1008: { slidesPerView: 4, spaceBetween: 40 },
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
          delay: 1500,
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
        className="mySwiper  "
      >
        <div className="grid grid-rows-1 ">
          <div
            className="text-center  text-sm   font-bold row-span-2 col-span-2  
           h-32    mt-0.5   "
          >
            {/* using Array */}
            {slide_img.map((image, i) => {
              return (
                <SwiperSlide key={i}>
                  <Image
                    className="rounded-lg  text-center   cursor-pointer
                     hover:brightness-75 transition-all  max-h-32 min-h-32 
                      shadow-lg shadow-blue-300
                     "
                    width={250}
                    height={150}
                    src={image.image}
                    alt=""
                  />
                  <div className="text-sm font-bold px-2  text-center">
                    {image.title}
                  </div>
                  {/* <img src={image} alt="" /> */}
                </SwiperSlide>
              );
            })}
          </div>
        </div>
      </Swiper>
    </Swiper>
  );
}
