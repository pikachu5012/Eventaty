import { NextResponse } from "next/server";
import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await axios.get(`${BACKEND_URL}/venues/${id}`);
    console.log("Venue by ID:", response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching venue:", error);
    return NextResponse.json(
      { error: "Failed to fetch venue" },
      { status: 500 }
    );
  }
}
