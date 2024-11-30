import { db } from "@/db";
import { users } from "@/db/schema";
import { NewUserType } from "@/db/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email }: NewUserType = await req.json();
    const result = await db.insert(users).values({ name, email }).returning();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error adding user:", error);
    return NextResponse.json({ success: false, message: "Failed to add user." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await db.select().from(users);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
