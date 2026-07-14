import { NextRequest, NextResponse } from "next/server";
import { mockBookings } from "@/lib/mockData";

export async function GET(request: NextRequest) {
  // Return bookings for the mock user (user002 - Ahmed)
  const userBookings = mockBookings.filter(
    (b) => b.userId._id === "user002"
  );
  return NextResponse.json({ data: { bookings: userBookings } });
}
