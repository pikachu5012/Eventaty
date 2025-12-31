import { NextResponse } from "next/server";
import axios from "axios";
import { ICategory } from "@/types/category";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function GET() {
  try {
    const response = await axios.get(`${BACKEND_URL}/categories`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(category: ICategory) {
  const postedCategory = await axios.post(
    `${BACKEND_URL}/categories`,
    category
  );
  return NextResponse.json(postedCategory);
}

export async function PUT(id: string, category: ICategory) {
  const updatedCategory = await axios.put(
    `${BACKEND_URL}/categories/${id}`,
    category
  );
  return NextResponse.json(updatedCategory);
}

export async function DELETE(id: string) {
  const deletedCategory = await axios.delete(`${BACKEND_URL}/categories/${id}`);
  return NextResponse.json(deletedCategory);
}
