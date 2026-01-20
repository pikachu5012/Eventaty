import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  DollarSign,
  Calendar,
  Users,
  ChartNoAxesGantt,
  Spotlight,
  Loader2,
} from "lucide-react";
import MetricCard from "@/components/MetricCard";
import axios from "axios";
import { IEvent } from "@/types/event";
import { useAuth } from "@/context/AuthContext";
import { IVenue } from "@/types/venue";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import VenueManagement from "@/components/pages/VenueManagement";
import EventManagement from "@/components/pages/EventManagement";

export default function AdminDashboard() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [categories, setCategories] = useState<
    Array<{ _id: string; name: string }>
  >([]);
  const [venues, setVenues] = useState<IVenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { token } = useAuth();

  const fetchData = async () => {
    try {
      setLoading(true);
      const bookingConfig = token
        ? {
            headers: { Authorization: `Bearer ${token}` },
          }
        : {};

      const [eventsRes, bookingsRes, categoriesRes, venuesRes] =
        await Promise.all([
          axios.get("/api/events"),
          axios.get("/api/booking", bookingConfig),
          axios.get("/api/categories"),
          axios.get("/api/venues"),
        ]);

      setEvents(eventsRes.data.data.events);

      // Handle bookings response
      const bookingsData = bookingsRes.data;
      const allBookings =
        bookingsData.data?.bookings ||
        bookingsData?.bookings ||
        bookingsData ||
        [];

      const bookingsCount = allBookings.length;
      setTotalBookings(bookingsCount);

      // Calculate Total Revenue (confirmed or completed bookings)
      const revenue = allBookings
        .filter(
          (b: any) => b.status === "confirmed" || b.status === "completed"
        )
        .reduce((acc: number, curr: any) => acc + (curr.totalAmount || 0), 0);
      setTotalRevenue(revenue);

      setCategories(
        categoriesRes.data.data?.categories ||
          categoriesRes.data?.categories ||
          categoriesRes.data ||
          []
      );
      setVenues(
        venuesRes.data.data?.venues ||
          venuesRes.data?.venues ||
          venuesRes.data ||
          []
      );

      setError(null);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-eventaty-gold" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchData}
          className="text-sm font-medium text-eventaty-gold hover:underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10 space-y-10">
      {/* Metrics Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        <MetricCard
          title="Total Revenue"
          value={`${totalRevenue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} EGP`}
          icon={DollarSign}
          iconColor="text-eventaty-gold"
        />
        <MetricCard
          title="Total Events"
          value={events.length.toString()}
          icon={Calendar}
          iconColor="text-blue-600"
          iconBg="bg-blue-100"
        />
        <MetricCard
          title="Total Bookings"
          value={totalBookings.toString()}
          icon={Users}
          iconColor="text-purple-600"
          iconBg="bg-purple-100"
        />
        <MetricCard
          title="Total Categories"
          value={categories.length.toString()}
          icon={ChartNoAxesGantt}
          iconColor="text-purple-600"
          iconBg="bg-purple-100"
        />
        <MetricCard
          title="Total Venues"
          value={venues.length.toString()}
          icon={Spotlight}
          iconColor="text-purple-600"
          iconBg="bg-purple-100"
        />
      </div>

      {/* Management Tabs */}
      <Tabs defaultValue="events" className="max-w-7xl mx-auto">
        <div className="bg-card rounded-3xl shadow-sm border border-eventaty-gold/50 overflow-hidden">
          <div className="p-6 md:p-8">
            <TabsList className="w-full md:w-auto mb-6">
              <TabsTrigger
                value="events"
                className="flex-1 md:flex-initial px-6"
              >
                Events
              </TabsTrigger>
              <TabsTrigger
                value="venues"
                className="flex-1 md:flex-initial px-6"
              >
                Venues
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="flex-1 md:flex-initial px-6"
              >
                Users
              </TabsTrigger>
            </TabsList>

            <TabsContent value="events">
              <EventManagement />
            </TabsContent>

            <TabsContent value="venues">
              <VenueManagement />
            </TabsContent>
            <TabsContent value="users">
              <div className="flex items-center justify-center ">
                <h1 className="text-2xl font-bold text-primary">
                  Will be implemented soon
                </h1>
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
