"use client";

import {
  useEffect,
  useState,
} from "react";



type SubjectItem = {
  classSubjectId: number;

  subject: {
    subjectId: number;
    subjectName: string;
  };

  teacher: {
    firstName: string;
    lastName: string;
  } | null;
};





export default function StudentSubjectsPage() {

  const [subjects, setSubjects] =
    useState<SubjectItem[]>([]);

  const [loading, setLoading] =
    useState(true);





  async function loadSubjects() {

    try {

      setLoading(true);


      const response =
        await fetch(
          "/api/students/subjects"
        );


      const data =
        await response.json();


      console.log(
        "MY SUBJECTS:",
        data
      );


      if (
        response.ok &&
        Array.isArray(data)
      ) {

        setSubjects(data);

      } else {

        setSubjects([]);

      }


    } catch (error) {

      console.error(
        "SUBJECTS PAGE ERROR:",
        error
      );

      setSubjects([]);

    } finally {

      setLoading(false);

    }

  }





  useEffect(() => {

    loadSubjects();

  }, []);





  if (loading) {

    return (

      <div
        className="p-6"
        dir="rtl"
      >

        در حال بارگذاری درس‌ها...

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

          درس‌های من

        </h1>


        <p className="text-gray-500 mt-2">

          درس‌های مربوط به کلاس فعلی شما

        </p>

      </div>





      {
        subjects.length === 0 && (

          <div
            className="
              bg-white
              border
              rounded-xl
              p-6
              text-gray-500
            "
          >

            هنوز درسی برای کلاس شما ثبت نشده است.

          </div>

        )
      }






      {
        subjects.length > 0 && (

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-4
            "
          >


            {
              subjects.map((item) => (

                <div
                  key={item.classSubjectId}
                  className="
                    bg-white
                    border
                    rounded-xl
                    p-5
                    space-y-4
                  "
                >


                  <div>

                    <p className="text-sm text-gray-500">

                      درس

                    </p>


                    <h2 className="text-lg font-bold">

                      {item.subject.subjectName}

                    </h2>

                  </div>





                  <div>

                    <p className="text-sm text-gray-500">

                      معلم

                    </p>


                    {
                      item.teacher ? (

                        <p className="font-medium">

                          {item.teacher.firstName}

                          {" "}

                          {item.teacher.lastName}

                        </p>

                      ) : (

                        <p className="text-gray-500">

                          معلم تعیین نشده

                        </p>

                      )
                    }

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