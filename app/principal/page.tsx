import { requireRole } from "@/src/utils/auth";
import { getPrincipalDashboard } from "@/src/services/principal.service";
import type { LucideIcon } from "lucide-react";
import { School, UserCheck, Users } from "lucide-react";


export default async function PrincipalPage() {


  const session =
    await requireRole([
      "PRINCIPAL"
    ]);


  const dashboard =
    await getPrincipalDashboard();



  return (

    <main
      dir="rtl"
      className="
      space-y-6
      "
    >


      {/* Header */}

      <section className="page-header">
        <h1 className="page-title">
          داشبورد مدیر
        </h1>

        <p className="page-description">
          خوش آمدید {session.user.name}
        </p>
      </section>




      {/* Statistics */}


      <section
        className="
        grid
        grid-cols-1
        sm:grid-cols-3
        gap-5
        "
      >


        <StatCard

          title="تعداد دانش‌آموزان"

          value={
            dashboard.studentsCount
          }

          icon={Users}

        />



        <StatCard

          title="تعداد معلمان"

          value={
            dashboard.teachersCount
          }

          icon={UserCheck}

        />



        <StatCard

          title="تعداد کلاس‌ها"

          value={
            dashboard.classesCount
          }

          icon={School}

        />


      </section>





      {/* Welcome Section */}

      <section
        className="
        content-card
        p-6
        md:p-8
        "
      >

        <h2
          className="
          section-title
          "
        >
          مدیریت مدرسه
        </h2>


        <p
          className="
          mt-3
          text-sm
          leading-8
          text-muted-foreground
          "
        >
          از طریق منوی سمت راست می‌توانید کاربران،
          کلاس‌ها، دروس، اطلاعیه‌ها و کارنامه‌های
          دانش‌آموزان را مدیریت کنید.
        </p>


      </section>



    </main>

  );

}






function StatCard({

  title,

  value,

  icon: Icon,

}: {

  title:string;

  value:number;

  icon: LucideIcon;

}) {


  return (

    <div
      className="
      stat-card
      space-y-4
      "
    >

      <div
        className="
        flex
        items-center
        justify-between
        gap-3
        "
      >

        <p
          className="
          stat-card-label
          "
        >
          {title}
        </p>


        <span
          className="
          stat-card-icon
          "
        >
          <Icon className="size-5" />
        </span>

      </div>


      <p
        className="
        text-3xl
        font-bold
        tabular-nums
        tracking-tight
        text-foreground
        "
      >
        {value}
      </p>


    </div>

  );

}
