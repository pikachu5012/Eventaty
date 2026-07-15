"use client";
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Calendar, Delete, Navigation, Ticket } from "lucide-react";
import { useQRCode } from "next-qrcode";
import { Button } from "@/components/ui/button";
import { IBooking } from "@/types/booking";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import BorderGlow from "@/components/BorderGlow/BorderGlow";

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
      <BorderGlow
        className="my-5"
        borderRadius={12}
        glowRadius={50}
        glowIntensity={1.4}
        edgeSensitivity={15}
        glowColor="270 80 70"
        colors={['#c084fc', '#f472b6', '#38bdf8']}
        backgroundColor="var(--card)"
        fillOpacity={0.7}
      >
        <div className="flex lg:flex-row flex-wrap rounded-xl overflow-hidden bg-card">
          <div className="w-full p-6 text-center">
            <p className="text-muted-foreground">{t('eventUnavailable')}</p>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">{t('bookingReference')}</p>
              <p className="text-gray-500 dark:text-gray-400 font-semibold">{data.bookingReference}</p>
            </div>
          </div>
        </div>
      </BorderGlow>
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
      const response = await axios.put(
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
    <BorderGlow
      className="my-5"
      borderRadius={12}
      glowRadius={50}
      glowIntensity={1.4}
      edgeSensitivity={15}
      glowColor="270 80 70"
      colors={['#c084fc', '#f472b6', '#38bdf8']}
      backgroundColor="var(--card)"
      fillOpacity={0.7}
    >
      <div className="flex lg:flex-row flex-wrap rounded-xl overflow-hidden bg-card">
        <div className={`w-full lg:w-1/3 relative min-h-[200px]`}>
          <Image
            src={data.eventId.images[0]}
            alt="event1"
            fill
            unoptimized
            className="object-cover"
          />
          {isPast ? (
            <Badge variant="destructive" className="absolute top-3 right-3">
              {data.status == "cancelled" ? t('cancelled') : t('ended')}
            </Badge>
          ) : (
            <Badge variant="secondary" className="absolute top-3 right-3">
              {t('upcoming')}
            </Badge>
          )}
        </div>
        <div
          className={`${
            isPast ? "w-full lg:w-2/3" : "w-full md:w-1/2 lg:w-1/3"
          } bg-background p-4`}
        >
          <h3 className="text-lg font-semibold">{data.eventId.title}</h3>
          <div className="border-b">
            <div className="flex gap-2 my-3">
              <Calendar className="text-violet-500 dark:text-violet-400 w-5 h-5 mt-1" />
              <div>
                <p className="text-muted-foreground text-sm">{t('dateTime')}</p>
                <p>{formatedDate}</p>
                <p>{formatedTime}</p>
              </div>
            </div>
            <div className="flex gap-2 my-3">
              <Navigation className="text-violet-500 dark:text-violet-400 w-5 h-5 mt-1" />
              <div>
                <p className="text-muted-foreground text-sm">{t('location')}</p>
                <p>{data.eventId.venue.address}</p>
                <p className="text-primary/70">
                  {data.eventId.venue.city + ", " + data.eventId.venue.country}
                </p>
              </div>
            </div>
            <div className="flex gap-2 my-3">
              <Ticket className="text-violet-500 dark:text-violet-400 w-5 h-5 mt-1" />
              <div>
                <p className="text-muted-foreground text-sm">{t('ticketInfo')}</p>
                <p>
                  {data.ticketType} x {data.seatsBooked}
                </p>
                <p className="text-violet-600 dark:text-violet-400 font-bold">{data.totalAmount} EGP</p>
              </div>
            </div>
          </div>
          <div className="pt-3 my-2">
            <p className="text-muted-foreground text-sm">{t('bookingReference')}</p>
            <p className="text-gray-500 dark:text-gray-400 font-medium">{data.bookingReference}</p>
          </div>
        </div>
        {!isPast && (
          <div className={`w-full md:w-1/2 lg:w-1/3 p-5`}>
            <div className="flex flex-col justify-center items-center h-full">
              <div>
                <SVG
                  text={data.bookingReference}
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
              <p className="text-center text-xs text-muted-foreground my-4">
                {t.rich('scanQR', {
                  block: (chunks) => <span className="block">{chunks}</span>
                })}
              </p>

              <Button
                variant="destructive"
                className="w-full bg-destructive  hover:bg-destructive/80 cursor-pointer"
                disabled={!data.cancellationAllowed}
                onClick={handleCancelBooking}
              >
                <Delete /> {t('cancelBooking')}
              </Button>
              {data.cancellationAllowed ? (
                <p className="text-muted-foreground text-sm my-2">
                  {t('cancelDeadline')} {new Date(data.cancellationDeadline).toLocaleDateString()}
                </p>
              ) : (
                <p className="text-muted-foreground text-sm my-2">
                  {t('cancelDeadlinePassed')}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </BorderGlow>
  );
}
