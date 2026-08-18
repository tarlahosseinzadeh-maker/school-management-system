import Link from "next/link";
import { requireTeacher } from "@/src/utils/auth";
import { getTeacherClasses } from "@/src/services/teacher.service";
import type { TeacherClassSubject } from "../types";

export default async function ClassesPage() {
  const { teacherId } = await requireTeacher();
  const classes = (await getTeacherClasses(
    teacherId
  )) as TeacherClassSubject[];

  return (
    <main dir="rtl" className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold">کلاس‌های من</h1>
        <p className="mt-2 text-gray-600">
          لیست تمام کلاس‌های آموزشی شما
        </p>
      </section>

      {classes.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <p className="text-lg text-gray-500">
            هیچ کلاسی برای شما تعیین نشده است.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {classes.map((item) => (
            <div
              key={item.classSubjectId}
              className="rounded-lg border p-6 transition hover:shadow-lg"
            >
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">نام کلاس</p>
                  <h3 className="text-xl font-bold">
                    {item.class.className}
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-gray-500">درس</p>
                  <p className="text-lg font-semibold">
                    {item.subject.subjectName}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                    پایه: {item.class.gradeLevel}
                  </span>
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                    دانش‌آموزان: {item.class._count?.students ?? 0}
                  </span>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    ظرفیت: {item.class.capacity}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-500">سال تحصیلی</p>
                  <p className="text-sm font-medium">
                    {item.class.academicYear}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-3">
                  <Link
                    href={`/teacher/classes/${item.classSubjectId}`}
                    className="flex-1 rounded bg-gray-800 px-3 py-2 text-center text-sm text-white hover:bg-gray-900"
                  >
                    جزئیات
                  </Link>
                  <Link
                    href={`/teacher/classes/${item.classSubjectId}/students`}
                    className="flex-1 rounded bg-blue-600 px-3 py-2 text-center text-sm text-white hover:bg-blue-700"
                  >
                    دانش‌آموزان
                  </Link>
                  <Link
                    href={`/teacher/classes/${item.classSubjectId}/grades`}
                    className="flex-1 rounded bg-green-600 px-3 py-2 text-center text-sm text-white hover:bg-green-700"
                  >
                    نمرات
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
