import { Input } from "@/components/ui/input";
import { ICategory } from "@/types/category";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

export interface IEventFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  location: string;
  setLocation: (location: string) => void;
  date: string;
  setDate: (date: string) => void;
  onClear: () => void;
}

export default function EventFilters({
  selectedCategory,
  setSelectedCategory,
  location,
  setLocation,
  date,
  setDate,
  onClear,
}: IEventFiltersProps) {
  const t = useTranslations('Events');
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
    <div className="w-full bg-card p-6 rounded-xl shadow-sm border border-secondary/30 flex flex-col gap-6 text-primary">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{t('filtersTitle')}</h3>
        <button
          onClick={onClear}
          className="text-xs text-secondary hover:underline"
        >
          {t('clearAll')}
        </button>
      </div>

      {/* Category Section */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">{t('categoryTitle')}</h4>

        {/* Mobile View: Select Dropdown */}
        <div className="md:hidden">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full bg-eventaty-cream border-secondary h-12 rounded-lg text-navFooter">
              <SelectValue placeholder={t('selectCategoryPlaceholder')} />
            </SelectTrigger>
            <SelectContent className="bg-card border-secondary/20 text-primary">
              <SelectItem value="All">{t('allCategories')}</SelectItem>
              {categories.map((category: ICategory) => (
                <SelectItem key={category._id} value={category.name}>
                  {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Desktop View: Button List */}
        <div className="hidden md:flex flex-col gap-2">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`text-left px-4 py-3 rounded-lg text-sm transition-colors ${selectedCategory === "All"
              ? "bg-eventaty-gold text-white shadow-md"
              : "bg-eventaty-cream text-gray-600 hover:bg-gray-100 dark:hover:bg-secondary"
              }`}
          >
            {t('all')}
          </button>
          {categories.map((category: ICategory) => (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category.name)}
              className={`text-left px-4 py-3 rounded-lg text-sm transition-colors ${selectedCategory === category.name
                ? "bg-eventaty-gold text-white shadow-md"
                : "bg-eventaty-cream text-gray-600 hover:bg-gray-100 dark:hover:bg-secondary"
                }`}
            >
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Location Section */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">{t('locationTitle')}</h4>
        <Input
          placeholder={t('locationPlaceholder')}
          value={location}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLocation(e.target.value)
          }
          className="bg-white border-gray-200 focus:ring-secondary focus:border-secondary text-black"
        />
      </div>

      {/* Date Section */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">{t('dateTitle')}</h4>
        <Input
          type="date"
          value={date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDate(e.target.value)
          }
          className="bg-white border-gray-200 focus:ring-secondary focus:border-secondary text-gray-700"
        />
      </div>
    </div>
  );
}
