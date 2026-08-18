import {
  findStudentByUserId,
  findStudentClass,
  findStudentSubjects,
  findStudentGrades,
  findStudentAssignments,
  findStudentFiles,
} from "@/src/repositories/student.repository";


export async function getStudentAssignments(
  userId:number
){

  const assignments =
    await findStudentAssignments(
      userId
    );



  return assignments.map(item=>({


    assignmentId:
      item.assignmentId,


    title:
      item.title,


    description:
      item.description,


    subject:
      item.classSubject.subject.subjectName,


    createdAt:
      item.createdAt,


    deadline:
      item.deadline,


    status:
      item.status


  }));

}


export async function getStudentProfile(
  userId:number
){

  const student =
    await findStudentByUserId(userId);


  if(!student){

    throw new Error(
      "STUDENT_NOT_FOUND"
    );

  }


  return {

    userId: student.userId,

    firstName: student.user.firstName,

    lastName: student.user.lastName,

    studentCode: student.studentCode,

    birthDate: student.birthDate,

    phoneNumber: student.user.phoneNumber,


    class: student.class
      ? {

          classId: student.class.classId,

          className: student.class.className,

          gradeLevel: student.class.gradeLevel,

          academicYear: student.class.academicYear

        }

      : null

  };

}







export async function getStudentClass(
  userId:number
){

  const student =
    await findStudentClass(userId);


  if(!student){

    throw new Error(
      "STUDENT_NOT_FOUND"
    );

  }


  return student.class;

}








export async function getStudentSubjects(
  userId:number
){

  const subjects =
    await findStudentSubjects(userId);



  return subjects.map(item=>({

    classSubjectId:
      item.classSubjectId,


    subject:{

      subjectId:
        item.subject.subjectId,


      subjectName:
        item.subject.subjectName

    },


    teacher:{

      firstName:
        item.teacher.user.firstName,


      lastName:
        item.teacher.user.lastName

    }


  }));

}







export async function getStudentGrades(
  userId:number
){

  const grades =
    await findStudentGrades(userId);



  return grades.map(item=>({


    gradeId:
      item.gradeId,


    subject:
      item.classSubject.subject.subjectName,


    score:
      item.score,


    examType:
      item.examType,


    examDate:
      item.examDate


  }));

}
export async function getStudentFiles(
  userId:number
){

  const files =
    await findStudentFiles(
      userId
    );


  return files.map(item=>({

    fileId:
      item.fileId,


    title:
      item.title,


    fileName:
      item.fileName,


    fileType:
      item.fileType,


    filePath:
      item.filePath,


    description:
      item.description,


    uploadDate:
      item.uploadDate,


    subject:
      item.classSubject.subject.subjectName

  }));

}