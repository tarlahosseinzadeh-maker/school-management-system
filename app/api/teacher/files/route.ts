import { NextResponse } from "next/server";
import { requireTeacher, AuthError } from "@/src/utils/auth";
import {
  getFilesByClassSubject,
  getAllTeacherFiles,
  uploadFile,
} from "@/src/services/teacher.service";
import { fileUploadSchema } from "@/src/validation/teacher.validation";

export async function GET(request: Request) {
  try {
    const { teacherId } = await requireTeacher();
    const url = new URL(request.url);
    const classSubjectId = url.searchParams.get("classSubjectId");

    if (classSubjectId) {
      const parsedId = parseInt(classSubjectId);

      if (isNaN(parsedId)) {
        return NextResponse.json(
          { error: "INVALID_CLASS_SUBJECT_ID" },
          { status: 400 }
        );
      }

      const files = await getFilesByClassSubject(parsedId, teacherId);
      return NextResponse.json(files);
    }

    const files = await getAllTeacherFiles(teacherId);
    return NextResponse.json(files);
  } catch (error: unknown) {
    console.error("GET FILES ERROR:", error);

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

export async function POST(request: Request) {
  try {
    const { teacherId } = await requireTeacher();
    const body = await request.json();
    const validatedData = fileUploadSchema.parse(body);
    const file = await uploadFile(validatedData, teacherId);

    return NextResponse.json(file, { status: 201 });
  } catch (error: unknown) {
    console.error("UPLOAD FILE ERROR:", error);

    if (error instanceof AuthError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "VALIDATION_ERROR" },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message === "UNAUTHORIZED_CLASS_SUBJECT") {
      return NextResponse.json(
        { error: "UNAUTHORIZED_CLASS_SUBJECT" },
        { status: 403 }
      );
    }

    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
