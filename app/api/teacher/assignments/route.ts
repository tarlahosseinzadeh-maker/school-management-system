import { NextResponse } from "next/server";

import {
  requireRole
} from "@/src/utils/auth";

import { prisma } from "@/src/database/prisma";


export async function GET(){

  try {


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



    const assignments =
      await prisma.assignments.findMany({

        where:{

          classSubject:{

            teacherId

          }

        },


        include:{

          classSubject:{

            include:{

              subject:true,

              class:true

            }

          }

        },


        orderBy:{
          createdAt:"desc"
        }

      });



    return NextResponse.json(

      assignments.map(item=>({

     
    assignmentId: item.assignmentId,

    classSubjectId: item.classSubjectId,

    title: item.title,

    description: item.description,

    deadline: item.deadline,

    status: item.status,
      classSubject: {

      class: item.classSubject.class,

      subject: item.classSubject.subject

    }


      }))

    );


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