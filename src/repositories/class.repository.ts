import { prisma } from "@/src/database/prisma";


// گرفتن لیست کلاس‌ها
export async function findClasses() {

  return await prisma.physicalclasses.findMany({

    orderBy: {
      classId: "desc",
    },

  });

}



// گرفتن یک کلاس با ID
export async function findClassById(
  classId: number
) {

  return await prisma.physicalclasses.findUnique({

    where: {
      classId,
    },

  });

}