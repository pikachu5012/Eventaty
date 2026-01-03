"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { EventItem } from "@/types/event";
import EventSlide from "@/components/EventsSlide";


type EProps = {
  events: EventItem[];
}

export default function MySwiper({ events }: EProps) {
  if (!events?.length) return null;

  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={events.length > 1}
    >
      {events.map(event => (
        <SwiperSlide key={event.id || (event as any)._id}>
          <EventSlide event={event} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
