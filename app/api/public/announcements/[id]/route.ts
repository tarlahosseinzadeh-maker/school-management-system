import { NextRequest, NextResponse } from "next/server";

import { getAnnouncementById } from "@/src/services/announcement.service";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const announcementId = Number(id);

    if (!Number.isInteger(announcementId) || announcementId <= 0) {
      return NextResponse.json(
        { error: "Invalid id" },
        { status: 400 }
      );
    }

    const announcement = await getAnnouncementById(announcementId);

    if (!announcement) {
      return NextResponse.json(
        { error: "Announcement not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(announcement, { status: 200 });
  } catch (error) {
    console.error("GET ANNOUNCEMENT ERROR:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}