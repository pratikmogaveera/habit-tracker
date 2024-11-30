import { db } from "@/db";
import { habits } from "@/db/schema";
import { NewHabitType } from "@/db/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, title, description, habitType, goalType, startDate, targetDays, endDate, isActive }: NewHabitType = await req.json();
    const result = await db.insert(habits).values({ userId, title, description, habitType, goalType, startDate, targetDays, endDate, isActive }).returning();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error adding habit:", error);
    return NextResponse.json({ success: false, message: "Failed to add habit." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await db.select().from(habits);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching habits:", error);
    return NextResponse.json({ error: "Failed to fetch habits" }, { status: 500 });
  }
}
