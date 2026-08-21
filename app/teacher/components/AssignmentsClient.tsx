"use client";

import {
  useState,
  useEffect,
  useCallback
} from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
  TeacherAssignment,
  TeacherClassSubject
} from "../types";



type AssignmentsClientProps = {
  classes: TeacherClassSubject[];
};



const statusLabels: Record<string,string> = {
  ACTIVE:"فعال",
  CLOSED:"بسته شده",
  ARCHIVED:"آرشیو",
};


const statusStyles: Record<string,string> = {
  ACTIVE:"bg-primary/10 text-primary",
  CLOSED:"bg-destructive/10 text-destructive",
  ARCHIVED:"bg-muted text-muted-foreground",
};



function effectiveStatus(
  status:string,
  deadline:string
){


  if(status !== "ACTIVE"){

    return status;

  }


  return new Date(deadline) < new Date()

    ? "CLOSED"

    : "ACTIVE";


}



export default function AssignmentsClient({
  classes,
}: AssignmentsClientProps) {


  const [assignments,setAssignments] =
    useState<TeacherAssignment[]>([]);


  const [loading,setLoading] =
    useState(true);


  const [error,setError] =
    useState<string | null>(null);


  const [filter,setFilter] =
    useState("ALL");


  const [createOpen,setCreateOpen] =
    useState(false);


  const [editTarget,setEditTarget] =
    useState<TeacherAssignment | null>(null);


  const [submitting,setSubmitting] =
    useState(false);



  const [form,setForm] =
    useState({

      title:"",
      description:"",
      deadline:"",
      classSubjectId:"",
      status:"ACTIVE"

    });




  const loadAssignments =
    useCallback(async()=>{


      setLoading(true);
      setError(null);


      try{


        const response =
          await fetch(
            "/api/teacher/assignments"
          );


        if(!response.ok){

          throw new Error(
            "بارگذاری تکالیف ناموفق بود"
          );

        }


        const data =
          await response.json();


        setAssignments(data);



      }
      catch(err:any){


        setError(
          err.message ||
          "خطای ناشناخته"
        );


      }
      finally{

        setLoading(false);

      }


    },[]);





  useEffect(()=>{

    loadAssignments();

  },[loadAssignments]);





  function resetForm(){

    setForm({

      title:"",
      description:"",
      deadline:"",
      classSubjectId:"",
      status:"ACTIVE"

    });

  }






  function openEdit(
    assignment:TeacherAssignment
  ){


    setEditTarget(
      assignment
    );


    setForm({

      title:
        assignment.title,


      description:
        assignment.description,


      deadline:
        assignment.deadline.slice(0,16),


      classSubjectId:
        assignment.classSubjectId.toString(),


      status:
        assignment.status

    });


  }






  async function handleCreate(){


    if(!form.classSubjectId){

      setError(
        "لطفاً کلاس/درس را انتخاب کنید"
      );

      return;

    }



    setSubmitting(true);



    try{


      const response =
        await fetch(
          "/api/teacher/assignments",
          {

            method:"POST",

            headers:{
              "Content-Type":"application/json"
            },


            body:JSON.stringify({

              title:form.title,

              description:form.description,

              deadline:
                new Date(
                  form.deadline
                ).toISOString(),


              classSubjectId:
                Number(
                  form.classSubjectId
                )

            })

          }
        );



      if(!response.ok){

        throw new Error(
          "ثبت تکلیف ناموفق بود"
        );

      }



      setCreateOpen(false);

      resetForm();

      await loadAssignments();


    }
    catch(err:any){

      setError(
        err.message
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


      const response =
        await fetch(

          `/api/teacher/assignments/${editTarget.assignmentId}`,

          {

            method:"PUT",

            headers:{
              "Content-Type":"application/json"
            },


            body:JSON.stringify({

              title:form.title,

              description:form.description,

              deadline:
                new Date(
                  form.deadline
                ).toISOString(),


              status:
                form.status

            })

          }

        );



      if(!response.ok){

        throw new Error(
          "ویرایش ناموفق بود"
        );

      }



      setEditTarget(null);

      resetForm();

      await loadAssignments();


    }
    catch(err:any){

      setError(
        err.message
      );

    }
    finally{

      setSubmitting(false);

    }


  }






  async function handleDelete(
    assignmentId:number
  ){


    if(
      !confirm(
        "آیا از حذف این تکلیف مطمئن هستید؟"
      )
    )
      return;



    await fetch(
      `/api/teacher/assignments/${assignmentId}`,
      {
        method:"DELETE"
      }
    );


    await loadAssignments();


  }





  const filteredAssignments =
    assignments.filter(
      item =>
        filter==="ALL"
        ||
        item.status===filter
    );






  return (

    <div
      dir="rtl"
      className="space-y-6"
    >


      <div className="flex justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            تکالیف
          </h1>

          <p className="text-gray-600">
            مدیریت تکالیف کلاس‌های شما
          </p>

        </div>



        <Dialog
          open={createOpen}
          onOpenChange={setCreateOpen}
        >

         <DialogTrigger>
  <Button>
    ایجاد تکلیف
  </Button>
</DialogTrigger>


          <DialogContent>

            <DialogHeader>

              <DialogTitle>
                ایجاد تکلیف
              </DialogTitle>

            </DialogHeader>


            <div className="space-y-4">


              <div className="form-field">

                <Label htmlFor="create-title">
                  عنوان
                </Label>

                <Input
                  id="create-title"
                  value={form.title}
                  onChange={(e)=>
                    setForm({
                      ...form,
                      title:e.target.value
                    })
                  }
                />

              </div>


              <div className="form-field">

                <Label htmlFor="create-description">
                  توضیحات
                </Label>

                <Textarea
                  id="create-description"
                  rows={4}
                  value={form.description}
                  onChange={(e)=>
                    setForm({
                      ...form,
                      description:e.target.value
                    })
                  }
                />

              </div>


              <div className="form-field">

                <Label htmlFor="create-deadline">
                  مهلت تحویل
                </Label>

                <Input
                  id="create-deadline"
                  type="datetime-local"
                  value={form.deadline}
                  onChange={(e)=>
                    setForm({
                      ...form,
                      deadline:e.target.value
                    })
                  }
                />

              </div>


              <div className="form-field">

                <Label>
                  کلاس / درس
                </Label>

                <Select
                  value={form.classSubjectId}
                  onValueChange={(value)=>{
                    if(value === null)
                      return;

                    setForm({
                      ...form,
                      classSubjectId:value
                    });
                  }}
                >

                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="انتخاب کنید" />
                  </SelectTrigger>

                  <SelectContent>
                    {
                      classes.map(cs=>(
                        <SelectItem
                          key={cs.classSubjectId}
                          value={cs.classSubjectId.toString()}
                        >
                          {cs.class.className} - {cs.subject.subjectName}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>

                </Select>

              </div>


              {error && (
                <div className="ui-error">
                  {error}
                </div>
              )}


            </div>


            <div className="mt-6 flex justify-end gap-2">

              <Button
                variant="outline"
                onClick={()=>
                  setCreateOpen(false)
                }
              >
                انصراف
              </Button>


              <Button
                disabled={submitting}
                onClick={
                  handleCreate
                }
              >
                {submitting ? "در حال ثبت..." : "ثبت تکلیف"}
              </Button>

            </div>


          </DialogContent>


        </Dialog>



        <Dialog
          open={editTarget !== null}
          onOpenChange={(open)=>{
            if(!open){
              setEditTarget(null);
            }
          }}
        >

          <DialogContent>

            <DialogHeader>

              <DialogTitle>
                ویرایش تکلیف
              </DialogTitle>

            </DialogHeader>


            <div className="space-y-4">


              <div className="form-field">

                <Label htmlFor="edit-title">
                  عنوان
                </Label>

                <Input
                  id="edit-title"
                  value={form.title}
                  onChange={(e)=>
                    setForm({
                      ...form,
                      title:e.target.value
                    })
                  }
                />

              </div>


              <div className="form-field">

                <Label htmlFor="edit-description">
                  توضیحات
                </Label>

                <Textarea
                  id="edit-description"
                  rows={4}
                  value={form.description}
                  onChange={(e)=>
                    setForm({
                      ...form,
                      description:e.target.value
                    })
                  }
                />

              </div>


              <div className="form-field">

                <Label htmlFor="edit-deadline">
                  مهلت تحویل
                </Label>

                <Input
                  id="edit-deadline"
                  type="datetime-local"
                  value={form.deadline}
                  onChange={(e)=>
                    setForm({
                      ...form,
                      deadline:e.target.value
                    })
                  }
                />

              </div>


              <div className="form-field">

                <Label>
                  وضعیت
                </Label>

                <Select
                  value={form.status}
                  onValueChange={(value)=>{
                    if(value === null)
                      return;

                    setForm({
                      ...form,
                      status:value
                    });
                  }}
                >

                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {
                      Object.entries(statusLabels).map(
                        ([value,label])=>(
                          <SelectItem
                            key={value}
                            value={value}
                          >
                            {label}
                          </SelectItem>
                        )
                      )
                    }
                  </SelectContent>

                </Select>

              </div>


              {error && (
                <div className="ui-error">
                  {error}
                </div>
              )}


            </div>


            <div className="mt-6 flex justify-end gap-2">

              <Button
                variant="outline"
                onClick={()=>
                  setEditTarget(null)
                }
              >
                انصراف
              </Button>


              <Button
                disabled={submitting}
                onClick={
                  handleUpdate
                }
              >
                {submitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </Button>

            </div>


          </DialogContent>

        </Dialog>


      </div>





      <div className="space-y-4">


      {filteredAssignments.map(
        assignment=>(


        <div
          key={
            assignment.assignmentId
          }
          className="
            rounded-lg
            border
            p-6
          "
        >


          <div className="flex flex-wrap items-center justify-between gap-2">

            <h3 className="text-xl font-bold">
              {assignment.title}
            </h3>


            <span
              className={`
                rounded-full
                px-3
                py-1
                text-xs
                font-medium
                ${
                  statusStyles[
                    effectiveStatus(
                      assignment.status,
                      assignment.deadline
                    )
                  ]
                }
              `}
            >
              {
                statusLabels[
                  effectiveStatus(
                    assignment.status,
                    assignment.deadline
                  )
                ]
              }
            </span>

          </div>



          <p>
            {assignment.description}
          </p>




          <p>
            کلاس:
            {" "}
            {
              assignment.classSubject
              ?.class
              ?.className
              ||
              "-"
            }
          </p>



          <p>
            درس:
            {" "}
            {
              assignment.classSubject
              ?.subject
              ?.subjectName
              ||
              "-"
            }
          </p>



          <p className="flex items-center gap-2">
            مهلت:
            {" "}
            {
              new Date(
                assignment.deadline
              )
              .toLocaleDateString(
                "fa-IR"
              )
            }

            {
              assignment.status === "ACTIVE" &&
              new Date(assignment.deadline) < new Date() && (
                <span
                  className="
                    rounded-full
                    bg-destructive/10
                    px-2
                    py-0.5
                    text-xs
                    font-medium
                    text-destructive
                  "
                >
                  مهلت تمام شده - ارسال بسته است
                </span>
              )
            }
          </p>





          <div className="mt-4 flex gap-2">


            <a
              href={
                `/teacher/assignments/${assignment.assignmentId}/submissions`
              }
              className="
                rounded
                border
                px-3
                py-2
                text-blue-600
              "
            >
              مشاهده ارسال‌ها
            </a>



            <Button
              variant="outline"
              onClick={()=>
                openEdit(assignment)
              }
            >
              ویرایش
            </Button>



            <Button
              variant="outline"
              className="text-red-600"
              onClick={()=>
                handleDelete(
                  assignment.assignmentId
                )
              }
            >
              حذف
            </Button>


          </div>



        </div>


        )
      )}


      </div>


    </div>

  );

}