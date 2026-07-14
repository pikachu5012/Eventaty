import { NextRequest, NextResponse } from "next/server";
import { mockBookings } from "@/lib/mockData";

export async function GET(request: NextRequest) {
  return NextResponse.json({ data: { bookings: mockBookings } });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newBooking = {
      _id: "bk_new_" + Date.now(),
      bookingReference: "EVT-2026-" + Math.floor(Math.random() * 1000).toString().padStart(3, "0"),
      ...body,
      status: "confirmed",
      cancellationAllowed: true,
      cancellationDeadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      bookingDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      data: { newBooking },
      message: "Booking created successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to book event" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { status, bookingId } = await request.json();
    return NextResponse.json({
      data: { booking: { _id: bookingId, status } },
      message: "Booking updated successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}
