import { prisma } from "@/src/database/prisma";

import {
  findSubjectById,
} from "@/src/repositories/subject.repository";


import type {
  CreateSubjectInput,
  UpdateSubjectInput,
} from "@/src/validation/subject.validation";




// Create Subject
export async function createSubject(
  data: CreateSubjectInput
) {


  return await prisma.subjects.create({

    data: {

      subjectName:
        data.subjectName,


      gradeLevel:
        data.gradeLevel ?? "",


      description:
        data.description ?? "",

    },


  });


}







// Get Subject By Id
export async function getSubjectById(
  subjectId: number
) {


  const subject =
    await findSubjectById(subjectId);



  if (!subject) {

    throw new Error(
      "SUBJECT_NOT_FOUND"
    );

  }



  return subject;


}







// Update Subject
export async function updateSubject(
  subjectId: number,
  data: UpdateSubjectInput
) {


  return await prisma.subjects.update({

    where: {

      subjectId,

    },


    data: {


      subjectName:
        data.subjectName,


      gradeLevel:
        data.gradeLevel ?? "",


      description:
        data.description ?? "",


    },


    select: {


      subjectId: true,

      subjectName: true,

      gradeLevel: true,

      description: true,


    },


  });


}