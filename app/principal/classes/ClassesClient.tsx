"use client";

import { useState } from "react";

import { useClasses } from "./hooks/useClasses";

import ClassTable from "./components/ClassTable";

import CreateClassDialog from "./components/CreateClassDialog";

import ManageSubjectsDialog from "./ManageSubjectsDialog";

import ManageStudentsDialog from "./ManageStudentsDialog";

import type { SchoolClass } from "./types";



export default function ClassesClient() {


  const {
    classes,
    loading,
    error,
    refresh,
  } = useClasses();




  const [selectedClass, setSelectedClass] =
    useState<SchoolClass | null>(null);



  const [studentsClass, setStudentsClass] =
    useState<SchoolClass | null>(null);





  if (loading) {

    return (

      <div
        dir="rtl"
        className="
        flex
        min-h-[200px]
        items-center
        justify-center
        text-gray-500
        "
      >

        در حال بارگذاری...

      </div>

    );

  }





  if (error) {

    return (

      <div
        dir="rtl"
        className="
        rounded-xl
        border
        bg-red-50
        p-5
        text-red-700
        "
      >

        {error}

      </div>

    );

  }






  return (

    <main
      dir="rtl"
      className="
      space-y-6
      "
    >



      <section
        className="
        bg-white
        border
        rounded-xl
        p-6
        "
      >


        <div
          className="
          flex
          items-center
          justify-between
          gap-4
          "
        >


          <div>

            <h1
              className="
              text-2xl
              font-bold
              text-gray-800
              "
            >
              مدیریت کلاس‌ها
            </h1>


            <p
              className="
              mt-2
              text-sm
              text-gray-500
              "
            >
              ایجاد، ویرایش و مدیریت کلاس‌های مدرسه
            </p>


          </div>



          <CreateClassDialog
            onSuccess={refresh}
          />



        </div>


      </section>







      <section
        className="
        bg-white
        border
        rounded-xl
        p-4
        "
      >


        <ClassTable

          classes={classes}

          onSuccess={refresh}



          onManageSubjects={(schoolClass)=>{

            setSelectedClass(
              schoolClass
            );

          }}



          onManageStudents={(schoolClass)=>{

            setStudentsClass(
              schoolClass
            );

          }}

        />


      </section>









      {
        selectedClass && (

          <ManageSubjectsDialog

            schoolClass={selectedClass}

            open={true}

            onClose={()=>{

              setSelectedClass(null);

            }}

          />

        )
      }







      {
        studentsClass && (

          <ManageStudentsDialog

            schoolClass={studentsClass}

            open={true}

            onClose={()=>{

              setStudentsClass(null);

            }}

          />

        )
      }





    </main>

  );

}