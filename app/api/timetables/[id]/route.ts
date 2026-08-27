import { NextRequest, NextResponse } from "next/server";

import { requireRole } from "@/src/utils/auth";

import {
  updateTimetableEntry,
  removeTimetableEntry,
} from "@/src/services/timetable.service";

import { updateTimetableSchema } from "@/src/validation/timetable.validation";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(
  request: NextRequest,
  { params }: Params
) {
  try {
    await requireRole(["PRINCIPAL"]);

    const { id } = await params;
    const timetableId = Number(id);

    if (!Number.isInteger(timetableId) || timetableId <= 0) {
      return NextResponse.json(
        { error: "Invalid timetable id" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const validation = updateTimetableSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.flatten(),
        },
        { status: 400 }
      );
    }

    const entry = await updateTimetableEntry(timetableId, validation.data);

    return NextResponse.json(entry, { status: 200 });
  } catch (error: any) {
    console.error("UPDATE TIMETABLE ERROR:", error);

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

export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
  try {
    await requireRole(["PRINCIPAL"]);

    const { id } = await params;
    const timetableId = Number(id);

    if (!Number.isInteger(timetableId) || timetableId <= 0) {
      return NextResponse.json(
        { error: "Invalid timetable id" },
        { status: 400 }
      );
    }

    await removeTimetableEntry(timetableId);

    return NextResponse.json(
      { message: "حذف شد" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE TIMETABLE ERROR:", error);

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
    case "TIMETABLE_NOT_FOUND":
      return "برنامه هفتگی پیدا نشد.";
    default:
      return "خطا در پردازش برنامه هفتگی.";
  }
}
