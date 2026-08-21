import AnnouncementCard from "@/components/public/AnnouncementCard";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";

import HeroSection from "@/components/public/HeroSection";
import FeaturesSection from "@/components/public/FeaturesSection";
import {
  getPublishedAnnouncements,
} from "@/src/services/announcement.service";


export const dynamic = "force-dynamic";
export default async function Home() {


const announcements =
  await getPublishedAnnouncements();




  return (

    <>

      <Header />



      <main
        dir="rtl"
        className="min-h-screen"
      >



        <HeroSection />



        <FeaturesSection />







        <section
          id="announcements"
          className="
            bg-card
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



            <div
              className="
                mb-12
                text-center
              "
            >


              <h2
                className="
                  font-heading
                  text-3xl
                  font-bold
                  tracking-tight
                  text-foreground
                "
              >
                آخرین اطلاعیه‌های مدرسه
              </h2>



              <p
                className="
                  mt-3
                  text-muted-foreground
                "
              >
                اطلاعیه‌ها و اخبار رسمی مدرسه
              </p>


            </div>








            <div
              className="
                grid
                grid-cols-1
                gap-6
                md:grid-cols-2
                lg:grid-cols-3
              "
            >


              {
                announcements.map(                  (item:any)=>(


                    <AnnouncementCard

                      key={
                        item.announcementId
                      }


                      announcement={
                        item
                      }


                    />


                  )
                )
              }



            </div>





          </div>


        </section>





      </main>



      <Footer />


    </>

  );


}