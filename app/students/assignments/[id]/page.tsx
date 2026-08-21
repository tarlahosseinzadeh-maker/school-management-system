"use client";

import {
  useState,
  useEffect
} from "react";

import {
  useParams
} from "next/navigation";

import {
  Clock,
  Lock
} from "lucide-react";



type StudentAssignment = {
  assignmentId:number;
  status:string;
  deadline:string;
};



export default function AssignmentDetailPage(){


  const params = useParams();

  const id = params.id as string;



  const [file,setFile] =
    useState<File | null>(null);


  const [loading,setLoading] =
    useState(false);


  const [message,setMessage] =
    useState("");


  const [assignment,setAssignment] =
    useState<StudentAssignment | null>(null);


  const [checking,setChecking] =
    useState(true);




  useEffect(()=>{


    let active = true;


    fetch("/api/students/assignments")
      .then(res=>res.json())
      .then(data=>{

        if(!active)
          return;

        const found =
          Array.isArray(data)
          ?
          data.find(
            item=>
              item.assignmentId === Number(id)
          )
          :
          null;

        setAssignment(found || null);

      })
      .catch(()=>{})
      .finally(()=>{

        if(active)
          setChecking(false);

      });


    return ()=>{

      active = false;

    };


  },[id]);




  const isClosed =
    assignment !== null &&
    assignment.status !== "ACTIVE";


  const isExpired =
    assignment !== null &&
    assignment.status === "ACTIVE" &&
    new Date(assignment.deadline) < new Date();




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
          data.error === "ASSIGNMENT_CLOSED"
          ?
          "این تکلیف بسته شده است"
          :
          data.error === "ASSIGNMENT_EXPIRED"
          ?
          "مهلت ارسال این تکلیف به پایان رسیده است"
          :
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
        content-card
        max-w-xl
        mx-auto
        p-6
        md:p-8
        space-y-5
      "
      dir="rtl"
    >


      <h1
        className="
          page-title
        "
      >

        ارسال پاسخ تکلیف

      </h1>



      <p
        className="page-description"
      >

        شماره تکلیف:
        {" "}
        {id}

      </p>




      {
        checking
        ?
        (
          <p className="ui-loading">
            در حال بررسی وضعیت تکلیف...
          </p>
        )
        :
        isClosed
        ?
        (

          <div
            className="
              ui-error
              flex
              items-center
              gap-2
              justify-center
            "
          >
            <Lock className="size-4 shrink-0" />
            این تکلیف بسته شده و امکان ارسال ندارد
          </div>

        )
        :
        isExpired
        ?
        (

          <div
            className="
              ui-error
              flex
              items-center
              gap-2
              justify-center
            "
          >
            <Clock className="size-4 shrink-0" />
            مهلت ارسال این تکلیف به پایان رسیده است
          </div>

        )
        :
        (
          <>



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
          border-border
          rounded-lg
          p-2
          w-full
          file:ml-3
          file:rounded-md
          file:border-0
          file:bg-primary/10
          file:px-3
          file:py-1.5
          file:text-primary
          file:text-sm
          file:font-medium
        "

      />




      <button

        onClick={submitAssignment}

        disabled={loading}

        className="
          w-full
          bg-primary
          hover:bg-primary/90
          text-white
          font-medium
          rounded-lg
          py-2.5
          transition-colors
          disabled:opacity-50
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


          </>
        )
      }




      {
        message &&

        <p
          className="
            text-center
            text-sm
            text-muted-foreground
          "
        >

          {message}

        </p>

      }



    </div>

  );

}
