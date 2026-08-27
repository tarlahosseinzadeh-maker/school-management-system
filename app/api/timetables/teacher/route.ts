import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/src/utils/auth";

import { prisma } from "@/src/database/prisma";

import { getTimetableForTeacher } from "@/src/services/timetable.service";

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth();

    if (!session.user?.userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const teacher = await prisma.teachers.findUnique({
      where: { userId: session.user.userId },
      select: { userId: true },
    });

    if (!teacher) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const timetable = await getTimetableForTeacher(teacher.userId);

    return NextResponse.json(timetable, { status: 200 });
  } catch (error: any) {
    console.error("GET TEACHER TIMETABLE ERROR:", error);

    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (error.message === "FORBIDDEN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
