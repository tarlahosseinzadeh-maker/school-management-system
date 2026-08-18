import { NextResponse } from "next/server";
import { requireRole } from "@/src/utils/auth";
import {
  modifyAssignment,
  removeAssignment,
} from "@/src/services/teacher.service";
import { prisma } from "@/src/database/prisma";
import { assignmentUpdateSchema } from "@/src/validation/teacher.validation";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireRole(["TEACHER"]);

    const { id } = await params;
    const userId = session.user.userId;
    const assignmentId = parseInt(id);

    if (!userId) {
      return NextResponse.json(
        { error: "USER_ID_NOT_FOUND" },
        { status: 401 }
      );
    }

    if (isNaN(assignmentId)) {
      return NextResponse.json(
        { error: "INVALID_ASSIGNMENT_ID" },
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
    const validatedData = assignmentUpdateSchema.parse(body);

    const updatedAssignment = await modifyAssignment(
      assignmentId,
      teacher.userId,
      validatedData
    );

    return NextResponse.json(updatedAssignment);
  } catch (error: any) {
    console.error("UPDATE ASSIGNMENT ERROR:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "VALIDATION_ERROR", details: error.errors },
        { status: 400 }
      );
    }

    if (error.message === "ASSIGNMENT_NOT_FOUND") {
      return NextResponse.json(
        { error: "ASSIGNMENT_NOT_FOUND" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: error.status || 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireRole(["TEACHER"]);

    const { id } = await params;
    const userId = session.user.userId;
    const assignmentId = parseInt(id);

    if (!userId) {
      return NextResponse.json(
        { error: "USER_ID_NOT_FOUND" },
        { status: 401 }
      );
    }

    if (isNaN(assignmentId)) {
      return NextResponse.json(
        { error: "INVALID_ASSIGNMENT_ID" },
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

    await removeAssignment(assignmentId, teacher.userId);

    return NextResponse.json(
      { message: "Assignment deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE ASSIGNMENT ERROR:", error);

    if (error.message === "ASSIGNMENT_NOT_FOUND") {
      return NextResponse.json(
        { error: "ASSIGNMENT_NOT_FOUND" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: error.status || 500 }
    );
  }
}
