import { NextResponse } from "next/server";
import { requireTeacher, AuthError } from "@/src/utils/auth";
import { getClassSubject } from "@/src/services/teacher.service";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { teacherId } = await requireTeacher();
    const { id } = await params;
    const classSubjectId = parseInt(id);

    if (isNaN(classSubjectId)) {
      return NextResponse.json(
        { error: "INVALID_CLASS_ID" },
        { status: 400 }
      );
    }

    const classSubject = await getClassSubject(classSubjectId, teacherId);
    return NextResponse.json(classSubject);
  } catch (error: unknown) {
    console.error("CLASS DETAIL ERROR:", error);

    if (error instanceof AuthError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    if (error instanceof Error && error.message === "CLASS_SUBJECT_NOT_FOUND") {
      return NextResponse.json(
        { error: "CLASS_NOT_FOUND" },
        { status: 404 }
      );
    }

    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
