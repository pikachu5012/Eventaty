"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useQRCode } from "next-qrcode";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

function ConfettiBurst() {
  const particles = Array.from({ length: 14 });
  const colors = ["#7C3AED", "#A78BFA", "#EC4899", "#F43F5E", "#10B981", "#3B82F6"];
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible flex items-center justify-center">
      {particles.map((_, i) => {
        const angle = (i * 360) / particles.length;
        const distance = 50 + Math.random() * 40;
        const radian = (angle * Math.PI) / 180;
        const x = Math.cos(radian) * distance;
        const y = Math.sin(radian) * distance;
        const size = 5 + Math.random() * 5;
        const delay = Math.random() * 0.08;
        const color = colors[i % colors.length];

        return (
          <motion.div
            key={i}
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{ scale: [0, 1.2, 0.6, 0], x, y, opacity: [1, 1, 0.4, 0] }}
            transition={{
              duration: 1.1,
              ease: "easeOut",
              delay,
            }}
            style={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: color,
            }}
          />
        );
      })}
    </div>
  );
}

export default function BookingSuccessPage() {
  const t = useTranslations('BookingSuccess');
  const searchParams = useSearchParams();
  const orderSummary = JSON.parse(searchParams.get("orderSummary") || "{}");
  const bookingReference = searchParams.get("bookingReference") || "N/A";
  const { SVG } = useQRCode();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 font-sans">
      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15, ease: "easeOut" }}
        className="bg-card max-w-lg w-full rounded-2xl shadow-xl p-8 md:p-10 text-center border border-gray-200 dark:border-slate-800 relative"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.4,
            ease: [0.34, 1.56, 0.64, 1], // ease-out-back
          }}
          className="w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-600/30 relative"
        >
          <Check className="text-white" size={32} strokeWidth={3} />
          <ConfettiBurst />
        </motion.div>

        {/* Title & Subtitle */}
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-3">
          {t('title')}
        </h1>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          {t('desc')}
        </p>

        {/* Details Box */}
        <div className="bg-background dark:bg-slate-900/30 rounded-xl p-6 mb-8 text-left border border-violet-100 dark:border-violet-900/40">
          <div className="grid grid-cols-2 gap-y-6">
            {/* Booking Number */}
            <div className="col-span-1">
              <p className="text-xs text-primary/60 mb-1">{t('reference')}</p>
              <p className="text-sm font-bold text-violet-600 dark:text-violet-400 tracking-wide">
                {bookingReference}
              </p>
            </div>

            {/* Event Name */}
            <div className="col-span-1 ps-2">
              <p className="text-xs text-primary/60 mb-1">{t('event')}</p>
              <p className="text-sm font-semibold text-primary truncate">
                {orderSummary.eventName}
              </p>
            </div>

            {/* Date & Time */}
            <div className="col-span-1">
              <p className="text-xs text-primary/60 mb-1">{t('dateTime')}</p>
              <p className="text-sm font-medium text-primary">
                {orderSummary.date} {orderSummary.time}
              </p>
            </div>

            {/* Tickets */}
            <div className="col-span-1 ps-2">
              <p className="text-xs text-primary/60 mb-1">{t('tickets')}</p>
              <p className="text-sm font-medium text-primary">
                {orderSummary.quantity} × {orderSummary.ticketType}
              </p>
            </div>
            
            {/* QR Code Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: 0.4, ease: "easeOut" }}
              className="col-span-2 mx-auto pe-0 bg-white p-2 rounded-lg shadow-sm"
            >
              <SVG
                text={bookingReference}
                options={{
                  margin: 1,
                  width: 110,
                  color: {
                    dark: "#000000",
                    light: "#ffffff",
                  },
                }}
              />
            </motion.div>

            {/* Total Paid */}
            <div className="col-span-2 pt-4 border-t border-gray-200/60 dark:border-slate-800/80 mt-2">
              <div className="flex justify-between items-end">
                <span className="text-xs text-primary">Total</span>
                <span className="text-xl font-bold text-violet-600 dark:text-violet-400">
                  {orderSummary.total ? orderSummary.total.toFixed(2) : "0.00"} EGP
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
            className="flex-1 py-3 px-6 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm shadow-md transition-all hover:shadow-lg active:scale-[0.97] duration-100 cursor-pointer flex items-center justify-center"
          >
            {t('viewBookings')}
          </Link>

          {/* Browse More Button */}
          <Link
            href="/events"
            className="flex-1 py-3 px-6 rounded-lg bg-transparent hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 font-medium text-sm transition-all shadow-sm active:scale-[0.97] duration-100 cursor-pointer flex items-center justify-center"
          >
            {t('browseMore')}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
