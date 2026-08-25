import { prisma } from "@/src/database/prisma";

import {
  findClassSubjectById,
} from "@/src/repositories/classSubject.repository";

import type {
  CreateClassSubjectInput,
  UpdateClassSubjectInput,
} from "@/src/validation/classSubject.validation";





// Create ClassSubject
export async function createClassSubject(
  data: CreateClassSubjectInput
) {



  // بررسی وجود کلاس
  const schoolClass =
    await prisma.physicalclasses.findUnique({

      where: {
        classId: data.classId,
      },

    });



  if (!schoolClass) {

    throw new Error(
      "CLASS_NOT_FOUND"
    );

  }



  // بررسی وجود درس
  const subject =
    await prisma.subjects.findUnique({

      where: {
        subjectId: data.subjectId,
      },

    });



  if (!subject) {

    throw new Error(
      "SUBJECT_NOT_FOUND"
    );

  }



  // بررسی تطابق پایه تحصیلی
  if (subject.gradeLevel !== schoolClass.gradeLevel) {

    throw new Error(
      "SUBJECT_GRADE_MISMATCH"
    );

  }



  // بررسی وجود معلم
  const teacher =
    await prisma.teachers.findUnique({

      where: {
        userId: data.teacherId,
      },

    });

  if (!teacher) {

    throw new Error(
      "TEACHER_NOT_FOUND"
    );

  }



  // جلوگیری از ثبت تکراری کلاس + درس + معلم
  const existing =
    await prisma.classsubjects.findUnique({
  where: {
      classId_subjectId_teacherId: {
       classId: data.classId,
      subjectId: data.subjectId,
      teacherId: data.teacherId,
    },
  },
  });



  if (existing) {

    throw new Error(
      "CLASS_SUBJECT_ALREADY_EXISTS"
    );

  }



  return await prisma.classsubjects.create({

    data: {

      classId: data.classId,

      subjectId: data.subjectId,

      teacherId: data.teacherId,

    },

    include: {

      class: true,

      subject: true,

      teacher: true,

    },

  });



}





// Get ClassSubject By Id
export async function getClassSubjectById(
  classSubjectId: number
) {

  const item =
    await findClassSubjectById(
      classSubjectId
    );



  if (!item) {

    throw new Error(
      "CLASS_SUBJECT_NOT_FOUND"
    );

  }



  return item;



}





// Update ClassSubject
export async function updateClassSubject(
  classSubjectId: number,
  data: UpdateClassSubjectInput
) {

  // اگر کلاس تغییر کرده، اعتبارسنجی کن
  if (data.classId) {

    const schoolClass =
      await prisma.physicalclasses.findUnique({
        where: { classId: data.classId },
      });

    if (!schoolClass) {

      throw new Error(
        "CLASS_NOT_FOUND"
      );

    }

    // اگر subject تغییر کرده، اعتبارسنجی کن
    if (data.subjectId) {

      const subject =
        await prisma.subjects.findUnique({
          where: { subjectId: data.subjectId },
        });

      if (!subject) {

        throw new Error(
          "SUBJECT_NOT_FOUND"
        );

      }



      if (subject.gradeLevel !== schoolClass.gradeLevel) {

        throw new Error(
          "SUBJECT_GRADE_MISMATCH"
        );

      }

    }

  }



  return await prisma.classsubjects.update({

    where: {

      classSubjectId,

    },

    data: {

      classId: data.classId,

      subjectId: data.subjectId,

      teacherId: data.teacherId,

    },

    include: {

      class: true,

      subject: true,

      teacher: true,

    },



  });



}
