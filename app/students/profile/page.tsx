"use client";


import {
  useEffect,
  useState
} from "react";



type StudentProfile = {

  userId:number;

  firstName:string;

  lastName:string;

  studentCode:string;

  birthDate:string;

  phoneNumber:string;

  class?:{

    classId:number;

    className:string;

    gradeLevel:string;

    academicYear:string;

  };

};





export default function StudentProfilePage(){


  const [profile,setProfile] =
    useState<StudentProfile | null>(null);


  const [loading,setLoading] =
    useState(true);





  async function loadProfile(){


    try{


      const response =
        await fetch(
          "/api/students/profile"
        );



      const data =
        await response.json();



      console.log(
        "PROFILE PAGE:",
        data
      );



      if(response.ok){

        setProfile(data);

      }



    }
    catch(error){


      console.error(
        "PROFILE LOAD ERROR:",
        error
      );


    }
    finally{

      setLoading(false);

    }


  }





  useEffect(()=>{

    loadProfile();

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







  if(!profile){

    return (

      <div
        className="p-6"
        dir="rtl"
      >

        اطلاعات دانش‌آموز یافت نشد

      </div>

    );

  }







  return (

    <div
      className="space-y-6"
      dir="rtl"
    >



      <h1 className="page-title">

        پروفایل دانش‌آموز

      </h1>







      <div
        className="
        bg-white
        rounded-xl
        border
        p-6
        space-y-4
        "
      >




        <div>

          <span className="font-bold">

            نام و نام خانوادگی:

          </span>


          {" "}

          {profile.firstName}

          {" "}

          {profile.lastName}


        </div>






        <div>

          <span className="font-bold">

            کد دانش‌آموزی:

          </span>


          {" "}

          {profile.studentCode}


        </div>






        <div>

          <span className="font-bold">

            تاریخ تولد:

          </span>


          {" "}

          {
            new Date(
              profile.birthDate
            ).toLocaleDateString(
              "fa-IR"
            )
          }


        </div>






        <div>

          <span className="font-bold">

            شماره تماس:

          </span>


          {" "}

          {profile.phoneNumber}


        </div>







      </div>







      <div
        className="
        bg-white
        rounded-xl
        border
        p-6
        space-y-4
        "
      >


        <h2 className="text-xl font-bold">

          کلاس فعلی

        </h2>





        <div>

          <span className="font-bold">

            کلاس:

          </span>


          {" "}

          {profile.class?.className}


        </div>





        <div>

          <span className="font-bold">

            پایه:

          </span>


          {" "}

          {profile.class?.gradeLevel}


        </div>





        <div>

          <span className="font-bold">

            سال تحصیلی:

          </span>


          {" "}

          {profile.class?.academicYear}


        </div>



      </div>





    </div>

  );


}