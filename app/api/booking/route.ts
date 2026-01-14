import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { sendBookingConfirmation } from "@/lib/mail";

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
    const body = await request.json();
    const {
      eventId,
      seatsBooked,
      ticketType,
      customerName,
      customerEmail,
      eventName,
      date,
      time,
      total,
    } = body;

    const response = await axios.post(
      `${BACKEND_URL}/bookings`,
      {
        eventId,
        seatsBooked: seatsBooked,
        ticketType,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    // If booking is successful, send confirmation email
    if (response.data && customerEmail) {
      const bookingReference =
        response.data.data?.newBooking?.bookingReference ||
        response.data.bookingReference ||
        "N/A";

      // Fire and forget email sending (don't block the response)
      sendBookingConfirmation({
        customerName,
        customerEmail,
        eventName,
        bookingReference,
        date,
        time,
        quantity: seatsBooked,
        ticketType,
        total,
      }).catch((err) => console.error("Email sending failed:", err));
    }

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
