import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { IEvent } from "@/types/event";
import MySwiper from "../MySwiper/MySwiper";
import Link from "next/link";

export default function HomeSlider() {
  const [featuredEvents, setFeaturedEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedEvents = async () => {
      try {
        const response = await axios.get(`/api/events/featured`);
        setFeaturedEvents(response.data.data.events);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedEvents();
  }, []);
console.log(featuredEvents.map(event => event.title));
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(date);
    } catch (e) {
      return 'Date not available';
    }
  };

  const getVenueName = (event: IEvent) => {
    if (!event.venueId) return 'Venue TBD';
    return typeof event.venueId === 'object' ? event.venueId.name : 'Venue TBD';
  };

  const imageUrls = useMemo(() => {
    return featuredEvents
      .map(event => event.images[0] || '')
      .filter(Boolean);
  }, [featuredEvents]);

  const eventInfo = useMemo(() => {
    return featuredEvents
    .map(event => ({
      id: event._id,
      title: event.title,
      date: formatDate(event.startDateTime),
      venue: getVenueName(event),
      image: event.images[0] || ''
    }));
  }, [featuredEvents]);

  // Keep imageUrls for the swiper component

  if (loading) {
    return (
      <section className="bg-background py-16">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="w-full h-[320px] md:h-[380px] rounded-3xl bg-gray-100 animate-pulse" />
        </div>
      </section>
    );
  }

  if (imageUrls.length === 0) {
    return null; // Don't render anything if no images
  }

  return (
    <section className="bg-background py-16">
      <div className="max-w-screen-xl mx-auto px-6 flex items-center">
        <div className="w-full lg:w-1/3 p-8 lg:p-10 flex flex-col">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {featuredEvents[0]?.title}
          </h2>

          <div className="space-y-2 mb-6">
            <p className="text-gray-600 text-sm">
              {formatDate(eventInfo[0]?.date)}
            </p>
            <p className="text-gray-400 text-sm">
              {eventInfo[0]?.venue}
            </p>
          </div>
          <div className="mt-auto space-y-4">
            <Link
              href={`/events/${eventInfo[0]?.id}`}
              className="block w-full text-center px-6 py-3 rounded-full 
                           bg-gradient-to-r from-[#d4af37] to-[#f0d36b] 
                           text-[#0F172A] font-medium hover:opacity-90 
                           transition-all shadow-lg"
            >
              Book Now
            </Link>
            <Link
              href="/events"
              className="block text-center text-gray-600 hover:text-gray-900 
                           text-sm font-medium transition-colors"
            >
              More Info
            </Link>
          </div>
        </div>
        <div className="w-full rounded-3xl overflow-hidden h-[320px] md:h-[380px]">
          <MySwiper imagesList={imageUrls} />
        </div>
      </div>
    </section>
  );
}
