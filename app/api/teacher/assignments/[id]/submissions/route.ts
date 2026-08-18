import { NextRequest, NextResponse } from "next/server";

import {
  requireRole
} from "@/src/utils/auth";

import {
  prisma
} from "@/src/database/prisma";


export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{
      id:string
    }>
  }
){

  try{


    const session =
      await requireRole([
        "TEACHER"
      ]);


    const teacherId =
      session.user?.userId;



    if(!teacherId){

      return NextResponse.json(
        {
          error:"UNAUTHORIZED"
        },
        {
          status:401
        }
      );

    }



    const {id} =
      await context.params;



    const assignmentId =
      Number(id);



    if(!assignmentId){

      return NextResponse.json(
        {
          error:"INVALID_ID"
        },
        {
          status:400
        }
      );

    }



    // چک اینکه این تکلیف متعلق به همین معلم است

    const assignment =
      await prisma.assignments.findFirst({

        where:{

          assignmentId,

          classSubject:{
            teacherId
          }

        }

      });



    if(!assignment){

      return NextResponse.json(
        {
          error:"ASSIGNMENT_NOT_FOUND"
        },
        {
          status:404
        }
      );

    }




    const submissions =
      await prisma.assignment_submissions.findMany({

        where:{
          assignmentId
        },


        orderBy:{
          submittedAt:"desc"
        }

      });



    return NextResponse.json(
      submissions
    );



  }
  catch(error:any){


    console.error(
      "SUBMISSIONS API ERROR:",
      error
    );


    return NextResponse.json(
      {
        error:error.message
      },
      {
        status:500
      }
    );


  }

}