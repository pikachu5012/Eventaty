import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface TicketSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketName?: string;
  price?: number;
  eventId?: string;
  ticketTypeId?: string;
}

export default function TicketSelectionModal({
  isOpen,
  onClose,
  ticketName = "Ticket",
  price = 0,
  eventId,
  ticketTypeId,
}: TicketSelectionModalProps) {
  const [count, setCount] = useState<number | "">(1);
  const router = useRouter();

  if (!isOpen) return null;

  const validCount = typeof count === "number" && count >= 1 ? count : 1;

  const handleIncrement = () => setCount((prev) => (typeof prev === "number" ? prev + 1 : 1));
  const handleDecrement = () => setCount((prev) => (typeof prev === "number" && prev > 1 ? prev - 1 : 1));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      setCount("");
      return;
    }
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      setCount(parsed);
    }
  };

  const handleInputBlur = () => {
    if (count === "" || count < 1) {
      setCount(1);
    }
  };

  const handleBuyNow = () => {
    // Navigate to booking page with params
    const queryParams = new URLSearchParams({
      eventId: eventId || "",
      ticketTypeId: ticketTypeId || "",
      ticketName: ticketName,
      price: price.toString(),
      quantity: validCount.toString(),
    });
    router.push(`/booking?${queryParams.toString()}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[2rem] w-full max-w-md max-h-[90vh] overflow-y-auto p-8 md:p-10 relative animate-in fade-in zoom-in-95 duration-200 shadow-2xl custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">
            Select Number of Seats
          </h2>
          <p className="text-gray-500 text-sm md:text-base mb-8">
            {ticketName} &bull; <span className="font-semibold text-gray-700">{price.toFixed(2)} EGP</span> per ticket
          </p>

          <div className="flex items-center justify-center gap-6 md:gap-12 mb-10">
            {/* Minus Button */}
            <button
              onClick={handleDecrement}
              disabled={validCount <= 1}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all focus:outline-none ${
                validCount <= 1
                  ? "bg-gray-100 text-gray-300 border border-gray-200 cursor-not-allowed opacity-50"
                  : "bg-[#7C3AED] text-white hover:bg-[#6D28D9] shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
              }`}
              aria-label="Decrease quantity"
            >
              <Minus size={24} strokeWidth={2.5} />
            </button>

            {/* Editable Count Input */}
            <input
              type="number"
              min={1}
              value={count}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onFocus={(e) => e.target.select()}
              className="text-5xl font-semibold text-gray-900 w-24 text-center bg-transparent focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 rounded-xl transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              aria-label="Number of tickets"
            />

            {/* Plus Button */}
            <button
              onClick={handleIncrement}
              className="w-16 h-16 rounded-full bg-[#7C3AED] flex items-center justify-center text-white hover:bg-[#6D28D9] transition-all shadow-lg hover:shadow-xl focus:outline-none transform hover:scale-105 cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus size={24} strokeWidth={2.5} />
            </button>
          </div>

          {/* Running Total */}
          <div className="mb-8 flex items-center justify-between border-t border-gray-100 pt-6 px-2">
            <span className="text-gray-500 font-medium text-base">Total</span>
            <span className="text-2xl font-bold text-[#7C3AED]">
              {(price * validCount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EGP
            </span>
          </div>

          {/* Buy Button */}
          <button
            onClick={handleBuyNow}
            className="w-full bg-[#7C3AED] text-white font-medium text-lg py-4 rounded-full shadow-[0_4px_14px_rgba(124,58,237,0.3)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.45)] hover:-translate-y-0.5 transition-all mb-4 cursor-pointer"
          >
            Buy Now
          </button>

          {/* Cancel */}
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center text-gray-500 underline underline-offset-4 text-sm font-medium hover:text-gray-700 transition-colors h-11 min-h-[44px] cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
