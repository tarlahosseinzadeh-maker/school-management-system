import Image from "next/image";
import Link from "next/link";


export default function HeroSection() {

  return (

    <section
      dir="rtl"
      className="
        bg-blue-50
        py-16
        md:py-24
      "
    >


      <div
        className="
          mx-auto
          max-w-6xl
          px-6
          grid
          grid-cols-1
          md:grid-cols-2
          gap-10
          items-center
        "
      >



        <div
          className="
            space-y-6
          "
        >


          <h1
            className="
              text-4xl
              md:text-5xl
              font-bold
              leading-relaxed
              text-blue-950
            "
          >
            به مدرسه ما خوش آمدید
          </h1>





          <p
            className="
              text-lg
              leading-9
              text-gray-600
            "
          >
            محیطی امن و پویا برای آموزش،
            رشد استعدادها و موفقیت دانش‌آموزان.
          </p>







          <div
            className="
              flex
              flex-wrap
              gap-4
            "
          >



            <Link
              href="/login"
              className="
                rounded-lg
                bg-blue-600
                px-6
                py-3
                text-white
                font-medium
                hover:bg-blue-700
                transition
              "
            >
              ورود به سامانه
            </Link>






            <Link
              href="/pre-registration"
              className="
                rounded-lg
                border
                border-blue-600
                px-6
                py-3
                text-blue-700
                font-medium
                hover:bg-blue-100
                transition
              "
            >
              پیش ثبت‌نام
            </Link>



          </div>




        </div>









        <div
          className="
            flex
            justify-center
          "
        >



          <div
            className="
              w-full
              h-72
              md:h-96
              rounded-2xl
              overflow-hidden
              border
              border-blue-100
              shadow-sm
              bg-white
            "
          >


        <Image
        src="/uploads/school.jpg"
        alt="تصویر مدرسه"
        width={700}
        height={500}
        className="
            w-full
            h-full
            object-cover
        "
        priority
        />

          </div>



        </div>





      </div>


    </section>

  );

}