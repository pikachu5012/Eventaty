import { getTranslations } from "next-intl/server";
import axios from "axios";
import { IEvent } from "@/types/event";
import CardComponent from "@/components/CardComponent";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@/navigation";

import { mockEvents } from "@/lib/mockData";

export default async function UpComingEvents() {
  const t = await getTranslations('HomePage');
  let events: IEvent[] = mockEvents;

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
    <section className="container mx-auto">
      <div className="text-center text-5xl my-10 font-bold">
        {t('upcomingEvents')}
      </div>
      <div className="flex py-4 gap-4 flex-wrap justify-center">
        {displayedEvents.length > 0 ? (
          displayedEvents.map((event) => (
            <div key={event._id} className="w-3/4 md:w-2/5 lg:w-[30%]">
              <CardComponent data={event} isEvent={true} />
            </div>
          ))
        ) : (
          <div className="text-primary py-10">{t('noUpcomingEvents')}</div>
        )}
      </div>
      <Link href="/events">
        <Button className="mx-auto my-10 py-7 flex cursor-pointer">
          <p className="flex font-normal items-center gap-2 p-6 text-secondary">
            {t('exploreEvents')} <ArrowRight />
          </p>
        </Button>
      </Link>
    </section>
  );
}
