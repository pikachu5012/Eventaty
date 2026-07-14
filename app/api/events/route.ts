import { NextResponse } from "next/server";
import { mockEvents } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json({ data: { events: mockEvents } });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Return a mock created event response
    const newEvent = {
      _id: "evt_new_" + Date.now(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return NextResponse.json({ data: { event: newEvent } });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
