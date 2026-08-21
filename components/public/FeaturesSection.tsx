import { BookOpenCheck, School, Users } from "lucide-react";

export default function FeaturesSection() {


  const features = [

    {
      title: "آموزش با کیفیت",
      description:
        "ارائه آموزش‌های استاندارد و برنامه‌ریزی شده برای رشد علمی دانش‌آموزان.",
      icon: BookOpenCheck,
    },

    {
      title: "کادر آموزشی مجرب",
      description:
        "همکاری با معلمان متخصص و دلسوز برای هدایت بهتر دانش‌آموزان.",
      icon: Users,
    },

    {
      title: "محیط آموزشی پویا",
      description:
        "ایجاد فضایی امن و مناسب برای یادگیری و پیشرفت.",
      icon: School,
    },

  ];





  return (

    <section
      dir="rtl"
      className="
        bg-background
        py-16
        md:py-20
      "
    >


      <div
        className="
          mx-auto
          max-w-6xl
          px-4
          sm:px-6
        "
      >


        <div className="mb-12 text-center">

          <h2
            className="
              font-heading
              text-3xl
              font-bold
              tracking-tight
              text-foreground

            "
          >
            چرا مدرسه ما؟
          </h2>


          <p
            className="
              mt-3
              text-muted-foreground
            "
          >
            فراهم کردن بهترین شرایط برای آموزش و رشد دانش‌آموزان
          </p>


        </div>






        <div
          className="
            grid
            grid-cols-1
            gap-6
            md:grid-cols-3
          "
        >

          {
            features.map((feature)=>(


              <div
                key={feature.title}
                className="
                  group
                  rounded-2xl
                  border
                  border-border
                  bg-card
                  p-7
                  text-center
                  shadow-xs
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:border-primary/30
                  hover:shadow-lg
                  hover:shadow-primary/5
                "
              >


                <div
                  className="
                    mx-auto
                    mb-5
                    flex
                    size-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-primary/10
                    text-primary
                    transition-colors
                    duration-200
                    group-hover:bg-primary
                    group-hover:text-primary-foreground
                  "
                >
                  <feature.icon className="size-7" />
                </div>


                <h3
                  className="
                    text-xl
                    font-semibold
                    text-foreground
                  "
                >
                  {feature.title}
                </h3>



                <p
                  className="
                    mt-3
                    leading-8
                    text-sm
                    text-muted-foreground
                  "
                >
                  {feature.description}
                </p>


              </div>


            ))
          }


        </div>


      </div>


    </section>

  );

}
