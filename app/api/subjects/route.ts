import { NextRequest, NextResponse } from "next/server";

import { requireRole } from "@/src/utils/auth";

import {
  findSubjects,
} from "@/src/repositories/subject.repository";

import {
  createSubject,
} from "@/src/services/subject.service";

import {
  createSubjectSchema,
} from "@/src/validation/subject.validation";




// GET /api/subjects
export async function GET(
  request: NextRequest
) {

  try {


    await requireRole(["PRINCIPAL"]);



    const { searchParams } =
      new URL(request.url);



    const search =
      searchParams.get("search")
      || undefined;




    const subjects =
      await findSubjects({
        search,
      });





    return NextResponse.json(
      subjects,
      {
        status: 200,
      }
    );



  } catch (error: any) {


    console.error(
      "GET SUBJECTS ERROR:",
      error
    );



    if (
      error.message === "UNAUTHORIZED"
    ) {

      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }



    if (
      error.message === "FORBIDDEN"
    ) {

      return NextResponse.json(
        {
          error: "Forbidden",
        },
        {
          status: 403,
        }
      );

    }



    return NextResponse.json(
      {
        error:
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );

  }

}







// POST /api/subjects
export async function POST(
  request: NextRequest
) {


  try {


    await requireRole(["PRINCIPAL"]);




    const body =
      await request.json();





    const validation =
      createSubjectSchema.safeParse(
        body
      );





    if (!validation.success) {


      return NextResponse.json(
        {
          error:
            "Validation failed",

          details:
            validation.error.flatten(),

        },
        {
          status: 400,
        }
      );


    }






    const subject =
      await createSubject(
        validation.data
      );






    return NextResponse.json(
      subject,
      {
        status: 201,
      }
    );



  } catch (error: any) {


    console.error(
      "CREATE SUBJECT ERROR:",
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