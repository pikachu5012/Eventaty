import { NextResponse } from "next/server";
import { mockUser, mockToken } from "@/lib/mockData";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Check if it's the admin email
    if (email === "admin@eventaty.com") {
      return NextResponse.json({
        token: mockToken,
        user: {
          _id: "user001",
          email: "admin@eventaty.com",
          firstName: "Admin",
          lastName: "Eventaty",
          role: "admin",
          phone: 1000000000,
        },
      });
    }

    // Return mock user for any login
    return NextResponse.json({
      token: mockToken,
      user: mockUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 }
    );
  }
}
