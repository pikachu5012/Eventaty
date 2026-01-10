"use client";

import { useState, useMemo, useEffect } from "react";
import CardComponent from "@/components/CardComponent";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import EventFilters from "./EventsFilters";
import axios from "axios";
import { IEvent } from "@/types/event";
import {
  getCategoryName,
  getVenueAddress,
  getVenueCity,
} from "@/lib/eventUtils";
import { motion } from "framer-motion";

export default function EventsList({ category }: { category?: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category || "All");
  const [locationFilter, setLocationFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [allEvents, setAllEvents] = useState<IEvent[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    setSelectedCategory(category || "All");
  }, [category]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`/api/events`);
        setAllEvents(response.data.data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Use utility function to safely get category name (works with populated or unpopulated)
      const matchesCategory =
        selectedCategory === "All" ||
        getCategoryName(event) === selectedCategory;

      // Use utility functions to safely get venue information
      const venueAddress = getVenueAddress(event);
      const venueCity = getVenueCity(event);
      const matchesLocation =
        venueAddress.toLowerCase().includes(locationFilter.toLowerCase()) ||
        venueCity.toLowerCase().includes(locationFilter.toLowerCase());

      const matchesDate =
        !dateFilter ||
        (() => {
          const eventDate = new Date(event.startDateTime);
          const [year, month, day] = dateFilter.split("-").map(Number);
          const filterDate = new Date(year, month - 1, day);

          return (
            eventDate.getFullYear() === filterDate.getFullYear() &&
            eventDate.getMonth() === filterDate.getMonth() &&
            eventDate.getDate() === filterDate.getDate()
          );
        })();

      const matchesNotStarted = new Date(event.startDateTime) > new Date();
      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesDate &&
        matchesNotStarted
      );
    });
  }, [searchQuery, selectedCategory, locationFilter, dateFilter, allEvents]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setLocationFilter("");
    setDateFilter("");
    setSearchQuery("");
  };
  return (
    <div className="min-h-screen bg-background p-8">
      {/*Search Bar*/}
      <div className="max-w-7xl mx-auto mb-8 flex flex-row items-center gap-3">
        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="md:hidden flex items-center justify-center bg-background border border-secondary/30 rounded-xl text-primary hover:bg-secondary/10 transition-colors w-14 h-[60px] shrink-0 dark:bg-navFooter"
        >
          <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </button>

        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            className="w-full pl-12 py-6 bg-background border border-secondary/30 rounded-xl text-lg shadow-sm focus-visible:ring-1 focus-visible:ring-eventaty-gold dark:bg-navFooter h-[60px]"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <motion.aside
          className="w-full md:w-80 shrink-0"
          initial={false}
          animate={{ height: isFiltersOpen || (typeof window !== "undefined" && window.innerWidth >= 768) ? "auto" : 0, opacity: isFiltersOpen || (typeof window !== "undefined" && window.innerWidth >= 768) ? 1 : 0 }}
          style={{ overflow: "hidden" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Mobile vs Desktop logic for filters visibility */}
          <div className={`${isFiltersOpen ? "block" : "hidden md:block"}`}>
            <EventFilters
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              location={locationFilter}
              setLocation={setLocationFilter}
              date={dateFilter}
              setDate={setDateFilter}
              onClear={clearFilters}
            />
          </div>
        </motion.aside>

        {/* Main Event Grid */}
        <main className="flex-1">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-primary">
              <span className="text-secondary">{filteredEvents.length}</span>{" "}
              events found
            </h2>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => {
                return (
                  <motion.div
                    key={event._id}
                    className="h-full"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.02,
                      ease: "easeOut",
                    }}
                  >
                    <CardComponent data={event} isEvent={true} />
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-medium text-gray-600">
                No events found
              </h3>
              <p className="text-gray-400 mt-2">
                Try adjusting your filters or search query.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 text-[#d4af37] hover:underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
