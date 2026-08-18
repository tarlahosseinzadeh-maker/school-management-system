import { NextResponse } from "next/server";


import {
  requireRole
} from "@/src/utils/auth";


import {
  getStudentSubjects
} from "@/src/services/student.service";



export async function GET(){

try{


const session =
await requireRole([
  "STUDENT"
]);



const userId =
session.user?.userId;



if(!userId){

return NextResponse.json(
{
error:"UNAUTHORIZED"
},
{
status:401
}
);

}



const subjects =
await getStudentSubjects(
 userId
);



return NextResponse.json(
 subjects
);



}
catch(error:any){


console.error(
 error
);


return NextResponse.json(
{
error:error.message
},
{
status:error.status ?? 500
}
);


}

}