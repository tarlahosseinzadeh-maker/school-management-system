import { NextResponse } from "next/server";

import { prisma } from "@/src/database/prisma";



export async function GET() {


  try {


    const registrations =
      await prisma.preregistrations.findMany({

        orderBy: {

          createdAt: "desc",

        },

      });



    return NextResponse.json(
      registrations
    );



  } catch(error) {


    console.error(
      "GET PRE REGISTRATIONS ERROR:",
      error
    );


    return NextResponse.json(

      {
        error: "Internal Server Error",
      },

      {
        status: 500,
      }

    );


  }

}