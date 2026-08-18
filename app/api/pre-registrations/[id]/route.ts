import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/src/database/prisma";


export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {


  try {


    const { id } =
      await params;



    const updated =
      await prisma.preregistrations.update({

        where:{
          preRegistrationId:
            Number(id),
        },


        data:{
          status:"CHECKED",
        },

      });




    return NextResponse.json(
      updated
    );



  }
  catch(error:any){


    console.error(
      "CHECK PRE REGISTRATION ERROR:",
      error
    );


    return NextResponse.json(
      {
        error:
          error.message ||
          "Internal Server Error",
      },
      {
        status:500,
      }
    );


  }

}