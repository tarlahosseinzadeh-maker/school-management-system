import {
  findTeacherDashboard,
  findTeacherClasses,
  findClassSubjectById,
  findStudentsByClassSubject,
  findGradesByClassSubject,
  findGradeById,
  createGrade,
  updateGrade,
  findAssignmentsByClassSubject,
  findAllAssignmentsByTeacher,
  findAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  findFilesByClassSubject,
  findAllFilesByTeacher,
  findFileById,
  createFile,
  deleteFile,
} from "@/src/repositories/teacher.repository";
import {
  GradeInput,
  GradeUpdateInput,
  AssignmentInput,
  AssignmentUpdateInput,
  FileUploadInput,
} from "@/src/validation/teacher.validation";
import { unlink } from "fs/promises";
import path from "path";

// ========================
// Dashboard
// ========================

export async function getTeacherDashboard(teacherId: number) {
  return await findTeacherDashboard(teacherId);
}

// ========================
// Classes
// ========================

export async function getTeacherClasses(teacherId: number) {
  return await findTeacherClasses(teacherId);
}

export async function getClassSubject(
  classSubjectId: number,
  teacherId: number
) {
  const classSubject = await findClassSubjectById(
    classSubjectId,
    teacherId
  );

  if (!classSubject) {
    throw new Error("CLASS_SUBJECT_NOT_FOUND");
  }

  return classSubject;
}

// ========================
// Students
// ========================

export async function getStudentsByClassSubject(
  classSubjectId: number,
  teacherId: number
) {
  const classSubject = await findClassSubjectById(
    classSubjectId,
    teacherId
  );

  if (!classSubject) {
    throw new Error("CLASS_SUBJECT_NOT_FOUND");
  }

  return await findStudentsByClassSubject(classSubjectId, teacherId);
}

// ========================
// Grades
// ========================

export async function getGradesByClassSubject(
  classSubjectId: number,
  teacherId: number
) {
  const classSubject = await findClassSubjectById(
    classSubjectId,
    teacherId
  );

  if (!classSubject) {
    throw new Error("CLASS_SUBJECT_NOT_FOUND");
  }

  return await findGradesByClassSubject(classSubjectId, teacherId);
}

export async function addGrade(
  data: GradeInput,
  teacherId: number
) {
  // Verify that the teacher owns this classSubject
  const classSubject = await findClassSubjectById(
    data.classSubjectId,
    teacherId
  );

  if (!classSubject) {
    throw new Error("UNAUTHORIZED_CLASS_SUBJECT");
  }

  return await createGrade(data);
}

export async function modifyGrade(
  gradeId: number,
  teacherId: number,
  data: GradeUpdateInput
) {
  // Verify that the teacher owns this grade's classSubject
  const grade = await findGradeById(gradeId, teacherId);

  if (!grade) {
    throw new Error("GRADE_NOT_FOUND");
  }

  return await updateGrade(gradeId, teacherId, data);
}

// ========================
// Assignments
// ========================

export async function getAssignmentsByClassSubject(
  classSubjectId: number,
  teacherId: number
) {
  const classSubject = await findClassSubjectById(
    classSubjectId,
    teacherId
  );

  if (!classSubject) {
    throw new Error("CLASS_SUBJECT_NOT_FOUND");
  }

  return await findAssignmentsByClassSubject(
    classSubjectId,
    teacherId
  );
}

export async function getAllTeacherAssignments(
  teacherId: number
) {
  return await findAllAssignmentsByTeacher(teacherId);
}

export async function getAssignment(
  assignmentId: number,
  teacherId: number
) {
  const assignment = await findAssignmentById(
    assignmentId,
    teacherId
  );

  if (!assignment) {
    throw new Error("ASSIGNMENT_NOT_FOUND");
  }

  return assignment;
}

export async function createNewAssignment(
  data: AssignmentInput,
  teacherId: number
) {
  // Verify that the teacher owns this classSubject
  const classSubject = await findClassSubjectById(
    data.classSubjectId,
    teacherId
  );

  if (!classSubject) {
    throw new Error("UNAUTHORIZED_CLASS_SUBJECT");
  }

  return await createAssignment(data);
}

export async function modifyAssignment(
  assignmentId: number,
  teacherId: number,
  data: AssignmentUpdateInput
) {
  // Verify that the teacher owns this assignment
  const assignment = await findAssignmentById(
    assignmentId,
    teacherId
  );

  if (!assignment) {
    throw new Error("ASSIGNMENT_NOT_FOUND");
  }

  return await updateAssignment(assignmentId, teacherId, data);
}

export async function removeAssignment(
  assignmentId: number,
  teacherId: number
) {
  // Verify that the teacher owns this assignment
  const assignment = await findAssignmentById(
    assignmentId,
    teacherId
  );

  if (!assignment) {
    throw new Error("ASSIGNMENT_NOT_FOUND");
  }

  return await deleteAssignment(assignmentId, teacherId);
}

// ========================
// Educational Files
// ========================

export async function getFilesByClassSubject(
  classSubjectId: number,
  teacherId: number
) {
  const classSubject = await findClassSubjectById(
    classSubjectId,
    teacherId
  );

  if (!classSubject) {
    throw new Error("CLASS_SUBJECT_NOT_FOUND");
  }

  return await findFilesByClassSubject(classSubjectId, teacherId);
}

export async function getAllTeacherFiles(teacherId: number) {
  return await findAllFilesByTeacher(teacherId);
}

export async function getFile(
  fileId: number,
  teacherId: number
) {
  const file = await findFileById(fileId, teacherId);

  if (!file) {
    throw new Error("FILE_NOT_FOUND");
  }

  return file;
}

export async function uploadFile(
  data: FileUploadInput,
  teacherId: number
) {
  // Verify that the teacher owns this classSubject
  const classSubject = await findClassSubjectById(
    data.classSubjectId,
    teacherId
  );

  if (!classSubject) {
    throw new Error("UNAUTHORIZED_CLASS_SUBJECT");
  }

  return await createFile(data);
}

export async function removeFile(
  fileId: number,
  teacherId: number
) {
  // Verify that the teacher owns this file
  const file = await findFileById(fileId, teacherId);

  if (!file) {
    throw new Error("FILE_NOT_FOUND");
  }

  if (file.filePath.startsWith("/uploads/")) {
    const filePath = path.join(process.cwd(), "public", file.filePath);
    try {
      await unlink(filePath);
    } catch {
      // File may already be removed from disk
    }
  }

  return await deleteFile(fileId, teacherId);
}