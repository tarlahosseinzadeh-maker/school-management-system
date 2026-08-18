"use client";


import {
  useEffect,
  useState
} from "react";



type StudentClass = {

  classId:number;

  className:string;

  gradeLevel:string;

  capacity:number;

  academicYear:string;

};





export default function StudentClassPage(){


  const [studentClass,setStudentClass] =
    useState<StudentClass | null>(null);


  const [loading,setLoading] =
    useState(true);






  async function loadClass(){


    try{


      const response =
        await fetch(
          "/api/students/class"
        );



      const data =
        await response.json();



      console.log(
        "MY CLASS:",
        data
      );



      if(response.ok){

        setStudentClass(data);

      }


    }
    catch(error){

      console.error(
        "CLASS PAGE ERROR:",
        error
      );

    }
    finally{

      setLoading(false);

    }


  }





  useEffect(()=>{

    loadClass();

  },[]);






  if(loading){

    return (

      <div
        className="p-6"
        dir="rtl"
      >

        در حال بارگذاری...

      </div>

    );

  }






  if(!studentClass){

    return (

      <div
        className="p-6"
        dir="rtl"
      >

        کلاس برای شما ثبت نشده است

      </div>

    );

  }







  return (

    <div
      className="space-y-6"
      dir="rtl"
    >



      <h1 className="page-title">

        کلاس من

      </h1>






      <div
        className="
        bg-white
        border
        rounded-xl
        p-6
        space-y-4
        "
      >



        <div>

          <span className="font-bold">

            نام کلاس:

          </span>


          {" "}

          {studentClass.className}

        </div>






        <div>

          <span className="font-bold">

            پایه:

          </span>


          {" "}

          {studentClass.gradeLevel}

        </div>






        <div>

          <span className="font-bold">

            سال تحصیلی:

          </span>


          {" "}

          {studentClass.academicYear}

        </div>






        <div>

          <span className="font-bold">

            ظرفیت کلاس:

          </span>


          {" "}

          {studentClass.capacity}

          {" نفر"}

        </div>






      </div>




    </div>

  );


}