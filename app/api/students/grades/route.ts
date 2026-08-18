import { NextResponse } from "next/server";


import {
  requireRole
} from "@/src/utils/auth";


import {
  getStudentGrades
} from "@/src/services/student.service";




export async function GET(){


  try{


    const session =
      await requireRole([
        "STUDENT"
      ]);



    const userId =
      session.user?.userId;



    if(!userId){

      return NextResponse.json(
        {
          error:"UNAUTHORIZED"
        },
        {
          status:401
        }
      );

    }





    const grades =
      await getStudentGrades(
        userId
      );




    return NextResponse.json(
      grades
    );



  }
  catch(error:any){


    console.error(
      "STUDENT GRADES ERROR:",
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