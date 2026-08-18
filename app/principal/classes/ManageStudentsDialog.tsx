"use client";


import {
  useEffect,
  useState
} from "react";


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





type Student = {

  userId:number;

  studentCode:string;

  firstName:string;

  lastName:string;

  nationalCode:string;

};





export default function ManageStudentsDialog({

  schoolClass,

  open,

  onClose,

}:Props){



const [students,setStudents] =
useState<Student[]>([]);



const [availableStudents,setAvailableStudents] =
useState<Student[]>([]);



const [selectedStudent,setSelectedStudent] =
useState<number | "">("");



const [loading,setLoading] =
useState(false);







async function loadData(){


try{


setLoading(true);



// دانش آموزان فعلی کلاس

const currentResponse =
await fetch(

`/api/classes/${schoolClass.classId}/students`

);



const currentData =
await currentResponse.json();



console.log(
"CURRENT STUDENTS:",
currentData
);



setStudents(

Array.isArray(currentData)

?

currentData.map((item:any)=>({

userId:item.userId,

studentCode:item.studentCode,

firstName:item.user?.firstName ?? "",

lastName:item.user?.lastName ?? "",

nationalCode:item.user?.nationalCode ?? "",

}))

:

[]

);








// دانش آموزان بدون کلاس

const availableResponse =
await fetch(

"/api/students/available"

);



const availableData =
await availableResponse.json();



console.log(
"AVAILABLE STUDENTS:",
availableData
);



setAvailableStudents(

Array.isArray(availableData)

?

availableData

:

[]

);



}
catch(error){

console.error(
"LOAD STUDENTS ERROR:",
error
);

}

finally{

setLoading(false);

}


}









useEffect(()=>{


if(open){

loadData();

}


},[open]);










async function addStudent(){


console.log(
"ADD BUTTON CLICK:",
{
student:selectedStudent,
classId:schoolClass.classId
}
);



if(!selectedStudent){

console.log(
"NO STUDENT SELECTED"
);

return;

}





const response =
await fetch(

`/api/classes/${schoolClass.classId}/students`,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

studentId:Number(selectedStudent)

})


}

);





const result =
await response.json();



console.log(
"ADD RESPONSE:",
result
);






if(response.ok){


setSelectedStudent("");

await loadData();


}



}









return (


<Dialog

open={open}

onOpenChange={(value)=>{

if(!value)

onClose();

}}

>


<DialogContent

dir="rtl"

className="space-y-6"

>


<DialogHeader>

<DialogTitle>

دانش‌آموزان کلاس:

{" "}

{schoolClass.className}

</DialogTitle>

</DialogHeader>









<section>


<h3 className="font-bold mb-3">

دانش‌آموزان کلاس

</h3>



{

loading &&

<p>

در حال بارگذاری...

</p>

}




{

students.length===0 && !loading &&

<p className="text-gray-500">

دانش‌آموزی در این کلاس نیست

</p>

}




{

students.map(student=>(


<div

key={student.userId}

className="border rounded p-3 mb-2"

>


{student.firstName}

{" "}

{student.lastName}


</div>


))

}



</section>









<section>


<h3 className="font-bold mb-3">

افزودن دانش‌آموز

</h3>






<select

className="border rounded p-2 w-full"

value={selectedStudent}

onChange={(e)=>{


setSelectedStudent(

Number(e.target.value)

);


}}


>


<option value="">

انتخاب دانش‌آموز

</option>





{

availableStudents.map(student=>(


<option

key={student.userId}

value={student.userId}

>

{student.firstName}

{" "}

{student.lastName}

{" - "}

{student.studentCode}

</option>


))

}



</select>







<Button

className="mt-4 w-full"

onClick={addStudent}

disabled={!selectedStudent}

>

افزودن به کلاس

</Button>





</section>






</DialogContent>


</Dialog>


);


}