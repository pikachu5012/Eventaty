import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { events, venues, TICKET_TYPES } from "@/lib/data";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Tag,
  ArrowRight,
} from "lucide-react";
import TicketsSection from "@/components/sections/TicketsSection";


const InfoBadge = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-start gap-4 p-4 rounded-xl bg-orange-50 border border-orange-100/50 hover:border-orange-200 transition-colors">
    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
      <Icon size={20} />
    </div>
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-gray-900 font-medium">{value}</p>
    </div>
  </div>
);

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = events.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  const venueIndex = venues.findIndex(v => event.location.includes(v.name) || v.name.includes(event.location.split(',')[0]));
  const venue = venueIndex >= 0 ? venues[venueIndex] : venues[0];

  return (
    <div className="min-h-screen bg-[#FFFBF4] pb-20">
      {/* Hero Image Section */}
      <div className="relative h-[400px] w-full bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: `url(${event.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFFBF4] via-gray-900/40 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">

        {/* Section 1: Event Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100/10">

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-5 py-2 rounded-full bg-[#FFFBF4] text-[#d4af37] border border-[#d4af37]/20 font-medium text-sm">
              {event.category}
            </span>
            {event.isFeatured && (
              <span className="px-5 py-2 rounded-full bg-[#0F172A] text-white font-medium text-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                Featured
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-10 tracking-tight">{event.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-8 mb-12">

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFFBF4] flex items-center justify-center text-[#d4af37] shrink-0 border border-[#d4af37]/10">
                <Calendar size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-0.5 font-medium">Date</p>
                <p className="text-gray-900 font-medium text-lg">{event.date}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFFBF4] flex items-center justify-center text-[#d4af37] shrink-0 border border-[#d4af37]/10">
                <Clock size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-0.5 font-medium">Time</p>
                <p className="text-gray-900 font-medium text-lg">{event.time}</p>
              </div>
            </div>

            {/* Venue */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFFBF4] flex items-center justify-center text-[#d4af37] shrink-0 border border-[#d4af37]/10">
                <MapPin size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-0.5 font-medium">Venue</p>
                <p className="text-gray-900 font-medium text-lg">{venue.name}, {venue.location}</p>
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFFBF4] flex items-center justify-center text-[#d4af37] shrink-0 border border-[#d4af37]/10">
                <Users size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-0.5 font-medium">Availability</p>
                <p className="text-gray-900 font-medium text-lg">220 tickets available</p>
              </div>
            </div>

          </div>

          <div className="border-t border-gray-100 pt-10">
            <h3 className="text-2xl font-bold text-[#0F172A] mb-4">About This Event</h3>
            <p className="text-gray-500 leading-relaxed text-lg mb-8 max-w-4xl">
              Join us for the biggest music festival of the summer featuring top international artists, multiple stages, and an unforgettable experience. This three-day festival will showcase diverse genres including rock, pop, electronic, and indie music.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-[#d4af37] mr-2">
                <Tag size={20} className="rotate-90" />
                <span className="font-bold text-gray-900">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Music", "Festival", "Outdoor", "Multi-day"].map((tag) => (
                  <span key={tag} className="px-4 py-1.5 rounded-full bg-[#f3f4f6] text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Tickets */}
        <TicketsSection eventPrice={event.price} ticketTypes={TICKET_TYPES} />

        {/* Section 3: Venue Info */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100/10">
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-1">Venue Information</h2>
                  <h3 className="text-lg text-gray-700 font-medium">{venue.name}</h3>
                </div>

                <p className="text-gray-500 leading-relaxed text-sm">
                  {venue.description}
                </p>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin size={18} className="text-[#d4af37]" strokeWidth={2} />
                    <span className="text-sm">{venue.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <span className="text-sm pl-8">Capacity: {venue.capacity.toLocaleString()} people</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/venues/${venue.id}`}
                    className="inline-flex items-center gap-2 text-[#d4af37] font-semibold hover:text-[#b5952f] transition-colors text-sm"
                  >
                    View Venue Details
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
              <div className="w-full md:w-1/3 aspect-video bg-gray-100 rounded-xl overflow-hidden relative border-2 border-[#d4af37] shadow-sm">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${venue.image})` }}
                />
                <div className="absolute inset-0 bg-black/5" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
