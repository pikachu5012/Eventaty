import { NextResponse } from "next/server";
import { mockEvents } from "@/lib/mockData";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const event = mockEvents.find((e) => e._id === id);

  if (!event) {
    return NextResponse.json(
      { error: "Event not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: { event } });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const event = mockEvents.find((e) => e._id === id);

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // Return a mock updated event
    return NextResponse.json({
      data: { event: { ...event, ...body, updatedAt: new Date().toISOString() } },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update event" },
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
    message: "Event deleted successfully",
    data: { eventId: id },
  });
}
