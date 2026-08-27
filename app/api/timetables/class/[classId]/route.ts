import { NextRequest, NextResponse } from "next/server";

import { requireRole } from "@/src/utils/auth";

import { getTimetableForClass } from "@/src/services/timetable.service";

type Params = {
  params: Promise<{
    classId: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    await requireRole(["PRINCIPAL"]);

    const { classId } = await params;
    const classIdNum = Number(classId);

    if (!Number.isInteger(classIdNum) || classIdNum <= 0) {
      return NextResponse.json(
        { error: "Invalid class id" },
        { status: 400 }
      );
    }

    const timetable = await getTimetableForClass(classIdNum);

    return NextResponse.json(timetable, { status: 200 });
  } catch (error: any) {
    console.error("GET CLASS TIMETABLE ERROR:", error);

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
