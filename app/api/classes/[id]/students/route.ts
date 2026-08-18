import { NextResponse } from "next/server";

import { prisma } from "@/src/database/prisma";



type Context = {

  params: Promise<{
    id:string;
  }>;

};





export async function GET(
  request:Request,
  context:Context
){

  try {


    const { id } =
      await context.params;



    const classId =
      Number(id);



    console.log(
      "GET CLASS ID:",
      classId
    );



    const students =
      await prisma.students.findMany({

        where:{
          classId
        },


        include:{
          user:true
        }

      });



    return NextResponse.json(
      students
    );


  }
  catch(error:any){


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









export async function POST(
  request:Request,
  context:Context
){

  try {


    console.log(
      "POST ASSIGN STUDENT START"
    );



    const { id } =
      await context.params;



    const classId =
      Number(id);



    console.log(
      "CLASS ID:",
      classId
    );



    const body =
      await request.json();



    console.log(
      "BODY:",
      body
    );



    const studentId =
      Number(body.studentId);



    console.log(
      "STUDENT ID:",
      studentId
    );



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
      "POST ASSIGN ERROR:",
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