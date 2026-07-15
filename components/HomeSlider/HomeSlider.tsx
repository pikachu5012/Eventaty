"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import EventSlide from "../EventsSlide";
import { mockEvents } from "@/lib/mockData";

export default function HomeSlider() {
  const featuredEvents = mockEvents.filter((e) => e.featured === true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  if (featuredEvents.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        No featured events marked.
      </div>
    );
  }

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % featuredEvents.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "30%" : "-30%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "30%" : "-30%",
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full pt-10 pb-8 overflow-hidden group">
      {/* Slider view window */}
      <div className="relative min-h-[350px] md:min-h-[400px] w-full">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 200, damping: 25 },
              opacity: { duration: 0.25 },
            }}
            className="w-full h-full"
          >
            <EventSlide event={featuredEvents[currentIndex] as any} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {featuredEvents.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/25 dark:bg-zinc-800/40 backdrop-blur-xs border border-white/10 hover:bg-[#6D28D9] text-white rounded-full p-2.5 transition-all duration-200 cursor-pointer shadow-sm md:opacity-0 md:group-hover:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/25 dark:bg-zinc-800/40 backdrop-blur-xs border border-white/10 hover:bg-[#6D28D9] text-white rounded-full p-2.5 transition-all duration-200 cursor-pointer shadow-sm md:opacity-0 md:group-hover:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {featuredEvents.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {featuredEvents.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentIndex
                  ? "bg-eventaty-gold w-6"
                  : "bg-gray-400/40 dark:bg-white/20 hover:bg-gray-400/60 dark:hover:bg-white/40 w-2.5"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
