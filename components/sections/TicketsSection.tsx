"use client";

import React, { useState } from "react";
import { Ticket } from "lucide-react";
import TicketCard from "@/components/ui/ticket";
import TicketSelectionModal from "@/components/ui/TicketSelectionModal";
import { useAuth } from "@/context/AuthContext";
import { AuthOverlay } from "../AuthOverlay";
import { ITicket } from "@/types/event";

interface TicketsSectionProps {
  eventPrice: number;
  ticketTypes: ITicket[];
  eventId: string;
}

export default function TicketsSection({
  eventPrice,
  ticketTypes,
  eventId,
}: TicketsSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<ITicket | null>(null);
  const { user } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Sort tickets in the specified order: General, VIP, VIP Gold, VIP Platinum
  const sortTickets = (tickets: ITicket[]) => {
    const order = ["General", "VIP", "VIP Gold", "VIP Platinum"];
    return [...tickets].sort((a, b) => {
      const indexA = order.indexOf(a.type);
      const indexB = order.indexOf(b.type);
      // If type not found in order array, put it at the end
      const posA = indexA === -1 ? order.length : indexA;
      const posB = indexB === -1 ? order.length : indexB;
      return posA - posB;
    });
  };

  const sortedTickets = sortTickets(ticketTypes);

  const handleTicketClick = (ticket: ITicket) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const calculatePrice = (ticket: ITicket) => {
    return eventPrice * ticket.multiplier;
  };

  return (
    <>
      {/* Section 2: Tickets */}
      <div
        className="mb-12 p-8 rounded-3xl bg-card border border-secondary/10"
        id="tickets"
      >
        <div className="flex items-center gap-3 mb-8">
          <Ticket className="text-secondary" size={24} />
          <h2 className="text-xl font-medium text-primary">
            Ticket Types & Pricing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedTickets.map((ticket) => {
            const finalPrice = calculatePrice(ticket);
            return (
              <div
                key={ticket._id}
                onClick={() => handleTicketClick(ticket)}
                className="cursor-pointer"
              >
                <TicketCard
                  title={ticket.type}
                  description={ticket.description}
                  price={`${finalPrice.toFixed(2)} EGP`}
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
        ticketName={selectedTicket?.type}
        price={selectedTicket ? calculatePrice(selectedTicket) : 0}
        eventId={eventId}
        ticketTypeId={selectedTicket?._id}
      />
      <AuthOverlay open={isAuthOpen} onOpenChange={setIsAuthOpen} noTrigger />
    </>
  );
}
