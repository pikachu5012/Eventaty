"use client";

import React from "react";
import { useRouter } from "@/navigation";
import CircularGallery from "@/components/CircularGallery/CircularGallery";
import { ICategory } from "@/types/category";

import { useLocale } from "next-intl";
import { tStr } from "@/lib/translateHelper";

const CATEGORY_IMAGES: Record<string, string> = {
  "music": "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80",
  "sports": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
  "technology": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  "food & drink": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
  "art": "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80",
  "business": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
};

export default function CategoryGallery({ categories }: { categories: ICategory[] }) {
  const router = useRouter();
  const locale = useLocale();

  const handleItemClick = (text: string = "") => {
    const category = encodeURIComponent(text);
    router.push(`/events?category=${category}`);
  };

  const galleryItems = categories.map((cat) => ({
    image: CATEGORY_IMAGES[cat.name.toLowerCase()] || "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80",
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
