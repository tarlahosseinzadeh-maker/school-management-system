import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";


export async function POST(
  request: NextRequest
) {

  try {


    const formData =
      await request.formData();


    const file =
      formData.get("file") as File;



    if (!file) {

      return NextResponse.json(
        {
          error: "File is required"
        },
        {
          status: 400
        }
      );

    }



    const bytes =
      await file.arrayBuffer();


    const buffer =
      Buffer.from(bytes);



    const extension =
      file.name.split(".").pop();



    const filename =
      `${randomUUID()}.${extension}`;



    const uploadPath =
      path.join(
        process.cwd(),
        "public",
        "uploads",
        "announcements",
        filename
      );



    await writeFile(
      uploadPath,
      buffer
    );



    return NextResponse.json({

      url:
        `/uploads/announcements/${filename}`

    });



  } catch(error) {


    console.error(
      "UPLOAD ERROR:",
      error
    );


    return NextResponse.json(
      {
        error:"Upload failed"
      },
      {
        status:500
      }
    );

  }

}