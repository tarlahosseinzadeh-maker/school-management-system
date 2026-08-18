import { NextRequest, NextResponse } from "next/server";

import { requireRole } from "@/src/utils/auth";

import {
  findClasses,
} from "@/src/repositories/class.repository";

import {
  createClass,
} from "@/src/services/class.service";

import {
  createClassSchema,
} from "@/src/validation/class.validation";




// GET /api/classes
export async function GET(
  request: NextRequest
) {

  try {


    await requireRole([
      "PRINCIPAL",
    ]);



    const classes =
      await findClasses();



    return NextResponse.json(
      classes,
      {
        status: 200,
      }
    );



  } catch (error: any) {


    console.error(
      "GET CLASSES ERROR:",
      error
    );



    if (
      error.message ===
      "UNAUTHORIZED"
    ) {

      return NextResponse.json(
        {
          error:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }



    if (
      error.message ===
      "FORBIDDEN"
    ) {

      return NextResponse.json(
        {
          error:
            "Forbidden",
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







// POST /api/classes
export async function POST(
  request: NextRequest
) {


  try {


    await requireRole([
      "PRINCIPAL",
    ]);



    const body =
      await request.json();




    const validation =
      createClassSchema.safeParse(
        body
      );



    if (
      !validation.success
    ) {

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




    const newClass =
      await createClass(
        validation.data
      );




    return NextResponse.json(
      newClass,
      {
        status: 201,
      }
    );




  } catch (error: any) {


    console.error(
      "CREATE CLASS ERROR:",
      error
    );



    if (
      error.message ===
      "UNAUTHORIZED"
    ) {

      return NextResponse.json(
        {
          error:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }




    if (
      error.message ===
      "FORBIDDEN"
    ) {

      return NextResponse.json(
        {
          error:
            "Forbidden",
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

        message:
          error.message,

      },
      {
        status: 500,
      }
    );


  }

}