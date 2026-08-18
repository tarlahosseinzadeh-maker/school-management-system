import { NextResponse } from "next/server";
import { requireRole } from "@/src/utils/auth";
import { addGrade } from "@/src/services/teacher.service";
import { prisma } from "@/src/database/prisma";
import { gradeSchema } from "@/src/validation/teacher.validation";

export async function POST(request: Request) {
  try {
    const session = await requireRole(["TEACHER"]);

    const userId = session.user.userId;

    if (!userId) {
      return NextResponse.json(
        { error: "USER_ID_NOT_FOUND" },
        { status: 401 }
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
    const validatedData = gradeSchema.parse(body);

    const grade = await addGrade(validatedData, teacher.userId);

    return NextResponse.json(grade, { status: 201 });
  } catch (error: any) {
    console.error("CREATE GRADE ERROR:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "VALIDATION_ERROR", details: error.errors },
        { status: 400 }
      );
    }

    if (error.message === "UNAUTHORIZED_CLASS_SUBJECT") {
      return NextResponse.json(
        { error: "UNAUTHORIZED_CLASS_SUBJECT" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: error.status || 500 }
    );
  }
}
