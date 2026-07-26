"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, Users, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslations, useLocale } from "next-intl";
import BorderGlow from "./BorderGlow/BorderGlow";
import { tStr } from "@/lib/translateHelper";
import { IEvent } from "@/types/event";
import { IVenue } from "@/types/venue";
import { mockEvents } from "@/lib/mockData";
import TicketSelectionModal from "./ui/TicketSelectionModal";

import { ICategory } from "@/types/category";

export default function CardComponent({
  data,
  isEvent,
}: {
  data?: Partial<IEvent> & Partial<IVenue> & { eventCount?: number; category?: string | ICategory };
  isEvent?: boolean;
}) {
  const t = useTranslations('Card');
  const locale = useLocale();
  const [showBooking, setShowBooking] = useState(false);

  const venueEventCount = useMemo(() => {
    if (isEvent) return 0;
    if (typeof data?.eventCount === "number" && data.eventCount > 0) return data.eventCount;
    if (!data?._id) return 0;
    return mockEvents.filter((e) => {
      const vId = typeof e.venueId === "object" ? e.venueId._id : e.venueId;
      return vId === data._id && new Date(e.startDateTime) > new Date();
    }).length;
  }, [isEvent, data]);

  const rawTitle = isEvent
    ? data?.title || "Blue Note Jazz Club"
    : data?.name || "Summer Music Festival 2025";
  const title = tStr(rawTitle, locale);

  const isFeaturedEvent = Boolean(isEvent && data?.featured);
  const sub = isEvent ? t('featured') : tStr(data?.category || t('venue'), locale);
  const shownDate = data?.startDateTime
    ? new Date(data?.startDateTime).toISOString().split("T")[0]
    : "";
  const shownTime = data?.startDateTime
    ? new Date(data?.startDateTime).toISOString().split("T")[1].split(".")[0]
    : "";
  let dateAndTime = shownDate;
  if (shownTime) {
    dateAndTime = `${dateAndTime} at ${shownTime}`;
  }

  const venueObj = typeof data?.venueId === "object" && data?.venueId !== null ? data.venueId : null;
  const venueLoc = venueObj ? (venueObj.name || venueObj.address) : "";

  const rawLocationOrCapacity =
    (isEvent ? venueLoc : "") ||
    (data?.city && data?.country
      ? `${data.city}, ${data.country}`
      : data?.city || data?.country) ||
    (isEvent ? "Grand Arena, Downtown" : t('capacity', { capacity: 500 }));
  const locationOrCapacity = tStr(rawLocationOrCapacity, locale);
  const price = data?.price;
  const capacity = data?.capacity;

  const firstTicket = data?.tickets?.[0];
  const bookingPrice =
    typeof price === "number" ? price * (firstTicket?.multiplier ?? 1) : (price as number | undefined) ?? 0;

  const detailsHref = isEvent ? `/events/${data?._id}` : `/venues/${data?._id}`;

  return (
    <>
      <div className="md:hidden bg-[#1c1c1e] dark:bg-[#1c1c1e] border border-white/10 rounded-2xl p-3 flex gap-3.5 items-stretch shadow-md">
        <Link href={detailsHref} className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-zinc-800">
          <Image
            src={data?.images?.[0] || "/ekko.png"}
            alt="Event Image"
            fill
            sizes="96px"
            className="object-cover"
          />
          {(isEvent ? isFeaturedEvent : true) && (
            <Badge
              variant="secondary"
              className="absolute top-1.5 right-1.5 rtl:right-auto rtl:left-1.5 m-0 bg-[#8B5CF6] text-white border-none text-[10px] font-semibold px-2 py-0.5 rounded-md pointer-events-none shadow-sm"
            >
              {sub}
            </Badge>
          )}
        </Link>

        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <Link href={detailsHref} className="block group">
            <h4 className="text-base font-bold text-white dark:text-white truncate group-hover:text-[#8B5CF6] transition-colors leading-snug">
              {title}
            </h4>
            <p className="text-xs text-zinc-400 flex items-center gap-1.5 truncate mt-1">
              {isEvent ? (
                <Calendar className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
              ) : (
                <MapPin className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
              )}
              <span className="truncate">
                {isEvent
                  ? `${data?.startDateTime ? new Date(data.startDateTime).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric' }) : shownDate} · ${locationOrCapacity}`
                  : locationOrCapacity || t('unknownLocation')}
              </span>
            </p>
          </Link>

          <div className="flex items-center justify-between mt-2">
            <Link href={detailsHref} className="flex items-baseline gap-1">
              <span className="text-base font-bold text-[#8B5CF6]">
                {isEvent
                  ? `${typeof price === "number" ? price.toFixed(0) : price}`
                  : venueEventCount}
              </span>
              <span className="text-xs font-medium text-zinc-400">
                {isEvent ? "EGP" : t('upcomingEvents')}
              </span>
            </Link>

            <Link href={detailsHref} className="p-0.5 text-zinc-400 hover:text-white transition-colors">
              <ChevronRight className="w-5 h-5 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>

      {isEvent && (
        <TicketSelectionModal
          isOpen={showBooking}
          onClose={() => setShowBooking(false)}
          ticketName={firstTicket?.type}
          price={bookingPrice}
          eventId={data?._id}
          ticketTypeId={firstTicket?._id}
        />
      )}

      <div className="hidden md:block h-full">
        <BorderGlow
          glowColor="262 83 58"
          backgroundColor="var(--card)"
          borderRadius={12}
          colors={['#7C3AED', '#A78BFA', '#5B21B6']}
          className="h-full border-none hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-out"
        >
          <Card className="pt-0 rounded-xl overflow-hidden group bg-transparent border-none shadow-none h-full flex flex-col">
            <CardHeader className="p-0 relative h-48 overflow-hidden">
            <Image
              src={data?.images?.[0] || "/ekko.png"}
              alt="Event Image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {isEvent ? (
              isFeaturedEvent ? (
                <Badge
                  variant="secondary"
                  className="absolute top-0 right-0 m-4 bg-eventaty-gold text-white border-none pointer-events-none"
                >
                  {sub}
                </Badge>
              ) : null
            ) : (
              <Badge
                variant="secondary"
                className="absolute top-0 right-0 m-4 bg-eventaty-gold text-white hover:bg-secondary border-none"
              >
                {sub}
              </Badge>
            )}
          </CardHeader>
          <CardContent className="grow p-6 pb-4">
            <h3 className="text-lg font-bold mb-3 line-clamp-2 min-h-[3.25rem] leading-snug text-primary">
              {title}
            </h3>
            <div className="text-sm text-muted-foreground mb-2.5 flex gap-3 items-center">
              {isEvent ? (
                <Calendar className="w-4 h-4 text-eventaty-gold shrink-0" />
              ) : (
                <MapPin className="w-4 h-4 text-eventaty-gold shrink-0" />
              )}
              <p className="text-xs font-medium">
                {isEvent ? dateAndTime : locationOrCapacity || t('unknownLocation')}
              </p>
            </div>
            <div className="text-sm text-muted-foreground flex gap-3 items-center">
              {isEvent ? (
                <MapPin className="w-4 h-4 text-eventaty-gold shrink-0" />
              ) : (
                <Users className="w-4 h-4 text-eventaty-gold shrink-0" />
              )}
              <p className="text-xs font-medium">
                {isEvent ? locationOrCapacity : t('capacity', { capacity: capacity ?? 0 })}
              </p>
            </div>
          </CardContent>
          <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center mt-auto">
            {isEvent ? (
              <div className="flex flex-col justify-center">
                <p className="text-xs text-muted-foreground font-medium mb-0.5">{t('startingFrom')}</p>
                <div>
                  <span className="font-bold text-xl text-eventaty-gold leading-tight">
                    {typeof price === "number" ? price.toFixed(2) : price}
                  </span>{" "}
                  <span className="font-semibold text-sm text-muted-foreground">EGP</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center">
                <p className="text-xs text-muted-foreground font-medium mb-0.5">{t('upcomingEvents')}</p>
                <span className="font-bold text-xl text-eventaty-gold leading-tight">
                  {venueEventCount}
                </span>
              </div>
            )}
            <div>
              <Link href={detailsHref} className="w-full">
                <Button className="bg-[#7C3AED] text-white hover:bg-[#6D28D9] hover:text-white transition-colors rounded-xl px-5 py-2.5 h-auto text-xs font-bold w-full cursor-pointer border-none shadow-xs">
                  {t('viewDetails')}
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
        </BorderGlow>
      </div>
    </>
  );
}
