import { NextResponse } from "next/server";
import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const session = await axios.post(`${BACKEND_URL}/auth/login`, {
      email,
      password,
    });

    return NextResponse.json(session.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.response?.data?.message || "Login failed" },
      { status: error?.response?.status || 500 }
    );
  }
}
