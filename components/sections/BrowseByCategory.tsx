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
  const categories: ICategory[] = mockCategories;

  return (
    <section className="bg-background w-full">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-10">
        <h2 className="text-center text-3xl md:text-4xl my-10 text-foreground font-bold tracking-tight">
          {t('browseByCategory')}
        </h2>
        <div className="py-4">
          <CategoryGallery categories={categories} />
        </div>
      </div>
    </section>
  );
}
