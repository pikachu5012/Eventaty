"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { EventItem } from "@/types/event";
import EventSlide from "@/components/EventsSlide";

type EProps = {
  events: EventItem[];
};

export default function MySwiper({ events }: EProps) {
  if (!events?.length) return null;

  return (
    <div className="w-full px-0 md:px-4 [&_.swiper-pagination-bullet]:bg-gray-300 [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-300 [&_.swiper-pagination-bullet-active]:!bg-[#FFC107] [&_.swiper-pagination-bullet-active]:!w-6 [&_.swiper-pagination-bullet-active]:!rounded-[4px] [&_.swiper-pagination]:!bottom-0">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        spaceBetween={20}
        slidesPerView={1}
        loop={events.length > 1}
        className="pb-12"
      >
        {events.map((event) => (
          <SwiperSlide key={event.id || (event as any)._id}>
            <EventSlide event={event} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
