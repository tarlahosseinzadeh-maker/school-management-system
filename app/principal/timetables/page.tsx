import { requireRole } from "@/src/utils/auth";

import TimetableClient from "./TimetableClient";

export default async function PrincipalTimetablesPage() {
  await requireRole(["PRINCIPAL"]);

  return (
    <main dir="rtl" className="space-y-6">
      <section className="page-header">
        <h1 className="page-title">برنامه هفتگی</h1>
        <p className="page-description">
          مدیریت برنامه هفتگی کلاس‌ها
        </p>
      </section>
      <section className="content-card">
        <TimetableClient />
      </section>
    </main>
  );
}
