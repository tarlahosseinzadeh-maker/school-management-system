"use client";

import {
  useState,
  useEffect,
  useCallback,
} from "react";

import Link from "next/link";

import {
  Button
} from "@/components/ui/button";

import {
  Input
} from "@/components/ui/input";

import {
  Label
} from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type {
  TeacherGrade,
  TeacherStudent
} from "../types";



type ClassGradesClientProps = {

  classSubjectId:number;

  className:string;

  subjectName:string;

};



export default function ClassGradesClient({

  classSubjectId,

  className,

  subjectName,

}:ClassGradesClientProps){


  const [grades,setGrades] =
    useState<TeacherGrade[]>([]);


  const [students,setStudents] =
    useState<TeacherStudent[]>([]);


  const [loading,setLoading] =
    useState(true);


  const [error,setError] =
    useState<string | null>(null);


  const [createOpen,setCreateOpen] =
    useState(false);


  const [editTarget,setEditTarget] =
    useState<TeacherGrade | null>(null);


  const [submitting,setSubmitting] =
    useState(false);



type GradeForm = {
  studentId: string;
  examType: string;
  score: string;
};


const [form,setForm] =
  useState<GradeForm>({
    studentId:"",
    examType:"",
    score:""
  });




  const loadData =
    useCallback(async()=>{


      try{

        setLoading(true);


        const [
          gradesRes,
          studentsRes
        ] =
        await Promise.all([

          fetch(
            `/api/teacher/classes/${classSubjectId}/grades`
          ),


          fetch(
            `/api/teacher/classes/${classSubjectId}/students`
          )

        ]);



        if(
          !gradesRes.ok ||
          !studentsRes.ok
        ){

          throw new Error(
            "خطا در دریافت اطلاعات"
          );

        }



        const [
          gradesData,
          studentsData
        ] =
        await Promise.all([

          gradesRes.json(),

          studentsRes.json()

        ]);



        setGrades(
          gradesData
        );


        setStudents(
          studentsData
        );


      }
      catch(error:any){

        setError(
          error.message
        );

      }
      finally{

        setLoading(false);

      }


    },[
      classSubjectId
    ]);





  useEffect(()=>{

    loadData();

  },[
    loadData
  ]);





  function resetForm(){

    setForm({

      studentId:"",
      examType:"",
      score:""

    });

  }






  function openEdit(
    grade:TeacherGrade
  ){

    setEditTarget(
      grade
    );


    setForm({

      studentId:
        grade.studentId.toString(),


      examType:
        grade.examType,


      score:
        grade.score.toString()

    });

  }







  async function handleCreate(){


    setSubmitting(true);


    try{


      const res =
        await fetch(
          "/api/teacher/grades",
          {

            method:"POST",

            headers:{
              "Content-Type":"application/json"
            },


            body:JSON.stringify({

              studentId:
                Number(
                  form.studentId
                ),


              classSubjectId,


              examType:
                form.examType,


              score:
                Number(
                  form.score
                )

            })

          }
        );



      if(!res.ok){

        throw new Error(
          "ثبت نمره ناموفق بود"
        );

      }



      setCreateOpen(false);

      resetForm();

      loadData();


    }
    catch(error:any){

      setError(
        error.message
      );

    }
    finally{

      setSubmitting(false);

    }

  }






  async function handleUpdate(){


    if(!editTarget)
      return;



    setSubmitting(true);



    try{


      const res =
        await fetch(

          `/api/teacher/grades/${editTarget.gradeId}`,

          {

            method:"PUT",

            headers:{
              "Content-Type":"application/json"
            },


            body:JSON.stringify({

              examType:
                form.examType,


              score:
                Number(
                  form.score
                )

            })

          }

        );



      if(!res.ok){

        throw new Error(
          "ویرایش نمره ناموفق بود"
        );

      }



      setEditTarget(null);

      resetForm();

      loadData();


    }
    catch(error:any){

      setError(
        error.message
      );

    }
    finally{

      setSubmitting(false);

    }

  }






  const formFields = (

    <div className="space-y-4">


      {
        !editTarget &&

        <div>

          <Label>
            دانش‌آموز
          </Label>


<Select
  value={form.studentId}
  onValueChange={(value) => {
    setForm((prev) => ({
      ...prev,
      studentId: String(value),
    }));
  }}
>

            <SelectTrigger>

              <SelectValue
                placeholder="انتخاب دانش‌آموز"
              />

            </SelectTrigger>


            <SelectContent>

              {
                students.map(
                  student=>(

                    <SelectItem

                      key={
                        student.userId
                      }

                      value={
                        student.userId.toString()
                      }

                    >

                      {
                        student.user.firstName
                      }

                      {" "}

                      {
                        student.user.lastName
                      }

                    </SelectItem>

                  )
                )
              }

            </SelectContent>

          </Select>

        </div>
      }



      <div>

        <Label>
          نوع آزمون
        </Label>


        <Input

          value={
            form.examType
          }

          onChange={
            e=>
            setForm(
              prev=>({
                ...prev,
                examType:e.target.value
              })
            )
          }

        />

      </div>




      <div>

        <Label>
          نمره
        </Label>


        <Input

          type="number"

          min="0"

          max="20"

          value={
            form.score
          }

          onChange={
            e=>
            setForm(
              prev=>({
                ...prev,
                score:e.target.value
              })
            )
          }

        />

      </div>


    </div>

  );






  return (

    <div
      dir="rtl"
      className="space-y-6"
    >


      <div>

        <Link
          href="/teacher/grades"
          className="text-blue-600"
        >

          بازگشت

        </Link>


        <h1 className="text-3xl font-bold mt-3">

          کارنامه کلاس

        </h1>


        <p className="text-gray-600">

          {
            className
          }

          {" - "}

          {
            subjectName
          }

        </p>

      </div>





      <Dialog
        open={
          createOpen
        }

        onOpenChange={
          setCreateOpen
        }

      >
<DialogTrigger>
  <Button>
    ثبت نمره
  </Button>
</DialogTrigger>

        <DialogContent>

          <DialogHeader>

            <DialogTitle>
              ثبت نمره جدید
            </DialogTitle>

          </DialogHeader>


          {formFields}


          <Button
            onClick={handleCreate}
            disabled={submitting}
          >

            ثبت

          </Button>


        </DialogContent>


      </Dialog>





      {
        loading &&

        <p>
          در حال بارگذاری...
        </p>

      }



      {
        error &&

        <p className="text-red-500">
          {error}
        </p>

      }






      <div className="rounded-lg border overflow-hidden">


        <table className="w-full">


          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-right">
                دانش‌آموز
              </th>


              <th className="p-3 text-right">
                آزمون
              </th>


              <th className="p-3 text-right">
                نمره
              </th>


              <th className="p-3">
                عملیات
              </th>


            </tr>

          </thead>



          <tbody>


          {
            grades.map(
              grade=>(


                <tr
                  key={
                    grade.gradeId
                  }
                  className="border-t"
                >


                  <td className="p-3">

                    {
                      grade.student.user.firstName
                    }

                    {" "}

                    {
                      grade.student.user.lastName
                    }

                  </td>



                  <td className="p-3">

                    {
                      grade.examType
                    }

                  </td>



                  <td className="p-3">

                    {
                      grade.score
                    }

                  </td>



                  <td className="p-3">


                    <Button

                      variant="outline"

                      onClick={
                        ()=>openEdit(grade)
                      }

                    >

                      ویرایش

                    </Button>


                  </td>


                </tr>


              )
            )
          }


          </tbody>


        </table>


      </div>





      <Dialog

        open={
          !!editTarget
        }

        onOpenChange={
          open=>{

            if(!open){

              setEditTarget(null);

              resetForm();

            }

          }
        }

      >

        <DialogContent>

          <DialogHeader>

            <DialogTitle>
              ویرایش نمره
            </DialogTitle>

          </DialogHeader>


          {formFields}


          <Button
            onClick={handleUpdate}
            disabled={submitting}
          >

            ذخیره

          </Button>


        </DialogContent>


      </Dialog>


    </div>

  );

}