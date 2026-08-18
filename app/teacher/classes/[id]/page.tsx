import Link from "next/link";
import { notFound } from "next/navigation";
import { requireTeacher } from "@/src/utils/auth";
import {
  getClassSubject,
  getStudentsByClassSubject,
} from "@/src/services/teacher.service";

export default async function ClassDetailPage({
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
          href="/teacher/classes"
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          بازگشت به کلاس‌ها
        </Link>
        <h1 className="mt-2 text-3xl font-bold">جزئیات کلاس</h1>
        <p className="mt-2 text-gray-600">
          {classSubject.class.className} - {classSubject.subject.subjectName}
        </p>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-bold">اطلاعات کلاس</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">نام کلاس</p>
              <p className="font-semibold">{classSubject.class.className}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">پایه</p>
              <p className="font-semibold">{classSubject.class.gradeLevel}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">سال تحصیلی</p>
              <p className="font-semibold">{classSubject.class.academicYear}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">ظرفیت</p>
              <p className="font-semibold">{classSubject.class.capacity}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-bold">درس</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">نام درس</p>
              <p className="font-semibold">{classSubject.subject.subjectName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">پایه درس</p>
              <p className="font-semibold">{classSubject.subject.gradeLevel}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">تعداد دانش‌آموزان</p>
              <p className="font-semibold">{students.length}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href={`/teacher/classes/${classSubjectId}/grades`}
              className="rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
            >
              مدیریت نمرات
            </Link>
            <Link
              href={`/teacher/classes/${classSubjectId}/students`}
              className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            >
              لیست کامل دانش‌آموزان
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">دانش‌آموزان</h2>

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
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.userId} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-3">{student.user.firstName}</td>
                    <td className="px-6 py-3">{student.user.lastName}</td>
                    <td className="px-6 py-3">{student.studentCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
