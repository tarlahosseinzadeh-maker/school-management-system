"use client";

import {
  useEffect,
  useState
} from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


import { Button } from "@/components/ui/button";



type Props = {

  schoolClass:{
    classId:number;
    className:string;
    gradeLevel:string;
  };

  open:boolean;

  onClose:()=>void;

 };



type Subject={

  subjectId:number;

  subjectName:string;

  gradeLevel:string;

 };



type Teacher={

  userId:number;

  specialization:string;

  user:{

    firstName:string;

    lastName:string;

  };

 };



type ClassSubject={

  classSubjectId:number;

  classId:number;

  subjectId:number;

  teacherId:number;


  subject:{

    subjectName:string;

  };


  teacher?:{

    user?:{

      firstName:string;

      lastName:string;

    };

  };

 };





export default function ManageSubjectsDialog({

 schoolClass,

 open,

 onClose,

}:Props){



 const [subjects,setSubjects]=
  useState<Subject[]>([]);



 const [teachers,setTeachers]=
  useState<Teacher[]>([]);



 const [classSubjects,setClassSubjects]=
  useState<ClassSubject[]>([]);



 const [selectedSubject,setSelectedSubject]=
  useState<number | "">("");



 const [selectedTeacher,setSelectedTeacher]=
  useState<number | "">("");
  async function loadData(){




  try{




   const subjectsRes =
   await fetch("/api/subjects");

   const subjectsData =
   await subjectsRes.json();


   if (!Array.isArray(subjectsData)) {
     throw new Error(subjectsData.error || "خطا در دریافت دروس");
   }

   const filteredSubjects =
   subjectsData.filter(
     (item:Subject) =>
       item.gradeLevel === schoolClass.gradeLevel
   );

   setSubjects(filteredSubjects);




   const classSubjectsRes =
   await fetch(`/api/class-subjects?classId=${schoolClass.classId}`);

   const classSubjectsData =
   await classSubjectsRes.json();


   if (!Array.isArray(classSubjectsData)) {
     throw new Error(classSubjectsData.error || "خطا در دریافت گروه‌های درسی");
   }

   const filtered =
   classSubjectsData.filter(
     (item:ClassSubject)=>
       item.classId === schoolClass.classId
   );



   setClassSubjects(filtered);




  }
  catch(error){

   console.error(
     "LOAD DATA ERROR:",
     error
   );

  }




  }



 async function loadTeachersBySubject(
  subjectId:number
 ){



  try{



  const subject =
  subjects.find(
    item =>
      item.subjectId === subjectId
  );



  if(!subject){

    setTeachers([]);

    return;

  }



  const res =
  await fetch(
    `/api/teacher?specialization=${encodeURIComponent(subject.subjectName)}`
  );



  const data =
  await res.json();



  console.log(
    "FILTERED TEACHERS:",
    data
  );



  setTeachers(data);



 }
 catch(error){

  console.error(
    "LOAD TEACHERS ERROR:",
    error
  );

 }



 }



 useEffect(()=>{



  if(open){

    loadData();

  }



 },[open]);





 async function addSubject(){



  if(
   !selectedSubject ||
   !selectedTeacher
  )

  return;





  await fetch(

    "/api/class-subjects",

    {

      method:"POST",

      headers:{
        "Content-Type":
        "application/json"

      },


      body:JSON.stringify({

        classId:
        schoolClass.classId,


        subjectId:
        selectedSubject,


        teacherId:
        selectedTeacher,

      })


    }

  );





  setSelectedSubject("");

  setSelectedTeacher("");

  setTeachers([]);



  await loadData();



 }



  async function removeSubject(
    classSubjectId:number
  ){

    if(
      !window.confirm(
        "آیا از حذف این درس اطمینان دارید؟"
      )
    ){
      return;
    }

    try{

      const res =
      await fetch(
        `/api/class-subjects/${classSubjectId}`,
        {
          method:"DELETE"
        }
      );

      if(!res.ok){
        const data =
        await res.json();
        alert(
          data.error ||
          "خطا در حذف درس"
        );
        return;
      }

      await loadData();

    }
    catch(error){
      console.error(
        "DELETE SUBJECT ERROR:",
        error
      );
      alert(
        "خطای ارتباط با سرور"
      );
    }

  }

  return (

  <Dialog

    open={open}

    onOpenChange={(v)=>{



      if(!v)

        onClose();



    }}

  >



  <DialogContent

    dir="rtl"

  >



  <DialogHeader>

    <DialogTitle>

      مدیریت درس‌های کلاس:

      {" "}

      {schoolClass.className}

    </DialogTitle>

  </DialogHeader>





  <div>


    <h3 className="font-bold">

      درس‌های فعلی

    </h3>



    {

      classSubjects.map(item=>(



        <div

          key={item.classSubjectId}

          className="border p-3 my-2 rounded flex items-start justify-between gap-2"

        >




                    <div>
            <div>
              {item.subject.subjectName}
            </div>

            <div className="text-sm text-gray-500">


            معلم:

            {" "}


            {
              item.teacher?.user?.firstName
              ??
              "بدون معلم"
            }



            {" "}



            {
              item.teacher?.user?.lastName
              ??
              ""
            }



          </div>
          </div>

          <Button
            variant="destructive"
            size="sm"
            onClick={() =>
              removeSubject(
                item.classSubjectId
              )
            }
          >
            حذف
          </Button>




        </div>



      ))

    }





  </div>





  <div className="space-y-3">



    <h3 className="font-bold">

      افزودن درس

    </h3>







    <div className="space-y-2">



      <Label>

        درس

      </Label>



      <Select

        value={selectedSubject.toString()}

        onValueChange={(value) => {

          const numValue = Number(value);

          setSelectedSubject(numValue);

          setSelectedTeacher("");



          if(numValue){

            loadTeachersBySubject(numValue);

          }

        }}

        itemToStringLabel={(value) => {

          const subject = subjects.find(
            (s) => s.subjectId.toString() === value
          );

          return subject ? subject.subjectName : "";

        }}

      >

        <SelectTrigger>

          <SelectValue placeholder="انتخاب درس" />

        </SelectTrigger>



        <SelectContent>

          {subjects.map((subject)=>(

            <SelectItem

              key={subject.subjectId}

              value={subject.subjectId.toString()}

            >

              {subject.subjectName}

            </SelectItem>

          ))}

        </SelectContent>

      </Select>



    </div>





    <div className="space-y-2">



      <Label>

        معلم

      </Label>



      <Select

        value={selectedTeacher.toString()}

        onValueChange={(value) =>
          setSelectedTeacher(Number(value))
        }

        itemToStringLabel={(value) => {

          const teacher = teachers.find(
            (t) => t.userId.toString() === value
          );

          return teacher
            ? `${teacher.user.firstName} ${teacher.user.lastName}`
            : "";

        }}

      >

        <SelectTrigger>

          <SelectValue placeholder="انتخاب معلم" />

        </SelectTrigger>



        <SelectContent>

          {teachers.map((teacher)=>(

            <SelectItem

              key={teacher.userId}

              value={teacher.userId.toString()}

            >



              {teacher.user.firstName}

              {" "}

              {teacher.user.lastName}



            </SelectItem>



          ))}

        </SelectContent>

      </Select>



    </div>





    <Button

      onClick={addSubject}

      disabled={
        !selectedSubject ||
        !selectedTeacher
      }

    >

      افزودن

    </Button>





  </div>





  </DialogContent>





  </Dialog>



 );



}
