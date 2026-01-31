import React from "react";
import {
  MapPin,
  Users,
  ParkingCircle,
  Wifi,
  Utensils,
  Accessibility,
  Snowflake,
  Crown,
} from "lucide-react";
// Import the new Client Component
import VenueEvents from "@/components/sections/VenueEvents";
import { IAmenity } from "@/types/venue";

// --- Helper for Icons (Keep this as is) ---
const IconMapper = ({ name }: { name: string }) => {
  const size = 18;
  switch (name.toLowerCase()) {
    case "parking":
      return <ParkingCircle size={size} />;
    case "wifi":
      return <Wifi size={size} />;
    case "food":
    case "food court":
      return <Utensils size={size} />;
    case "vip":
    case "vip lounge":
      return <Crown size={size} />;
    case "wheelchair":
    case "wheelchair access":
      return <Accessibility size={size} />;
    case "ac":
    case "air conditioning":
      return <Snowflake size={size} />;
    default:
      return <Crown size={size} />;
  }
};

// --- Main Page ---
export default async function VenueDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch venue data from API
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/venues/${id}`,
    {
      cache: "no-store", // Ensures fresh data on each request
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch venue");
  }

  const apiData = await response.json().then((data) => data.data.venue);

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
                About {apiData.name || "This Venue"}
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
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Capacity
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
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Location
                    </p>
                    <p className="font-semibold text-lg">{`${apiData.city}, ${apiData.country}`}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="bg-card rounded-xl shadow-sm p-8 text-primary border border-white/20">
              <h2 className="text-2xl font-bold mb-6">Venue Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {apiData.amenities.map((item: IAmenity, index: number) => (
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
            <VenueEvents events={apiData.events} />
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
                      Map View
                    </span>
                  </div>
                </div>
              )}
              <div className="space-y-4 mb-8">
                <h4 className="text-xs text-primary uppercase font-bold tracking-wider">
                  Address
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
                className="w-full bg-eventaty-gold text-white text-center font-bold py-3.5 px-4 rounded-lg shadow-lg shadow-eventaty-gold/30 hover:bg-eventaty-gold/90 transition-colors cursor-pointer block"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
