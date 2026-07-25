"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EventSlide from "../EventsSlide";
import { mockEvents } from "@/lib/mockData";

export default function HomeSlider() {
  const featuredEvents = mockEvents.filter((e) => e.featured === true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const handleNext = () => {
    if (featuredEvents.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % featuredEvents.length);
  };

  const handlePrev = () => {
    if (featuredEvents.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const len = featuredEvents.length;
    if (len === 0) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % len);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredEvents.length]);

  if (featuredEvents.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        No featured events marked.
      </div>
    );
  }

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

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="relative w-full pt-2 pb-4 overflow-hidden group touch-pan-y">
      {/* Slider view window */}
      <div className="relative h-[65vh] md:h-[80vh] min-h-[440px] md:min-h-[540px] max-h-[750px] w-full cursor-grab active:cursor-grabbing">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                handleNext();
              } else if (swipe > swipeConfidenceThreshold) {
                handlePrev();
              }
            }}
            transition={{
              x: { type: "spring", stiffness: 200, damping: 25 },
              opacity: { duration: 0.25 },
            }}
            className="w-full h-full"
          >
            <EventSlide event={featuredEvents[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Indicator */}
      {featuredEvents.length > 1 && (
        <div className="flex justify-center gap-2 mt-4 md:mt-6 mb-1 z-20">
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
