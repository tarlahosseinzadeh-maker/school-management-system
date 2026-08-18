"use client";


import {
  useMemo
} from "react";


import {
  useStudentDashboard
} from "./hooks/useStudentDashboard";




export default function StudentDashboardPage(){


const {
  profile,
  subjects,
  grades,
  assignments,
  files,
  loading

} = useStudentDashboard();





  const average = useMemo(()=>{


    if(!grades.length){

      return 0;

    }


    const total =
      grades.reduce(
        (sum,item)=>
          sum + item.score,
        0
      );


    return total / grades.length;


  },[grades]);







  const latestGrades =
    grades.slice(0,5);






  const latestAssignments =
    assignments.slice(0,3);







  if(loading){


    return (

      <div
        className="p-6"
        dir="rtl"
      >

        در حال بارگذاری داشبورد...

      </div>

    );


  }








  return (


    <div
      className="space-y-6"
      dir="rtl"
    >





      {/* Header */}

      <div
        className="
        bg-white
        border
        rounded-xl
        p-6
        "
      >


        <h1
          className="
          text-2xl
          font-bold
          "
        >

          سلام

          {" "}

          {profile?.firstName}

          {" "}

          {profile?.lastName}

          👋

        </h1>



        <div
          className="
          mt-4
          text-gray-600
          space-y-2
          "
        >

          <p>

            کد دانش‌آموزی:

            {" "}

            {profile?.studentCode}

          </p>



          <p>

            کلاس:

            {" "}

            {profile?.class?.className}

            {" - "}

            {profile?.class?.gradeLevel}

          </p>


        </div>



      </div>








      {/* Stats */}


      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="stat-card">
          <p className="stat-card-label">تعداد درس‌ها</p>
          <p className="stat-card-value">{subjects.length}</p>
        </div>

        <div className="stat-card">
          <p className="stat-card-label">میانگین کل</p>
          <p className="stat-card-value">{average.toFixed(2)}</p>
        </div>

        <div className="stat-card">
          <p className="stat-card-label">تکالیف فعال</p>
          <p className="stat-card-value">{assignments.length}</p>
        </div>
      </div>


<section className="space-y-3">
        <h2 className="section-title">آخرین فایل‌های آموزشی</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {files.slice(0, 3).map((file) => (
            <div key={file.fileId} className="content-card p-5">
              <h3 className="font-medium">{file.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{file.subject}</p>
              <p className="mt-2 text-sm">{file.fileName}</p>

              <a
                href={file.filePath}
                target="_blank"
                className="mt-4 block rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                مشاهده فایل
              </a>
            </div>
          ))}
        </div>
      </section>






      {/* Latest Grades */}



      <section>


        <h2
          className="
          text-xl
          font-bold
          mb-3
          "
        >

          آخرین نمرات

        </h2>




        <div
          className="
          bg-white
          border
          rounded-xl
          "
        >


          {
            latestGrades.length === 0 && (

              <p
                className="
                p-5
                text-gray-500
                "
              >

                هنوز نمره‌ای ثبت نشده است

              </p>

            )
          }





          {
            latestGrades.map(item=>(


              <div

                key={item.gradeId}

                className="
                flex
                justify-between
                p-4
                border-b
                last:border-b-0
                "

              >


                <span>

                  {item.subject}

                </span>



                <span
                  className="font-bold"
                >

                  {item.score}

                </span>



              </div>


            ))
          }


        </div>


      </section>









      {/* Assignments */}



      <section>


        <h2
          className="
          text-xl
          font-bold
          mb-3
          "
        >

          آخرین تکالیف

        </h2>





        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-4
          "
        >



          {
            latestAssignments.map(item=>(


              <div

                key={item.assignmentId}

                className="
                bg-white
                border
                rounded-xl
                p-5
                "

              >


                <h3
                  className="font-bold"
                >

                  {item.title}

                </h3>



                <p
                  className="
                  text-sm
                  text-gray-500
                  mt-2
                  "
                >

                  {item.subject}

                </p>



                <p
                  className="
                  text-sm
                  mt-3
                  "
                >

                  مهلت:

                  {" "}

                  {
                    new Date(
                      item.deadline
                    ).toLocaleDateString(
                      "fa-IR"
                    )
                  }

                </p>


              </div>


            ))
          }


        </div>


      </section>





    </div>


  );


}