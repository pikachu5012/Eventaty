import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HomeVenuesCard from "../HomeVenuesCard";
import { Link } from "@/navigation";
import axios from "axios";
import { IVenue } from "@/types/venue";

export default async function HomeVenues() {
  const t = await getTranslations('HomePage');
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  let venues: IVenue[] = [];
  try {
    const response = await axios.get(`${APP_URL}/api/venues`, {
      headers: { "Cache-Control": "no-cache" },
    });
    const data = response.data;
    venues = Array.isArray(data)
      ? data
      : data?.data?.venues || data?.venues || data?.data || [];
  } catch (error) {
    console.error("Error fetching venues:", error);
  }
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
