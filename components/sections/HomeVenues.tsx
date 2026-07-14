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
    <section className="container-fluid">
      <div className="container mx-auto py-10">
        <div className="text-center text-5xl my-10 ">{t('venues')}</div>
        <div className="flex py-4 gap-4 flex-wrap justify-between">
          {displayedVenues.map((venue) => (
            <HomeVenuesCard key={venue._id} venue={venue} />
          ))}
        </div>
        <Link href="/venues">
          <Button className="mx-auto my-10 py-7 flex cursor-pointer">
            <p className="flex font-normal items-center gap-2 p-6 text-secondary">
              {t('exploreVenues')} <ArrowRight />
            </p>
          </Button>
        </Link>
      </div>
    </section>
  );
}
