"use client";


import {
  useEffect,
  useState,
} from "react";


import PreRegistrationTable from "./components/PreRegistrationTable";


import type {
  PreRegistration,
} from "./types";





export default function PreRegistrationsClient() {



  const [
    registrations,
    setRegistrations,
  ] = useState<PreRegistration[]>([]);





  const [
    loading,
    setLoading,
  ] = useState(true);





  const [
    error,
    setError,
  ] = useState("");









  async function loadData() {


    try {


      setLoading(true);



      const response =
        await fetch(
          "/api/pre-registrations",
          {
            cache: "no-store",
          }
        );





      if (!response.ok) {


        throw new Error(
          "خطا در دریافت اطلاعات"
        );


      }






      const data =
        await response.json();





      setRegistrations(data);




    } catch(error:any) {


      setError(
        error.message
      );



    } finally {


      setLoading(false);


    }


  }









  useEffect(()=>{


    loadData();



  },[]);









  if(loading){


    return (
      <div className="ui-loading">
        در حال بارگذاری...
      </div>
    );


  }









  if(error){


    return (
      <div className="ui-error">
        {error}
      </div>
    );


  }









  return (


    <div
      className="space-y-6"
      dir="rtl"
    >



      <h1 className="page-title">

        مدیریت پیش ثبت‌نام‌ها

      </h1>







      <PreRegistrationTable


        registrations={
          registrations
        }


        onSuccess={
          loadData
        }


      />





    </div>


  );


}