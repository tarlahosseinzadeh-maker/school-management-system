export default function FeaturesSection() {


  const features = [

    {
      title: "آموزش با کیفیت",
      description:
        "ارائه آموزش‌های استاندارد و برنامه‌ریزی شده برای رشد علمی دانش‌آموزان.",
      icon: "🎓",
    },

    {
      title: "کادر آموزشی مجرب",
      description:
        "همکاری با معلمان متخصص و دلسوز برای هدایت بهتر دانش‌آموزان.",
      icon: "👨‍🏫",
    },

    {
      title: "محیط آموزشی پویا",
      description:
        "ایجاد فضایی امن و مناسب برای یادگیری و پیشرفت.",
      icon: "🏫",
    },

  ];





  return (

    <section
      dir="rtl"
      className="
        bg-white
        py-16
      "
    >


      <div
        className="
          mx-auto
          max-w-6xl
          px-6
        "
      >


        <div className="text-center mb-10">

          <h2
            className="
              text-3xl
              font-bold
              text-blue-950
            "
          >
            چرا مدرسه ما؟
          </h2>


          <p
            className="
              mt-3
              text-gray-600
            "
          >
            فراهم کردن بهترین شرایط برای آموزش و رشد دانش‌آموزان
          </p>


        </div>





        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
          "
        >

          {
            features.map((feature)=>(


              <div
                key={feature.title}
                className="
                  bg-white
                  rounded-xl
                  border
                  border-blue-100
                  p-6
                  text-center
                  shadow-sm
                  hover:shadow-md
                  transition
                "
              >


                <div className="text-4xl mb-4">
                  {feature.icon}
                </div>


                <h3
                  className="
                    text-xl
                    font-semibold
                    text-blue-900
                  "
                >
                  {feature.title}
                </h3>



                <p
                  className="
                    mt-3
                    leading-8
                    text-gray-600
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