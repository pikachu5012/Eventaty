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

// --- Helper for Icons (Keep this as is) ---
const IconMapper = ({ name }: { name: string }) => {
  const size = 18;
  switch (name.toLowerCase()) {
    case "parking": return <ParkingCircle size={size} />;
    case "wifi": return <Wifi size={size} />;
    case "food": case "food court": return <Utensils size={size} />;
    case "vip": case "vip lounge": return <Crown size={size} />;
    case "wheelchair": case "wheelchair access": return <Accessibility size={size} />;
    case "ac": case "air conditioning": return <Snowflake size={size} />;
    default: return <Crown size={size} />;
  }
};

// --- Main Page ---
export default async function VenueDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // --- MOCK DATA (Updated with diverse dates for testing) ---
  const venueData = {
    id: id,
    name: "Grand Celebration Hall",
    description: "A premier venue for large-scale events, concerts, and conferences.",
    capacity: 5000,
    location: "San Francisco, CA",
    address: "123 Main Street, San Francisco, CA",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
    amenities: [
      { name: "Parking", icon: "parking" },
      { name: "WiFi", icon: "wifi" },
      { name: "Food Court", icon: "food" },
      { name: "VIP Lounge", icon: "vip" },
    ],
    // NOTICE: I added 'date' and 'displayDate' fields here
    events: [
      {
        id: 1,
        title: "Epic Rock & Pop Festival",
        time: "15:00",
        price: 129.99,
        description: "Afternoon rock and pop extravaganza.",
        image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1000",
        date: "2024-12-27",
        displayDate: { day: "Sat", date: "27", month: "Dec" }
      },
      {
        id: 2,
        title: "Electronic Dance Night",
        time: "21:00",
        price: 89.99,
        description: "The biggest EDM night of the year!",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1000",
        date: "2024-12-27",
        displayDate: { day: "Sat", date: "27", month: "Dec" }
      },
      {
        id: 3,
        title: "New Year Jazz Gala",
        time: "19:00",
        price: 150.00,
        description: "Smooth jazz to welcome the new year.",
        image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=1000",
        date: "2024-12-31",
        displayDate: { day: "Wed", date: "31", month: "Dec" }
      },
      {
        id: 4,
        title: "Classical Symphony",
        time: "18:00",
        price: 75.50,
        description: "A relaxing evening with Mozart and Bach.",
        image: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?auto=format&fit=crop&q=80&w=1000",
        date: "2025-01-02",
        displayDate: { day: "Fri", date: "02", month: "Jan" }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-eventaty-cream text-eventaty-dark pb-20 font-sans">

      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] w-full bg-eventaty-dark">
        <div className="absolute inset-0 bg-gradient-to-t from-eventaty-dark/90 to-transparent z-10" />
        <div
          className="w-full h-full bg-cover bg-center opacity-70"
          style={{ backgroundImage: `url(${venueData.imageUrl})` }}
        />
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">

            {/* About Section */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-white/50">
              <h2 className="text-2xl font-bold mb-4 text-eventaty-dark">About This Venue</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">{venueData.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-eventaty-cream rounded-lg p-4 flex items-center gap-4 border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-[#E8DCC2] flex items-center justify-center text-eventaty-dark/70">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Capacity</p>
                    <p className="font-semibold text-lg">{venueData.capacity.toLocaleString()}</p>
                  </div>
                </div>
                <div className="bg-eventaty-cream rounded-lg p-4 flex items-center gap-4 border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-[#E8DCC2] flex items-center justify-center text-eventaty-dark/70">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                    <p className="font-semibold text-lg">{venueData.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">Venue Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {venueData.amenities.map((item, index) => (
                  <div key={index} className="bg-eventaty-cream rounded-lg p-4 flex items-center gap-3 border border-gray-100">
                    <span className="text-eventaty-gold">
                      <IconMapper name={item.icon} />
                    </span>
                    <span className="font-medium text-gray-700">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* --- HERE IS THE CHANGE: Using the Interactive Component --- */}
            <VenueEvents events={venueData.events} />

          </div>

          {/* RIGHT COLUMN (Sidebar) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <div className="w-full h-64 bg-[#F0EFE9] rounded-lg mb-6 flex items-center justify-center border border-gray-100">
                <div className="text-center">
                  <MapPin className="mx-auto text-eventaty-gold mb-2" size={32} />
                  <span className="text-gray-400 text-sm font-medium">Map View</span>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                <h4 className="text-xs text-gray-400 uppercase font-bold tracking-wider">Address</h4>
                <p className="text-eventaty-dark font-medium text-sm">{venueData.address}</p>
              </div>
              <button className="w-full bg-eventaty-gold text-white font-bold py-3.5 px-4 rounded-lg shadow-lg shadow-eventaty-gold/30">
                Get Directions
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}