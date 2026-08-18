import { NextResponse } from "next/server";


import {
  requireRole
} from "@/src/utils/auth";


import {
  getStudentClass
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



const studentClass =
await getStudentClass(
  userId
);



return NextResponse.json(
 studentClass
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