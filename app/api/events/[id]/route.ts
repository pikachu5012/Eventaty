import { NextResponse } from "next/server";
import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await axios.get(`${BACKEND_URL}/events/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const token = request.headers.get("authorization");

    const response = await axios.put(`${BACKEND_URL}/events/${id}`, body, {
      headers: {
        Authorization: token,
      },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error updating event:", error?.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: error?.response?.status || 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = request.headers.get("authorization");

    const response = await axios.delete(`${BACKEND_URL}/events/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error deleting event:", error?.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: error?.response?.status || 500 }
    );
  }
}
