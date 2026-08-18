import { prisma } from "@/src/database/prisma";
export async function findStudentAssignments(
  userId:number
){

  return await prisma.assignments.findMany({

    where:{

      classSubject:{

        class:{

          students:{

            some:{

              userId

            }

          }

        }

      }

    },


    include:{

      classSubject:{

        include:{

          subject:true

        }

      }

    },


    orderBy:{

      deadline:"asc"

    }

  });

}
export async function findStudentGrades(
  userId:number
){

  return await prisma.grades.findMany({

    where:{

      studentId:userId

    },


    include:{

      classSubject:{

        include:{

          subject:true

        }

      }

    },


    orderBy:{

      examDate:"desc"

    }

  });

}

export async function findStudentByUserId(
  userId:number
){

  return await prisma.students.findUnique({

    where:{
      userId
    },


    include:{

      user:true,

      class:true

    }

  });

}
export async function findStudentClass(
  userId:number
){

  return await prisma.students.findUnique({

    where:{
      userId
    },

    select:{

      class:true

    }

  });

}
export async function findStudentSubjects(
  userId:number
){

  return await prisma.classsubjects.findMany({

    where:{

      class:{
        students:{
          some:{
            userId
          }
        }
      }

    },


    include:{

      subject:true,


      teacher:{
        include:{
          user:true
        }
      }

    }

  });

}
export async function findStudentFiles(
  userId:number
){

  return await prisma.educationalfiles.findMany({

    where:{

      classSubject:{

        class:{

          students:{

            some:{

              userId

            }

          }

        }

      }

    },


    include:{

      classSubject:{

        include:{

          subject:true

        }

      }

    },


    orderBy:{

      uploadDate:"desc"

    }

  });

}