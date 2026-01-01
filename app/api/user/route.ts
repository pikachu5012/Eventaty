import { NextResponse } from "next/server";
import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const token = request.headers.get("authorization");

    const editedUser = await axios.put(`${BACKEND_URL}/auth`, body, {
      headers: {
        Authorization: token,
      },
    });
    return NextResponse.json(editedUser.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.response?.data?.message || "Failed to update user" },
      { status: error?.response?.status || 500 }
    );
  }
}
