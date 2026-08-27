import { prisma } from "@/src/database/prisma";

export async function findTimetableEntries(params: {
  classId?: number;
  classSubjectId?: number;
  dayOfWeek?: number;
  period?: number;
}) {
  const where: any = {};

  if (params.classId) {
    where.classId = params.classId;
  }

  if (params.classSubjectId) {
    where.classSubjectId = params.classSubjectId;
  }

  if (params.dayOfWeek !== undefined) {
    where.dayOfWeek = params.dayOfWeek;
  }

  if (params.period !== undefined) {
    where.period = params.period;
  }

  return await prisma.timetables.findMany({
    where,
    include: {
      classSubject: {
        include: {
          subject: true,
          teacher: {
            include: {
              user: true,
            },
          },
        },
      },
      class: true,
    },
    orderBy: {
      dayOfWeek: "asc",
    },
  });
}

export async function findTimetableEntryById(timetableId: number) {
  return await prisma.timetables.findUnique({
    where: {
      timetableId,
    },
    include: {
      classSubject: {
        include: {
          subject: true,
          teacher: {
            include: {
              user: true,
            },
          },
        },
      },
      class: true,
    },
  });
}

export async function createTimetableEntry(data: {
  classSubjectId: number;
  classId: number;
  dayOfWeek: number;
  period: number;
}) {
  return await prisma.timetables.create({
    data,
    include: {
      classSubject: {
        include: {
          subject: true,
          teacher: {
            include: {
              user: true,
            },
          },
        },
      },
      class: true,
    },
  });
}

export async function updateTimetableEntry(
  timetableId: number,
  data: {
    classSubjectId?: number;
    classId?: number;
    dayOfWeek?: number;
    period?: number;
  }
) {
  return await prisma.timetables.update({
    where: {
      timetableId,
    },
    data,
    include: {
      classSubject: {
        include: {
          subject: true,
          teacher: {
            include: {
              user: true,
            },
          },
        },
      },
      class: true,
    },
  });
}

export async function deleteTimetableEntry(timetableId: number) {
  return await prisma.timetables.delete({
    where: {
      timetableId,
    },
  });
}

export async function checkClassConflict(
  classId: number,
  dayOfWeek: number,
  period: number,
  excludeTimetableId?: number
) {
  const where: any = {
    classId,
    dayOfWeek,
    period,
  };

  if (excludeTimetableId) {
    where.timetableId = { not: excludeTimetableId };
  }

  const existing = await prisma.timetables.findFirst({ where });
  return !!existing;
}

export async function checkTeacherConflict(
  teacherId: number,
  dayOfWeek: number,
  period: number,
  excludeTimetableId?: number
) {
  const teacherClassSubjects = await prisma.classsubjects.findMany({
    where: {
      teacherId,
    },
    select: {
      classSubjectId: true,
    },
  });

  const classSubjectIds = teacherClassSubjects.map((cs) => cs.classSubjectId);

  if (classSubjectIds.length === 0) {
    return false;
  }

  const where: any = {
    dayOfWeek,
    period,
    classSubjectId: {
      in: classSubjectIds,
    },
  };

  if (excludeTimetableId) {
    const existing = await prisma.timetables.findFirst({
      where: {
        timetableId: excludeTimetableId,
      },
    });
    if (existing && where.classSubjectId.in.includes(existing.classSubjectId)) {
      const filtered = where.classSubjectId.in.filter(
        (id: number) => id !== existing.classSubjectId
      );
      if (filtered.length === 0) {
        return false;
      }
      where.classSubjectId = { in: filtered };
    }
  }

  const existing = await prisma.timetables.findFirst({ where });
  return !!existing;
}
