import { NextResponse } from "next/server";

import { requireRole } from "@/src/utils/auth";
import { prisma } from "@/src/database/prisma";


export async function GET(

  request: Request,

  {
    params
  }:{
    params: Promise<{
      studentId:string
    }>
  }

) {


  try {


    await requireRole([
      "PRINCIPAL"
    ]);



    const {
      studentId
    } = await params;



    const id =
      Number(studentId);



    if(!id){

      return NextResponse.json(
        {
          error:"INVALID_STUDENT_ID"
        },
        {
          status:400
        }
      );

    }



   const grades = await prisma.grades.findMany({

  where:{

    studentId:id,

    classSubject:{

      class:{

        academicYear:"1405-1406"

      }

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

    examDate:"desc"

  }

});


    return NextResponse.json(

      grades.map(grade => ({

        gradeId:
          grade.gradeId,

        subject:
          grade.classSubject.subject.subjectName,

        examType:
          grade.examType,

        score:
          grade.score,

        examDate:
          grade.examDate

      }))

    );



  }
  catch(error:any){


    console.error(
      "PRINCIPAL STUDENT GRADES ERROR:",
      error
    );


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