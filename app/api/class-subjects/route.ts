import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/database/prisma";


// =========================
// GET CLASS SUBJECTS
// =========================

export async function GET() {

    try {


        const classSubjects =
            await prisma.classsubjects.findMany({

                include:{


                    subject:true,


                    teacher:{
                        include:{
                            user:true
                        }
                    },


                    class:true

                }

            });



        console.log(
            "CLASS SUBJECTS:",
            classSubjects
        );



        return NextResponse.json(
            classSubjects
        );


    } catch(error){


        console.error(
            "GET CLASS SUBJECTS ERROR:",
            error
        );


        return NextResponse.json(
            {
                error:"Failed to load class subjects"
            },
            {
                status:500
            }
        );

    }

}





// =========================
// CREATE CLASS SUBJECT
// =========================

export async function POST(
    req:NextRequest
){


    try{


        const body =
            await req.json();



        const {
            classId,
            subjectId,
            teacherId
        } = body;




        if(
            !classId ||
            !subjectId ||
            !teacherId
        ){

            return NextResponse.json(
                {
                    error:
                    "Missing required fields"
                },
                {
                    status:400
                }
            );

        }




        const newClassSubject =
            await prisma.classsubjects.create({

                data:{


                    classId:Number(classId),


                    subjectId:Number(subjectId),


                    teacherId:Number(teacherId)


                },


                include:{


                    subject:true,


                    teacher:{
                        include:{
                            user:true
                        }
                    },


                    class:true

                }

            });





        console.log(
            "CREATED:",
            newClassSubject
        );



        return NextResponse.json(
            newClassSubject,
            {
                status:201
            }
        );



    }catch(error){


        console.error(
            "CREATE CLASS SUBJECT ERROR:",
            error
        );


        return NextResponse.json(
            {
                error:
                "Failed to create class subject"
            },
            {
                status:500
            }
        );

    }

}