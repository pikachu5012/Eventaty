import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function GET() {
  try {
    const response = await axios.get(`${BACKEND_URL}/bookings`);
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
    const { userId, eventId, seatsBooked } = await request.json();
    console.log(
      `userId: ${userId}, eventId: ${eventId}, seatsBooked: ${seatsBooked}, token: ${token}`
    );

    const response = await axios.post(
      `${BACKEND_URL}/bookings`,
      {
        userId,
        eventId,
        seatsBooked,
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
