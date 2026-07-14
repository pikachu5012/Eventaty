import { getTranslations } from "next-intl/server";
import axios from "axios";
import { IEvent } from "@/types/event";
import CardComponent from "@/components/CardComponent";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@/navigation";

export default async function UpComingEvents() {
  const t = await getTranslations('HomePage');
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  let events: IEvent[] = [];
  try {
    const response = await axios.get(`${APP_URL}/api/events`, {
      headers: { "Cache-Control": "no-cache" },
    });
    const data = response.data;
    events = Array.isArray(data)
      ? data
      : data?.data?.events || data?.events || data?.data || [];
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
  }

  const displayedEvents = events
    .filter(
      (event) => new Date(event.startDateTime) > new Date()
    )
    .sort(
      (a, b) =>
        new Date(a.startDateTime).getTime() -
        new Date(b.startDateTime).getTime()
    )
    .slice(0, 3);

  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-0 mt-12 mb-20">
      <h2 className="text-3xl md:text-[34px] font-bold text-[#111111] dark:text-white mb-6 md:mb-8 text-left">
        {t('upcomingEvents')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {displayedEvents.length > 0 ? (
          displayedEvents.map((event) => (
            <CardComponent key={event._id} data={event} isEvent={true} />
          ))
        ) : (
          <div className="col-span-full text-center text-primary py-10">
            {t('noUpcomingEvents')}
          </div>
        )}
      </div>
      <div className="mt-12 flex justify-center hidden">
        {/* Hiding the Explore Events button since it's not in the mockup, but keeping logic in case it's needed */}
        <Link href="/events">
          <Button className="py-7 flex cursor-pointer">
            <p className="flex font-normal items-center gap-2 p-6 text-secondary">
              {t('exploreEvents')} <ArrowRight />
            </p>
          </Button>
        </Link>
      </div>
    </section>
  );
}
