import { NextRequest, NextResponse } from "next/server";

import { requireRole } from "@/src/utils/auth";

import {
  getSubjectById,
  updateSubject,
} from "@/src/services/subject.service";

import {
  updateSubjectSchema,
} from "@/src/validation/subject.validation";



type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};




// GET /api/subjects/[id]
export async function GET(
  request: NextRequest,
  context: RouteContext
) {


  try {


    await requireRole(["PRINCIPAL"]);




    const { id } =
      await context.params;




    const subjectId =
      Number(id);





    if (
      !Number.isInteger(subjectId) ||
      subjectId <= 0
    ) {


      return NextResponse.json(
        {
          error: "Invalid subject id",
        },
        {
          status: 400,
        }
      );


    }






    const subject =
      await getSubjectById(subjectId);






    return NextResponse.json(
      subject,
      {
        status: 200,
      }
    );



  } catch (error: any) {


    console.error(
      "GET SUBJECT ERROR:",
      error
    );




    if (
      error.message ===
      "SUBJECT_NOT_FOUND"
    ) {

      return NextResponse.json(
        {
          error: "Subject not found",
        },
        {
          status: 404,
        }
      );

    }





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








// PUT /api/subjects/[id]
export async function PUT(
  request: NextRequest,
  context: RouteContext
) {


  try {


    await requireRole(["PRINCIPAL"]);





    const { id } =
      await context.params;




    const subjectId =
      Number(id);





    if (
      !Number.isInteger(subjectId) ||
      subjectId <= 0
    ) {


      return NextResponse.json(
        {
          error: "Invalid subject id",
        },
        {
          status: 400,
        }
      );


    }





    const body =
      await request.json();





    const validation =
      updateSubjectSchema.safeParse(
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
      await updateSubject(
        subjectId,
        validation.data
      );







    return NextResponse.json(
      subject,
      {
        status: 200,
      }
    );




  } catch (error: any) {


    console.error(
      "UPDATE SUBJECT ERROR:",
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