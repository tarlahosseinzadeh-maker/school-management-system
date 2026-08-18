import { NextResponse } from "next/server";
import { requireRole } from "@/src/utils/auth";
import { getGradesByClassSubject } from "@/src/services/teacher.service";
import { prisma } from "@/src/database/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireRole(["TEACHER"]);

    const { id } = await params;
    const userId = session.user.userId;
    const classSubjectId = parseInt(id);

    if (!userId) {
      return NextResponse.json(
        { error: "USER_ID_NOT_FOUND" },
        { status: 401 }
      );
    }

    if (isNaN(classSubjectId)) {
      return NextResponse.json(
        { error: "INVALID_CLASS_ID" },
        { status: 400 }
      );
    }

    const teacher = await prisma.teachers.findUnique({
      where: { userId },
    });

    if (!teacher) {
      return NextResponse.json(
        { error: "TEACHER_NOT_FOUND" },
        { status: 404 }
      );
    }

    const grades = await getGradesByClassSubject(
      classSubjectId,
      teacher.userId
    );

    return NextResponse.json(grades);
  } catch (error: any) {
    console.error("CLASS GRADES ERROR:", error);

    if (error.message === "CLASS_SUBJECT_NOT_FOUND") {
      return NextResponse.json(
        { error: "CLASS_NOT_FOUND" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: error.status || 500 }
    );
  }
}
