import { NextRequest, NextResponse } from "next/server";

import { requireRole } from "@/src/utils/auth";
import { prisma } from "@/src/database/prisma";


export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{ id: string }>
  }
) {

  try {

    const session = await requireRole([
      "STUDENT"
    ]);


    const { id } = await context.params;

    const assignmentId = Number(id);


    const assignment =
      await prisma.assignments.findUnique({

        where:{
          assignmentId
        },

        include:{
          classSubject:{
            include:{
              subject:true
            }
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



    return NextResponse.json({

      assignmentId:
        assignment.assignmentId,

      title:
        assignment.title,

      description:
        assignment.description,

      subject:
        assignment.classSubject.subject.subjectName,

      deadline:
        assignment.deadline,

      status:
        assignment.status

    });


  }
  catch(error:any){

    console.error(error);

    return NextResponse.json(
      {
        error:error.message
      },
      {
        status:error.status ?? 500
      }
    );

  }

}