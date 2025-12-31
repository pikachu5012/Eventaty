import { Input } from "@/components/ui/input";
import { IEventFiltersProps } from "@/interfaces/interfaces";
import { ICategory } from "@/types/category";
import axios from "axios";
import { useEffect, useState } from "react";

export default function EventFilters({
  selectedCategory,
  setSelectedCategory,
  location,
  setLocation,
  date,
  setDate,
  onClear,
}: IEventFiltersProps) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg text-gray-900">Filters</h3>
        <button
          onClick={onClear}
          className="text-xs text-[#d4af37] hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Category Section */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Category</h4>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`text-left px-4 py-3 rounded-lg text-sm transition-colors ${
              selectedCategory === "All"
                ? "bg-[#d4af37] text-white shadow-md"
                : "bg-[#f8f5f2] text-gray-600 hover:bg-gray-100"
            }`}
          >
            All
          </button>
          {categories.map((category: ICategory) => (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category.name)}
              className={`text-left px-4 py-3 rounded-lg text-sm transition-colors ${
                selectedCategory === category.name
                  ? "bg-[#d4af37] text-white shadow-md"
                  : "bg-[#f8f5f2] text-gray-600 hover:bg-gray-100"
              }`}
            >
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Location Section */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Location</h4>
        <Input
          placeholder="Search location..."
          value={location}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLocation(e.target.value)
          }
          className="bg-white border-gray-200 focus:ring-[#d4af37] focus:border-[#d4af37]"
        />
      </div>

      {/* Date Section */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Date</h4>
        <Input
          type="date"
          value={date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDate(e.target.value)
          }
          className="bg-white border-gray-200 focus:ring-[#d4af37] focus:border-[#d4af37]"
        />
      </div>
    </div>
  );
}
