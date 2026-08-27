import { requireAuth } from "@/src/utils/auth";

import StudentTimetableClient from "./StudentTimetableClient";

export default async function StudentTimetablePage() {
  const session = await requireAuth();

  return (
    <main dir="rtl" className="space-y-6">
      <section className="page-header">
        <h1 className="page-title">برنامه هفتگی</h1>
        <p className="page-description">
          برنامه هفتگی کلاس شما
        </p>
      </section>
      <section className="content-card">
        <StudentTimetableClient userId={session.user.userId} />
      </section>
    </main>
  );
}
