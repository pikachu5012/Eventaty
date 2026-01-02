import { NextResponse } from "next/server";
import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = body.data || body;

    const session = await axios.post(`${BACKEND_URL}/auth/register`, {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      role: "user",
      phone: data.phone || null,
    });
    return NextResponse.json(session.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.response?.data?.message || "Registration failed" },
      { status: error?.response?.status || 500 }
    );
  }
}
