'use client'

import { useState, useMemo } from 'react';
import CardComponent from '@/components/CardComponent';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { venues } from '@/lib/data';
import { IVenue } from '@/interfaces/interfaces';


export default function VenuesList() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredVenues = useMemo(() => {
        return venues.filter((venue) => {
            const matchesSearch = venue.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            return matchesSearch;
        });
    }, [searchQuery]);

    return (
        <div className="min-h-screen bg-[#fdfbf6] p-8">
            {/*Search Bar*/}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input className="w-full pl-12 py-6 bg-[#f8f5f2] border-none rounded-xl text-lg shadow-sm focus-visible:ring-1 focus-visible:ring-[#d4af37]"
                        placeholder="Search venues..."
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mt-8">All venues</h2>
            </div>

            {/* Main Venus Grid */}
            <main className="max-w-7xl mx-auto">
                {filteredVenues.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredVenues.map((venue: IVenue) => (
                            <div key={venue.id} className="h-full">
                                <CardComponent data={venue} isEvent={false} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                        <h3 className="text-xl font-medium text-gray-600">No venues found</h3>
                        <p className="text-gray-400 mt-2">Try adjusting your search query.</p>
                        <button onClick={() => setSearchQuery('')} className="mt-4 text-[#d4af37] hover:underline">
                            Clear Search
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
