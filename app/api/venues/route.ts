import { NextRequest, NextResponse } from "next/server";
import { mockVenues } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json({ data: { venues: mockVenues } });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newVenue = {
      _id: "ven_new_" + Date.now(),
      ...body,
    };
    return NextResponse.json({ data: { venue: newVenue } });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to create venue" },
      { status: 500 }
    );
  }
}
