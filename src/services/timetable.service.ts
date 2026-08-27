import { prisma } from "@/src/database/prisma";

import {
  findTimetableEntries,
  findTimetableEntryById,
  createTimetableEntry as repoCreateTimetableEntry,
  updateTimetableEntry as repoUpdateTimetableEntry,
  deleteTimetableEntry as repoDeleteTimetableEntry,
  checkClassConflict,
  checkTeacherConflict,
} from "@/src/repositories/timetable.repository";

import type {
  CreateTimetableInput,
  UpdateTimetableInput,
} from "@/src/validation/timetable.validation";

export async function getTimetableForClass(classId: number) {
  const entries = await findTimetableEntries({ classId });

  const mapped = entries.map((entry) => ({
    timetableId: entry.timetableId,
    dayOfWeek: entry.dayOfWeek,
    period: entry.period,
    classSubjectId: entry.classSubjectId,
    subjectName: entry.classSubject.subject.subjectName,
    teacherName: entry.classSubject.teacher
      ? `${entry.classSubject.teacher.user.firstName} ${entry.classSubject.teacher.user.lastName}`
      : "بدون معلم",
    className: entry.class.className,
    gradeLevel: entry.class.gradeLevel,
  }));

  return mapped;
}

export async function getTimetableForStudent(studentId: number) {
  const student = await prisma.students.findUnique({
    where: { userId: studentId },
    select: { classId: true },
  });

  if (!student || !student.classId) {
    return [];
  }

  return getTimetableForClass(student.classId);
}

export async function getTimetableForTeacher(teacherId: number) {
  const teacherClassSubjects = await prisma.classsubjects.findMany({
    where: { teacherId },
    select: { classSubjectId: true },
  });

  const classSubjectIds = teacherClassSubjects.map((cs) => cs.classSubjectId);

  if (classSubjectIds.length === 0) {
    return [];
  }

  const entries = await findTimetableEntries({
    classSubjectId: classSubjectIds[0],
  });

  const allEntries = await Promise.all(
    classSubjectIds.map((id) => findTimetableEntries({ classSubjectId: id }))
  );

  const flattened = allEntries.flat();

  const mapped = flattened.map((entry) => ({
    timetableId: entry.timetableId,
    dayOfWeek: entry.dayOfWeek,
    period: entry.period,
    classSubjectId: entry.classSubjectId,
    subjectName: entry.classSubject.subject.subjectName,
    teacherName: entry.classSubject.teacher
      ? `${entry.classSubject.teacher.user.firstName} ${entry.classSubject.teacher.user.lastName}`
      : "بدون معلم",
    className: entry.class.className,
    gradeLevel: entry.class.gradeLevel,
  }));

  return mapped;
}

export async function createTimetableEntry(data: CreateTimetableInput) {
  const [physicalClass, classSubject] = await Promise.all([
    prisma.physicalclasses.findUnique({
      where: { classId: data.classId },
    }),
    prisma.classsubjects.findUnique({
      where: { classSubjectId: data.classSubjectId },
      include: {
        subject: true,
      },
    }),
  ]);

  if (!physicalClass) {
    throw new Error("CLASS_NOT_FOUND");
  }

  if (!classSubject) {
    throw new Error("CLASS_SUBJECT_NOT_FOUND");
  }

  if (classSubject.subject.gradeLevel !== physicalClass.gradeLevel) {
    throw new Error("SUBJECT_GRADE_MISMATCH");
  }

  if (classSubject.classId !== data.classId) {
    throw new Error("CLASS_SUBJECT_MISMATCH");
  }

  const classConflict = await checkClassConflict(
    data.classId,
    data.dayOfWeek,
    data.period
  );

  if (classConflict) {
    throw new Error("CLASS_CONFLICT");
  }

  const teacherConflict = await checkTeacherConflict(
    classSubject.teacherId,
    data.dayOfWeek,
    data.period
  );

  if (teacherConflict) {
    throw new Error("TEACHER_CONFLICT");
  }

  return await repoCreateTimetableEntry(data);
}

export async function updateTimetableEntry(
  timetableId: number,
  data: UpdateTimetableInput
) {
  const existing = await findTimetableEntryById(timetableId);

  if (!existing) {
    throw new Error("TIMETABLE_NOT_FOUND");
  }

  const targetClassId = data.classId ?? existing.classId;
  const targetClassSubjectId = data.classSubjectId ?? existing.classSubjectId;
  const targetDayOfWeek = data.dayOfWeek ?? existing.dayOfWeek;
  const targetPeriod = data.period ?? existing.period;

  const [physicalClass, classSubject] = await Promise.all([
    prisma.physicalclasses.findUnique({
      where: { classId: targetClassId },
    }),
    prisma.classsubjects.findUnique({
      where: { classSubjectId: targetClassSubjectId },
      include: {
        subject: true,
      },
    }),
  ]);

  if (!physicalClass) {
    throw new Error("CLASS_NOT_FOUND");
  }

  if (!classSubject) {
    throw new Error("CLASS_SUBJECT_NOT_FOUND");
  }

  if (classSubject.subject.gradeLevel !== physicalClass.gradeLevel) {
    throw new Error("SUBJECT_GRADE_MISMATCH");
  }

  if (classSubject.classId !== targetClassId) {
    throw new Error("CLASS_SUBJECT_MISMATCH");
  }

  const classConflict = await checkClassConflict(
    targetClassId,
    targetDayOfWeek,
    targetPeriod,
    timetableId
  );

  if (classConflict) {
    throw new Error("CLASS_CONFLICT");
  }

  const teacherConflict = await checkTeacherConflict(
    classSubject.teacherId,
    targetDayOfWeek,
    targetPeriod,
    timetableId
  );

  if (teacherConflict) {
    throw new Error("TEACHER_CONFLICT");
  }

  const updateData: any = {};

  if (data.classSubjectId !== undefined) {
    updateData.classSubjectId = data.classSubjectId;
  }

  if (data.classId !== undefined) {
    updateData.classId = data.classId;
  }

  if (data.dayOfWeek !== undefined) {
    updateData.dayOfWeek = data.dayOfWeek;
  }

  if (data.period !== undefined) {
    updateData.period = data.period;
  }

  return await repoUpdateTimetableEntry(timetableId, updateData);
}

export async function removeTimetableEntry(timetableId: number) {
  const existing = await findTimetableEntryById(timetableId);

  if (!existing) {
    throw new Error("TIMETABLE_NOT_FOUND");
  }

  return await repoDeleteTimetableEntry(timetableId);
}
