import { NextResponse } from "next/server";
import { requireRole } from "@/src/utils/auth";
import { modifyGrade } from "@/src/services/teacher.service";
import { prisma } from "@/src/database/prisma";
import { gradeUpdateSchema } from "@/src/validation/teacher.validation";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireRole(["TEACHER"]);

    const { id } = await params;
    const userId = session.user.userId;
    const gradeId = parseInt(id);

    if (!userId) {
      return NextResponse.json(
        { error: "USER_ID_NOT_FOUND" },
        { status: 401 }
      );
    }

    if (isNaN(gradeId)) {
      return NextResponse.json(
        { error: "INVALID_GRADE_ID" },
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

    const body = await request.json();
    const validatedData = gradeUpdateSchema.parse(body);

    const updatedGrade = await modifyGrade(
      gradeId,
      teacher.userId,
      validatedData
    );

    return NextResponse.json(updatedGrade);
  } catch (error: any) {
    console.error("UPDATE GRADE ERROR:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "VALIDATION_ERROR", details: error.errors },
        { status: 400 }
      );
    }

    if (error.message === "GRADE_NOT_FOUND") {
      return NextResponse.json(
        { error: "GRADE_NOT_FOUND" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: error.status || 500 }
    );
  }
}
