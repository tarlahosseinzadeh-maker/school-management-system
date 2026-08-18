import { NextResponse } from "next/server";
import { requireRole } from "@/src/utils/auth";
import { getTeacherClasses } from "@/src/services/teacher.service";
import { prisma } from "@/src/database/prisma";

export async function GET() {
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

    const classes = await getTeacherClasses(teacher.userId);

    return NextResponse.json(classes);
  } catch (error: any) {
    console.error("TEACHER CLASSES ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: error.status || 500 }
    );
  }
}
