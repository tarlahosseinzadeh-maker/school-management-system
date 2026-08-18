import { prisma } from "@/src/database/prisma";
import {
  GradeInput,
  GradeUpdateInput,
  AssignmentInput,
  AssignmentUpdateInput,
  FileUploadInput,
} from "@/src/validation/teacher.validation";

// ========================
// Dashboard
// ========================

export async function findTeacherDashboard(
  teacherId: number
) {
  const classes = await prisma.classsubjects.findMany({
    where: {
      teacher: {
        userId: teacherId,
      },
    },
    include: {
      class: true,
      subject: true,
    },
  });

  const classIds = classes.map((item) => item.classId);

  const studentsCount = await prisma.students.count({
    where: {
      classId: {
        in: classIds,
      },
    },
  });

  const subjectsCount = new Set(
    classes.map((item) => item.subjectId)
  ).size;

  const assignments = await prisma.assignments.findMany({
    where: {
      classSubject: {
        teacher: {
          userId: teacherId,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      classSubject: {
        include: {
          class: true,
          subject: true,
        },
      },
    },
  });

  const files = await prisma.educationalfiles.findMany({
    where: {
      classSubject: {
        teacher: {
          userId: teacherId,
        },
      },
    },
    orderBy: {
      uploadDate: "desc",
    },
    take: 5,
    include: {
      classSubject: {
        include: {
          class: true,
          subject: true,
        },
      },
    },
  });

  return {
    classes,
    classesCount: classes.length,
    subjectsCount,
    studentsCount,
    assignments,
    files,
  };
}

// ========================
// Classes
// ========================

export async function findTeacherClasses(
  teacherId: number
) {
  return await prisma.classsubjects.findMany({
    where: {
      teacher: {
        userId: teacherId,
      },
    },
    include: {
      class: {
        include: {
          _count: {
            select: {
              students: true,
            },
          },
        },
      },
      subject: true,
    },
    orderBy: {
      class: {
        className: "asc",
      },
    },
  });
}

export async function findClassSubjectById(
  classSubjectId: number,
  teacherId: number
) {
  return await prisma.classsubjects.findFirst({
    where: {
      classSubjectId,
      teacher: {
        userId: teacherId,
      },
    },
    include: {
      class: true,
      subject: true,
      teacher: {
        include: {
          user: true,
        },
      },
    },
  });
}

// ========================
// Students
// ========================

export async function findStudentsByClassSubject(
  classSubjectId: number,
  teacherId: number
) {
  const classSubject = await prisma.classsubjects.findFirst({
    where: {
      classSubjectId,
      teacher: {
        userId: teacherId,
      },
    },
    select: {
      classId: true,
    },
  });

  if (!classSubject) return [];

  return await prisma.students.findMany({
    where: {
      classId: classSubject.classId,
    },
    include: {
      user: true,
      class: true,
    },
    orderBy: {
      user: {
        firstName: "asc",
      },
    },
  });
}

// ========================
// Grades
// ========================

export async function findGradesByClassSubject(
  classSubjectId: number,
  teacherId: number
) {
  const classSubject = await prisma.classsubjects.findFirst({
    where: {
      classSubjectId,
      teacher: {
        userId: teacherId,
      },
    },
  });

  if (!classSubject) return [];

  return await prisma.grades.findMany({
    where: {
      classSubjectId,
    },
    include: {
      student: {
        include: {
          user: true,
        },
      },
      classSubject: {
        include: {
          class: true,
          subject: true,
        },
      },
    },
    orderBy: {
      examDate: "desc",
    },
  });
}

export async function findGradeById(
  gradeId: number,
  teacherId: number
) {
  return await prisma.grades.findFirst({
    where: {
      gradeId,
      classSubject: {
        teacher: {
          userId: teacherId,
        },
      },
    },
    include: {
      student: {
        include: {
          user: true,
        },
      },
      classSubject: {
        include: {
          class: true,
          subject: true,
        },
      },
    },
  });
}

export async function createGrade(
  data: GradeInput
) {
  return await prisma.grades.create({
    data: {
      score: data.score,
      examType: data.examType,
      classSubjectId: data.classSubjectId,
      studentId: data.studentId,
    },
    include: {
      student: {
        include: {
          user: true,
        },
      },
      classSubject: {
        include: {
          class: true,
          subject: true,
        },
      },
    },
  });
}

export async function updateGrade(
  gradeId: number,
  teacherId: number,
  data: GradeUpdateInput
) {
  const grade = await findGradeById(gradeId, teacherId);
  if (!grade) return null;

  return await prisma.grades.update({
    where: { gradeId },
    data: {
      ...(data.score !== undefined && { score: data.score }),
      ...(data.examType !== undefined && { examType: data.examType }),
    },
    include: {
      student: {
        include: {
          user: true,
        },
      },
      classSubject: {
        include: {
          class: true,
          subject: true,
        },
      },
    },
  });
}

// ========================
// Assignments
// ========================

export async function findAssignmentsByClassSubject(
  classSubjectId: number,
  teacherId: number
) {
  const classSubject = await prisma.classsubjects.findFirst({
    where: {
      classSubjectId,
      teacher: {
        userId: teacherId,
      },
    },
  });

  if (!classSubject) return [];

  return await prisma.assignments.findMany({
    where: {
      classSubjectId,
    },
    include: {
      classSubject: {
        include: {
          class: true,
          subject: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function findAllAssignmentsByTeacher(
  teacherId: number
) {
  return await prisma.assignments.findMany({
    where: {
      classSubject: {
        teacher: {
          userId: teacherId,
        },
      },
    },
    include: {
      classSubject: {
        include: {
          class: true,
          subject: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function findAssignmentById(
  assignmentId: number,
  teacherId: number
) {
  return await prisma.assignments.findFirst({
    where: {
      assignmentId,
      classSubject: {
        teacher: {
          userId: teacherId,
        },
      },
    },
    include: {
      classSubject: {
        include: {
          class: true,
          subject: true,
        },
      },
    },
  });
}

export async function createAssignment(
  data: AssignmentInput
) {
  return await prisma.assignments.create({
    data: {
      title: data.title,
      description: data.description,
      deadline: new Date(data.deadline),
      classSubjectId: data.classSubjectId,
      status: "ACTIVE",
    },
    include: {
      classSubject: {
        include: {
          class: true,
          subject: true,
        },
      },
    },
  });
}

export async function updateAssignment(
  assignmentId: number,
  teacherId: number,
  data: AssignmentUpdateInput
) {
  const assignment = await findAssignmentById(
    assignmentId,
    teacherId
  );
  if (!assignment) return null;

  return await prisma.assignments.update({
    where: { assignmentId },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.description !== undefined && {
        description: data.description,
      }),
      ...(data.deadline !== undefined && {
        deadline: new Date(data.deadline),
      }),
      ...(data.status !== undefined && { status: data.status }),
    },
    include: {
      classSubject: {
        include: {
          class: true,
          subject: true,
        },
      },
    },
  });
}

export async function deleteAssignment(
  assignmentId: number,
  teacherId: number
) {
  const assignment = await findAssignmentById(
    assignmentId,
    teacherId
  );
  if (!assignment) return null;

  return await prisma.assignments.delete({
    where: { assignmentId },
  });
}

// ========================
// Educational Files
// ========================

export async function findFilesByClassSubject(
  classSubjectId: number,
  teacherId: number
) {
  const classSubject = await prisma.classsubjects.findFirst({
    where: {
      classSubjectId,
      teacher: {
        userId: teacherId,
      },
    },
  });

  if (!classSubject) return [];

  return await prisma.educationalfiles.findMany({
    where: {
      classSubjectId,
    },
    include: {
      classSubject: {
        include: {
          class: true,
          subject: true,
        },
      },
    },
    orderBy: {
      uploadDate: "desc",
    },
  });
}

export async function findAllFilesByTeacher(
  teacherId: number
) {
  return await prisma.educationalfiles.findMany({
    where: {
      classSubject: {
        teacher: {
          userId: teacherId,
        },
      },
    },
    include: {
      classSubject: {
        include: {
          class: true,
          subject: true,
        },
      },
    },
    orderBy: {
      uploadDate: "desc",
    },
  });
}

export async function findFileById(
  fileId: number,
  teacherId: number
) {
  return await prisma.educationalfiles.findFirst({
    where: {
      fileId,
      classSubject: {
        teacher: {
          userId: teacherId,
        },
      },
    },
    include: {
      classSubject: {
        include: {
          class: true,
          subject: true,
        },
      },
    },
  });
}

export async function createFile(data: FileUploadInput) {
  return await prisma.educationalfiles.create({
    data: {
      title: data.title,
      description: data.description || "",
      fileName: data.fileName,
      fileType: data.fileType,
      filePath: data.filePath,
      classSubjectId: data.classSubjectId,
    },
    include: {
      classSubject: {
        include: {
          class: true,
          subject: true,
        },
      },
    },
  });
}

export async function deleteFile(
  fileId: number,
  teacherId: number
) {
  const file = await findFileById(fileId, teacherId);
  if (!file) return null;

  return await prisma.educationalfiles.delete({
    where: { fileId },
  });
}