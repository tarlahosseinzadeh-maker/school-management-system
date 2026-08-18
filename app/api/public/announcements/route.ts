import { NextResponse } from "next/server";

import { getPublishedAnnouncements } from "@/src/services/announcement.service";

export async function GET() {
  try {
    const announcements = await getPublishedAnnouncements();

    return NextResponse.json(announcements, { status: 200 });
  } catch (error) {
    console.error("PUBLIC ANNOUNCEMENTS ERROR:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
