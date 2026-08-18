import { NextRequest, NextResponse } from "next/server";

import { requireRole } from "@/src/utils/auth";

import {
  createNewAnnouncement,
  getAnnouncements,
} from "@/src/services/announcement.service";

import {
  createAnnouncementSchema,
} from "@/src/validation/announcement.validation";




// GET /api/announcements
// فقط مدیر
export async function GET() {


  try {


    await requireRole(["PRINCIPAL"]);



    const result =
      await getAnnouncements();



    return NextResponse.json(
      result,
      {
        status: 200,
      }
    );


  } catch (error: any) {


    console.error(
      "GET ANNOUNCEMENTS ERROR:",
      error
    );


    return NextResponse.json(
      {
        error:
          error.message ||
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );


  }

}




// POST /api/announcements
// فقط مدیر
export async function POST(
  request: NextRequest
) {


  try {


    await requireRole(["PRINCIPAL"]);



    const body =
      await request.json();



    const validation =
      createAnnouncementSchema.safeParse(
        body
      );



    if (!validation.success) {


      return NextResponse.json(
        {
          error: "Validation failed",

          details:
            validation.error.flatten(),
        },
        {
          status: 400,
        }
      );

    }




    const result =
      await createNewAnnouncement(
        validation.data
      );



    return NextResponse.json(
      result,
      {
        status: 201,
      }
    );



  } catch (error: any) {


    console.error(
      "CREATE ANNOUNCEMENT ERROR:",
      error
    );



    return NextResponse.json(
      {
        error:
          error.message ||
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );


  }

}