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



        // Verify grade match before creating
        const [schoolClass, subject] =
            await Promise.all([

                prisma.physicalclasses.findUnique({
                    where: { classId: Number(classId) },
                }),

                prisma.subjects.findUnique({
                    where: { subjectId: Number(subjectId) },
                }),

            ]);



        if (!schoolClass || !subject) {

            return NextResponse.json(
                {
                    error:
                    "Invalid class or subject"
                },
                {
                    status:400
                }
            );

        }



        if (subject.gradeLevel !== schoolClass.gradeLevel) {

            return NextResponse.json(
                {
                    error:
                    "SUBJECT_GRADE_MISMATCH"
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
