import { NextResponse } from "next/server";
import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL;

export async function Login(email: string, password: string) {
  const session = await axios.post(`${BACKEND_URL}/auth/login`, {
    email,
    password,
  });
  return NextResponse.json(session);
}
