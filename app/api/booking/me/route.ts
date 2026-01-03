import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization");
    const response = await axios.get(`${BACKEND_URL}/bookings/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching my bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch my bookings" },
      { status: 500 }
    );
  }
}
