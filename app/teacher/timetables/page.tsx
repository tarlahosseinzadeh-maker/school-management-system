import { requireTeacher } from "@/src/utils/auth";

import TeacherTimetableClient from "./TeacherTimetableClient";

export default async function TeacherTimetablePage() {
  const { teacherId } = await requireTeacher();

  return (
    <main dir="rtl" className="space-y-6">
      <section className="page-header">
        <h1 className="page-title">برنامه هفتگی</h1>
        <p className="page-description">
          برنامه تدریس شما
        </p>
      </section>
      <section className="content-card">
        <TeacherTimetableClient teacherId={teacherId} />
      </section>
    </main>
  );
}
