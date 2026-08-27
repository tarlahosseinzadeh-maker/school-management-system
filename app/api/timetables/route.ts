import { NextRequest, NextResponse } from "next/server";

import { requireRole } from "@/src/utils/auth";

import {
  createTimetableEntry,
  getTimetableForClass,
} from "@/src/services/timetable.service";

import { createTimetableSchema } from "@/src/validation/timetable.validation";

export async function GET(request: NextRequest) {
  try {
    await requireRole(["PRINCIPAL"]);

    const { searchParams } = new URL(request.url);
    const classId = searchParams.get("classId");

    if (!classId) {
      return NextResponse.json(
        { error: "classId is required" },
        { status: 400 }
      );
    }

    const timetable = await getTimetableForClass(Number(classId));

    return NextResponse.json(timetable, { status: 200 });
  } catch (error: any) {
    console.error("GET TIMETABLE ERROR:", error);

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

export async function POST(request: NextRequest) {
  try {
    await requireRole(["PRINCIPAL"]);

    const body = await request.json();

    const validation = createTimetableSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.flatten(),
        },
        { status: 400 }
      );
    }

    const entry = await createTimetableEntry(validation.data);

    return NextResponse.json(entry, { status: 201 });
  } catch (error: any) {
    console.error("CREATE TIMETABLE ERROR:", error);

    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (error.message === "FORBIDDEN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const userMessage = getErrorMessage(error.message);

    return NextResponse.json(
      { error: userMessage },
      { status: 400 }
    );
  }
}

function getErrorMessage(code: string): string {
  switch (code) {
    case "CLASS_CONFLICT":
      return "این کلاس در این بازه زمانی قبلاً lesson دارد.";
    case "TEACHER_CONFLICT":
      return "این معلم در این بازه زمانی کلاس دیگری تدریس می‌کند.";
    case "SUBJECT_GRADE_MISMATCH":
      return "این درس با پایه این کلاس مطابقت ندارد.";
    case "CLASS_SUBJECT_MISMATCH":
      return "این teaching group به این کلاس تعلق ندارد.";
    case "CLASS_NOT_FOUND":
      return "کلاس پیدا نشد.";
    case "CLASS_SUBJECT_NOT_FOUND":
      return "درس/گروه تدریسی پیدا نشد.";
    default:
      return "خطا در ایجاد برنامه هفتگی.";
  }
}
