"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, Delete, Download, Navigation, Ticket } from "lucide-react";
import { useQRCode } from "next-qrcode";
import { Button } from "@/components/ui/button";

export default function ProfileCard({ isPast }: { isPast?: boolean }) {
  const { SVG } = useQRCode();

  return (
    <div className="flex lg:flex-row flex-wrap my-5 rounded-lg overflow-hidden shadow-lg">
      <div className={`w-full lg:w-1/3  relative`}>
        <img
          src="/ninja.png"
          alt="event1"
          className="w-full h-full object-cover"
        />
        {isPast ? (
          <Badge variant="destructive" className="absolute top-3 right-3">
            Ended
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
        <h3 className="text-lg font-semibold">Summer Music Festival 2025</h3>
        <div className="border-b">
          <div className="flex gap-2 my-3">
            <Calendar className="text-secondary w-5 h-5 mt-1" />
            <div>
              <p className="text-muted-foreground text-sm">Date & Time</p>
              <p>Tue, Jul 15, 2025</p>
              <p>18:00</p>
            </div>
          </div>
          <div className="flex gap-2 my-3">
            <Navigation className="text-secondary w-5 h-5 mt-1" />
            <div>
              <p className="text-muted-foreground text-sm">Location</p>
              <p>Grand Arena</p>
              <p className="text-primary/70">Downtown District</p>
            </div>
          </div>
          <div className="flex gap-2 my-3">
            <Ticket className="text-secondary w-5 h-5 mt-1" />
            <div>
              <p className="text-muted-foreground text-sm">Ticket info</p>
              <p>VIP x 1</p>
              <p className="text-secondary">$249.99</p>
            </div>
          </div>
        </div>
        <div className="pt-3 my-2">
          <p className="text-muted-foreground text-sm">Booking Number</p>
          <p className="text-secondary">EVT-2025-F7XBCO</p>
        </div>
      </div>
      {!isPast && (
        <div className={`w-full md:w-1/2 lg:w-1/3 p-5`}>
          <div className="flex flex-col justify-center items-center h-full">
            <div>
              <SVG
                text={"EVT-2025-F7XBCO"}
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
            <Button variant="outline" className="w-full my-2 cursor-pointer">
              <Download /> Download Ticket
            </Button>
            <Button
              variant="destructive"
              className="w-full bg-eventaty-cancel/50 text-destructive hover:bg-eventaty-cancel/90 cursor-pointer"
            >
              <Delete /> Cancel Booking
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
