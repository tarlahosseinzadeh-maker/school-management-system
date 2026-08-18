import { NextResponse } from "next/server";
import { requireTeacher, AuthError } from "@/src/utils/auth";
import { getTeacherDashboard } from "@/src/services/teacher.service";

export async function GET() {
  try {
    const { teacherId } = await requireTeacher();
    const dashboard = await getTeacherDashboard(teacherId);

    return NextResponse.json(dashboard);
  } catch (error: unknown) {
    console.error("TEACHER DASHBOARD ERROR:", error);

    if (error instanceof AuthError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
