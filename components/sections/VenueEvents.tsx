"use client";

import React, { useEffect, useState } from "react";
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
    <div className="bg-card rounded-xl shadow-sm p-8 border border-white/20">
      <h2 className="text-2xl font-bold mb-6 text-primary">
        Upcoming Events at This Venue
      </h2>

      {/* --- Date Selector --- */}
      <div className="flex gap-4 mb-8 pb-4 scrollbar-hide">
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
                flex-shrink-0 w-20 h-30 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border
                ${
                  isSelected
                    ? "bg-eventaty-gold text-white shadow-md shadow-eventaty-gold/20 scale-105 border-transparent"
                    : "bg-eventaty-cream text-gray-400 border-gray-200 hover:border-eventaty-gold/50 hover:text-eventaty-gold"
                }
              `}
            >
              <span
                className={`text-xs font-medium uppercase ${
                  isSelected ? "opacity-90" : ""
                }`}
              >
                {dayName}
              </span>
              <span className="text-2xl font-bold">{dayNumber}</span>
              <span
                className={`text-xs uppercase ${
                  isSelected ? "opacity-90" : "opacity-70"
                }`}
              >
                {monthName}
              </span>

              {/* Event Counter Badge */}
              <span
                className={`mt-2 text-[10px] px-2 py-0.5 rounded-full ${
                  isSelected ? "bg-black/20" : "bg-gray-200 text-gray-500"
                }`}
              >
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
              className="group border border-eventaty-gold/30 rounded-xl p-4 flex flex-col md:flex-row gap-6 bg-eventaty-cream/20 hover:shadow-md hover:border-eventaty-gold transition-all duration-300"
            >
              {/* Image Section */}
              <div className="w-full md:w-32 h-32 bg-gray-800 rounded-lg flex-shrink-0 overflow-hidden relative shadow-inner">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url(${event.images[0]})` }} // Handling Images
                />
              </div>

              {/* Details Section */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-2">
                  <button
                    className="text-lg font-bold text-eventaty-gold group-hover:text-eventaty-dark transition-colors cursor-pointer"
                    onClick={() => router.push(`/events/${event._id}`)}
                  >
                    {event.title}
                  </button>
                  <div className="text-right">
                    <span className="text-eventaty-gold font-bold text-xl block">
                      {event.price} EGP
                    </span>
                    <span className="text-[10px] uppercase text-gray-400 font-medium">
                      per ticket
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-primary/70 text-sm mb-3 font-medium">
                  <Clock size={16} className="text-eventaty-gold" />
                  <span>{new Date(event.startDateTime).toLocaleString()}</span>
                </div>

                <p className="text-primary/70 text-sm leading-relaxed line-clamp-2">
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
