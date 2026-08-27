import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/src/utils/auth";

import { getTimetableForStudent } from "@/src/services/timetable.service";

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth();

    if (!session.user?.userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const timetable = await getTimetableForStudent(session.user.userId);

    return NextResponse.json(timetable, { status: 200 });
  } catch (error: any) {
    console.error("GET STUDENT TIMETABLE ERROR:", error);

    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
