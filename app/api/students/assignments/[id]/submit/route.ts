import { NextRequest, NextResponse } from "next/server";

import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

import { requireRole } from "@/src/utils/auth";
import { prisma } from "@/src/database/prisma";


export async function POST(
  request: NextRequest,
  context: {
    params: Promise<{ id: string }>
  }
) {

  try {

    const session = await requireRole([
      "STUDENT"
    ]);


    const studentId = session.user?.userId;


    if (!studentId) {

      return NextResponse.json(
        {
          error: "UNAUTHORIZED"
        },
        {
          status: 401
        }
      );

    }


    const { id } = await context.params;

    const assignmentId = Number(id);


    if (!assignmentId) {

      return NextResponse.json(
        {
          error: "INVALID_ASSIGNMENT_ID"
        },
        {
          status: 400
        }
      );

    }



    const formData = await request.formData();


    const file =
      formData.get("file") as File | null;



    if (!file) {

      return NextResponse.json(
        {
          error:"File is required"
        },
        {
          status:400
        }
      );

    }



    const bytes =
      await file.arrayBuffer();


    const buffer =
      Buffer.from(bytes);



    const extension =
      file.name.split(".").pop() || "bin";


    const filename =
      `${randomUUID()}.${extension}`;



    const uploadDir =
      path.join(
        process.cwd(),
        "public",
        "uploads",
        "assignment-submissions"
      );



    await mkdir(
      uploadDir,
      {
        recursive:true
      }
    );



    const uploadPath =
      path.join(
        uploadDir,
        filename
      );



    await writeFile(
      uploadPath,
      buffer
    );

const assignment =
  await prisma.assignments.findFirst({

    where:{
      assignmentId,

      classSubject:{
        class:{
          students:{
            some:{
              userId: studentId
            }
          }
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

    const submission =
      await prisma.assignment_submissions.create({

        data: {

          assignmentId,

          studentId,

          fileName: file.name,

          fileType:
            file.type || extension,

          filePath:
            `/uploads/assignment-submissions/${filename}`

        }

      });



    return NextResponse.json(
      submission,
      {
        status:201
      }
    );


  }
  catch(error:any){

    console.error(
      "ASSIGNMENT SUBMISSION ERROR:",
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