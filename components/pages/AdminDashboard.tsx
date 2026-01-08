import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { DollarSign, Calendar, Users, Search, Plus, Eye, Pencil, Trash2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import MetricCard from "@/components/MetricCard";
import axios from "axios";
import { IEvent } from "@/types/event";
import { getCategoryName, getVenueName, getVenueAddress } from "@/lib/eventUtils";
import { useAuth } from "@/context/AuthContext";
import { EventForm } from "@/components/forms/EventForm";
import { IVenue } from "@/types/venue";

export default function AdminDashboard() {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [totalBookings, setTotalBookings] = useState<number>(0);
    const [totalRevenue, setTotalRevenue] = useState<number>(0);
    const [categories, setCategories] = useState<Array<{ _id: string; name: string }>>([]);
    const [venues, setVenues] = useState<IVenue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<IEvent | undefined>(undefined);
    const [isFormLoading, setIsFormLoading] = useState(false);

    const itemsPerPage = 6;
    const { token } = useAuth();

    const fetchData = async () => {
        try {
            setLoading(true);
            const bookingConfig = token ? {
                headers: { Authorization: `Bearer ${token}` }
            } : {};

            const [eventsRes, bookingsRes, categoriesRes, venuesRes] = await Promise.all([
                axios.get("/api/events"),
                axios.get("/api/booking", bookingConfig),
                axios.get("/api/categories"),
                axios.get("/api/venues")
            ]);

            setEvents(eventsRes.data.data.events);

            // Handle bookings response
            const bookingsData = bookingsRes.data;
            const allBookings = bookingsData.data?.bookings || bookingsData?.bookings || bookingsData || [];

            const bookingsCount = allBookings.length;
            setTotalBookings(bookingsCount);

            // Calculate Total Revenue (confirmed or completed bookings)
            const revenue = allBookings
                .filter((b: any) => b.status === "confirmed" || b.status === "completed")
                .reduce((acc: number, curr: any) => acc + (curr.totalAmount || 0), 0);
            setTotalRevenue(revenue);

            // Handle categories and venues
            // Assuming similar structure: data.data.categories or data.categories
            setCategories(categoriesRes.data.data?.categories || categoriesRes.data?.categories || categoriesRes.data || []);
            setVenues(venuesRes.data.data?.venues || venuesRes.data?.venues || venuesRes.data || []);

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

    // Reset to first page when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const handleCreateEvent = () => {
        setSelectedEvent(undefined);
        setIsFormOpen(true);
    };

    const handleEditEvent = (event: IEvent) => {
        setSelectedEvent(event);
        setIsFormOpen(true);
    };

    const handleFormSubmit = async (data: any) => {
        setIsFormLoading(true);
        try {
            const config = token ? {
                headers: { Authorization: `Bearer ${token}` }
            } : {};

            if (selectedEvent) {
                // Update existing event
                await axios.put(`/api/events/${selectedEvent._id}`, data, config);
                toast.success("Event updated successfully");
            } else {
                // Create new event
                await axios.post("/api/events", data, config);
                toast.success("Event created successfully");
            }

            // Refresh data and close form
            await fetchData();
            setIsFormOpen(false);
            setSelectedEvent(undefined);
        } catch (err) {
            console.error("Error saving event:", err);
            toast.error("Failed to save event. Please check the console for details.");
        } finally {
            setIsFormLoading(false);
        }
    };

    const handleDeleteEvent = (eventId: string) => {
        toast("Are you sure you want to delete this event?", {
            action: {
                label: "Delete",
                onClick: async () => {
                    try {
                        const config = token ? {
                            headers: { Authorization: `Bearer ${token}` }
                        } : {};

                        await axios.delete(`/api/events/${eventId}`, config);
                        toast.success("Event deleted successfully");
                        fetchData();
                    } catch (err) {
                        console.error("Error deleting event:", err);
                        toast.error("Failed to delete event.");
                    }
                }
            }
        });
    };

    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedEvents = filteredEvents.slice(startIndex, startIndex + itemsPerPage);

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
                    value={`$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    icon={DollarSign}
                    iconColor="text-eventaty-gold"
                    trend="+12.5%"
                />
                <MetricCard
                    title="Total Events"
                    value={loading ? "..." : events.length.toString()}
                    icon={Calendar}
                    iconColor="text-blue-600"
                    trend={loading ? undefined : "+3 new"}
                    iconBg="bg-blue-100"
                />
                <MetricCard
                    title="Total Bookings"
                    value={loading ? "..." : totalBookings.toString()}
                    icon={Users}
                    iconColor="text-purple-600"
                    trend={loading ? undefined : "+15.3%"}
                    iconBg="bg-purple-100"
                />
            </div>

            {/* Form Modal */}
            {isFormOpen && (
                <EventForm
                    open={isFormOpen}
                    onOpenChange={(open) => {
                        setIsFormOpen(open);
                        if (!open) setSelectedEvent(undefined);
                    }}
                    event={selectedEvent}
                    onSubmit={handleFormSubmit}
                    loading={isFormLoading}
                    categories={categories}
                    venues={venues}
                />
            )}

            {/* Events Management Section */}
            <div className="max-w-7xl mx-auto bg-card rounded-3xl shadow-sm border border-eventaty-gold/50 overflow-hidden">
                <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="text-2xl font-bold text-primary">
                        Events Management
                    </h2>
                    <div className="flex items-center gap-3">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search events..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 h-11 bg-gray-50 border-none focus-visible:ring-1 focus-visible:ring-eventaty-gold"
                            />
                        </div>
                        <button
                            onClick={handleCreateEvent}
                            className="flex items-center gap-2 bg-eventaty-gold text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#b8962c] transition-colors shadow-sm shadow-eventaty-gold/30"
                        >
                            <Plus className="h-5 w-5" />
                            <span className="hidden sm:inline">Add Event</span>
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="h-10 w-10 animate-spin text-secondary" />
                        <p className="text-primary font-medium">Loading events...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 px-6">
                        <p className="text-red-500 font-medium">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 text-eventaty-gold hover:underline font-semibold"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        {/* Mobile Card View */}
                        <div className="block md:hidden divide-y divide-eventaty-gold/30">
                            {paginatedEvents.map((event) => (
                                <div key={event._id} className="p-4 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-primary">{event.title}</h3>
                                            <p className="text-xs text-primary/70">{getCategoryName(event)}</p>
                                        </div>
                                        <span className="text-sm font-bold text-secondary">${event.price}</span>
                                    </div>

                                    <div className="space-y-1 text-sm text-primary/70">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-3 w-3 text-eventaty-gold" />
                                            <span>{new Date(event.startDateTime).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 rounded-full border border-eventaty-gold flex items-center justify-center">
                                                <div className="h-1 w-1 bg-eventaty-gold rounded-full"></div>
                                            </div>
                                            <span className="truncate max-w-[200px]">{getVenueName(event)}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-2">
                                        <span className="text-xs text-gray-500">{event.availableSeats} seats left</span>
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/events/${event._id}`}
                                                className="p-1.5 text-gray-400 hover:text-blue-600 bg-gray-50 rounded-lg"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleEditEvent(event)}
                                                className="p-1.5 text-gray-400 hover:text-secondary bg-gray-50 rounded-lg"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteEvent(event._id)}
                                                className="p-1.5 text-gray-400 hover:text-red-500 bg-gray-50 rounded-lg"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {filteredEvents.length === 0 && (
                                <div className="text-center py-10 px-6">
                                    <p className="text-gray-400">No events found.</p>
                                </div>
                            )}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-background">
                                        <th className="px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Event
                                        </th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Location
                                        </th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Tickets
                                        </th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-eventaty-gold/30">
                                    {paginatedEvents.map((event) => {
                                        const date = new Date(event.startDateTime);
                                        return (
                                            <tr
                                                key={event._id}
                                                className="hover:bg-primary/10 transition-colors"
                                            >
                                                <td className="px-8 py-5">
                                                    <div>
                                                        <div className="font-semibold text-primary">
                                                            {event.title}
                                                        </div>
                                                        {event.featured && (
                                                            <span className="inline-block mt-1 bg-light-green text-chart-2 text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase">
                                                                Featured
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-sm text-primary/70">
                                                    {getCategoryName(event)}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="text-sm font-medium text-primary/70">
                                                        {date.toLocaleDateString()}
                                                    </div>
                                                    <div className="text-[11px] text-primary/70 mt-0.5">
                                                        {date.toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="text-sm text-primary/70">
                                                        {getVenueAddress(event)}
                                                    </div>
                                                    <div className="text-[11px] text-primary/70 mt-0.5">
                                                        {getVenueName(event)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className="text-sm font-bold text-secondary">
                                                        ${event.price}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-sm text-primary/70">
                                                    {event.availableSeats} available
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={`/events/${event._id}`}
                                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleEditEvent(event)}
                                                            className="p-2 text-gray-400 hover:text-secondary hover:bg-[#fdfaf3] rounded-full transition-colors"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteEvent(event._id)}
                                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            {filteredEvents.length === 0 && (
                                <div className="text-center py-20 px-6">
                                    <p className="text-gray-400">No events found matching your search.</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="p-4 md:p-6 border-t border-eventaty-gold flex flex-col md:flex-row items-center justify-between gap-4 bg-card">
                                <div className="text-xs md:text-sm text-primary/70 text-center md:text-left">
                                    Showing <span className="font-semibold text-primary">{startIndex + 1}</span> to{" "}
                                    <span className="font-semibold text-primary">
                                        {Math.min(startIndex + itemsPerPage, filteredEvents.length)}
                                    </span>{" "}
                                    of <span className="font-semibold text-primary">{filteredEvents.length}</span> events
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Previous
                                    </button>
                                    <div className="hidden sm:flex items-center gap-1">
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button
                                                key={i + 1}
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-xs md:text-sm font-medium rounded-lg transition-all ${currentPage === i + 1
                                                    ? "bg-secondary text-white shadow-sm shadow-secondary/30"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-secondary"
                                                    }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="sm:hidden text-xs font-medium text-gray-600">
                                        Page {currentPage} of {totalPages}
                                    </div>
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
