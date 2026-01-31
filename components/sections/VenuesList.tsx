"use client";

import { useState, useMemo, useEffect } from "react";
import CardComponent from "@/components/CardComponent";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { IVenue } from "@/types/venue";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function VenuesList() {
  const t = useTranslations('Venues');
  const [searchQuery, setSearchQuery] = useState("");
  const [allVenues, setAllVenues] = useState<IVenue[]>([]);

  const filteredVenues = useMemo(() => {
    return allVenues.filter((venue) => {
      const matchesSearch = venue.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery, allVenues]);
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch("/api/venues");
        const data = await response.json();
        setAllVenues(data.data.venues);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVenues();
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">
      {/*Search Bar*/}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            className="w-full pl-12 py-6 bg-background border border-secondary/30 rounded-xl text-lg shadow-sm focus-visible:ring-1 focus-visible:ring-secondary dark:bg-navFooter"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
          />
        </div>
        <h2 className="text-2xl font-bold text-primary mt-8">{t('allVenues')}</h2>
      </div>

      {/* Main Venus Grid */}
      <main className="max-w-7xl mx-auto">
        {filteredVenues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue: IVenue, index) => (
              <motion.div
                key={venue._id}
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
                <CardComponent data={venue} isEvent={false} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-xl shadow-sm">
            <h3 className="text-xl font-medium text-gray-600">
              {t('noVenues')}
            </h3>
            <p className="text-gray-400 mt-2">
              {t('noVenuesDesc')}
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-eventaty-gold hover:underline"
            >
              {t('clearSearch')}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
