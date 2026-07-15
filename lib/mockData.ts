import { ICategory } from "@/types/category";
import { IVenue } from "@/types/venue";
import { IEvent } from "@/types/event";
import { IBooking } from "@/types/booking";

// ─── Categories ────────────────────────────────────────────────────────────────

export const mockCategories: ICategory[] = [
  {
    _id: "cat001",
    name: "Music",
    description: "Live concerts, festivals, and musical performances",
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
  },
  {
    _id: "cat002",
    name: "Sports",
    description: "Sporting events, tournaments, and athletic competitions",
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
  },
  {
    _id: "cat003",
    name: "Technology",
    description: "Tech conferences, hackathons, and innovation summits",
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
  },
  {
    _id: "cat004",
    name: "Food & Drink",
    description: "Food festivals, tastings, and culinary experiences",
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
  },
  {
    _id: "cat005",
    name: "Art",
    description: "Art exhibitions, gallery openings, and creative workshops",
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
  },
  {
    _id: "cat006",
    name: "Business",
    description: "Networking events, seminars, and professional conferences",
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
  },
];

// ─── Venues ────────────────────────────────────────────────────────────────────

export const mockVenues: IVenue[] = [
  {
    _id: "ven001",
    name: "Cairo Opera House",
    address: "Gezira St, Zamalek",
    images: [
      "https://picsum.photos/seed/venue1a/800/500",
      "https://picsum.photos/seed/venue1b/800/500",
    ],
    city: "Cairo",
    state: "Cairo Governorate",
    postalCode: "11511",
    country: "Egypt",
    longitude: 31.2243,
    latitude: 30.0422,
    capacity: 2500,
    description:
      "The Cairo Opera House is the main performing arts venue in the Egyptian capital, located on the southern portion of Gezira Island in the Nile River. It features world-class acoustics and stunning architecture.",
    amenities: [
      { name: "Parking", icon: "parking", _id: "am001" },
      { name: "WiFi", icon: "wifi", _id: "am002" },
      { name: "VIP Lounge", icon: "vip", _id: "am003" },
      { name: "Air Conditioning", icon: "ac", _id: "am004" },
      { name: "Wheelchair Access", icon: "wheelchair", _id: "am005" },
    ],
  },
  {
    _id: "ven002",
    name: "Cairo Stadium",
    address: "Nasr City, Cairo Stadium Complex",
    images: [
      "https://picsum.photos/seed/venue2a/800/500",
      "https://picsum.photos/seed/venue2b/800/500",
    ],
    city: "Cairo",
    state: "Cairo Governorate",
    postalCode: "11765",
    country: "Egypt",
    longitude: 31.3175,
    latitude: 30.0691,
    capacity: 75000,
    description:
      "Cairo International Stadium is one of the largest stadiums in Africa. It hosts major sporting events, concerts, and large-scale entertainment shows.",
    amenities: [
      { name: "Parking", icon: "parking", _id: "am006" },
      { name: "Food Court", icon: "food", _id: "am007" },
      { name: "VIP Lounge", icon: "vip", _id: "am008" },
      { name: "Wheelchair Access", icon: "wheelchair", _id: "am009" },
    ],
  },
  {
    _id: "ven003",
    name: "Smart Village",
    address: "KM 28 Cairo-Alexandria Desert Road",
    images: [
      "https://picsum.photos/seed/venue3a/800/500",
      "https://picsum.photos/seed/venue3b/800/500",
    ],
    city: "Giza",
    state: "Giza Governorate",
    postalCode: "12577",
    country: "Egypt",
    longitude: 31.0167,
    latitude: 30.0711,
    capacity: 1200,
    description:
      "A state-of-the-art conference center located in Egypt's premier technology park. Perfect for tech events, business conferences, and professional seminars.",
    amenities: [
      { name: "WiFi", icon: "wifi", _id: "am010" },
      { name: "Parking", icon: "parking", _id: "am011" },
      { name: "Food Court", icon: "food", _id: "am012" },
      { name: "Air Conditioning", icon: "ac", _id: "am013" },
      { name: "VIP Lounge", icon: "vip", _id: "am014" },
    ],
  },
  {
    _id: "ven004",
    name: "Garden City Arena",
    address: "15 Qasr El Aini St, Garden City",
    images: [
      "https://picsum.photos/seed/venue4a/800/500",
      "https://picsum.photos/seed/venue4b/800/500",
    ],
    city: "Cairo",
    state: "Cairo Governorate",
    postalCode: "11461",
    country: "Egypt",
    longitude: 31.2357,
    latitude: 30.0344,
    capacity: 800,
    description:
      "An intimate multi-purpose arena in the heart of Garden City, ideal for art exhibitions, food festivals, and boutique events with a charming ambiance.",
    amenities: [
      { name: "WiFi", icon: "wifi", _id: "am015" },
      { name: "Food Court", icon: "food", _id: "am016" },
      { name: "Air Conditioning", icon: "ac", _id: "am017" },
      { name: "Wheelchair Access", icon: "wheelchair", _id: "am018" },
    ],
  },
];

