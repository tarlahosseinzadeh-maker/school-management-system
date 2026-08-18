import { NextRequest, NextResponse } from "next/server";


import { requireRole } from "@/src/utils/auth";


import {
  getClassSubjectById,
  updateClassSubject,
} from "@/src/services/classSubject.service";


import {
  updateClassSubjectSchema,
} from "@/src/validation/classSubject.validation";


import { prisma } from "@/src/database/prisma";





type RouteContext = {

  params: Promise<{
    id: string;
  }>;

};







// GET /api/class-subjects/[id]

export async function GET(
  request: NextRequest,
  context: RouteContext
) {


  try {


    await requireRole(["PRINCIPAL"]);




    const { id } =
      await context.params;



    const classSubjectId =
      Number(id);





    if (
      !Number.isInteger(classSubjectId) ||
      classSubjectId <= 0
    ) {


      return NextResponse.json(

        {
          error: "Invalid id",
        },

        {
          status: 400,
        }

      );

    }





    const result =
      await getClassSubjectById(
        classSubjectId
      );





    return NextResponse.json(

      result,

      {
        status: 200,
      }

    );





  } catch (error: any) {


    console.error(
      "GET CLASS SUBJECT ERROR:",
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









// PUT /api/class-subjects/[id]

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {


  try {


    await requireRole(["PRINCIPAL"]);





    const { id } =
      await context.params;




    const classSubjectId =
      Number(id);





    if (
      !Number.isInteger(classSubjectId) ||
      classSubjectId <= 0
    ) {


      return NextResponse.json(

        {
          error: "Invalid id",
        },

        {
          status: 400,
        }

      );

    }







    const body =
      await request.json();





    const validation =
      updateClassSubjectSchema.safeParse(
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







    const result =
      await updateClassSubject(

        classSubjectId,

        validation.data

      );







    return NextResponse.json(

      result,

      {
        status: 200,
      }

    );





  } catch (error: any) {


    console.error(
      "UPDATE CLASS SUBJECT ERROR:",
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









// DELETE /api/class-subjects/[id]

export async function DELETE(

  request: NextRequest,

  context: RouteContext

) {


  try {


    await requireRole(["PRINCIPAL"]);





    const { id } =
      await context.params;




    const classSubjectId =
      Number(id);






    if (
      !Number.isInteger(classSubjectId) ||
      classSubjectId <= 0
    ) {


      return NextResponse.json(

        {
          error: "Invalid id",
        },

        {
          status: 400,
        }

      );


    }







    const existing =
      await prisma.classsubjects.findUnique({

        where: {

          classSubjectId,

        },

      });







    if (!existing) {


      return NextResponse.json(

        {
          error:
            "CLASS_SUBJECT_NOT_FOUND",
        },

        {
          status: 404,
        }

      );


    }







    await prisma.classsubjects.delete({

      where: {

        classSubjectId,

      },

    });







    return NextResponse.json(

      {
        message:
          "Class subject deleted successfully",
      },

      {
        status: 200,
      }

    );






  } catch (error: any) {


    console.error(

      "DELETE CLASS SUBJECT ERROR:",

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