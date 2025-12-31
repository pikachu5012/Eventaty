import { NextResponse } from "next/server";
import axios from "axios";
import { IEvent } from "@/types/event";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function GET() {
  try {
    const response = await axios.get(`${BACKEND_URL}/events`);
    console.log("All events:", response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(event: IEvent) {
  const postedEvent = await axios.post(`${BACKEND_URL}/events`, event);
  return NextResponse.json(postedEvent);
}

export async function PUT(id: string, event: IEvent) {
  const updatedEvent = await axios.put(`${BACKEND_URL}/events/${id}`, event);
  return NextResponse.json(updatedEvent);
}

export async function DELETE(id: string) {
  const deletedEvent = await axios.delete(`${BACKEND_URL}/events/${id}`);
  return NextResponse.json(deletedEvent);
}
