import { NextResponse } from "next/server";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";
const { user, token } = useAuth();

export async function PUT() {
  const editedUser = await axios.put(
    `${BACKEND_URL}/auth`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    user
  );
  return NextResponse.json(editedUser);
}
