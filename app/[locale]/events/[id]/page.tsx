import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, MapPin, Users, Tag, ArrowRight } from "lucide-react";
import TicketsSection from "@/components/sections/TicketsSection";
import DarkVeil from "@/components/DarkVeil/DarkVeil";
import axios from "axios";
import { IEvent } from "@/types/event";
import {
  getVenueName,
  getVenueAddress,
  getVenueCity,
  getVenue,
  getCategoryName,
} from "@/lib/eventUtils";
import { mockEvents } from "@/lib/mockData";
import { getTranslations } from "next-intl/server";
import { tStr } from "@/lib/translateHelper";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const t = await getTranslations('EventDetails');

  // Fetch event data directly from mock data
  const event: IEvent | null = mockEvents.find((e) => e._id === id) || null;

  if (!event) {
    notFound();
  }

  // Get venue information using utility functions
  const rawVenueName = getVenueName(event);
  const rawVenueAddress = getVenueAddress(event);
  const rawVenueCity = getVenueCity(event);
  const venue = getVenue(event);
  const rawCategoryName = getCategoryName(event);

  const venueName = tStr(rawVenueName, locale);
  const venueAddress = tStr(rawVenueAddress, locale);
  const venueCity = tStr(rawVenueCity, locale);
  const categoryName = tStr(rawCategoryName, locale);

  // Format date and time if they match standard Date format, otherwise keep as string
  let formattedDate = event.startDateTime;
  let formattedTime = event.startDateTime;

  if (event.startDateTime && !event.startDateTime.includes("T")) {
    // It's likely already formatted or just a date string, keep it
    formattedDate = (event as any).date || event.startDateTime;
    formattedTime = (event as any).time || "";
  } else if (event.startDateTime) {
    // It's an ISO string
    try {
      const eventDateObj = new Date(event.startDateTime);
      formattedDate = eventDateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      formattedTime = eventDateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      // Fallback
      formattedDate = event.startDateTime;
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Image Section */}
      <div className="relative h-[400px] w-full bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{
            backgroundImage: `url(${event.images?.[0] || "/ekko.png"})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        {/* Section 1: Event Details */}
        <div className="bg-card rounded-2xl shadow-xl p-8 mb-12 border border-gray-100/10 dark:bg-navy-background relative overflow-hidden">
          <div className="hidden dark:block absolute inset-0 z-0 pointer-events-none opacity-20">
            <DarkVeil speed={0.15} hueShift={315} />
          </div>
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-5 py-2 rounded-full bg-violet-100 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 border border-violet-200/50 dark:border-violet-800/30 font-medium text-sm">
                {categoryName}
              </span>
              {event.featured && (
                <span className="px-5 py-2 rounded-full bg-primary text-background font-medium text-sm flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  {t('featured')}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-10 tracking-tight">
              {tStr(event.title, locale)}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-950/30 flex items-center justify-center text-[#7C3AED] dark:text-violet-400 shrink-0 border border-violet-100 dark:border-violet-900/30">
                  <Calendar size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-0.5 font-medium">{t('date')}</p>
                  <p className="text-primary font-medium text-lg">
                    {formattedDate}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-950/30 flex items-center justify-center text-[#7C3AED] dark:text-violet-400 shrink-0 border border-violet-100 dark:border-violet-900/30">
                  <Clock size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-0.5 font-medium">{t('time')}</p>
                  <p className="text-primary font-medium text-lg">
                    {formattedTime}
                  </p>
                </div>
              </div>

              {/* Venue */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-950/30 flex items-center justify-center text-[#7C3AED] dark:text-violet-400 shrink-0 border border-violet-100 dark:border-violet-900/30">
                  <MapPin size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-0.5 font-medium">
                    {t('venue')}
                  </p>
                  <p className="text-primary font-medium text-lg">
                    {venueName}, {venueCity}
                  </p>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-950/30 flex items-center justify-center text-[#7C3AED] dark:text-violet-400 shrink-0 border border-violet-100 dark:border-violet-900/30">
                  <Users size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-0.5 font-medium">
                    {t('availability')}
                  </p>
                  <p className="text-primary font-medium text-lg">
                    {t('ticketsAvailable', { count: event.availableSeats })}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-10">
              <h3 className="text-2xl font-bold text-primary mb-4">
                {t('aboutEvent')}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8 max-w-4xl">
                {tStr(event.description, locale) || t('noDescription')}
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Tickets */}
        <TicketsSection
          eventPrice={event.price}
          ticketTypes={event.tickets}
          eventId={event._id}
        />

        {/* Section 3: Venue Info */}
        <div className="bg-card rounded-2xl shadow-[0_1px_6px_rgba(0,0,0,0.06)] dark:shadow-none overflow-hidden border border-gray-200/80 dark:border-gray-800/40 relative">
          <div className="hidden dark:block absolute inset-0 z-0 pointer-events-none opacity-20">
            <DarkVeil speed={0.15} hueShift={315} />
          </div>
          <div className="p-8 relative z-10">
            {event.venueId ? (
              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-primary mb-1">
                      {t('venueInfo')}
                    </h2>
                    <h3 className="text-lg text-foreground/80 font-medium">
                      {tStr(venue?.name, locale) || venueName}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {tStr(venue?.description, locale) || t('eventAt', { venue: venueName })}
                  </p>
 
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin
                        size={18}
                        className="text-[#7C3AED]"
                        strokeWidth={2}
                      />
                      <span className="text-sm">{venueAddress}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span className="text-sm pl-8">
                        {t('capacity', { capacity: venue?.capacity?.toLocaleString() || "N/A" })}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={venue ? `/venues/${venue._id}` : "#"}
                      className="inline-flex items-center gap-2 text-eventaty-gold font-semibold hover:text-white transition-colors text-sm"
                    >
                      {t('viewVenue')}
                      <ArrowRight size={16} className="rtl:rotate-180" />
                    </Link>
                  </div>
                </div>
                <div className="w-full md:w-1/3 aspect-video bg-gray-100 rounded-xl overflow-hidden relative border-2 border-eventaty-gold shadow-sm">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${venue?.images?.[0] || "/ekko.png"
                        })`,
                    }}
                  />
                  <div className="absolute inset-0 bg-black/5" />
                </div>
              </div>
            ) : (
              <p>{t('noVenue')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
