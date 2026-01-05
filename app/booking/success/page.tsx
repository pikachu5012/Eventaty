"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useQRCode } from "next-qrcode";

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const orderSummary = JSON.parse(searchParams.get("orderSummary") || "{}");
  const bookingReference = searchParams.get("bookingReference") || "N/A";
  const { SVG } = useQRCode();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 font-sans">
      {/* Main Card */}
      <div className="bg-card max-w-lg w-full rounded-2xl shadow-xl p-8 md:p-10 text-center animate-in fade-in zoom-in duration-500">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-eventaty-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-eventaty-gold/30">
          <Check className="text-eventaty-dark" size={32} strokeWidth={3} />
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-3">
          Booking Confirmed!
        </h1>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          Your booking has been successfully confirmed. We've sent a
          confirmation email with your tickets.
        </p>

        {/* Details Box (Beige Background) */}
        <div className="bg-background rounded-xl p-6 mb-8 text-left border border-eventaty-gold">
          <div className="grid grid-cols-2 gap-y-6">
            {/* Booking Number */}
            <div className="col-span-1">
              <p className="text-xs text-primary/60 mb-1">Booking Reference</p>
              <p className="text-sm font-bold text-eventaty-gold tracking-wide">
                {bookingReference}
              </p>
            </div>

            {/* Event Name */}
            <div className="col-span-1 ps-2">
              <p className="text-xs text-primary/60 mb-1">Event</p>
              <p className="text-sm font-semibold text-primary truncate">
                {orderSummary.eventName}
              </p>
            </div>

            {/* Date & Time */}
            <div className="col-span-1">
              <p className="text-xs text-primary/60 mb-1">Date & Time</p>
              <p className="text-sm font-medium text-primary">
                {orderSummary.date} {orderSummary.time}
              </p>
            </div>

            {/* Tickets */}
            <div className="col-span-1 ps-2">
              <p className="text-xs text-primary/60 mb-1">Tickets</p>
              <p className="text-sm font-medium text-primary">
                {orderSummary.quantity} × {orderSummary.ticketType}
              </p>
            </div>
            {/* Venue */}
            <div className="col-span-2 mx-auto pe-4">
              <SVG
                text={bookingReference}
                options={{
                  margin: 3,
                  width: 100,
                  color: {
                    dark: "#000000",
                    light: "#ffffff",
                  },
                }}
              />
            </div>

            {/* Total Paid */}
            <div className="col-span-2 pt-4 border-t border-gray-200/60 mt-2">
              <div className="flex justify-between items-end">
                <span className="text-xs text-primary">Total</span>
                <span className="text-xl font-bold text-eventaty-gold">
                  {orderSummary.total.toFixed(2)} EGP
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {/* View My Bookings Button */}
          <Link
            href="/dashboard"
            className="flex-1 py-3 px-6 rounded-lg bg-eventaty-gold hover:bg-[#b5952f] text-eventaty-dark font-bold text-sm shadow-md transition-all hover:shadow-lg"
          >
            View My Bookings
          </Link>

          {/* Browse More Button */}
          <Link
            href="/events"
            className="flex-1 py-3 px-6 rounded-lg bg-eventaty-dark hover:bg-[#1e293b] text-white font-medium text-sm shadow-md transition-all hover:shadow-lg"
          >
            Browse More Events
          </Link>
        </div>
      </div>
    </div>
  );
}
