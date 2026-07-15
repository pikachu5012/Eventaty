"use client";

import { useTranslations } from "next-intl";
import { ICategory } from "@/types/category";
import { mockCategories } from "@/lib/mockData";
import dynamic from "next/dynamic";

const CategoryGallery = dynamic(() => import("@/components/CategoryGallery"), {
  ssr: false,
});

export default function BrowseByCategory() {
  const t = useTranslations('HomePage');
  let categories: ICategory[] = mockCategories;

  return (
    <section className="bg-background w-full">
      <div className="max-w-[1440px] mx-auto px-4 md:px-0 py-10">
        <div className="text-center text-5xl my-10 text-foreground font-black tracking-tight">
          {t('browseByCategory')}
        </div>
        <div className="py-4">
          <CategoryGallery categories={categories} />
        </div>
      </div>
    </section>
  );
}
