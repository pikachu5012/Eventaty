import { NextResponse } from "next/server";
import { getVenueWithEvents } from "@/lib/mockData";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const venue = getVenueWithEvents(id);

  if (!venue) {
    return NextResponse.json(
      { error: "Venue not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: { venue } });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const venue = getVenueWithEvents(id);

    if (!venue) {
      return NextResponse.json(
        { error: "Venue not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: { venue: { ...venue, ...body } },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update venue" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return NextResponse.json({
    message: "Venue deleted successfully",
    data: { venueId: id },
  });
}
