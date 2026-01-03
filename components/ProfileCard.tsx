"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, Delete, Download, Navigation, Ticket } from "lucide-react";
import { useQRCode } from "next-qrcode";
import { Button } from "@/components/ui/button";
import { IBooking } from "@/types/booking";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function ProfileCard({
  data,
  onAction,
  isPast,
}: {
  data: IBooking;
  onAction?: () => void;
  isPast?: boolean;
}) {
  const { SVG } = useQRCode();
  const { token } = useAuth();

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
    <div className="flex lg:flex-row flex-wrap my-5 rounded-lg overflow-hidden shadow-lg">
      <div className={`w-full lg:w-1/3  relative`}>
        <img
          src={data.eventId.images[0]}
          alt="event1"
          className="w-full h-full object-cover"
        />
        {isPast ? (
          <Badge variant="destructive" className="absolute top-3 right-3">
            {data.status == "cancelled" ? "Cancelled" : "Ended"}
          </Badge>
        ) : (
          <Badge variant="secondary" className="absolute top-3 right-3">
            Upcoming
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
            <Calendar className="text-secondary w-5 h-5 mt-1" />
            <div>
              <p className="text-muted-foreground text-sm">Date & Time</p>
              <p>{formatedDate}</p>
              <p>{formatedTime}</p>
            </div>
          </div>
          <div className="flex gap-2 my-3">
            <Navigation className="text-secondary w-5 h-5 mt-1" />
            <div>
              <p className="text-muted-foreground text-sm">Location</p>
              <p>{data.eventId.venue.address}</p>
              <p className="text-primary/70">
                {data.eventId.venue.city + ", " + data.eventId.venue.country}
              </p>
            </div>
          </div>
          <div className="flex gap-2 my-3">
            <Ticket className="text-secondary w-5 h-5 mt-1" />
            <div>
              <p className="text-muted-foreground text-sm">Ticket info</p>
              <p>
                {data.ticketType} x {data.seatsBooked}
              </p>
              <p className="text-secondary">{data.totalAmount}</p>
            </div>
          </div>
        </div>
        <div className="pt-3 my-2">
          <p className="text-muted-foreground text-sm">Booking Reference</p>
          <p className="text-secondary">{data.bookingReference}</p>
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
              Scan QR Code <span className="block">for entry</span>
            </p>

            <Button
              variant="destructive"
              className="w-full bg-eventaty-cancel/50 text-destructive hover:bg-eventaty-cancel/90 cursor-pointer"
              disabled={!data.cancellationAllowed}
              onClick={handleCancelBooking}
            >
              <Delete /> Cancel Booking
            </Button>
            {data.cancellationAllowed ? (
              <p className="text-muted-foreground text-sm my-2">
                Cancellation deadline:{" "}
                {new Date(data.cancellationDeadline).toLocaleDateString()}
              </p>
            ) : (
              <p className="text-muted-foreground text-sm my-2">
                Cancellation Deadline Passed
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
