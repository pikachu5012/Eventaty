import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function GET() {
  try {
    const response = await axios.get(`${BACKEND_URL}/venues`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching venues:", error);
    return NextResponse.json(
      { error: "Failed to fetch venues" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = request.headers.get("authorization");

    const response = await axios.post(`${BACKEND_URL}/venues`, body, {
      headers: {
        Authorization: token,
      },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      "Error creating venue:",
      error?.response?.data || error.message,
    );
    return NextResponse.json(
      { error: "Failed to create venue" },
      { status: error?.response?.status || 500 },
    );
  }
}
