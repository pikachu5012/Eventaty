import { NextRequest, NextResponse } from "next/server";
import { mockVenues, mockEvents } from "@/lib/mockData";

export async function GET() {
  const venues = mockVenues.map((venue) => {
    const eventCount = mockEvents.filter((event) => {
      const vId = typeof event.venueId === "object" ? event.venueId._id : event.venueId;
      return vId === venue._id && new Date(event.startDateTime) > new Date();
    }).length;
    return { ...venue, eventCount };
  });

  return NextResponse.json({ data: { venues } });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newVenue = {
      _id: "ven_new_" + Date.now(),
      ...body,
    };
    return NextResponse.json({ data: { venue: newVenue } });
  } catch {
    return NextResponse.json(
      { error: "Failed to create venue" },
      { status: 500 }
    );
  }
}
