import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/database/prisma";


export async function GET(req: NextRequest) {

    try {

        const { searchParams } = new URL(req.url);

        const specialization =
            searchParams.get("specialization");


        const teachers =
            await prisma.teachers.findMany({

                where: specialization
                    ? {
                        specialization: specialization
                    }
                    : undefined,


                include: {
                    user: true
                },


                orderBy: {
                    user: {
                        firstName: "asc"
                    }
                }

            });


        return NextResponse.json(
            teachers
        );


    } catch(error) {

        console.error(
            "GET TEACHERS ERROR:",
            error
        );


        return NextResponse.json(
            {
                error:"Failed to load teachers"
            },
            {
                status:500
            }
        );
    }
}