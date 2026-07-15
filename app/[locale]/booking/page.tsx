"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, Check, ShieldCheck, CreditCard, Smartphone, Lock } from "lucide-react";
import axios from "axios";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { IEvent } from "@/types/event";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { StepIndicator, StepConnector } from "@/components/Stepper/Stepper";
import { motion, AnimatePresence } from "framer-motion";

export default function CompleteBookingPage() {
  const t = useTranslations('Booking');
  const params = useParams();
  const locale = (params?.locale as "en" | "ar") || "en";

  const [isAgreed, setIsAgreed] = useState(false);
  const { user, token } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");

  // Step states
  const [currentBookingStep, setCurrentBookingStep] = useState<2 | 3>(2);
  const [bookingRef, setBookingRef] = useState("");

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<"card" | "wallet" | "paypal">("card");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [phone, setPhone] = useState("");

  const formData = {
    fullName: user?.firstName + " " + user?.lastName,
    email: user?.email,
    phone: user?.phone || "Phone Number must be provided in profile",
  };

  const [orderSummary, setOrderSummary] = useState({
    eventName: t('loading'),
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
          ticketType: orderSummary.ticketType,
          customerName: formData.fullName,
          customerEmail: formData.email,
          eventName: orderSummary.eventName,
          date: orderSummary.date,
          time: (orderSummary as any).time,
          total: orderSummary.total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const bookingReference =
        res.data.data.newBooking.bookingReference || res.data.bookingReference;

      setBookingRef(bookingReference);
      setCurrentBookingStep(3);
    } catch (error: any) {
      console.error("Booking failed:", error);
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Booking failed. Please try again.";
      toast.error(message);
    } finally {
      setIsBooking(false);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      toast.success(locale === "ar" ? "تمت عملية الدفع بنجاح!" : "Payment completed successfully!");

      router.push(
        `/booking/success?eventId=${eventId}&bookingReference=${bookingRef}&orderSummary=${encodeURIComponent(
          JSON.stringify(orderSummary)
        )}`
      );
    }, 2000);
  };

  // Helper for spacing card number
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = val.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setCardNumber(parts.join(" "));
    } else {
      setCardNumber(val);
    }
  };

  // Helper for expiry date MM/YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\//g, "").replace(/[^0-9]/gi, "");
    if (val.length >= 2) {
      setExpiry(val.substring(0, 2) + "/" + val.substring(2, 4));
    } else {
      setExpiry(val);
    }
  };
  return (
    <div className="min-h-screen bg-background font-sans pb-20">
      {/* === HEADER SECTION === */}
      <div className="bg-navFooter text-white pt-20 pb-40 px-4 relative">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>

          {/* Stepper Component */}
          <div className="flex items-center gap-6 text-sm font-medium max-w-lg">
            <div className="flex items-center gap-3">
              <StepIndicator step={1} currentStep={currentBookingStep} disableStepIndicators={true} onClickStep={() => {}} />
              <span className="text-gray-300">{t('step1')}</span>
            </div>

            <div className="w-12">
              <StepConnector isComplete={currentBookingStep >= 2} />
            </div>

            <div className="flex items-center gap-3">
              <StepIndicator step={2} currentStep={currentBookingStep} disableStepIndicators={true} onClickStep={() => {}} />
              <span className={currentBookingStep === 2 ? "text-white font-bold" : "text-gray-300"}>{t('step2')}</span>
            </div>

            <div className="w-12">
              <StepConnector isComplete={currentBookingStep > 2} />
            </div>

            <div className="flex items-center gap-3">
              <StepIndicator step={3} currentStep={currentBookingStep} disableStepIndicators={true} onClickStep={() => {}} />
              <span className={currentBookingStep === 3 ? "text-white font-bold" : "text-gray-300"}>{locale === 'ar' ? 'الدفع' : 'Payment'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="container mx-auto max-w-5xl px-4 -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- LEFT COLUMN: Form --- */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-gray-200 dark:border-slate-800 rounded-xl shadow-lg p-8">
              {currentBookingStep === 2 ? (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    {t('confirmTitle')}
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {t('fullName')}
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all bg-white dark:bg-slate-900 text-gray-900 dark:text-white font-medium"
                        readOnly
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {t('email')}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all bg-white dark:bg-slate-900 text-gray-900 dark:text-white font-medium"
                        readOnly
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {t('phone')}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all bg-white dark:bg-slate-900 text-gray-900 dark:text-white font-medium"
                        readOnly
                      />
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      {t('profileNote')}
                    </p>

                    {/* Terms Checkbox */}
                    <div className="pt-2 flex items-start gap-3">
                      <div className="relative flex items-center mt-0.5">
                        <input
                          type="checkbox"
                          id="terms"
                          checked={isAgreed}
                          onChange={(e) => setIsAgreed(e.target.checked)}
                          className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 shadow-sm checked:border-[#7C3AED] checked:bg-[#7C3AED] hover:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]/50 animate-none"
                        />
                        <Check
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                          size={12}
                          strokeWidth={3}
                        />
                      </div>
                      <label
                        htmlFor="terms"
                        className="text-xs text-gray-500 dark:text-gray-400 cursor-pointer select-none leading-tight"
                      >
                        {t('agree')}
                      </label>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4">
                      <button
                        type="button"
                        className="flex-1 py-3 px-6 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors text-sm cursor-pointer"
                        onClick={() => router.push(`/events/${eventId}`)}
                      >
                        {t('back')}
                      </button>

                      <button
                        onClick={handleSubmit}
                        type="submit"
                        disabled={!isAgreed || isBooking}
                        className={`
                          flex-1 py-3 px-6 rounded-lg font-bold text-white flex items-center justify-center gap-2 shadow-sm transition-all text-sm
                          ${isAgreed && !isBooking
                            ? "bg-[#7C3AED] hover:bg-[#6D28D9] hover:shadow-md cursor-pointer"
                            : "bg-[#7C3AED]/35 text-white/50 cursor-not-allowed shadow-none"
                          }
                        `}
                      >
                        <span>
                          {isBooking ? t('processing') : t('complete')}
                        </span>
                        {isAgreed && !isBooking && <ShieldCheck size={16} />}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    {locale === "ar" ? "تفاصيل الدفع" : "Payment Details"}
                  </h2>

                  {/* Payment Method Selector */}
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {/* Card Option */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all border cursor-pointer ${
                        paymentMethod === "card"
                          ? "border-violet-600 dark:border-violet-500 bg-violet-500/10 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400 font-semibold"
                          : "border-gray-200 dark:border-slate-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-900/40 bg-white dark:bg-slate-900"
                      }`}
                    >
                      <CreditCard size={20} className="mb-2" />
                      <span className="text-xs">{locale === "ar" ? "بطاقة ائتمان" : "Card"}</span>
                    </button>

                    {/* Wallet Option */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("wallet")}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all border cursor-pointer ${
                        paymentMethod === "wallet"
                          ? "border-violet-600 dark:border-violet-500 bg-violet-500/10 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400 font-semibold"
                          : "border-gray-200 dark:border-slate-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-900/40 bg-white dark:bg-slate-900"
                      }`}
                    >
                      <Smartphone size={20} className="mb-2" />
                      <span className="text-xs">{locale === "ar" ? "محفظة الهاتف" : "Mobile Wallet"}</span>
                    </button>

                    {/* PayPal Option */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("paypal")}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all border cursor-pointer ${
                        paymentMethod === "paypal"
                          ? "border-violet-600 dark:border-violet-500 bg-violet-500/10 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400 font-semibold"
                          : "border-gray-200 dark:border-slate-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-900/40 bg-white dark:bg-slate-900"
                      }`}
                    >
                      <span className="font-bold text-sm mb-2 italic">PP</span>
                      <span className="text-xs">{locale === "ar" ? "باي بال" : "PayPal"}</span>
                    </button>
                  </div>

                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                      {paymentMethod === "card" && (
                        <motion.div
                          key="card-form"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                        >
                          {/* Card Number */}
                          <div className="space-y-1.5 relative">
                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              {locale === "ar" ? "رقم البطاقة" : "Card Number"}
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                maxLength={19}
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                required
                                placeholder="0000 0000 0000 0000"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none bg-white dark:bg-slate-900 transition-all pr-12 text-sm text-gray-900 dark:text-white"
                              />
                              <CreditCard size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                          </div>

                          {/* Expiry & CVV */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                {locale === "ar" ? "تاريخ الانتهاء" : "Expiry Date (MM/YY)"}
                              </label>
                              <input
                                type="text"
                                maxLength={5}
                                value={expiry}
                                onChange={handleExpiryChange}
                                required
                                placeholder="MM/YY"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none bg-white dark:bg-slate-900 transition-all text-sm text-gray-900 dark:text-white"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                {locale === "ar" ? "الرمز السري (CVV)" : "CVV"}
                              </label>
                              <input
                                type="password"
                                maxLength={4}
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ""))}
                                required
                                placeholder="***"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none bg-white dark:bg-slate-900 transition-all text-sm text-gray-900 dark:text-white"
                              />
                            </div>
                          </div>

                          {/* Cardholder Name */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              {locale === "ar" ? "اسم صاحب البطاقة" : "Cardholder Name"}
                            </label>
                            <input
                              type="text"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              required
                              placeholder="John Doe"
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none bg-white dark:bg-slate-900 transition-all text-sm text-gray-900 dark:text-white"
                            />
                          </div>
                        </motion.div>
                      )}

                      {paymentMethod === "wallet" && (
                        <motion.div
                          key="wallet-form"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                        >
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              {locale === "ar" ? "رقم هاتف المحفظة" : "Wallet Phone Number"}
                            </label>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required
                              placeholder="01xxxxxxxxx"
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none bg-white dark:bg-slate-900 transition-all text-sm text-gray-900 dark:text-white"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {locale === "ar"
                              ? "ستتلقى رسالة تأكيد على هاتفك لإتمام عملية الدفع."
                              : "You'll receive a prompt on your phone to confirm payment."}
                          </p>
                        </motion.div>
                      )}

                      {paymentMethod === "paypal" && (
                        <motion.div
                          key="paypal-form"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="py-6 flex flex-col items-center justify-center text-center space-y-3"
                        >
                          <span className="text-5xl font-extrabold italic text-blue-600 select-none">PayPal</span>
                          <p className="text-sm text-muted-foreground max-w-sm">
                            {locale === "ar"
                              ? "سيتم إعادة توجيهك إلى PayPal لإكمال الدفع بأمان."
                              : "You'll be redirected to PayPal to complete your payment securely."}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <div className="pt-4 flex gap-4">
                      <button
                        type="button"
                        className="py-3 px-6 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors text-sm cursor-pointer"
                        onClick={() => setCurrentBookingStep(2)}
                      >
                        {t('back')}
                      </button>

                      <button
                        type="submit"
                        disabled={isProcessingPayment}
                        className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium text-lg py-3 rounded-full shadow-[0_4px_14px_rgba(124,58,237,0.3)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.45)] hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center"
                      >
                        {isProcessingPayment ? (
                          <span>{locale === "ar" ? "جاري معالجة الدفع..." : "Processing Payment..."}</span>
                        ) : paymentMethod === "card" ? (
                          <span>
                            {(locale === "ar" ? "دفع {amount} جنيه" : "Pay {amount} EGP").replace(
                              "{amount}",
                              orderSummary.total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                            )}
                          </span>
                        ) : paymentMethod === "wallet" ? (
                          <span>{locale === "ar" ? "إرسال طلب الدفع" : "Send Payment Request"}</span>
                        ) : (
                          <span>{locale === "ar" ? "المتابعة إلى PayPal" : "Continue to PayPal"}</span>
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Secured trust badge (Card/Wallet only) */}
                  {paymentMethod !== "paypal" && (
                    <div className="mt-6 flex items-center justify-center gap-1.5 text-gray-400 dark:text-gray-500 text-[11px] font-medium uppercase tracking-wider">
                      <Lock size={12} />
                      <span>{locale === "ar" ? "دفع آمن ومُشفر" : "Secured and encrypted payment"}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* --- RIGHT COLUMN: Order Summary --- */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl shadow-lg border border-gray-200 dark:border-slate-800 overflow-hidden sticky top-8">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  {t('summaryTitle')}
                </h3>

                <div className="flex gap-4 mb-6">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-200 relative border border-gray-100 dark:border-slate-800">
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
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white leading-tight mb-2">
                      {orderSummary.eventName}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                      <Calendar size={12} />
                      <span>{orderSummary.date}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-slate-800">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-4">
                    <span>{t('ticketType')}</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {orderSummary.ticketType}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{t('quantity')}</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {orderSummary.quantity}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{t('pricePerTicket')}</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {orderSummary.price.toFixed(2)} EGP
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100 dark:border-slate-800">
                  <span className="text-gray-900 dark:text-white font-bold text-sm">{t('total')}</span>
                  <span className="text-xl font-bold text-violet-600 dark:text-violet-400">
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
