import { prisma } from "@/src/database/prisma";

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

type FindSubjectsParams = {
  search?: string;
};



// Get all subjects
export async function findSubjects(
  params: FindSubjectsParams = {}
) {

  const {
    search,
  } = params;



  return await prisma.subjects.findMany({

    where: search
      ? {
          subjectName: {
            contains: search,
          },
        }
      : undefined,


    orderBy: {
      subjectId: "desc",
    },


  });

}





// Get single subject
export async function findSubjectById(
  subjectId: number
) {

  return await prisma.subjects.findUnique({

    where: {
      subjectId,
    },

  });

}