import { NextResponse } from "next/server";
import axios from "axios";


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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = request.headers.get("authorization");

    const response = await axios.post(`${BACKEND_URL}/events`, body, {
      headers: {
        Authorization: token,
      },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error creating event:", error?.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: error?.response?.status || 500 }
    );
  }
}
