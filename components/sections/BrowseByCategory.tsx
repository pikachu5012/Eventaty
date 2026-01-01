import { Button } from "@/components/ui/button";
import { Hammer, Headphones, Sparkles, Volleyball } from "lucide-react";
import CategoryButton from "@/components/CategoryButton";

export default function BrowseByCategory() {
  return (
    <section className="bg-primary container-fluid">
      <div className="container mx-auto py-10">
        <div className="text-center text-5xl my-10 text-white ">
          Browse By Category
        </div>
        <div className="flex py-4 gap-4 flex-wrap justify-between">
          <CategoryButton
            title="Concert"
            icon={<Headphones className="rounded-circle w-10! h-10!" />}
          />
          <CategoryButton
            title="Conference"
            icon={<Sparkles className="rounded-circle w-10! h-10!" />}
          />
          <CategoryButton
            title="Workshop"
            icon={<Hammer className="rounded-circle w-10! h-10!" />}
          />
          <CategoryButton
            title="Sports"
            icon={<Volleyball className="rounded-circle w-10! h-10!" />}
          />
        </div>
      </div>
    </section>
  );
}
