'use client';

import React, { useState } from 'react';
import { Ticket } from 'lucide-react';
import TicketCard from '@/components/ui/ticket';
import TicketSelectionModal from '@/components/ui/TicketSelectionModal';
import { ITicket } from '@/interfaces/interfaces';

interface TicketsSectionProps {
    eventPrice: number;
    ticketTypes: ITicket[];
}

export default function TicketsSection({ eventPrice, ticketTypes }: TicketsSectionProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<ITicket | null>(null);

    const handleTicketClick = (ticket: ITicket) => {
        setSelectedTicket(ticket);
        setIsModalOpen(true);
    };

    const calculatePrice = (ticket: ITicket) => {
        if (ticket.price) return ticket.price;
        return eventPrice * ticket.priceMultiplier;
    };

    return (
        <>
            {/* Section 2: Tickets */}
            <div className="mb-12 p-8 rounded-3xl bg-[#FFFBF4] border border-[#d4af37]/10">
                <div className="flex items-center gap-3 mb-8">
                    <Ticket className="text-[#d4af37]" size={24} />
                    <h2 className="text-xl font-medium text-gray-800">Ticket Types & Pricing</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ticketTypes.map((ticket) => {
                        const finalPrice = calculatePrice(ticket);
                        return (
                            <div
                                key={ticket.id}
                                onClick={() => handleTicketClick(ticket)}
                                className="cursor-pointer"
                            >
                                <TicketCard
                                    title={ticket.name}
                                    description={ticket.description}
                                    price={`$${finalPrice.toFixed(2)}`}
                                    className="filter drop-shadow-xl hover:-translate-y-1 transition-transform duration-300 ticket-shape"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            <TicketSelectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                ticketName={selectedTicket?.name}
                price={selectedTicket ? calculatePrice(selectedTicket) : 0}
            />
        </>
    );
}
