import { NextResponse } from "next/server";
import { requireRole } from "@/src/utils/auth";
import { prisma } from "@/src/database/prisma";


export async function GET(){

  try{

    await requireRole([
      "PRINCIPAL"
    ]);


    const classes =
      await prisma.physicalclasses.findMany({

        include:{
          students:{
            include:{
              user:true
            }
          }
        },

        orderBy:{
          className:"asc"
        }

      });



    return NextResponse.json(

      classes.map(item=>({

        classId:
          item.classId,

        className:
          item.className,

        academicYear:
          item.academicYear,

        students:
          item.students.map(student=>({

            userId:
              student.userId,

            name:
              `${student.user.firstName} ${student.user.lastName}`

          }))

      }))

    );


  }
  catch(error:any){

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