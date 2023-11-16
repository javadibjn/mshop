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
import { useEffect, useState } from 'react';

// import { useState, useEffect } from 'react';
// export default function Myswiper({ data }) {

export const slide_img = [
  {
    image: '/article/img0.jpg',
    title: 'کتاب های بزرگسال',
  },
  {
    image: '/article/img1.jpg',
    title: 'کتاب های بزرگسال',
  },
  {
    image: '/article/img2.jpg',
    title: 'کتاب های بزرگسال',
  },
  {
    image: '/article/img3.jpg',
    title: 'کتاب های صوتی',
  },
  {
    image: '/article/img5.jpg',
    title: 'کتابهای علمی',
  },
  {
    image: '/article/img6.jpg',
    title: 'کتاب های کودک',
  },
  {
    image: '/article/img17.jpg',
    title: 'کتابهای علمی',
  },
  {
    image: '/article/img8.jpg',
    title: 'کتابهای علمی',
  },
  {
    image: '/article/img9.jpg',
    title: 'کتابهای علمی',
  },
  {
    image: '/article/img10.jpg',
    title: 'کتابهای علمی',
  },
];

export default function Myswipernotitle() {
  const [randomArray, setRandomArray] = useState([]);

  useEffect(() => {
    const randomizeArray = [...slide_img].sort(() => 0.5 - Math.random());
    setRandomArray(randomizeArray.slice(0, 10));
  }, []);
  return (
    <Swiper
      className="flex bg-white   "
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
      {/* using Array */}
      {randomArray.map((image, i) => {
        return (
          <SwiperSlide key={i}>
            <Image
              className=" rounded-xl  text-center   cursor-pointer
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
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
