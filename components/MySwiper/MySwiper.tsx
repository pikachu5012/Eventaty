"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";

interface MySwiperProps {
  imagesList: string[];
  eventTitle?: string[];
  eventDate?: string[];
  eventVenue?: string[];
}

export default function MySwiper({ imagesList, eventTitle, eventDate, eventVenue }: MySwiperProps) {
  if (!imagesList || imagesList.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p>No images to display</p>
      </div>
    );
  }

  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={imagesList.length > 1}
      className="w-full h-full"
    >
      {imagesList.map((img, index) => (
        <SwiperSlide key={index}>
            <div className="relative w-full h-full bg-gray-200">
              {img ? (
                <Image
                  src={img}
                  alt={`slide-${index}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={index === 0}
                  unoptimized={true}
                  onError={(e) => {
                    console.error(`Failed to load image: ${img}`);
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <p>Image not available</p>
                </div>
              )}
            </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
