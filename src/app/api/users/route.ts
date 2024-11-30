import { getAllUsers, insertUser } from "@/db/queries";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    insertUser({ name, email });

    return NextResponse.json({ success: true, message: "User added successfully!" });
  } catch (error) {
    console.error("Error adding user:", error);
    return NextResponse.json({ success: false, message: "Failed to add user." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await getAllUsers();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
