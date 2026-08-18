import { prisma } from "@/src/database/prisma";


export async function createPreRegistration(
  data: any
) {

  return await prisma.preregistrations.create({

    data,

  });

}





export async function findPreRegistrations() {

  return await prisma.preregistrations.findMany({

    orderBy: {

      createdAt: "desc",

    },

  });

}