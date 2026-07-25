"use client";

import React from "react";
import { useRouter } from "@/navigation";
import CircularGallery from "@/components/CircularGallery/CircularGallery";
import { ICategory } from "@/types/category";

import { useLocale } from "next-intl";
import { tStr } from "@/lib/translateHelper";

const CATEGORY_IMAGES: Record<string, string> = {
  "music": "/swipper1.png",
  "sports": "/swipper2.jpg",
  "technology": "/swipper3.jpg",
  "food & drink": "/ninja.png",
  "art": "/swipper1.png",
  "business": "/swipper2.jpg",
};

export default function CategoryGallery({ categories }: { categories: ICategory[] }) {
  const router = useRouter();
  const locale = useLocale();

  const handleItemClick = (text: string = "") => {
    const category = encodeURIComponent(text);
    router.push(`/events?category=${category}`);
  };

  const galleryItems = categories.map((cat) => ({
    image: CATEGORY_IMAGES[cat.name.toLowerCase()] || "/swipper1.png",
    text: tStr(cat.name, locale),
  }));

  return (
    <div className="w-full h-[500px] relative overflow-hidden bg-transparent">
      <CircularGallery
        items={galleryItems}
        bend={3}
        textColor="#7C3AED"
        borderRadius={0.05}
        font="bold 28px Outfit, sans-serif"
        scrollSpeed={1.5}
        scrollEase={0.08}
        onItemClick={handleItemClick}
      />
    </div>
  );
}
