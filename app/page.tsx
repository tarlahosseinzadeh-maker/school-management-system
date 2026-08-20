import AnnouncementCard from "@/components/public/AnnouncementCard";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";

import HeroSection from "@/components/public/HeroSection";
import FeaturesSection from "@/components/public/FeaturesSection";
import {
  getPublishedAnnouncements,
} from "@/src/services/announcement.service";



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



            <div
              className="
                mb-10
                text-right
              "
            >


              <h2
                className="
                  text-3xl
                  font-bold
                  text-gray-900
                "
              >
                آخرین اطلاعیه‌های مدرسه
              </h2>



              <p
                className="
                  mt-3
                  text-gray-600
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
                announcements.map(
                  (item:any)=>(


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