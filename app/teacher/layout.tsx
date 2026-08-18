import { requireRole } from "@/src/utils/auth";

import TeacherSidebar from "./components/TeacherSidebar";



export default async function TeacherLayout({

  children,

}: {

  children: React.ReactNode;

}) {


  await requireRole([
    "TEACHER"
  ]);



  return (

    <div className="min-h-screen flex" dir="rtl">
      <TeacherSidebar />

      <main className="dashboard-main">
        <div className="dashboard-content">{children}</div>
      </main>
    </div>

  );

}