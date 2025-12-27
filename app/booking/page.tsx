"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Check,
  ShieldCheck
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function CompleteBookingPage() {
  const [isAgreed, setIsAgreed] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Ahmed Mohammed",
    email: "ahmed@gmail.com",
    phone: "1234567890"
  });

  const orderSummary = {
    eventName: "Tech Innovation Conference 2025",
    date: "8/10/2025",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    ticketType: "Early Bird",
    quantity: 1,
    price: 199.00,
    total: 199.00
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed) return;
    // alert("Booking Completed Successfully! 🚀");
    router.push('/booking/success');
  };
  // const handleCompleteBooking = () => {
  //   router.push('/booking/success');
  // };
  return (
    <div className="min-h-screen bg-eventaty-cream font-sans pb-20">

      {/* === HEADER SECTION === */}
      {/* pb-40: ارتفاع مناسب يسمح بالتداخل من غير ما يكون طويل زيادة */}
      <div className="bg-eventaty-dark text-white pt-20 pb-40 px-4 relative">
        {/* max-w-5xl: عشان نلم المحتوى في النص زي التصميم بالظبط */}
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold mb-6">Complete Your Booking</h1>

          {/* Stepper Component */}
          <div className="flex items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-2 text-eventaty-gold">
              <div className="w-8 h-8 rounded-full bg-eventaty-gold text-eventaty-dark flex items-center justify-center">
                <Check size={18} strokeWidth={3} />
              </div>
              <span>Select Tickets</span>
            </div>

            <div className="w-16 h-[2px] bg-gray-600"></div>

            <div className="flex items-center gap-2 text-eventaty-gold">
              <div className="w-8 h-8 rounded-full bg-eventaty-gold text-eventaty-dark flex items-center justify-center font-bold">
                2
              </div>
              <span>Confirm</span>
            </div>
          </div>
        </div>
      </div>

      {/* === MAIN CONTENT === */}
      {/* -mt-24: يرفع الكروت لفوق عشان تغطي جزء من الكحلي */}
      {/* max-w-5xl: نفس عرض الهيدر عشان يمشوا مسطرة واحدة */}
      <div className="container mx-auto max-w-5xl px-4 -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* --- LEFT COLUMN: Form --- */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-eventaty-dark mb-6">Confirm Your Booking</h2>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-600">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-eventaty-gold focus:ring-1 focus:ring-eventaty-gold outline-none transition-all bg-white text-gray-800"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-600">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-eventaty-gold focus:ring-1 focus:ring-eventaty-gold outline-none transition-all bg-white text-gray-800"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-600">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-eventaty-gold focus:ring-1 focus:ring-eventaty-gold outline-none transition-all bg-white text-gray-800"
                  />
                </div>

                {/* Terms Checkbox */}
                <div className="pt-2 flex items-start gap-3">
                  <div className="relative flex items-center mt-0.5">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={isAgreed}
                      onChange={(e) => setIsAgreed(e.target.checked)}
                      className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 shadow-sm checked:border-eventaty-gold checked:bg-eventaty-gold hover:border-eventaty-gold focus:outline-none focus:ring-1 focus:ring-eventaty-gold/50"
                    />
                    <Check
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                      size={12}
                      strokeWidth={3}
                    />
                  </div>
                  <label htmlFor="terms" className="text-xs text-gray-500 cursor-pointer select-none leading-tight">
                    I agree to the terms and conditions and understand the cancellation policy
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4">
                  <button
                    type="button"
                    className="flex-1 py-3 px-6 rounded-lg bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-colors text-sm"
                  >
                    Back
                  </button>

                  <button
                    onClick={handleSubmit}
                    type="submit"
                    disabled={!isAgreed}
                    className={`
                      flex-1 py-3 px-6 rounded-lg font-bold text-white flex items-center justify-center gap-2 shadow-sm transition-all text-sm
                      ${isAgreed
                        ? "bg-eventaty-gold hover:bg-[#c29f2d] hover:shadow-md cursor-pointer"
                        : "bg-[#E5DCC5] text-gray-400 cursor-not-allowed shadow-none"
                      }
                    `}
                  >
                    <span>Complete Booking</span>
                    {isAgreed && <ShieldCheck size={16} />}
                  </button>
                </div>

              </form>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Order Summary --- */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-50 overflow-hidden sticky top-8">
              <div className="p-6">
                <h3 className="text-lg font-bold text-eventaty-dark mb-4">Order Summary</h3>

                <div className="flex gap-4 mb-6">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 relative">
                    <Image
                      src={orderSummary.image}
                      alt="Event"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-800 leading-tight mb-2">{orderSummary.eventName}</h4>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Calendar size={12} />
                      <span>{orderSummary.date}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-gray-100">
                  <div className="flex justify-between text-xs text-gray-500 mt-4">
                    <span>Ticket Type</span>
                    <span className="font-medium text-gray-900">{orderSummary.ticketType}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Quantity</span>
                    <span className="font-medium text-gray-900">{orderSummary.quantity}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Price per ticket</span>
                    <span className="font-medium text-gray-900">${orderSummary.price.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                  <span className="text-gray-900 font-bold text-sm">Total</span>
                  <span className="text-xl font-bold text-eventaty-gold">${orderSummary.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}   