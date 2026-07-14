import { NextResponse } from "next/server";
import { mockToken } from "@/lib/mockData";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = body.data || body;

    // Return a mock registered user
    return NextResponse.json({
      token: mockToken,
      user: {
        _id: "user_new_" + Date.now(),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: "user",
        phone: data.phone || null,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Registration failed" },
      { status: 500 }
    );
  }
}
