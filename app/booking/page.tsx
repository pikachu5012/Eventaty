"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, Check, ShieldCheck } from "lucide-react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { IEvent } from "@/types/event";
import { useAuth } from "@/context/AuthContext";

export default function CompleteBookingPage() {
  const [isAgreed, setIsAgreed] = useState(false);
  const { user, token } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");

  const formData = {
    fullName: user?.firstName + " " + user?.lastName,
    email: user?.email,
    phone: user?.phone || "Not Provided",
  };

  const [orderSummary, setOrderSummary] = useState({
    eventName: "Loading...",
    date: "",
    image: "",
    ticketType: searchParams.get("ticketName") || "Standard Ticket",
    quantity: Number(searchParams.get("quantity")) || 1,
    price: Number(searchParams.get("price")) || 0,
    total: 0,
  });
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    if (eventId) {
      const fetchEvent = async () => {
        try {
          const response = await axios.get(`/api/events/${eventId}`);
          const event: IEvent =
            response.data.data?.event ||
            response.data.event ||
            response.data ||
            null;

          if (event) {
            let formattedDate = "";
            let formattedTime = "";
            if (event.startDateTime) {
              try {
                const eventDateObj = new Date(event.startDateTime);
                formattedDate = eventDateObj.toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                });
                formattedTime = eventDateObj.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              } catch (e) {
                formattedDate = event.startDateTime;
                formattedTime = event.startDateTime;
              }
            }

            setOrderSummary((prev) => ({
              ...prev,
              eventName: event.title,
              date: formattedDate,
              time: formattedTime,
              image: event.images?.[0] || "/ekko.png",
              total: prev.quantity * prev.price,
            }));
          }
        } catch (error) {
          console.error("Error fetching event details:", error);
        }
      };
      fetchEvent();
    } else {
      // Calculate total if eventId is missing but we have price/qty
      setOrderSummary((prev) => ({
        ...prev,
        total: prev.quantity * prev.price,
      }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed || !user) return;

    setIsBooking(true);
    try {
      const res = await axios.post(
        "/api/booking",
        {
          eventId,
          seatsBooked: orderSummary.quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const bookingReference =
        res.data.data.newBooking.bookingReference || res.data.bookingReference;

      router.push(
        `/booking/success?eventId=${eventId}&bookingReference=${bookingReference}&orderSummary=${JSON.stringify(
          orderSummary
        )}`
      );
    } catch (error: any) {
      console.error("Booking failed:", error);
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Booking failed. Please try again.";
      alert(message);
    } finally {
      setIsBooking(false);
    }
  };
  return (
    <div className="min-h-screen bg-background font-sans pb-20">
      {/* === HEADER SECTION === */}
      <div className="bg-navFooter text-white pt-20 pb-40 px-4 relative">
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
      <div className="container mx-auto max-w-5xl px-4 -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- LEFT COLUMN: Form --- */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-eventaty-dark mb-6">
                Confirm Your Personal Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-600">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-eventaty-gold focus:ring-1 focus:ring-eventaty-gold outline-none transition-all bg-white text-muted-foreground"
                    readOnly
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-600">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-eventaty-gold focus:ring-1 focus:ring-eventaty-gold outline-none transition-all bg-white text-muted-foreground"
                    readOnly
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-600">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-eventaty-gold focus:ring-1 focus:ring-eventaty-gold outline-none transition-all bg-white text-muted-foreground"
                    readOnly
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  For any change in the personal information, please go to the
                  profile page
                </p>

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
                  <label
                    htmlFor="terms"
                    className="text-xs text-gray-500 cursor-pointer select-none leading-tight"
                  >
                    I agree to the terms and conditions and understand the
                    cancellation policy
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4">
                  <button
                    type="button"
                    className="flex-1 py-3 px-6 rounded-lg bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-colors text-sm cursor-pointer"
                    onClick={() => router.push(`/events/${eventId}`)}
                  >
                    Back
                  </button>

                  <button
                    onClick={handleSubmit}
                    type="submit"
                    disabled={!isAgreed || isBooking}
                    className={`
                      flex-1 py-3 px-6 rounded-lg font-bold text-white flex items-center justify-center gap-2 shadow-sm transition-all text-sm
                      ${
                        isAgreed && !isBooking
                          ? "bg-eventaty-gold hover:bg-[#c29f2d] hover:shadow-md cursor-pointer"
                          : "bg-[#E5DCC5] text-gray-400 cursor-not-allowed shadow-none"
                      }
                    `}
                  >
                    <span>
                      {isBooking ? "Processing..." : "Complete Booking"}
                    </span>
                    {isAgreed && !isBooking && <ShieldCheck size={16} />}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Order Summary --- */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-50 overflow-hidden sticky top-8">
              <div className="p-6">
                <h3 className="text-lg font-bold text-eventaty-dark mb-4">
                  Order Summary
                </h3>

                <div className="flex gap-4 mb-6">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 relative">
                    {orderSummary.image && (
                      <Image
                        src={orderSummary.image}
                        alt="Event"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-800 leading-tight mb-2">
                      {orderSummary.eventName}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Calendar size={12} />
                      <span>{orderSummary.date}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-gray-100">
                  <div className="flex justify-between text-xs text-gray-500 mt-4">
                    <span>Ticket Type</span>
                    <span className="font-medium text-gray-900">
                      {orderSummary.ticketType}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Quantity</span>
                    <span className="font-medium text-gray-900">
                      {orderSummary.quantity}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Price per ticket</span>
                    <span className="font-medium text-gray-900">
                      {orderSummary.price.toFixed(2)} EGP
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                  <span className="text-gray-900 font-bold text-sm">Total</span>
                  <span className="text-xl font-bold text-eventaty-gold">
                    {orderSummary.total.toFixed(2)} EGP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
