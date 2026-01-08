import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization");
    const response = await axios.get(`${BACKEND_URL}/bookings`, {
      headers: {
        Authorization: token,
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization");
    const { eventId, seatsBooked, ticketType } = await request.json();

    const response = await axios.post(
      `${BACKEND_URL}/bookings`,
      {
        eventId,
        seatsBooked,
        ticketType,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      "Error booking event:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: error.response?.data?.message || "Failed to book event" },
      { status: error?.response?.status || 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get("authorization");
    const { status, bookingId } = await request.json();

    const response = await axios.put(
      `${BACKEND_URL}/bookings/${bookingId}`,
      {
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      "Error booking event:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: error.response?.data?.message || "Failed to book event" },
      { status: error?.response?.status || 500 }
    );
  }
}
