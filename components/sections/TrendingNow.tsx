import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/navigation";
import Image from "next/image";
import { mockEvents } from "@/lib/mockData";
import { tStr } from "@/lib/translateHelper";
import BorderGlow from "../BorderGlow/BorderGlow";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default async function TrendingNow() {
  const t = await getTranslations("HomePage");
  const locale = await getLocale();

  // Sort events by tickets sold ratio descending (popularity/bookings)
  const trendingEvents = [...mockEvents]
    .map(event => {
      const soldRatio = event.totalCapacity && event.availableSeats
        ? (event.totalCapacity - event.availableSeats) / event.totalCapacity
        : 0;
      return { ...event, soldRatio };
    })
    .sort((a, b) => b.soldRatio - a.soldRatio)
    .slice(0, 3);

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-10">
      <div className="text-center text-5xl my-10 font-bold text-foreground">
        {t("trending.title")}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trendingEvents.map((event, i) => {
          const percent = Math.round(event.soldRatio * 100);
          const eventName = tStr(event.title, locale);
          const venueName = (event.venueId && typeof event.venueId === "object")
            ? tStr(event.venueId.name, locale)
            : "";
          const rankText = locale === "ar"
            ? `${t("trending.badge")} #${i + 1}`
            : `#${i + 1} ${t("trending.badge")}`;

          return (
            <Link key={event._id} href={`/events/${event._id}`} className="block h-full">
              <BorderGlow
                glowColor="262 83 58"
                backgroundColor="var(--card)"
                borderRadius={12}
                colors={['#7C3AED', '#A78BFA', '#5B21B6']}
                className="h-full border-none hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-out"
              >
                <Card className="pt-0 rounded-xl overflow-hidden group bg-transparent border-none shadow-none h-full flex flex-row sm:flex-col items-stretch">
                  <CardHeader className="p-0 relative w-28 sm:w-full min-h-[115px] sm:min-h-0 sm:h-48 overflow-hidden shrink-0">
                    <Image
                      src={event.images[0]}
                      alt={eventName}
                      fill
                      sizes="(max-width: 640px) 112px, (max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 bg-[#111111] text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold shadow-md">
                      {rankText}
                    </div>
                  </CardHeader>
                  <CardContent className="grow flex-1 flex flex-col justify-between p-3 sm:p-5 min-w-0">
                    <div>
                      <h3 className="text-sm sm:text-lg font-bold text-foreground mb-0.5 sm:mb-1 line-clamp-1 group-hover:text-[#7C3AED] transition-colors">
                        {eventName}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                        {venueName}
                      </p>
                    </div>
                    <div className="flex justify-between items-center pt-2 mt-2 sm:pt-4 sm:mt-4 border-t border-gray-100 dark:border-slate-800/50">
                      <span className="text-xs sm:text-sm font-semibold text-[#7C3AED]">
                        🔥 {percent}% {locale === "ar" ? "بيعت" : "sold"}
                      </span>
                      <span className="font-bold text-sm sm:text-lg text-[#7C3AED]">
                        {event.price}{" "}
                        <span className="text-[10px] sm:text-xs font-normal text-gray-500 dark:text-gray-400">
                          EGP
                        </span>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </BorderGlow>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
