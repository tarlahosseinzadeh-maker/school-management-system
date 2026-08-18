import { notFound } from "next/navigation";
import { requireTeacher } from "@/src/utils/auth";
import { getClassSubject } from "@/src/services/teacher.service";
import ClassGradesClient from "../../../components/ClassGradesClient";

export default async function ClassGradesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { teacherId } = await requireTeacher();
  const { id } = await params;
  const classSubjectId = parseInt(id);

  if (isNaN(classSubjectId)) {
    notFound();
  }

  try {
    const classSubject = await getClassSubject(classSubjectId, teacherId);

    return (
      <ClassGradesClient
        classSubjectId={classSubjectId}
        className={classSubject.class.className}
        subjectName={classSubject.subject.subjectName}
      />
    );
  } catch {
    notFound();
  }
}
