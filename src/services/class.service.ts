import { prisma } from "@/src/database/prisma";

import {
  findClassById,
} from "@/src/repositories/class.repository";

import type {
  CreateClassInput,
  UpdateClassInput,
} from "@/src/validation/class.validation";



// ایجاد کلاس
export async function createClass(
  data: CreateClassInput
) {

  return await prisma.physicalclasses.create({

    data: {

      className:
        data.className,

      gradeLevel:
        data.gradeLevel,

      capacity:
        data.capacity,

      academicYear:
        data.academicYear,

    },

  });

}




// گرفتن یک کلاس
export async function getClassById(
  classId: number
) {

  const classData =
    await findClassById(classId);



  if (!classData) {

    throw new Error(
      "CLASS_NOT_FOUND"
    );

  }


  return classData;

}





// ویرایش کلاس
export async function updateClass(
  classId: number,
  data: UpdateClassInput
) {


  return await prisma.physicalclasses.update({

    where: {

      classId,

    },


    data: {

      ...(data.className !== undefined && {
        className: data.className,
      }),


      ...(data.gradeLevel !== undefined && {
        gradeLevel: data.gradeLevel,
      }),


      ...(data.capacity !== undefined && {
        capacity: data.capacity,
      }),


      ...(data.academicYear !== undefined && {
        academicYear: data.academicYear,
      }),

    },

  });

}