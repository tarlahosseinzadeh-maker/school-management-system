import { requireRole } from "@/src/utils/auth";
import { getPrincipalDashboard } from "@/src/services/principal.service";


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
      space-y-8
      "
    >


      {/* Header */}

      <section
        className="
        bg-white
        border
        rounded-xl
        p-6
        "
      >

        <h1
          className="
          text-2xl
          font-bold
          text-gray-800
          "
        >
          داشبورد مدیر
        </h1>


        <p
          className="
          mt-2
          text-gray-500
          "
        >
          خوش آمدید {session.user.name}
        </p>


      </section>





      {/* Statistics */}


      <section
        className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-5
        "
      >


        <StatCard

          title="تعداد دانش‌آموزان"

          value={
            dashboard.studentsCount
          }

        />



        <StatCard

          title="تعداد معلمان"

          value={
            dashboard.teachersCount
          }

        />



        <StatCard

          title="تعداد کلاس‌ها"

          value={
            dashboard.classesCount
          }

        />


      </section>






      {/* Welcome Section */}

      <section
        className="
        bg-white
        border
        rounded-xl
        p-6
        "
      >

        <h2
          className="
          text-lg
          font-semibold
          "
        >
          مدیریت مدرسه
        </h2>


        <p
          className="
          mt-3
          text-gray-600
          leading-8
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

}: {

  title:string;

  value:number;

}) {


  return (

    <div
      className="
      bg-white
      border
      rounded-xl
      p-6
      shadow-sm
      hover:shadow-md
      transition
      "
    >

      <p
        className="
        text-sm
        text-gray-500
        "
      >
        {title}
      </p>


      <p
        className="
        mt-3
        text-4xl
        font-bold
        text-blue-700
        "
      >
        {value}
      </p>


    </div>

  );

}