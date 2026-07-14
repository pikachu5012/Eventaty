import { NextResponse } from "next/server";
import { mockUser } from "@/lib/mockData";

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // Return a mock updated user response
    return NextResponse.json({
      user: {
        ...mockUser,
        ...body,
      },
      message: "User updated successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to update user" },
      { status: 500 }
    );
  }
}
