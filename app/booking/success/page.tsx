"use client";

import React from "react";
import Link from "next/link";
import { Check, Calendar, Ticket } from "lucide-react";

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen bg-eventaty-cream flex items-center justify-center p-4 font-sans">
      
      {/* Main Card */}
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl p-8 md:p-10 text-center animate-in fade-in zoom-in duration-500">
        
        {/* Success Icon */}
        <div className="w-16 h-16 bg-eventaty-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-eventaty-gold/30">
          <Check className="text-eventaty-dark" size={32} strokeWidth={3} />
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-2xl md:text-3xl font-bold text-eventaty-dark mb-3">
          Booking Confirmed!
        </h1>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          Your booking has been successfully confirmed. We've sent a confirmation email with your tickets.
        </p>

        {/* Details Box (Beige Background) */}
        <div className="bg-[#F9F6F0] rounded-xl p-6 mb-8 text-left border border-[#EBE5D5]">
          <div className="grid grid-cols-2 gap-y-6">
            
            {/* Booking Number */}
            <div className="col-span-1">
              <p className="text-xs text-gray-500 mb-1">Booking Number</p>
              <p className="text-sm font-bold text-eventaty-gold tracking-wide">EVT-2025-RCVMI3</p>
            </div>

            {/* Event Name */}
            <div className="col-span-1">
              <p className="text-xs text-gray-500 mb-1">Event</p>
              <p className="text-sm font-semibold text-eventaty-dark truncate">Summer Music Festival 2025</p>
            </div>

            {/* Date & Time */}
            <div className="col-span-1">
              <p className="text-xs text-gray-500 mb-1">Date & Time</p>
              <p className="text-sm font-medium text-gray-700">7/15/2025 at 18:00</p>
            </div>

            {/* Tickets */}
            <div className="col-span-1">
              <p className="text-xs text-gray-500 mb-1">Tickets</p>
              <p className="text-sm font-medium text-gray-700">1 × General Admission</p>
            </div>

            {/* Total Paid */}
            <div className="col-span-2 pt-4 border-t border-gray-200/60 mt-2">
              <div className="flex justify-between items-end">
                <span className="text-xs text-gray-500">Total Paid</span>
                <span className="text-xl font-bold text-eventaty-gold">$99.99</span>
              </div>
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {/* View My Bookings Button */}
          <Link 
            href="/dashboard" 
            className="flex-1 py-3 px-6 rounded-lg bg-eventaty-gold hover:bg-[#c29f2d] text-eventaty-dark font-bold text-sm shadow-md transition-all hover:shadow-lg"
          >
            View My Bookings
          </Link>

          {/* Browse More Button */}
          <Link 
            href="/" 
            className="flex-1 py-3 px-6 rounded-lg bg-eventaty-dark hover:bg-[#1e293b] text-white font-medium text-sm shadow-md transition-all hover:shadow-lg"
          >
            Browse More Events
          </Link>
        </div>

      </div>
    </div>
  );
}