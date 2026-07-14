import { NextRequest, NextResponse } from "next/server";
import { mockCategories } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json({ data: { categories: mockCategories } });
}

export async function POST(request: NextRequest) {
  try {
    const category = await request.json();
    const newCategory = {
      _id: "cat_new_" + Date.now(),
      ...category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return NextResponse.json({ data: { category: newCategory } });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...category } = await request.json();
    return NextResponse.json({
      data: { category: { _id: id, ...category, updatedAt: new Date().toISOString() } },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    return NextResponse.json({
      message: "Category deleted successfully",
      data: { categoryId: id },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
