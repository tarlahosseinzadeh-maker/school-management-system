import { prisma } from "@/src/database/prisma";


export async function findClassSubjects() {

  return await prisma.classsubjects.findMany({

    include: {
      class: true,
      subject: true,
    },

    orderBy: {
      classSubjectId: "desc",
    },

  });

}





export async function findClassSubjectById(
  classSubjectId: number
) {

  return await prisma.classsubjects.findUnique({

    where: {
      classSubjectId,
    },

    include: {
      class: true,
      subject: true,
    },

  });

}