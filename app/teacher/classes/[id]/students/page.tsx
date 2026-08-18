import Link from "next/link";
import { notFound } from "next/navigation";
import { requireTeacher } from "@/src/utils/auth";
import {
  getClassSubject,
  getStudentsByClassSubject,
} from "@/src/services/teacher.service";

export default async function ClassStudentsPage({
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

  let classSubject;
  let students;

  try {
    classSubject = await getClassSubject(classSubjectId, teacherId);
    students = await getStudentsByClassSubject(classSubjectId, teacherId);
  } catch {
    notFound();
  }

  return (
    <main dir="rtl" className="space-y-6">
      <div>
        <Link
          href={`/teacher/classes/${classSubjectId}`}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          بازگشت به جزئیات کلاس
        </Link>
        <h1 className="mt-2 text-3xl font-bold">دانش‌آموزان کلاس</h1>
        <p className="mt-2 text-gray-600">
          {classSubject.class.className} - {classSubject.subject.subjectName}
        </p>
      </div>

      {students.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <p className="text-lg text-gray-500">
            هیچ دانش‌آموزی در این کلاس ثبت‌نام نشده است.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-right">نام</th>
                <th className="px-6 py-3 text-right">نام خانوادگی</th>
                <th className="px-6 py-3 text-right">کد دانش‌آموزی</th>
                <th className="px-6 py-3 text-right">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.userId} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3">{student.user.firstName}</td>
                  <td className="px-6 py-3">{student.user.lastName}</td>
                  <td className="px-6 py-3">{student.studentCode}</td>
                  <td className="px-6 py-3">
                    <Link
                      href={`/teacher/classes/${classSubjectId}/grades`}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      نمرات
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
