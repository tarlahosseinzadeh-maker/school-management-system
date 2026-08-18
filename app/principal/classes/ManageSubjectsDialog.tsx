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
  };

  open:boolean;

  onClose:()=>void;

};
 


type Subject={

  subjectId:number;

  subjectName:string;

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


setSubjects(subjectsData);





const classSubjectsRes =
await fetch("/api/class-subjects");


const classSubjectsData =
await classSubjectsRes.json();



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

className="border p-3 my-2 rounded"

>



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


))

}




</div>









<div className="space-y-3">



<h3 className="font-bold">

افزودن درس

</h3>







<select

className="border p-2 w-full"

value={selectedSubject}

onChange={(e)=>{


const value =
Number(e.target.value);



setSelectedSubject(value);


setSelectedTeacher("");



if(value){

loadTeachersBySubject(value);

}


}}

>


<option value="">

انتخاب درس

</option>



{

subjects.map(subject=>(


<option

key={subject.subjectId}

value={subject.subjectId}

>

{subject.subjectName}

</option>


))

}


</select>









<select

className="border p-2 w-full"

value={selectedTeacher}

onChange={(e)=>

setSelectedTeacher(
Number(e.target.value)
)

}

>


<option value="">

انتخاب معلم

</option>



{

teachers.map(teacher=>(


<option

key={teacher.userId}

value={teacher.userId}

>


{teacher.user.firstName}

{" "}

{teacher.user.lastName}


</option>


))


}



</select>








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