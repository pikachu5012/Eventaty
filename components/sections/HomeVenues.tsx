import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HomeVenuesCard from "../HomeVenuesCard";
import { Link } from "@/navigation";
import axios from "axios";
import { IVenue } from "@/types/venue";

import { mockVenues } from "@/lib/mockData";

export default async function HomeVenues() {
  const t = await getTranslations('HomePage');
  let venues: IVenue[] = mockVenues;
  const displayedVenues = venues.slice(0, 4);
  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-0 py-10">
        <div className="text-center text-5xl my-10 ">{t('venues')}</div>
        <div className="flex py-4 gap-4 flex-wrap justify-between">
          {displayedVenues.map((venue) => (
            <HomeVenuesCard key={venue._id} venue={venue} />
          ))}
        </div>
        <div className="flex justify-center my-10">
          <Link href="/venues">
            <Button className="group bg-[#111111] dark:bg-transparent hover:bg-[#6D28D9] dark:hover:bg-[#6D28D9] text-white border border-[#111111] dark:border-white/20 hover:border-[#6D28D9] dark:hover:border-[#6D28D9] font-medium h-14 px-8 rounded-xl shadow-md transition-all duration-150 ease-in-out cursor-pointer flex items-center gap-2">
              {t('exploreVenues')}
              <ArrowRight className="w-5 h-5 transition-transform duration-150 ease-in-out group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Button>
          </Link>
        </div>
    </section>
  );
}
