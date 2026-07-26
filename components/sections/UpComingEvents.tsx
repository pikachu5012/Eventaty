import { getTranslations } from "next-intl/server";
import { IEvent } from "@/types/event";
import CardComponent from "@/components/CardComponent";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@/navigation";

import { mockEvents } from "@/lib/mockData";

export default async function UpComingEvents() {
  const t = await getTranslations('HomePage');
  const events: IEvent[] = mockEvents;

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
    <section className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
      <h2 className="text-center text-3xl md:text-4xl my-10 font-bold">
        {t('upcomingEvents')}
      </h2>
      <div className="flex py-4 gap-4 flex-wrap justify-center">
        {displayedEvents.length > 0 ? (
          displayedEvents.map((event) => (
            <div key={event._id} className="w-full sm:w-2/5 lg:w-[30%]">
              <CardComponent data={event} isEvent={true} />
            </div>
          ))
        ) : (
          <div className="text-primary py-10">{t('noUpcomingEvents')}</div>
        )}
      </div>
      <div className="flex justify-center my-10">
        <Link href="/events">
          <Button className="group bg-[#111111] dark:bg-transparent hover:bg-[#6D28D9] dark:hover:bg-[#6D28D9] text-white border border-[#111111] dark:border-white/20 hover:border-[#6D28D9] dark:hover:border-[#6D28D9] font-medium h-14 px-8 rounded-xl shadow-md transition-all duration-150 ease-in-out cursor-pointer flex items-center gap-2">
            {t('exploreEvents')}
            <ArrowRight className="w-5 h-5 transition-transform duration-150 ease-in-out group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
