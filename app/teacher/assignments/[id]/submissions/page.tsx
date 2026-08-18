import Link from "next/link";

import { requireTeacher } from "@/src/utils/auth";
import { prisma } from "@/src/database/prisma";


export default async function SubmissionsPage({

  params

}: {
  params: Promise<{
    id:string
  }>
}) {


  const { id } =
    await params;


  await requireTeacher();



  const assignmentId =
    Number(id);



const submissions =
  await prisma.assignment_submissions.findMany({

    where:{
      assignmentId
    },


    include:{

      student:{

        include:{

          user:true

        }

      }

    },


    orderBy:{
      submittedAt:"desc"
    }

});



  return (

    <main
      dir="rtl"
      className="space-y-6"
    >


      <h1 className="text-3xl font-bold">
        ارسال‌های دانش‌آموزان
      </h1>



      {
        submissions.length === 0

        ?

        <div className="
          rounded-xl
          border
          p-6
          text-gray-500
        ">
          هنوز فایلی ارسال نشده است.
        </div>


        :


        <div className="space-y-4">


          {
            submissions.map(item => (


              <div
                key={item.submissionId}
                className="
                  rounded-xl
                  border
                  p-5
                  space-y-3
                "
              >


                <p>
                    دانش‌آموز:
                    {" "}
                    {item.student.user.firstName}
                    {" "}
                    {item.student.user.lastName}
</p>

                <p>
                  فایل:
                  {" "}
                  {item.fileName}
                </p>



                <p>
                  تاریخ ارسال:
                  {" "}
                  {
                    new Date(
                      item.submittedAt
                    )
                    .toLocaleDateString(
                      "fa-IR"
                    )
                  }
                </p>



                <Link
                  href={item.filePath}
                  target="_blank"
                  className="
                    inline-block
                    rounded-lg
                    bg-blue-600
                    px-4
                    py-2
                    text-white
                  "
                >
                  مشاهده فایل
                </Link>


              </div>


            ))
          }


        </div>

      }


    </main>

  );

}