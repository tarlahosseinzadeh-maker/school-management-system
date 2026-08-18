import { NextResponse } from "next/server";
import { requireRole } from "@/src/utils/auth";
import { removeFile } from "@/src/services/teacher.service";
import { prisma } from "@/src/database/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireRole(["TEACHER"]);

    const { id } = await params;
    const userId = session.user.userId;
    const fileId = parseInt(id);

    if (!userId) {
      return NextResponse.json(
        { error: "USER_ID_NOT_FOUND" },
        { status: 401 }
      );
    }

    if (isNaN(fileId)) {
      return NextResponse.json(
        { error: "INVALID_FILE_ID" },
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

    await removeFile(fileId, teacher.userId);

    return NextResponse.json(
      { message: "File deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE FILE ERROR:", error);

    if (error.message === "FILE_NOT_FOUND") {
      return NextResponse.json(
        { error: "FILE_NOT_FOUND" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: error.status || 500 }
    );
  }
}
