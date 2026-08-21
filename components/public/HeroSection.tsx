import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";


export default function HeroSection() {

  return (

    <section
      dir="rtl"
      className="
        relative
        overflow-hidden
        bg-gradient-to-b
        from-primary/10
        via-primary/5
        to-background
        py-16
        md:py-24
      "
    >


      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -top-24
          start-1/4
          size-72
          rounded-full
          bg-primary/15
          blur-3xl
        "
      />


      <div
        className="
          relative
          mx-auto
          max-w-6xl
          px-4
          sm:px-6
          grid
          grid-cols-1
          items-center
          gap-10
          lg:grid-cols-2

        "
      >



        <div
          className="
            space-y-6
            text-center
            lg:text-start
          "
        >


          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-primary/20
              bg-card/70
              px-4
              py-1.5
              text-xs
              font-medium
              text-primary
              shadow-sm
            "
          >
            سامانه هوشمند مدیریت آموزشگاه
          </span>




          <h1
            className="
              font-heading
              text-4xl
              font-bold
              leading-relaxed
              tracking-tight
              text-foreground
              md:text-5xl
            "
          >
            به مدرسه ما خوش آمدید
          </h1>





          <p
            className="
              mx-auto
              max-w-md
              text-lg
              leading-9
              text-muted-foreground
              lg:mx-0

            "
          >
            محیطی امن و پویا برای آموزش،
            رشد استعدادها و موفقیت دانش‌آموزان.
          </p>





          <div
            className="
              flex
              flex-wrap
              justify-center
              gap-4
              pt-2
              lg:justify-start
            "
          >



            <Link
              href="/login"
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-primary
                px-7
                py-3
                text-white
                shadow-lg
                shadow-primary/30
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-primary/90
                hover:shadow-xl
                hover:shadow-primary/30
              "
            >
              ورود به سامانه
              <ArrowLeft className="size-4" />
            </Link>





            <Link
              href="/pre-registration"
              className="
                inline-flex
                items-center
                rounded-xl
                border
                border-primary/30
                bg-card/60
                px-7
                py-3
                text-primary
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-primary/50
                hover:bg-accent
              "
            >
              پیش ثبت‌نام
            </Link>



          </div>



        </div>









        <div
          className="
            relative
            flex
            justify-center
          "
        >


          <div
            aria-hidden="true"
            className="
              absolute
              inset-4
              -z-10
              rounded-[2rem]
              bg-gradient-to-tr
              from-primary/25
              to-primary/5
              blur-2xl
            "
          />


          <div
            className="
              w-full
              overflow-hidden
              rounded-3xl
              border
              border-border/70
              bg-card
              shadow-2xl
              shadow-primary/10
              ring-1
              ring-white/60
              transition-transform
              duration-500
            "
          >


        <Image
        src="/uploads/school.jpg"
        alt="تصویر مدرسه"
        width={700}
        height={500}
        className="
            aspect-[7/5]
            w-full
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
