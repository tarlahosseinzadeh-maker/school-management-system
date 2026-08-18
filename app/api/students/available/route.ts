import { NextResponse } from "next/server";

import { prisma } from "@/src/database/prisma";


export async function GET(){

try{


const students =
await prisma.students.findMany({

where:{
classId:null
},


include:{
user:true
}

});



return NextResponse.json(

students.map(student=>({

userId:student.userId,

studentCode:student.studentCode,

firstName:student.user.firstName,

lastName:student.user.lastName,

nationalCode:student.user.nationalCode,

}))

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
status:500
}

);


}

}