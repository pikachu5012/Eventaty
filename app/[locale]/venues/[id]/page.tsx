import {
  MapPin,
  Users,
  ParkingCircle,
  Wifi,
  Utensils,
  Accessibility,
  Snowflake,
  Crown,
  Building2,
} from "lucide-react";
// Import the new Client Component
import VenueEvents from "@/components/sections/VenueEvents";
import { IAmenity } from "@/types/venue";
import { IEvent } from "@/types/event";
import { getTranslations } from "next-intl/server";
import { tStr } from "@/lib/translateHelper";
import { Link } from "@/navigation";

// --- Helper for Icons ---
const IconMapper = ({ name }: { name: string }) => {
  const size = 18;
  const normalized = name.toLowerCase();
  if (normalized.includes("wifi")) return <Wifi size={size} />;
  if (normalized.includes("parking")) return <ParkingCircle size={size} />;
  if (normalized.includes("food") || normalized.includes("utensil")) return <Utensils size={size} />;
  if (normalized.includes("vip")) return <Crown size={size} />;
  if (normalized.includes("wheelchair") || normalized.includes("access") || normalized.includes("handicap")) {
    return <Accessibility size={size} />;
  }
  if (normalized.includes("ac") || normalized.includes("air")) return <Snowflake size={size} />;
  return <Crown size={size} />;
};

// --- Main Page ---
import { getVenueWithEvents } from "@/lib/mockData";

export default async function VenueDetails({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const t = await getTranslations('VenueDetails');

  // Fetch venue data directly from mock data
  const rawApiData = getVenueWithEvents(id);

  if (!rawApiData) {
    throw new Error("Failed to fetch venue");
  }

  const apiData = {
    ...rawApiData,
    name: tStr(rawApiData.name, locale),
    description: tStr(rawApiData.description, locale),
    city: tStr(rawApiData.city, locale),
    country: tStr(rawApiData.country, locale),
    address: tStr(rawApiData.address, locale),
    amenities: (rawApiData.amenities || []).map((amenity: IAmenity) => ({
      ...amenity,
      name: tStr(amenity.name, locale),
    })),
    events: (rawApiData.events || []).map((event: IEvent) => ({
      ...event,
      title: tStr(event.title, locale),
      description: tStr(event.description, locale),
    })),
  };

  return (
    <div className="min-h-screen bg-background text-eventaty-dark pb-20 font-sans">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] w-full bg-eventaty-dark">
        <div className="absolute inset-0 bg-gradient-to-t from-eventaty-dark/90 to-transparent z-10" />
        <div
          className="w-full h-full bg-cover bg-center opacity-70"
          style={{ backgroundImage: `url(${apiData.images[0]})` }}
        />
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-card rounded-xl shadow-sm p-8 border border-white/20 text-primary">
              <h2 className="text-2xl font-bold mb-4">
                {t('aboutVenue', { name: apiData.name })}
              </h2>
              <p className="text-primary mb-8 leading-relaxed">
                {apiData.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-background  rounded-lg p-4 flex items-center gap-4 border border-white/20">
                  <div className="w-10 h-10 rounded-full bg-strongCream flex items-center justify-center text-eventaty-dark/70">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      {t('capacity')}
                    </p>
                    <p className="font-semibold text-lg">
                      {apiData.capacity.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="bg-background rounded-lg p-4 flex items-center gap-4 border border-white/20">
                  <div className="w-10 h-10 rounded-full bg-strongCream flex items-center justify-center text-eventaty-dark/70">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      {t('location')}
                    </p>
                    <p className="font-semibold text-lg">{`${apiData.city}, ${apiData.country}`}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="bg-card rounded-xl shadow-sm p-8 text-primary border border-white/20">
              <h2 className="text-2xl font-bold mb-6">{t('amenities')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(apiData.amenities || []).map((item: IAmenity, index: number) => (
                  <div
                    key={index}
                    className="bg-background rounded-lg p-4 flex items-center gap-3 border border-white/20"
                  >
                    <span className="text-eventaty-gold">
                      <IconMapper name={item.icon} />
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* --- HERE IS THE CHANGE: Using the Interactive Component --- */}
            <VenueEvents events={apiData.events || []} />
          </div>

          {/* RIGHT COLUMN (Sidebar) */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl shadow-sm p-6 sticky top-26 border border-eventaty-gold">
              {/*Map view */}
              {apiData.latitude && apiData.longitude ? (
                <div className="w-full h-64 rounded-lg mb-6 overflow-hidden border border-eventaty-gold">
                  <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${apiData.latitude},${apiData.longitude}&z=15&output=embed`}
                  />
                </div>
              ) : (
                <div className="w-full h-64 bg-card rounded-lg mb-6 flex items-center justify-center border border-eventaty-gold">
                  <div className="text-center">
                    <MapPin
                      className="mx-auto text-eventaty-gold mb-2"
                      size={32}
                    />
                    <span className="text-gray-400 text-sm font-medium">
                      {t('mapView')}
                    </span>
                  </div>
                </div>
              )}
              <div className="space-y-4 mb-8">
                <h4 className="text-xs text-primary uppercase font-bold tracking-wider">
                  {t('address')}
                </h4>
                <p className="font-medium text-sm text-primary/60">
                  {apiData.address}
                </p>
              </div>
              <a
                href={
                  apiData.latitude && apiData.longitude
                    ? `https://www.google.com/maps/dir/?api=1&destination=${apiData.latitude},${apiData.longitude}`
                    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${apiData.name} ${apiData.address}`,
                      )}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#7C3AED] text-white text-center font-bold py-3.5 px-4 rounded-xl shadow-md hover:bg-[#6D28D9] transition-all cursor-pointer block text-sm"
              >
                {t('getDirections')}
              </a>

              <Link
                href="/contact"
                className="w-full mt-3 bg-card border border-violet-500/40 hover:border-violet-500 text-violet-600 dark:text-violet-400 text-center font-bold py-3 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-sm"
              >
                <Building2 size={18} />
                Request Venue Booking
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
