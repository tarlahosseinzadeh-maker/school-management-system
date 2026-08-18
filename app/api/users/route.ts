import { NextRequest, NextResponse } from "next/server";

import { requireRole } from "@/src/utils/auth";
import { findUsers } from "@/src/repositories/user.repository";
import { createUser } from "@/src/services/user.service";
import { createUserSchema } from "@/src/validation/user.validation";



// GET /api/users
export async function GET(request: NextRequest) {

  try {


    await requireRole(["PRINCIPAL"]);



    const { searchParams } =
      new URL(request.url);




    const search =
      searchParams.get("search") || undefined;



    const role =
      searchParams.get("role") as
      | "STUDENT"
      | "TEACHER"
      | "PRINCIPAL"
      | undefined;




    const page =
      Number(
        searchParams.get("page") || "1"
      );



    const limit =
      Number(
        searchParams.get("limit") || "10"
      );





    if (
      !Number.isInteger(page) ||
      page < 1 ||
      !Number.isInteger(limit) ||
      limit < 1 ||
      limit > 100
    ) {


      return NextResponse.json(
        {
          error:
            "Invalid pagination parameters",
        },
        {
          status:400,
        }
      );


    }







    const result =
      await findUsers({

        search,

        role,

        page,

        limit,

      });







    return NextResponse.json(result);





  }

  catch(error:any){



    console.error(
      "GET USERS ERROR:",
      error
    );





    if(
      error.message === "UNAUTHORIZED"
    ){

      return NextResponse.json(
        {
          error:
            "Unauthorized",
        },
        {
          status:401,
        }
      );

    }





    if(
      error.message === "FORBIDDEN"
    ){

      return NextResponse.json(
        {
          error:
            "Forbidden",
        },
        {
          status:403,
        }
      );

    }






    return NextResponse.json(
      {
        error:
          "Internal Server Error",

        message:
          error?.message ||
          String(error),

      },
      {
        status:500,
      }
    );


  }

}









// POST /api/users
export async function POST(
  request: NextRequest
) {


  try {


    await requireRole(["PRINCIPAL"]);




    const body =
      await request.json();




    console.log(
      "CREATE USER BODY:",
      body
    );





    const validation =
      createUserSchema.safeParse(body);





    if(!validation.success){


      return NextResponse.json(
        {

          error:
            "Validation failed",


          details:
            validation.error.flatten(),

        },
        {
          status:400,
        }
      );


    }







    const user =
      await createUser(
        validation.data
      );







    return NextResponse.json(
      user,
      {
        status:201,
      }
    );





  }

  catch(error:any){



    console.error(
      "CREATE USER ERROR:",
      error
    );





    if(
      error.code === "P2002" &&
      error.meta?.target?.includes("nationalCode")
    ){


      return NextResponse.json(
        {
          error:
            "NATIONAL_CODE_EXISTS",
        },
        {
          status:400,
        }
      );


    }






    if(
      error.message === "UNAUTHORIZED"
    ){


      return NextResponse.json(
        {
          error:
            "Unauthorized",
        },
        {
          status:401,
        }
      );


    }







    if(
      error.message === "FORBIDDEN"
    ){


      return NextResponse.json(
        {
          error:
            "Forbidden",
        },
        {
          status:403,
        }
      );


    }







    return NextResponse.json(
      {

        error:
          "Internal Server Error",


        message:
          error?.message ||
          String(error),


        stack:
          process.env.NODE_ENV === "development"
            ? error?.stack
            : undefined,


      },
      {
        status:500,
      }
    );


  }

}