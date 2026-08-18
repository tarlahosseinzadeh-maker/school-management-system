import Link from "next/link";
import { requireTeacher } from "@/src/utils/auth";
import { getTeacherDashboard } from "@/src/services/teacher.service";

export default async function TeacherPage() {
  const { session, teacherId } = await requireTeacher();
  const dashboard = await getTeacherDashboard(teacherId);

  return (
    <div dir="rtl" className="space-y-8">
      <section className="page-header">
        <h1 className="page-title">داشبورد معلم</h1>
        <p className="page-description">خوش آمدید {session.user.name}</p>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="stat-card">
          <h3 className="stat-card-label">کلاس‌های من</h3>
          <p className="stat-card-value">{dashboard.classesCount}</p>
        </div>

        <div className="stat-card">
          <h3 className="stat-card-label">درس‌های فعال</h3>
          <p className="stat-card-value">{dashboard.subjectsCount}</p>
        </div>

        <div className="stat-card">
          <h3 className="stat-card-label">دانش‌آموزان</h3>
          <p className="stat-card-value">{dashboard.studentsCount}</p>
        </div>

        <div className="stat-card">
          <h3 className="stat-card-label">تکالیف فعال</h3>
          <p className="stat-card-value">
            {
              dashboard.assignments.filter(
                (assignment) => assignment.status === "ACTIVE"
              ).length
            }
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="section-title">آخرین تکالیف</h2>
          <Link
            href="/teacher/assignments"
            className="text-sm font-medium text-primary hover:text-primary/80"
          >
            مشاهده همه
          </Link>
        </div>

        {dashboard.assignments.length === 0 ? (
          <p className="empty-state">تکلیفی وجود ندارد</p>
        ) : (
          <div className="content-card divide-y divide-border">
            {dashboard.assignments.map((item) => (
              <div key={item.assignmentId} className="p-4">
                <h4 className="font-medium text-foreground">{item.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  کلاس: {item.classSubject?.class?.className}
                </p>
                <p className="text-sm text-muted-foreground">
                  درس: {item.classSubject?.subject?.subjectName}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="section-title">فایل‌های آموزشی اخیر</h2>
          <Link
            href="/teacher/files"
            className="text-sm font-medium text-primary hover:text-primary/80"
          >
            مشاهده همه
          </Link>
        </div>

        {dashboard.files.length === 0 ? (
          <p className="empty-state">فایلی وجود ندارد</p>
        ) : (
          <div className="content-card divide-y divide-border">
            {dashboard.files.map((item) => (
              <div key={item.fileId} className="p-4">
                <h4 className="font-medium text-foreground">{item.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  کلاس: {item.classSubject?.class?.className}
                </p>
                <p className="text-sm text-muted-foreground">
                  درس: {item.classSubject?.subject?.subjectName}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
