import CategoryButton from "@/components/CategoryButton";
import axios from "axios";
import { ICategory } from "@/types/category";

export default async function BrowseByCategory() {
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  let categories: ICategory[] = [];
  try {
    const response = await axios.get(`${APP_URL}/api/categories`, {
      headers: { "Cache-Control": "no-cache" },
    });
    const data = response.data;
    categories = Array.isArray(data)
      ? data
      : data?.data?.categories || data?.categories || data?.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  return (
    <section className="bg-navFooter container-fluid">
      <div className="container mx-auto py-10">
        <div className="text-center text-5xl my-10 text-white ">
          Browse By Category
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
