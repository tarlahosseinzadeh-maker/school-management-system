import StudentSidebar from "./components/StudentSidebar";



export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (

    <div className="min-h-screen flex" dir="rtl">
      <StudentSidebar />

      <main className="dashboard-main">
        <div className="dashboard-content">{children}</div>
      </main>
    </div>

  );

}