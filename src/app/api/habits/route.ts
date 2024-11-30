import { db } from "@/db";
import { habits } from "@/db/schema";
import { NewHabitType } from "@/db/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, description, habitType, startDate, targetDays, endDate, isActive }: NewHabitType = await req.json();
    const result = await db.insert(habits).values({ userId, description, habitType, startDate, targetDays, endDate, isActive }).returning();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error adding habit:", error);
    return NextResponse.json({ success: false, message: "Failed to add habit." }, { status: 500 });
  }
}
