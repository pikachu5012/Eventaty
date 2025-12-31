import { NextResponse } from "next/server";
import axios from "axios";
import { IVenue } from "@/types/venue";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function GET() {
  try {
    const response = await axios.get(`${BACKEND_URL}/venues`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching venues:", error);
    return NextResponse.json(
      { error: "Failed to fetch venues" },
      { status: 500 }
    );
  }
}

export async function POST(venue: IVenue) {
  const postedVenue = await axios.post(`${BACKEND_URL}/venues`, venue);
  return NextResponse.json(postedVenue);
}

export async function PUT(id: string, venue: IVenue) {
  const updatedVenue = await axios.put(`${BACKEND_URL}/venues/${id}`, venue);
  return NextResponse.json(updatedVenue);
}

export async function DELETE(id: string) {
  const venue = await axios.delete(`${BACKEND_URL}/venues/${id}`);
  return NextResponse.json(venue);
}
