import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TicketSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticketName?: string;
    price?: number;
}

export default function TicketSelectionModal({
    isOpen,
    onClose,
    ticketName = "Ticket",
    price = 0
}: TicketSelectionModalProps) {
    const [count, setCount] = useState(1);
    const router = useRouter();

    if (!isOpen) return null;

    const handleIncrement = () => setCount((prev) => prev + 1);
    const handleDecrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

    const handleBuyNow = () => {
        // Navigate to booking page, potentially passing params in real app
        router.push('/booking');
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-[2rem] w-full max-w-md p-8 md:p-10 relative animate-in fade-in zoom-in-95 duration-200 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-center">
                    <h2 className="text-3xl font-medium text-gray-900 mb-10">
                        Select Number of Tickets
                    </h2>

                    <div className="flex items-center justify-center gap-12 mb-12">
                        {/* Minus Button */}
                        <button
                            onClick={handleDecrement}
                            className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                            aria-label="Decrease quantity"
                        >
                            <Minus size={24} strokeWidth={1.5} />
                        </button>

                        {/* Count */}
                        <span className="text-5xl font-medium text-gray-900 w-12 text-center">
                            {count}
                        </span>

                        {/* Plus Button */}
                        <button
                            onClick={handleIncrement}
                            className="w-16 h-16 rounded-full bg-[#d4af37] flex items-center justify-center text-white hover:bg-[#b5952f] transition-all shadow-lg hover:shadow-xl focus:outline-none transform hover:scale-105"
                            aria-label="Increase quantity"
                        >
                            <Plus size={24} strokeWidth={2} />
                        </button>
                    </div>

                    {/* Buy Button */}
                    <button
                        onClick={handleBuyNow}
                        className="w-full bg-[#d4af37] text-white font-medium text-lg py-4 rounded-full shadow-[0_4px_14px_0_rgba(212,175,55,0.39)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.23)] hover:-translate-y-0.5 transition-all mb-6"
                    >
                        Buy Now
                    </button>

                    {/* Cancel */}
                    <button
                        onClick={onClose}
                        className="text-gray-900 underline underline-offset-4 text-sm font-medium hover:text-gray-600 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
