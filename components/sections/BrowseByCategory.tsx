import { getTranslations } from "next-intl/server";
import CategoryButton from "@/components/CategoryButton";
import axios from "axios";
import { ICategory } from "@/types/category";

import { mockCategories } from "@/lib/mockData";

export default async function BrowseByCategory() {
  const t = await getTranslations('HomePage');
  let categories: ICategory[] = mockCategories;

  return (
    <section className="bg-navFooter container-fluid">
      <div className="container mx-auto py-10">
        <div className="text-center text-5xl my-10 text-white ">
          {t('browseByCategory')}
        </div>
        <div className="flex py-4 gap-4 flex-wrap justify-between">
          {categories.map((category) => (
            <CategoryButton key={category._id} title={category.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