// ─── Events ────────────────────────────────────────────────────────────────────

export const mockEvents: IEvent[] = [
  {
    _id: "evt001",
    title: "Cairo Jazz Festival 2026",
    description:
      "Experience the magic of jazz under the Egyptian sky. The Cairo Jazz Festival brings together world-renowned artists and local talent for three unforgettable nights of music, culture, and celebration.",
    images: [
      "https://picsum.photos/seed/event1a/800/500",
      "https://picsum.photos/seed/event1b/800/500",
    ],
    startDateTime: "2026-08-15T19:00:00Z",
    endDateTime: "2026-08-15T23:00:00Z",
    categoryId: mockCategories[0], // Music
    venueId: mockVenues[0], // Cairo Opera House
    totalCapacity: 2500,
    availableSeats: 1200,
    price: 350,
    eventType: "concert",
    status: "active",
    featured: true,
    createdBy: {
      _id: "user001",
      email: "admin@eventaty.com",
      firstName: "Admin",
    },
    createdAt: "2026-06-01T10:00:00Z",
    updatedAt: "2026-06-01T10:00:00Z",
    tickets: [
      {
        _id: "tkt001",
        type: "General",
        description: "Standard admission with access to all general areas",
        multiplier: 1,
      },
      {
        _id: "tkt002",
        type: "VIP",
        description: "Priority seating, complimentary drinks, backstage access",
        multiplier: 2.5,
      },
      {
        _id: "tkt003",
        type: "VIP Gold",
        description:
          "Premium front-row seating, full catering, artist meet & greet",
        multiplier: 4,
      },
    ],
  },
  {
    _id: "evt002",
    title: "Egyptian Premier League Final",
    description:
      "The ultimate showdown of Egyptian football! Watch the two best clubs battle it out for the league title in a thrilling atmosphere at Cairo Stadium.",
    images: [
      "https://picsum.photos/seed/event2a/800/500",
      "https://picsum.photos/seed/event2b/800/500",
    ],
    startDateTime: "2026-09-20T18:00:00Z",
    endDateTime: "2026-09-20T21:00:00Z",
    categoryId: mockCategories[1], // Sports
    venueId: mockVenues[1], // Cairo Stadium
    totalCapacity: 75000,
    availableSeats: 30000,
    price: 200,
    eventType: "sports",
    status: "active",
    featured: true,
    createdBy: {
      _id: "user001",
      email: "admin@eventaty.com",
      firstName: "Admin",
    },
    createdAt: "2026-06-10T10:00:00Z",
    updatedAt: "2026-06-10T10:00:00Z",
    tickets: [
      {
        _id: "tkt004",
        type: "General",
        description: "General admission seating in the upper tiers",
        multiplier: 1,
      },
      {
        _id: "tkt005",
        type: "VIP",
        description: "Premium midfield seats with cushioned seating",
        multiplier: 3,
      },
      {
        _id: "tkt006",
        type: "VIP Platinum",
        description:
          "Executive box with private balcony, catering, and private parking",
        multiplier: 8,
      },
    ],
  },
  {
    _id: "evt003",
    title: "TechSummit Egypt 2026",
    description:
      "The biggest technology conference in the MENA region. Keynotes from global tech leaders, hands-on workshops, startup showcases, and networking with 1000+ developers and entrepreneurs.",
    images: [
      "https://picsum.photos/seed/event3a/800/500",
      "https://picsum.photos/seed/event3b/800/500",
    ],
    startDateTime: "2026-10-05T09:00:00Z",
    endDateTime: "2026-10-05T18:00:00Z",
    categoryId: mockCategories[2], // Technology
    venueId: mockVenues[2], // Smart Village
    totalCapacity: 1200,
    availableSeats: 450,
    price: 500,
    eventType: "conference",
    status: "active",
    featured: true,
    createdBy: {
      _id: "user001",
      email: "admin@eventaty.com",
      firstName: "Admin",
    },
    createdAt: "2026-07-01T10:00:00Z",
    updatedAt: "2026-07-01T10:00:00Z",
    tickets: [
      {
        _id: "tkt007",
        type: "General",
        description: "Full-day conference access with lunch included",
        multiplier: 1,
      },
      {
        _id: "tkt008",
        type: "VIP",
        description:
          "Priority seating, workshop access, and networking lounge",
        multiplier: 2,
      },
      {
        _id: "tkt009",
        type: "VIP Gold",
        description:
          "All VIP perks plus speaker dinner, exclusive swag bag, and certificate",
        multiplier: 3.5,
      },
    ],
  },
  {
    _id: "evt004",
    title: "Cairo Food Festival",
    description:
      "A culinary adventure featuring 50+ food vendors, live cooking demonstrations by celebrity chefs, food competitions, and tastings of cuisines from around the world.",
    images: [
      "https://picsum.photos/seed/event4a/800/500",
      "https://picsum.photos/seed/event4b/800/500",
    ],
    startDateTime: "2026-08-28T12:00:00Z",
    endDateTime: "2026-08-28T22:00:00Z",
    categoryId: mockCategories[3], // Food & Drink
    venueId: mockVenues[3], // Garden City Arena
    totalCapacity: 800,
    availableSeats: 350,
    price: 150,
    eventType: "festival",
    status: "active",
    featured: false,
    createdBy: {
      _id: "user001",
      email: "admin@eventaty.com",
      firstName: "Admin",
    },
    createdAt: "2026-06-20T10:00:00Z",
    updatedAt: "2026-06-20T10:00:00Z",
    tickets: [
      {
        _id: "tkt010",
        type: "General",
        description: "Festival entry with 3 free food tokens",
        multiplier: 1,
      },
      {
        _id: "tkt011",
        type: "VIP",
        description:
          "Festival entry with unlimited food tokens and priority access",
        multiplier: 2.5,
      },
    ],
  },
  {
    _id: "evt005",
    title: "Modern Egyptian Art Exhibition",
    description:
      "Explore the vibrant world of contemporary Egyptian art. Featuring works from 30+ emerging and established artists, interactive installations, and guided tours.",
    images: [
      "https://picsum.photos/seed/event5a/800/500",
      "https://picsum.photos/seed/event5b/800/500",
    ],
    startDateTime: "2026-09-10T10:00:00Z",
    endDateTime: "2026-09-10T20:00:00Z",
    categoryId: mockCategories[4], // Art
    venueId: mockVenues[0], // Cairo Opera House
    totalCapacity: 500,
    availableSeats: 280,
    price: 100,
    eventType: "exhibition",
    status: "active",
    featured: false,
    createdBy: {
      _id: "user001",
      email: "admin@eventaty.com",
      firstName: "Admin",
    },
    createdAt: "2026-07-05T10:00:00Z",
    updatedAt: "2026-07-05T10:00:00Z",
    tickets: [
      {
        _id: "tkt012",
        type: "General",
        description: "Exhibition entry with audio guide",
        multiplier: 1,
      },
      {
        _id: "tkt013",
        type: "VIP",
        description:
          "Private guided tour, champagne reception, and exhibition catalog",
        multiplier: 3,
      },
    ],
  },
  {
    _id: "evt006",
    title: "Startup Pitch Night Cairo",
    description:
      "Watch 20 of Egypt's most promising startups pitch their ideas to top VCs and angel investors. Network with founders, mentors, and industry leaders.",
    images: [
      "https://picsum.photos/seed/event6a/800/500",
      "https://picsum.photos/seed/event6b/800/500",
    ],
    startDateTime: "2026-10-18T17:00:00Z",
    endDateTime: "2026-10-18T22:00:00Z",
    categoryId: mockCategories[5], // Business
    venueId: mockVenues[2], // Smart Village
    totalCapacity: 400,
    availableSeats: 150,
    price: 250,
    eventType: "networking",
    status: "active",
    featured: false,
    createdBy: {
      _id: "user001",
      email: "admin@eventaty.com",
      firstName: "Admin",
    },
    createdAt: "2026-07-10T10:00:00Z",
    updatedAt: "2026-07-10T10:00:00Z",
    tickets: [
      {
        _id: "tkt014",
        type: "General",
        description: "Event access with networking session",
        multiplier: 1,
      },
      {
        _id: "tkt015",
        type: "VIP",
        description:
          "Front-row seating, private networking lounge, and investor meet & greet",
        multiplier: 2,
      },
    ],
  },
  {
    _id: "evt007",
    title: "Amr Diab Live in Concert",
    description:
      "The king of Mediterranean music returns to the stage! Amr Diab performs his greatest hits and new releases in an electrifying live concert experience.",
    images: [
      "https://picsum.photos/seed/event7a/800/500",
      "https://picsum.photos/seed/event7b/800/500",
    ],
    startDateTime: "2026-11-05T20:00:00Z",
    endDateTime: "2026-11-06T00:00:00Z",
    categoryId: mockCategories[0], // Music
    venueId: mockVenues[1], // Cairo Stadium
    totalCapacity: 50000,
    availableSeats: 20000,
    price: 500,
    eventType: "concert",
    status: "active",
    featured: true,
    createdBy: {
      _id: "user001",
      email: "admin@eventaty.com",
      firstName: "Admin",
    },
    createdAt: "2026-07-12T10:00:00Z",
    updatedAt: "2026-07-12T10:00:00Z",
    tickets: [
      {
        _id: "tkt016",
        type: "General",
        description: "General admission standing area",
        multiplier: 1,
      },
      {
        _id: "tkt017",
        type: "VIP",
        description: "Reserved seating with premium sound zone",
        multiplier: 2.5,
      },
      {
        _id: "tkt018",
        type: "VIP Gold",
        description:
          "Golden Circle standing, closest to stage, complimentary drinks",
        multiplier: 5,
      },
      {
        _id: "tkt019",
        type: "VIP Platinum",
        description:
          "Private suite with full catering, dedicated service, and backstage pass",
        multiplier: 10,
      },
    ],
  },
  {
    _id: "evt008",
    title: "Cairo International Book Fair",
    description:
      "The largest and oldest book fair in the Arab world. Browse thousands of titles, attend author signings, literary discussions, and cultural performances.",
    images: [
      "https://picsum.photos/seed/event8a/800/500",
      "https://picsum.photos/seed/event8b/800/500",
    ],
    startDateTime: "2026-12-01T10:00:00Z",
    endDateTime: "2026-12-01T21:00:00Z",
    categoryId: mockCategories[4], // Art
    venueId: mockVenues[3], // Garden City Arena
    totalCapacity: 800,
    availableSeats: 600,
    price: 50,
    eventType: "fair",
    status: "active",
    featured: false,
    createdBy: {
      _id: "user001",
      email: "admin@eventaty.com",
      firstName: "Admin",
    },
    createdAt: "2026-07-14T10:00:00Z",
    updatedAt: "2026-07-14T10:00:00Z",
    tickets: [
      {
        _id: "tkt020",
        type: "General",
        description: "Full day entry pass",
        multiplier: 1,
      },
      {
        _id: "tkt021",
        type: "VIP",
        description:
          "Priority access, author meet & greet, and gift bag with signed books",
        multiplier: 4,
      },
    ],
  },
];

