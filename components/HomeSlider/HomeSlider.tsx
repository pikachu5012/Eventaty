import EventSlide from "../EventsSlide";
import { mockEvents } from "@/lib/mockData";

export default function HomeSlider() {
  const featuredEvents = mockEvents.filter(
    (e) => e.featured === true,
  );

  if (featuredEvents.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        No featured events marked.
      </div>
    );
  }

  // Display the first featured event as the static hero banner (matching the mockup)
  return (
    <div className="w-full pt-10 pb-4">
      <EventSlide event={featuredEvents[0] as any} />
    </div>
  );
}
