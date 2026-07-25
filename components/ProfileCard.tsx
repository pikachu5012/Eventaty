"use client";
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Delete, Navigation } from "lucide-react";
import { useQRCode } from "next-qrcode";
import { Button } from "@/components/ui/button";
import { IBooking } from "@/types/booking";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";

export default function ProfileCard({
  data,
  onAction,
  isPast,
}: {
  data: IBooking;
  onAction?: () => void;
  isPast?: boolean;
}) {
  const t = useTranslations('Dashboard.ProfileCard');
  const { SVG } = useQRCode();
  const { token } = useAuth();

  // Handle case where event has been deleted
  if (!data.eventId) {
    return (
      <div className="my-5 flex flex-wrap rounded-xl overflow-hidden bg-card border border-border/60 p-6 text-center">
        <div className="w-full">
          <p className="text-muted-foreground">{t('eventUnavailable')}</p>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">{t('bookingReference')}</p>
            <p className="text-gray-500 dark:text-gray-400 font-semibold">{data.bookingReference}</p>
          </div>
        </div>
      </div>
    );
  }

  const formatedDate = new Date(data.eventId.startDateTime).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
  const formatedTime = new Date(data.eventId.startDateTime).toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const handleCancelBooking = async () => {
    try {
      await axios.put(
        `/api/booking`,
        {
          status: "cancelled",
          bookingId: data._id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (onAction) onAction();
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  return (
    <div className="my-5 flex flex-col md:flex-row min-h-[220px] rounded-2xl overflow-hidden bg-card border border-border/60 shadow-sm hover:border-violet-500/30 transition-all duration-300">
        {/* Main Section */}
        <div className="flex-1 flex flex-col md:flex-row min-w-0">
          {/* Thumbnail Image */}
          <div className="relative w-full md:w-52 h-52 md:h-auto shrink-0 bg-muted">
            <Image
              src={data.eventId.images[0]}
              alt={data.eventId.title}
              fill
              unoptimized
              className="object-cover"
            />
            {isPast ? (
              <Badge variant="destructive" className="absolute top-3 start-3 shadow-xs">
                {data.status === "cancelled" ? t('cancelled') : t('ended')}
              </Badge>
            ) : (
              <Badge className="absolute top-3 start-3 bg-violet-600 hover:bg-violet-700 text-white shadow-xs">
                {t('upcoming')}
              </Badge>
            )}
          </div>

          {/* Details Column */}
          <div className="flex-1 p-6 md:p-7 flex flex-col justify-between space-y-5">
            <div>
              {/* Event Title */}
              <h3 className="text-lg font-bold text-foreground line-clamp-1 mb-1.5">
                {data.eventId.title}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1.5 mb-5">
                <Navigation className="w-4 h-4 text-violet-500 shrink-0" />
                <span className="truncate">{data.eventId.venue.address}, {data.eventId.venue.city}</span>
              </p>

              {/* Boarding Pass Field Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800">
                {/* Date */}
                <div>
                  <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    {t('dateTime')?.split('/')[0] || 'DATE'}
                  </span>
                  <span className="block text-xs md:text-sm font-semibold text-foreground truncate mt-0.5">
                    {formatedDate}
                  </span>
                </div>

                {/* Time */}
                <div>
                  <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    TIME
                  </span>
                  <span className="block text-xs md:text-sm font-semibold text-foreground truncate mt-0.5">
                    {formatedTime}
                  </span>
                </div>

                {/* Ticket / Seat */}
                <div>
                  <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    SEAT
                  </span>
                  <span className="block text-xs md:text-sm font-semibold text-foreground truncate mt-0.5">
                    {data.ticketType} x {data.seatsBooked}
                  </span>
                </div>

                {/* Total */}
                <div>
                  <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    TOTAL
                  </span>
                  <span className="block text-xs md:text-sm font-bold text-violet-600 dark:text-violet-400 truncate mt-0.5">
                    {data.totalAmount} EGP
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions & Ref */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border/40 text-xs">
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                  REF NO.
                </span>
                <span className="font-mono text-xs md:text-sm font-semibold text-foreground">
                  {data.bookingReference}
                </span>
              </div>

              {!isPast && data.cancellationAllowed && (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    {t('cancelDeadline')} {new Date(data.cancellationDeadline).toLocaleDateString()}
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-9 px-4 text-xs bg-red-600 hover:bg-red-700 text-white rounded-xl cursor-pointer font-medium"
                    onClick={handleCancelBooking}
                  >
                    <Delete className="w-4 h-4 me-1.5" />
                    {t('cancelBooking')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Vertical Dashed Divider */}
        <div className="hidden md:block w-px border-r-2 border-dashed border-zinc-300 dark:border-zinc-700 self-stretch my-3" />

        {/* QR Stub Section (~130px wide) */}
        <div className="w-full md:w-32 shrink-0 bg-zinc-100 dark:bg-zinc-900/90 p-5 flex flex-col items-center justify-center border-t md:border-t-0 border-dashed border-zinc-300 dark:border-zinc-700">
          <div className="bg-white p-2 rounded-xl shadow-xs border border-zinc-200 dark:border-zinc-700">
            <SVG
              text={data.bookingReference}
              options={{
                margin: 1,
                width: 84,
                color: {
                  dark: "#000000",
                  light: "#ffffff",
                },
              }}
            />
          </div>
          <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 mt-2.5 text-center tracking-widest uppercase">
            BOARDING PASS
          </span>
        </div>
      </div>
  );
}
