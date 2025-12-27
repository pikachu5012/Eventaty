"use client";

import React, { useState } from "react";
import { Clock } from "lucide-react";

// Define the shape of an Event
interface Event {
  id: number;
  title: string;
  time: string;
  price: number;
  description: string;
  image: string;
  date: string;       // e.g., "2024-12-27"
  displayDate: {      // Structure for the calendar UI
    day: string;      // "Sat"
    date: string;     // "27"
    month: string;    // "Dec"
  };
}

interface VenueEventsProps {
  events: Event[];
}

export default function VenueEvents({ events }: VenueEventsProps) {
  // 1. Get unique dates from the events list
  // This prevents hardcoding dates. It reads what's in your database/data.
  const uniqueDates = Array.from(new Set(events.map(e => e.date)))
    .map(dateStr => {
      return events.find(e => e.date === dateStr);
    })
    .sort((a, b) => new Date(a!.date).getTime() - new Date(b!.date).getTime());

  // 2. State to track the currently selected date
  // Default to the first date available
  const [selectedDate, setSelectedDate] = useState<string>(uniqueDates[0]?.date || "");

  // 3. Filter events based on selection
  const filteredEvents = events.filter((event) => event.date === selectedDate);

  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <h2 className="text-2xl font-bold mb-6 text-eventaty-dark">Upcoming Events at This Venue</h2>

      {/* --- Date Selector --- */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-4 scrollbar-hide">
        {uniqueDates.map((evt) => {
          if (!evt) return null;
          const isSelected = selectedDate === evt.date;

          // Count events for this specific date
          const eventsCount = events.filter(e => e.date === evt.date).length;

          return (
            <button
              key={evt.date}
              onClick={() => setSelectedDate(evt.date)}
              className={`
                flex-shrink-0 w-20 h-24 rounded-xl flex flex-col items-center justify-center transition-all duration-300 border
                ${isSelected
                  ? "bg-eventaty-gold text-white shadow-md shadow-eventaty-gold/20 scale-105 border-transparent"
                  : "bg-eventaty-cream text-gray-400 border-gray-200 hover:border-eventaty-gold/50 hover:text-eventaty-gold"
                }
              `}
            >
              <span className={`text-xs font-medium ${isSelected ? "opacity-90" : ""}`}>{evt.displayDate.day}</span>
              <span className="text-2xl font-bold">{evt.displayDate.date}</span>
              <span className={`text-xs ${isSelected ? "opacity-90" : "opacity-70"}`}>{evt.displayDate.month}</span>

              {/* Event Counter Badge */}
              <span className={`mt-2 text-[10px] px-2 py-0.5 rounded-full ${isSelected ? "bg-black/20" : "bg-gray-200 text-gray-500"}`}>
                {eventsCount} event{eventsCount > 1 ? 's' : ''}
              </span>
            </button>
          );
        })}
      </div>

      {/* --- Events List --- */}
      <div className="space-y-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} className="group border border-eventaty-gold/30 rounded-xl p-4 flex flex-col md:flex-row gap-6 bg-eventaty-cream/30 hover:shadow-md hover:border-eventaty-gold transition-all duration-300">
              {/* Image Section */}
              <div className="w-full md:w-32 h-32 bg-gray-800 rounded-lg flex-shrink-0 overflow-hidden relative shadow-inner">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url(${event.image})` }} // Handling Images
                />
              </div>

              {/* Details Section */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-eventaty-gold group-hover:text-eventaty-dark transition-colors">
                    {event.title}
                  </h3>
                  <div className="text-right">
                    <span className="text-eventaty-gold font-bold text-xl block">${event.price}</span>
                    <span className="text-[10px] uppercase text-gray-400 font-medium">per ticket</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3 font-medium">
                  <Clock size={16} className="text-eventaty-gold" />
                  <span>{event.time}</span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {event.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-400">
            No events found for this date.
          </div>
        )}
      </div>
    </div>
  );
}