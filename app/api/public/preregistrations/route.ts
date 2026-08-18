import { NextResponse } from "next/server";

import { prisma } from "@/src/database/prisma";


export async function POST(
  request: Request
) {

  try {


    const body =
      await request.json();



    const {

      studentFirstName,

      studentLastName,

      fatherName,

      phoneNumber,

      requestedGrade,

      description,

    } = body;



    if (
      !studentFirstName ||
      !studentLastName ||
      !phoneNumber ||
      !requestedGrade
    ) {

      return NextResponse.json(
        {
          error: "اطلاعات ضروری کامل نیست",
        },
        {
          status: 400,
        }
      );

    }



    const registration =
      await prisma.preregistrations.create({

        data: {

          studentFirstName,

          studentLastName,

          fatherName,

          phoneNumber,

          requestedGrade,

          description,

        },

      });



    return NextResponse.json(
      registration,
      {
        status: 201,
      }
    );


  } catch(error) {


    console.error(
      "PUBLIC PREREGISTRATION ERROR:",
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