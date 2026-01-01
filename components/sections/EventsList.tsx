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

export default function EventsList({ category }: { category?: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category || "All");
  const [locationFilter, setLocationFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [allEvents, setAllEvents] = useState<IEvent[]>([]);

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

      return matchesSearch && matchesCategory && matchesLocation && matchesDate;
    });
  }, [searchQuery, selectedCategory, locationFilter, dateFilter, allEvents]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setLocationFilter("");
    setDateFilter("");
    setSearchQuery("");
  };
  return (
    <div className="min-h-screen bg-[#fdfbf6] p-8">
      {/*Search Bar*/}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            className="w-full pl-12 py-6 bg-[#f8f5f2] border-none rounded-xl text-lg shadow-sm focus-visible:ring-1 focus-visible:ring-[#d4af37]"
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
        <aside className="w-full md:w-80 flex-shrink-0">
          <EventFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            location={locationFilter}
            setLocation={setLocationFilter}
            date={dateFilter}
            setDate={setDateFilter}
            onClear={clearFilters}
          />
        </aside>

        {/* Main Event Grid */}
        <main className="flex-1">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              <span className="text-[#d4af37]">{filteredEvents.length}</span>{" "}
              events found
            </h2>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => {
                return (
                  <div key={event._id} className="h-full">
                    <CardComponent data={event} isEvent={true} />
                  </div>
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
