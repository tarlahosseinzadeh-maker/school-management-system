export type TeacherClassSubject = {
  classSubjectId: number;
  classId: number;
  subjectId: number;
  teacherId: number;
  class: {
    classId: number;
    className: string;
    gradeLevel: string;
    capacity: number;
    academicYear: string;
    _count?: {
      students: number;
    };
  };
  subject: {
    subjectId: number;
    subjectName: string;
    gradeLevel: string;
  };
};

export type TeacherStudent = {
  userId: number;
  studentCode: string;
  user: {
    firstName: string;
    lastName: string;
  };
  class: {
    className: string;
    gradeLevel: string;
  };
};

export type TeacherGrade = {
  gradeId: number;
  score: number;
  examType: string;
  examDate: string;
  studentId: number;
  student: {
    user: {
      firstName: string;
      lastName: string;
    };
  };
};

export type TeacherAssignment = {
  assignmentId: number;
  title: string;
  description: string;
  status: string;
  deadline: string;
  createdAt: string;
  classSubjectId: number;
  classSubject: {
    class: {
      className: string;
    };
    subject: {
      subjectName: string;
    };
  };
};

export type TeacherFile = {
  fileId: number;
  title: string;
  description: string;
  fileName: string;
  fileType: string;
  filePath: string;
  uploadDate: string;
  classSubjectId: number;
  classSubject: {
    class: {
      className: string;
    };
    subject: {
      subjectName: string;
    };
  };
};
