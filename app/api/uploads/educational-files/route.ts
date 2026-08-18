import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { requireTeacher, AuthError } from "@/src/utils/auth";

export async function POST(request: NextRequest) {
  try {
    await requireTeacher();

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "File is required" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const extension = file.name.split(".").pop() || "bin";
    const filename = `${randomUUID()}.${extension}`;

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "educational-files"
    );

    await mkdir(uploadDir, { recursive: true });

    const uploadPath = path.join(uploadDir, filename);
    await writeFile(uploadPath, buffer);

    return NextResponse.json({
      url: `/uploads/educational-files/${filename}`,
      fileName: file.name,
      fileType: file.type || extension,
    });
  } catch (error: unknown) {
    console.error("EDUCATIONAL FILE UPLOAD ERROR:", error);

    if (error instanceof AuthError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
