import PrincipalSidebar from "./components/Sidebar";
import { requireRole } from "@/src/utils/auth";
import { redirect } from "next/navigation";

export default async function PrincipalLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  try {

    await requireRole([
      "PRINCIPAL"
    ]);


  } catch(error:any) {


    if(error.status === 401){

      redirect("/unauthorized");

    }


    if(error.status === 403){

      redirect("/forbidden");

    }


    throw error;

  }



  return (

    <div className="min-h-screen flex" dir="rtl">

      <PrincipalSidebar />

      <main className="dashboard-main">

        <div className="dashboard-content">

          {children}

        </div>

      </main>

    </div>

  );

}