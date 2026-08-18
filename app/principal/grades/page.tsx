"use client";

import {
  useEffect,
  useState
} from "react";


type Student = {
  userId:number;
  name:string;
};


type SchoolClass = {
  classId:number;
  className:string;
  academicYear:string;
  students:Student[];
};


type Grade = {
  gradeId:number;
  subject:string;
  examType:string;
  score:number;
  examDate:string;
};

function calculateAverage(grades: Grade[]) {

  if (grades.length === 0) {
    return 0;
  }


  const total =
    grades.reduce(
      (sum, item) => sum + item.score,
      0
    );


  return (
    total / grades.length
  ).toFixed(2);

}

export default function PrincipalGradesPage(){


  const [classes,setClasses] =
    useState<SchoolClass[]>([]);


  const [selectedClass,setSelectedClass] =
    useState<SchoolClass | null>(null);



  const [selectedStudent,setSelectedStudent] =
    useState<Student | null>(null);



  const [grades,setGrades] =
    useState<Grade[]>([]);



  const [loading,setLoading] =
    useState(false);





  useEffect(()=>{


    async function loadClasses(){


      const res =
        await fetch(
          "/api/principal/grades"
        );


      const data =
        await res.json();


      setClasses(data);


    }


    loadClasses();


  },[]);






  async function loadGrades(
    student:Student
  ){


    setSelectedStudent(
      student
    );


    setLoading(true);



    const res =
      await fetch(
        `/api/principal/grades/${student.userId}`
      );



    const data =
      await res.json();



    setGrades(data);


    setLoading(false);


  }





  return (

    <main
      dir="rtl"
      className="space-y-6"
    >


      <div>

        <h1 className="text-3xl font-bold">

          کارنامه‌ها

        </h1>


        <p className="text-gray-500 mt-2">

          سال تحصیلی:
          {" "}
          {
            classes[0]?.academicYear ?? "-"
          }

        </p>

      </div>






      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-5
        "
      >


        {/* Classes */}

        <div
          className="
          border
          rounded-xl
          p-4
          space-y-3
          "
        >

          <h2 className="font-bold">

            کلاس‌ها

          </h2>



          {
            classes.map(item=>(

              <button

                key={
                  item.classId
                }


                onClick={()=>{

                  setSelectedClass(item);

                  setSelectedStudent(null);

                  setGrades([]);

                }}


                className="
                w-full
                text-right
                border
                rounded-lg
                p-3
                hover:bg-gray-100
                "

              >

                کلاس {item.className}

              </button>


            ))
          }


        </div>






        {/* Students */}

        <div
          className="
          border
          rounded-xl
          p-4
          space-y-3
          "
        >

          <h2 className="font-bold">

            دانش‌آموزان

          </h2>



          {
            !selectedClass

            ?

            <p className="text-gray-500">
              ابتدا کلاس را انتخاب کنید
            </p>


            :


            selectedClass.students.map(student=>(


              <button

                key={
                  student.userId
                }


                onClick={()=>loadGrades(student)}


                className="
                w-full
                text-right
                border
                rounded-lg
                p-3
                hover:bg-gray-100
                "

              >

                {
                  student.name
                }

              </button>


            ))


          }


        </div>








        {/* Grades */}

        <div
          className="
          md:col-span-1
          border
          rounded-xl
          p-4
          "
        >


          <div className="flex justify-between items-center mb-4">

  <h2 className="font-bold">

    کارنامه

  </h2>


  {
    selectedStudent &&
    grades.length > 0 &&

    <div
      className="
      rounded-lg
      bg-green-100
      px-3
      py-2
      text-green-700
      font-bold
      "
    >

      معدل:
      {" "}
      {
        calculateAverage(grades)
      }

    </div>
  }


</div>


          {
            !selectedStudent

            ?

            <p className="text-gray-500">

              دانش‌آموز را انتخاب کنید

            </p>


            :


            loading

            ?

            <p>
              در حال دریافت...
            </p>


            :


            grades.length === 0

            ?

            <p className="text-gray-500">

              نمره‌ای ثبت نشده

            </p>


            :


            <div className="space-y-3">


              {
                grades.map(grade=>(


                  <div

                    key={
                      grade.gradeId
                    }

                    className="
                    border
                    rounded-lg
                    p-3
                    "

                  >

                    <p className="font-bold">

                      {
                        grade.subject
                      }

                    </p>


                    <p>

                      آزمون:
                      {" "}
                      {
                        grade.examType
                      }

                    </p>


                    <p>

                      نمره:
                      {" "}
                      {
                        grade.score
                      }

                    </p>


                    <p className="text-sm text-gray-500">

                      {
                        new Date(
                          grade.examDate
                        )
                        .toLocaleDateString(
                          "fa-IR"
                        )
                      }

                    </p>


                  </div>


                ))
              }


            </div>


          }


        </div>


      </div>


    </main>

  );

}