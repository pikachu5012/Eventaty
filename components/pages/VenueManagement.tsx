import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Search, Plus, Eye, Pencil, Trash2, MapPin, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { IVenue } from "@/types/venue";
import { useAuth } from "@/context/AuthContext";
import { VenueForm } from "@/components/forms/VenueForm";
import { useTranslations } from "next-intl";

export default function VenueManagement() {
  const t = useTranslations('Dashboard.Admin.Venues');
  const [venues, setVenues] = useState<IVenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<IVenue | undefined>(
    undefined
  );
  const [isFormLoading, setIsFormLoading] = useState(false);

  const itemsPerPage = 6;
  const { token } = useAuth();

  const fetchVenues = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/venues");
      setVenues(
        response.data.data?.venues ||
        response.data?.venues ||
        response.data ||
        []
      );
      setError(null);
    } catch (err) {
      console.error("Error fetching venues:", err);
      setError(t('error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleCreateVenue = () => {
    setSelectedVenue(undefined);
    setIsFormOpen(true);
  };

  const handleEditVenue = (venue: IVenue) => {
    setSelectedVenue(venue);
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

      if (selectedVenue) {
        // Update existing venue
        await axios.put(`/api/venues/${selectedVenue._id}`, data, config);
        toast.success("Venue updated successfully");
      } else {
        // Create new venue
        await axios.post("/api/venues", data, config);
        toast.success("Venue created successfully");
      }

      // Refresh data and close form
      await fetchVenues();
      setIsFormOpen(false);
      setSelectedVenue(undefined);
    } catch (err) {
      console.error("Error saving venue:", err);
      toast.error(
        "Failed to save venue. Please check the console for details."
      );
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleDeleteVenue = (venueId: string) => {
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

            await axios.delete(`/api/venues/${venueId}`, config);
            toast.success(t('deleteSuccess'));
            fetchVenues();
          } catch (err) {
            console.error("Error deleting venue:", err);
            toast.error(t('deleteError'));
          }
        },
      },
    });
  };

  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredVenues.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVenues = filteredVenues.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Form Modal */}
      {isFormOpen && (
        <VenueForm
          open={isFormOpen}
          onOpenChange={(open) => {
            setIsFormOpen(open);
            if (!open) setSelectedVenue(undefined);
          }}
          venue={selectedVenue}
          onSubmit={handleFormSubmit}
          loading={isFormLoading}
        />
      )}

      {/* Header with Search and Add Button */}
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
            onClick={handleCreateVenue}
            className="flex items-center gap-2 bg-eventaty-gold text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#b8962c] transition-colors shadow-sm shadow-eventaty-gold/30 cursor-pointer"
          >
            <Plus className="h-5 w-5" />
            <span className="hidden sm:inline">{t('addVenue')}</span>
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-eventaty-gold" />
          <p className="text-primary font-medium">{t('loading')}</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 px-6">
          <p className="text-red-500 font-medium">{error}</p>
          <button
            onClick={fetchVenues}
            className="mt-4 text-eventaty-gold hover:underline font-semibold"
          >
            {t('retry')}
          </button>
        </div>
      ) : (
        <div className="flex flex-col">
          {/* Mobile Card View */}
          <div className="block md:hidden divide-y divide-eventaty-gold/30">
            {paginatedVenues.map((venue) => (
              <div key={venue._id} className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-primary">{venue.name}</h3>
                    <p className="text-xs text-primary/70 line-clamp-1">
                      {venue.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-1 text-sm text-primary/70">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-eventaty-gold" />
                    <span className="truncate">
                      {venue.city}, {venue.state}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3 text-eventaty-gold" />
                    <span>{t('tableHeaderCapacity')}: {venue.capacity}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Link
                    href={`/venues/${venue._id}`}
                    className="p-1.5 text-gray-400 hover:text-blue-600 bg-gray-50 rounded-lg"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleEditVenue(venue)}
                    className="p-1.5 text-gray-400 hover:text-secondary bg-gray-50 rounded-lg"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteVenue(venue._id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 bg-gray-50 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            {filteredVenues.length === 0 && (
              <div className="text-center py-10 px-6">
                <p className="text-gray-400">{t('noVenues')}</p>
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background">
                  <th className="px-8 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {t('tableHeaderVenue')}
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {t('tableHeaderLocation')}
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {t('tableHeaderCapacity')}
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {t('tableHeaderAmenities')}
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    {t('tableHeaderActions')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-eventaty-gold/30">
                {paginatedVenues.map((venue) => (
                  <tr
                    key={venue._id}
                    className="hover:bg-primary/10 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div>
                        <div className="font-semibold text-primary">
                          {venue.name}
                        </div>
                        <div className="text-xs text-primary/70 mt-0.5 line-clamp-1">
                          {venue.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm text-primary/70">
                        {venue.address}
                      </div>
                      <div className="text-xs text-primary/70 mt-0.5">
                        {venue.city}, {venue.state} {venue.postalCode}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-medium text-primary">
                        {venue.capacity.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-primary/70">
                      {venue.amenities && venue.amenities.length > 0
                        ? t('amenitiesCount', { count: venue.amenities.length })
                        : t('none')}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/venues/${venue._id}`}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleEditVenue(venue)}
                          className="p-2 text-gray-400 hover:text-secondary hover:bg-[#fdfaf3] rounded-full transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteVenue(venue._id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredVenues.length === 0 && (
              <div className="text-center py-20 px-6">
                <p className="text-gray-400">
                  {t('noVenuesMatching')}
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
                  {Math.min(startIndex + itemsPerPage, filteredVenues.length)}
                </span>{" "}
                {t('of')}{" "}
                <span className="font-semibold text-primary">
                  {filteredVenues.length}
                </span>{" "}
                {t('venues')}
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
                      className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-xs md:text-sm font-medium rounded-lg transition-all ${currentPage === i + 1
                          ? "bg-secondary text-white shadow-sm shadow-secondary/30 cursor-pointer"
                          : "text-gray-600 hover:bg-gray-50 hover:text-secondary cursor-pointer"
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
