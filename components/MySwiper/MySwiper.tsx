"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";

interface MySwiperProps {
  imagesList: string[];
}

export default function MySwiper({ imagesList }: MySwiperProps) {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop
      className="w-full h-full"
    >
      {imagesList.map((img, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full">
            <Image
              src={img}
              alt={`slide-${index}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
