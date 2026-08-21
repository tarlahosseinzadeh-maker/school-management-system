"use client";

import {
  useEffect,
  useState,
} from "react";


type AssignmentItem = {

  assignmentId: number;

  title: string;

  description: string;

  subject: string;

  createdAt: string;

  deadline: string;

  status: string;

};



const statusLabels: Record<string,string> = {

  ACTIVE:"فعال",

  CLOSED:"بسته شده",

  ARCHIVED:"آرشیو",

};



const statusStyles: Record<string,string> = {

  ACTIVE:"bg-primary/10 text-primary font-medium",

  CLOSED:"bg-destructive/10 text-destructive font-medium",

  ARCHIVED:"bg-muted text-muted-foreground",

};



function effectiveStatus(

  status:string,

  deadline:string

){


  if(status !== "ACTIVE"){

    return status;

  }


  return new Date(deadline) < new Date()

    ? "CLOSED"

    : "ACTIVE";


}




export default function StudentAssignmentsPage() {


  const [assignments, setAssignments] =
    useState<AssignmentItem[]>([]);


  const [loading, setLoading] =
    useState(true);




  async function loadAssignments() {

    try {

      setLoading(true);


      const response =
        await fetch(
          "/api/students/assignments"
        );


      const data =
        await response.json();


      console.log(
        "MY ASSIGNMENTS:",
        data
      );


      if (
        response.ok &&
        Array.isArray(data)
      ) {

        setAssignments(data);

      } else {

        setAssignments([]);

      }


    } catch (error) {

      console.error(
        "ASSIGNMENTS PAGE ERROR:",
        error
      );

      setAssignments([]);

    } finally {

      setLoading(false);

    }

  }




  useEffect(() => {

    loadAssignments();

  }, []);




  if (loading) {

    return (

      <div
        className="p-6"
        dir="rtl"
      >

        در حال بارگذاری تکالیف...

      </div>

    );

  }




  return (

    <div
      className="space-y-6"
      dir="rtl"
    >


      <div>

        <h1 className="page-title">

          تکالیف من

        </h1>


        <p className="text-gray-500 mt-2">

          تکالیف مربوط به درس‌های کلاس شما

        </p>

      </div>





      {
        assignments.length === 0 && (

          <div
            className="
              bg-white
              border
              rounded-xl
              p-6
              text-gray-500
            "
          >

            در حال حاضر تکلیفی برای شما ثبت نشده است.

          </div>

        )
      }





      {
        assignments.length > 0 && (

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-4
            "
          >

            {
              assignments.map((item) => (

                <div
                  key={item.assignmentId}
                  className="
                    bg-white
                    border
                    rounded-xl
                    p-5
                    space-y-4
                  "
                >


                  <div>

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-3
                      "
                    >

                      <h2 className="text-lg font-bold">

                        {item.title}

                      </h2>


                      <span
                        className={`
                          text-sm
                          px-3
                          py-1
                          rounded-full
                          ${
                            statusStyles[
                              effectiveStatus(
                                item.status,
                                item.deadline
                              )
                            ]
                          }
                        `}
                      >

                        {
                          statusLabels[
                            effectiveStatus(
                              item.status,
                              item.deadline
                            )
                          ]
                        }

                      </span>

                    </div>


                    <p className="text-sm text-gray-500 mt-1">

                      درس:

                      {" "}

                      {item.subject}

                    </p>

                  </div>





                  <div>

                    <p className="text-sm text-gray-500">

                      توضیحات

                    </p>


                    <p className="mt-1">

                      {item.description || "بدون توضیحات"}

                    </p>

                  </div>





                  <div
                    className="
                      grid
                      grid-cols-2
                      gap-4
                      text-sm
                    "
                  >

                    <div>

                      <p className="text-gray-500">

                        تاریخ ثبت

                      </p>


                      <p className="font-medium mt-1">

                        {
                          new Date(
                            item.createdAt
                          ).toLocaleDateString(
                            "fa-IR"
                          )
                        }

                      </p>

                    </div>



                    <div>

                      <p className="text-gray-500">

                        مهلت تحویل

                      </p>


                      <p className="font-medium mt-1">

                        {
                          new Date(
                            item.deadline
                          ).toLocaleDateString(
                            "fa-IR"
                          )
                        }

                      </p>

                    </div>
                    <div
                         key={item.assignmentId}
                         className="
                         bg-white
                         border
                         rounded-xl
                         p-5
                         space-y-4
                            "
                          >

                         {/* اطلاعات تکلیف */}

                            <div
                          className="
                           grid
                           grid-cols-2
                           gap-4
                           text-sm
                           "
  >
    ...
                       </div>


                      <a
                         
                        href={`/students/assignments/${item.assignmentId}`}
                         className="
                         block
                         w-full
                          text-center
                          bg-blue-600
                          hover:bg-blue-700
                          text-white
                          rounded-lg
                          py-2
                          mt-4
                          transition
                        "
  >
                    مشاهده تکلیف و ارسال پاسخ
  </a>


</div>

                  </div>


                </div>

              ))
            }

          </div>

        )
      }


    </div>

  );

}