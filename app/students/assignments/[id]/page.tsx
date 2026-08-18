"use client";

import {
  useState
} from "react";

import {
  useParams
} from "next/navigation";


export default function AssignmentDetailPage(){


  const params = useParams();

  const id = params.id as string;



  const [file,setFile] =
    useState<File | null>(null);


  const [loading,setLoading] =
    useState(false);


  const [message,setMessage] =
    useState("");




  async function submitAssignment(){


    if(!file){

      setMessage(
        "یک فایل انتخاب کنید"
      );

      return;

    }



    try{


      setLoading(true);



      const formData =
        new FormData();



      formData.append(
        "file",
        file
      );



      const res =
        await fetch(
          `/api/students/assignments/${id}/submit`,
          {
            method:"POST",
            body:formData
          }
        );



      const data =
        await res.json();



      if(res.ok){


        setMessage(
          "تکلیف با موفقیت ارسال شد"
        );


        setFile(null);


      }
      else{


        setMessage(
          data.error || "خطا در ارسال فایل"
        );


      }


    }
    catch(error){


      console.error(
        error
      );


      setMessage(
        "خطا در ارتباط با سرور"
      );


    }
    finally{


      setLoading(false);


    }


  }





  return (

    <div
      className="
        max-w-xl
        mx-auto
        bg-white
        border
        rounded-xl
        p-6
        space-y-5
      "
      dir="rtl"
    >


      <h1
        className="
          text-xl
          font-bold
        "
      >

        ارسال پاسخ تکلیف

      </h1>



      <p
        className="text-gray-500"
      >

        شماره تکلیف:
        {" "}
        {id}

      </p>




      <input

        type="file"

        onChange={
          e =>
          setFile(
            e.target.files?.[0] || null
          )
        }

        className="
          border
          rounded-lg
          p-2
          w-full
        "

      />





      <button

        onClick={submitAssignment}

        disabled={loading}

        className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          text-white
          rounded-lg
          py-2
        "

      >

        {
          loading
          ?
          "در حال ارسال..."
          :
          "ارسال فایل"
        }


      </button>




      {
        message &&

        <p
          className="
            text-center
            text-sm
          "
        >

          {message}

        </p>

      }



    </div>

  );

}