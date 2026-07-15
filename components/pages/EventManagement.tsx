import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Calendar,
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { IEvent } from "@/types/event";
import {
  getCategoryName,
  getVenueName,
  getVenueAddress,
} from "@/lib/eventUtils";
import { useAuth } from "@/context/AuthContext";
import { EventForm } from "@/components/forms/EventForm";
import { IVenue } from "@/types/venue";
import { useTranslations } from "next-intl";

export default function EventManagement() {
  const t = useTranslations('Dashboard.Admin.Events');
  const [events, setEvents] = useState<IEvent[]>([]);
  const [categories, setCategories] = useState<
    Array<{ _id: string; name: string }>
  >([]);
  const [venues, setVenues] = useState<IVenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | undefined>(
    undefined
  );
  const [isFormLoading, setIsFormLoading] = useState(false);

  const itemsPerPage = 6;
  const { token } = useAuth();

  const fetchData = async () => {
    try {
      setLoading(true);
      const [eventsRes, categoriesRes, venuesRes] = await Promise.all([
        axios.get("/api/events"),
        axios.get("/api/categories"),
        axios.get("/api/venues"),
      ]);

      setEvents(eventsRes.data.data.events);
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
      console.error("Error fetching event data:", err);
      setError(t('error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      const config = token
        ? {
          headers: { Authorization: `Bearer ${token}` },
        }
        : {};

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
      toast.error(
        "Failed to save event. Please check the console for details."
      );
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    toast(t('deleteConfirm'), {
      action: {
        label: t('deleteButton'),
        onClick: async () => {
          try {
            const config = token
              ? {
                headers: { Authorization: `Bearer ${token}` },
              }
              : {};

            await axios.delete(`/api/events/${eventId}`, config);
            toast.success(t('deleteSuccess'));
            fetchData();
          } catch (err) {
            console.error("Error deleting event:", err);
            toast.error(t('deleteError'));
          }
        },
      },
    });
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = filteredEvents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="space-y-6">
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

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-primary">{t('title')}</h2>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11  border-none ring-1 focus-visible:ring-eventaty-gold"
            />
          </div>
          <button
            onClick={handleCreateEvent}
            className="flex items-center gap-2 bg-violet-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-violet-700 transition-colors shadow-sm shadow-violet-600/20 cursor-pointer"
          >
            <Plus className="h-5 w-5" />
            <span className="hidden sm:inline">{t('addEvent')}</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-secondary" />
          <p className="text-primary font-medium">{t('loading')}</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 px-6">
          <p className="text-red-500 font-medium">{error}</p>
          <button
            onClick={fetchData}
            className="mt-4 text-eventaty-gold hover:underline font-semibold"
          >
            {t('retry')}
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
                    <h3 className="font-semibold text-primary">
                      {event.title}
                    </h3>
                    <p className="text-xs text-primary/70">
                      {getCategoryName(event)}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-violet-600 dark:text-violet-400">
                    {event.price} EGP
                  </span>
                </div>

                <div className="space-y-1 text-sm text-primary/70">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-eventaty-gold" />
                    <span>
                      {new Date(event.startDateTime).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full border border-eventaty-gold flex items-center justify-center">
                      <div className="h-1 w-1 bg-eventaty-gold rounded-full"></div>
                    </div>
                    <span className="truncate max-w-[200px]">
                      {getVenueName(event)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-gray-500">
                    {event.availableSeats} {t('seatsLeft')}
                  </span>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/events/${event._id}`}
                      className="p-1.5 text-gray-400 hover:text-blue-600 bg-gray-50 rounded-lg"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleEditEvent(event)}
                      className="p-1.5 text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 bg-gray-50 dark:bg-slate-800 rounded-lg"
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
                <p className="text-gray-400">{t('noEvents')}</p>
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background">
                  <th className="px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {t('tableHeaderEvent')}
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {t('tableHeaderCategory')}
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {t('tableHeaderDate')}
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {t('tableHeaderLocation')}
                  </th>
                  <th className="py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {t('tableHeaderPrice')}
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {t('tableHeaderTickets')}
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    {t('tableHeaderActions')}
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
                          <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${
                            (event.status || "published") === "published"
                              ? "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-400 border-emerald-250 dark:border-emerald-800/30"
                              : (event.status || "published") === "draft"
                              ? "bg-amber-100 dark:bg-amber-950/30 text-amber-800 dark:text-amber-400 border-amber-250 dark:border-amber-800/30"
                              : "bg-rose-100 dark:bg-rose-950/30 text-rose-800 dark:text-rose-400 border-rose-250 dark:border-rose-800/30"
                          }`}>
                            {(event.status || "published") === "published" ? "Active" : event.status}
                          </span>
                          {event.featured && (
                            <span className="inline-block mt-1 bg-amber-100 dark:bg-amber-950/30 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ml-1.5">
                              {t('featured')}
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
                      <td className="py-5 ">
                        <span className="text-sm font-bold text-violet-600 dark:text-violet-400">
                          {event.price} EGP
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm text-primary/70">
                        {event.availableSeats} {t('available')}
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
                            className="p-2 text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/30 rounded-full transition-colors"
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
                <p className="text-gray-400">
                  {t('noEventsMatching')}
                </p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="p-4 md:p-6 border-t border-eventaty-gold flex flex-col md:flex-row items-center justify-between gap-4 bg-card mt-6">
              <div className="text-xs md:text-sm text-primary/70 text-center md:text-left">
                {t('showing')}{" "}
                <span className="font-semibold text-primary">
                  {startIndex + 1}
                </span>{" "}
                {t('to')}{" "}
                <span className="font-semibold text-primary">
                  {Math.min(startIndex + itemsPerPage, filteredEvents.length)}
                </span>{" "}
                {t('of')}{" "}
                <span className="font-semibold text-primary">
                  {filteredEvents.length}
                </span>{" "}
                {t('events')}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  {t('previous')}
                </button>
                <div className="hidden sm:flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-xs md:text-sm font-semibold rounded-lg transition-all ${
                        currentPage === i + 1
                          ? "bg-violet-600 text-white shadow-sm shadow-violet-600/20 cursor-pointer"
                          : "text-gray-700 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-violet-950/30 hover:text-violet-600 dark:hover:text-violet-400 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 cursor-pointer"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <div className="sm:hidden text-xs font-medium text-gray-600">
                  {t('page')} {currentPage} {t('of')} {totalPages}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  {t('next')}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
