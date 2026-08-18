import { prisma } from "@/src/database/prisma";


export async function getPrincipalDashboard() {


  const [

    studentsCount,

    teachersCount,

    classesCount,

  ] = await Promise.all([


    prisma.students.count(),


    prisma.teachers.count(),


    prisma.physicalclasses.count(),


  ]);



  return {


    studentsCount,


    teachersCount,


    classesCount,


  };


}