"use client";

import React, { useState } from "react";
import { Clock } from "lucide-react";
import { IEvent } from "@/types/event";
import { useRouter } from "next/navigation";

interface VenueEventsProps {
  events: IEvent[];
}

export default function VenueEvents({ events }: VenueEventsProps) {
  const router = useRouter();
  // 1. Get unique dates from the events list
  const uniqueDates = Array.from(new Set(events.map((e) => e.startDateTime)))
    .map((dateStr) => {
      return events.find((e) => e.startDateTime === dateStr);
    })
    .sort(
      (a, b) =>
        new Date(a!.startDateTime).getTime() -
        new Date(b!.startDateTime).getTime()
    );

  // 2. State to track the currently selected date
  const [selectedDate, setSelectedDate] = useState<string>(
    uniqueDates[0]?.startDateTime || ""
  );

  // 3. Filter events based on selection
  const filteredEvents = events.filter(
    (event) => event.startDateTime === selectedDate
  );

  return (
    <div className="bg-card rounded-xl shadow-sm p-8 border border-border/60">
      <h2 className="text-2xl font-bold mb-6 text-primary">
        Upcoming Events at This Venue
      </h2>

      {/* --- Date Selector --- */}
      <div className="flex gap-4 mb-8 pb-4 overflow-x-auto scrollbar-hide">
        {uniqueDates.map((evt) => {
          if (!evt) return null;
          const isSelected = selectedDate === evt.startDateTime;
          const eventDateObj = new Date(evt.startDateTime);

          // Get localized date parts
          const dayName = eventDateObj.toLocaleDateString("en-US", {
            weekday: "short",
          });
          const dayNumber = eventDateObj.toLocaleDateString("en-US", {
            day: "2-digit",
          });
          const monthName = eventDateObj.toLocaleDateString("en-US", {
            month: "short",
          });

          // Count events for this specific date
          const eventsCount = events.filter(
            (e) => e.startDateTime === evt.startDateTime
          ).length;

          return (
            <button
              key={evt.startDateTime}
              onClick={() => setSelectedDate(evt.startDateTime)}
              className={`
                shrink-0 w-22 h-32 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border cursor-pointer relative p-2
                ${
                  isSelected
                    ? "bg-[#7C3AED] text-white shadow-md shadow-violet-500/25 border-transparent ring-2 ring-violet-400/50"
                    : "bg-card text-muted-foreground border-border/80 hover:border-violet-500/60 hover:text-violet-600 shadow-xs"
                }
              `}
            >
              <span
                className={`text-[11px] font-bold uppercase tracking-wider ${
                  isSelected ? "text-violet-100" : "text-muted-foreground"
                }`}
              >
                {dayName}
              </span>
              <span className="text-2xl font-extrabold my-0.5">{dayNumber}</span>
              <span
                className={`text-[11px] font-bold uppercase tracking-wider ${
                  isSelected ? "text-violet-100" : "text-muted-foreground"
                }`}
              >
                {monthName}
              </span>

              {/* Event Counter Badge */}
              <span
                className={`mt-1.5 text-[9px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                  isSelected ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {isSelected && <span className="font-extrabold text-[10px]">✓</span>}
                {eventsCount} event{eventsCount > 1 ? "s" : ""}
              </span>
            </button>
          );
        })}
      </div>

      {/* --- Events List --- */}
      <div className="space-y-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event._id}
              className="group border border-border/60 rounded-xl p-5 flex flex-col md:flex-row gap-6 bg-card hover:shadow-md hover:border-violet-500/50 transition-all duration-300"
            >
              {/* Image Section */}
              <div className="w-full md:w-32 h-32 bg-gray-800 rounded-lg shrink-0 overflow-hidden relative shadow-xs">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url(${event.images[0]})` }}
                />
              </div>

              {/* Details Section */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-2">
                  <button
                    className="text-lg font-bold text-primary group-hover:text-[#7C3AED] transition-colors cursor-pointer text-start"
                    onClick={() => router.push(`/events/${event._id}`)}
                  >
                    {event.title}
                  </button>
                  <div className="text-end">
                    <span className="text-[#7C3AED] font-bold text-xl block">
                      {event.price} EGP
                    </span>
                    <span className="text-[10px] uppercase text-muted-foreground font-medium">
                      per ticket
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3 font-medium">
                  <Clock size={16} className="text-[#7C3AED]" />
                  <span>{new Date(event.startDateTime).toLocaleString()}</span>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                  {event.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-eventaty-gold">
            No events found for this date.
          </div>
        )}
      </div>
    </div>
  );
}
