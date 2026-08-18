import { NextResponse } from "next/server";

import { prisma } from "@/src/database/prisma";



type Params = {
  params: {
    id: string;
  };
};




// GET
export async function GET(
  request: Request,
  { params }: Params
) {

  try {


    const classId =
      Number(params.id);



    console.log(
      "GET CLASS ID:",
      classId
    );



    const students =
      await prisma.students.findMany({

        where: {
          classId
        },

        include:{
          user:true
        }

      });



    return NextResponse.json(
      students
    );


  } catch(error:any){


    console.error(
      "GET STUDENTS ERROR:",
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







// POST
export async function POST(
  request: Request,
  { params }: Params
) {

  try {


    const classId =
      Number(params.id);



    console.log(
      "ADD STUDENT CLASS ID:",
      classId
    );



    const body =
      await request.json();



    console.log(
      "ADD STUDENT BODY:",
      body
    );



    const studentId =
      Number(body.studentId);



    console.log(
      "ADD STUDENT ID:",
      studentId
    );



    if(!classId || !studentId){

      return NextResponse.json(
        {
          error:"MISSING_DATA"
        },
        {
          status:400
        }
      );

    }



    const updatedStudent =
      await prisma.students.update({

        where:{
          userId:studentId
        },


        data:{
          classId
        },


        include:{
          user:true
        }

      });



    console.log(
      "UPDATED STUDENT:",
      updatedStudent
    );



    return NextResponse.json({

      success:true,

      student:updatedStudent

    });



  }
  catch(error:any){


    console.error(
      "ADD STUDENT ERROR:",
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