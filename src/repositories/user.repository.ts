import { prisma } from "@/src/database/prisma";

type UserRole = "STUDENT" | "TEACHER" | "PRINCIPAL";

async function detectRole(userId: number): Promise<UserRole | null> {

  const student =
    await prisma.students.findUnique({
      where: {
        userId,
      },
    });


  if (student) {
    return "STUDENT";
  }



  const teacher =
    await prisma.teachers.findUnique({
      where: {
        userId,
      },
    });


  if (teacher) {
    return "TEACHER";
  }



  const principal =
    await prisma.principals.findUnique({
      where: {
        userId,
      },
    });


  if (principal) {
    return "PRINCIPAL";
  }



  return null;

}





export async function findUsers(params: {

  search?: string;

  role?: UserRole;

  page: number;

  limit: number;

}) {


  const {
    search,
    role,
    page,
    limit,
  } = params;




  const skip =
    (page - 1) * limit;





  const users =
    await prisma.users.findMany({


      where: search

        ? {

            OR: [

              {
                firstName:{
                  contains: search,
                },
              },


              {
                lastName:{
                  contains: search,
                },
              },


              {
                username:{
                  contains: search,
                },
              },


              {
                nationalCode:{
                  contains: search,
                },
              },


            ],

          }


        : undefined,



      select: {

        userId:true,

        firstName:true,

        lastName:true,

        nationalCode:true,

        phoneNumber:true,

        username:true,

        isActive:true,

      },



      skip,

      take:limit,



      orderBy:{

        userId:"desc",

      },


    });







  let usersWithRole = await Promise.all(


    users.map(async(user)=>({


      ...user,


      role:
        await detectRole(
          user.userId
        ),


    }))


  );







  if(role){


    usersWithRole =
      usersWithRole.filter(
        user =>
          user.role === role
      );


  }









  const total =
    usersWithRole.length;






  return {


    users:
      usersWithRole,


    total,


    page,


    limit,


  };


}









export async function findUserById(
  userId:number
) {


  const user =
    await prisma.users.findUnique({

      where:{
        userId,
      },


      select:{

        userId:true,

        firstName:true,

        lastName:true,

        nationalCode:true,

        phoneNumber:true,

        username:true,

        isActive:true,

      },


    });




  if(!user){

    return null;

  }






  let role:
    | "STUDENT"
    | "TEACHER"
    | "PRINCIPAL"
    | null = null;





  const student =
    await prisma.students.findUnique({

      where:{
        userId,
      },

    });




  if(student){

    role="STUDENT";

  }






  const teacher =
    await prisma.teachers.findUnique({

      where:{
        userId,
      },

    });




  if(teacher){

    role="TEACHER";

  }







  const principal =
    await prisma.principals.findUnique({

      where:{
        userId,
      },

    });




  if(principal){

    role="PRINCIPAL";

  }







  return {


    ...user,


    role,


  };


}