// ─── Bookings ──────────────────────────────────────────────────────────────────

export const mockBookings: IBooking[] = [
  {
    _id: "bk001",
    bookingReference: "EVT-2026-001",
    userId: {
      _id: "user002",
      email: "ahmed@example.com",
      firstName: "Ahmed",
      lastName: "Hassan",
      phone: 1012345678,
    },
    eventId: {
      _id: "evt001",
      title: "Cairo Jazz Festival 2026",
      description: mockEvents[0].description,
      images: mockEvents[0].images,
      startDateTime: "2026-08-15T19:00:00Z",
      endDateTime: "2026-08-15T23:00:00Z",
      venue: {
        address: "Gezira St, Zamalek",
        city: "Cairo",
        country: "Egypt",
      },
    },
    ticketType: "VIP",
    seatsBooked: 2,
    totalAmount: 1750,
    status: "confirmed",
    cancellationAllowed: true,
    cancellationDeadline: "2026-08-13T19:00:00Z",
    bookingDate: "2026-07-10T14:30:00Z",
    createdAt: "2026-07-10T14:30:00Z",
    updatedAt: "2026-07-10T14:30:00Z",
  },
  {
    _id: "bk002",
    bookingReference: "EVT-2026-002",
    userId: {
      _id: "user002",
      email: "ahmed@example.com",
      firstName: "Ahmed",
      lastName: "Hassan",
      phone: 1012345678,
    },
    eventId: {
      _id: "evt003",
      title: "TechSummit Egypt 2026",
      description: mockEvents[2].description,
      images: mockEvents[2].images,
      startDateTime: "2026-10-05T09:00:00Z",
      endDateTime: "2026-10-05T18:00:00Z",
      venue: {
        address: "KM 28 Cairo-Alexandria Desert Road",
        city: "Giza",
        country: "Egypt",
      },
    },
    ticketType: "General",
    seatsBooked: 1,
    totalAmount: 500,
    status: "confirmed",
    cancellationAllowed: true,
    cancellationDeadline: "2026-10-03T09:00:00Z",
    bookingDate: "2026-07-12T09:15:00Z",
    createdAt: "2026-07-12T09:15:00Z",
    updatedAt: "2026-07-12T09:15:00Z",
  },
  {
    _id: "bk003",
    bookingReference: "EVT-2026-003",
    userId: {
      _id: "user002",
      email: "ahmed@example.com",
      firstName: "Ahmed",
      lastName: "Hassan",
      phone: 1012345678,
    },
    eventId: {
      _id: "evt007",
      title: "Amr Diab Live in Concert",
      description: mockEvents[6].description,
      images: mockEvents[6].images,
      startDateTime: "2026-11-05T20:00:00Z",
      endDateTime: "2026-11-06T00:00:00Z",
      venue: {
        address: "Nasr City, Cairo Stadium Complex",
        city: "Cairo",
        country: "Egypt",
      },
    },
    ticketType: "VIP Gold",
    seatsBooked: 2,
    totalAmount: 5000,
    status: "confirmed",
    cancellationAllowed: true,
    cancellationDeadline: "2026-11-03T20:00:00Z",
    bookingDate: "2026-07-14T16:00:00Z",
    createdAt: "2026-07-14T16:00:00Z",
    updatedAt: "2026-07-14T16:00:00Z",
  },
  {
    _id: "bk004",
    bookingReference: "EVT-2026-004",
    userId: {
      _id: "user002",
      email: "ahmed@example.com",
      firstName: "Ahmed",
      lastName: "Hassan",
      phone: 1012345678,
    },
    eventId: {
      _id: "evt004",
      title: "Cairo Food Festival",
      description: mockEvents[3].description,
      images: mockEvents[3].images,
      startDateTime: "2026-08-28T12:00:00Z",
      endDateTime: "2026-08-28T22:00:00Z",
      venue: {
        address: "15 Qasr El Aini St, Garden City",
        city: "Cairo",
        country: "Egypt",
      },
    },
    ticketType: "General",
    seatsBooked: 4,
    totalAmount: 600,
    status: "cancelled",
    cancellationAllowed: false,
    cancellationDeadline: "2026-08-26T12:00:00Z",
    bookingDate: "2026-07-08T11:00:00Z",
    createdAt: "2026-07-08T11:00:00Z",
    updatedAt: "2026-07-09T08:00:00Z",
  },
  {
    _id: "bk005",
    bookingReference: "EVT-2026-005",
    userId: {
      _id: "user003",
      email: "sara@example.com",
      firstName: "Sara",
      lastName: "Mohamed",
      phone: 1098765432,
    },
    eventId: {
      _id: "evt002",
      title: "Egyptian Premier League Final",
      description: mockEvents[1].description,
      images: mockEvents[1].images,
      startDateTime: "2026-09-20T18:00:00Z",
      endDateTime: "2026-09-20T21:00:00Z",
      venue: {
        address: "Nasr City, Cairo Stadium Complex",
        city: "Cairo",
        country: "Egypt",
      },
    },
    ticketType: "VIP",
    seatsBooked: 3,
    totalAmount: 1800,
    status: "confirmed",
    cancellationAllowed: true,
    cancellationDeadline: "2026-09-18T18:00:00Z",
    bookingDate: "2026-07-11T20:00:00Z",
    createdAt: "2026-07-11T20:00:00Z",
    updatedAt: "2026-07-11T20:00:00Z",
  },
  {
    _id: "bk006",
    bookingReference: "EVT-2026-006",
    userId: {
      _id: "user003",
      email: "sara@example.com",
      firstName: "Sara",
      lastName: "Mohamed",
      phone: 1098765432,
    },
    eventId: {
      _id: "evt005",
      title: "Modern Egyptian Art Exhibition",
      description: mockEvents[4].description,
      images: mockEvents[4].images,
      startDateTime: "2026-09-10T10:00:00Z",
      endDateTime: "2026-09-10T20:00:00Z",
      venue: {
        address: "Gezira St, Zamalek",
        city: "Cairo",
        country: "Egypt",
      },
    },
    ticketType: "VIP",
    seatsBooked: 1,
    totalAmount: 300,
    status: "completed",
    cancellationAllowed: false,
    cancellationDeadline: "2026-09-08T10:00:00Z",
    bookingDate: "2026-07-05T15:30:00Z",
    createdAt: "2026-07-05T15:30:00Z",
    updatedAt: "2026-09-10T20:00:00Z",
  },
];

// ─── Mock User (for auth) ──────────────────────────────────────────────────────

export const mockUser = {
  _id: "user002",
  email: "ahmed@example.com",
  firstName: "Ahmed",
  lastName: "Hassan",
  role: "user",
  phone: 1012345678,
};

export const mockAdminUser = {
  _id: "user001",
  email: "admin@eventaty.com",
  firstName: "Admin",
  lastName: "Eventaty",
  role: "admin",
  phone: 1000000000,
};

export const mockToken = "mock-jwt-token-eventaty-2026";

// ─── Helper: Get venues with their events ──────────────────────────────────────

export function getVenueWithEvents(venueId: string) {
  const venue = mockVenues.find((v) => v._id === venueId);
  if (!venue) return null;

  const venueEvents = mockEvents.filter((e) => {
    if (typeof e.venueId === "object" && e.venueId !== null) {
      return e.venueId._id === venueId;
    }
    return e.venueId === venueId;
  });

  return {
    ...venue,
    events: venueEvents,
    eventCount: venueEvents.length,
  };
}
