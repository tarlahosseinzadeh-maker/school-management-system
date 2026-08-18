import Image from "next/image";

import GallerySlider from "./GallerySlider";



async function getAnnouncement(
  id: string
) {


  const response =
    await fetch(
      `http://localhost:3000/api/public/announcements/${id}`,
      {
        cache: "no-store",
      }
    );



  if (!response.ok) {

    throw new Error(
      "Announcement not found"
    );

  }



  return response.json();

}





export default async function AnnouncementDetailPage({

  params,

}: {

  params: Promise<{
    id: string;
  }>;

}) {


  const {
    id
  } = await params;



  const announcement =
    await getAnnouncement(id);





  return (

    <main

      dir="rtl"

      className="
        min-h-screen
        p-6
        md:p-10
        space-y-10
      "

    >




      {/* Cover Image */}

      {
        announcement.coverImage && (

          <div
            className="
              max-w-4xl
              mx-auto
            "
          >

            <Image

              src={
                announcement.coverImage
              }

              alt={
                announcement.title
              }

              width={900}

              height={450}

              className="
                w-full
                h-[350px]
                object-cover
                rounded-2xl
              "

            />

          </div>

        )
      }





      {/* Title */}

      <section
        className="
          max-w-4xl
          mx-auto
          space-y-4
        "
      >


        <h1
          className="
            text-3xl
            md:text-4xl
            font-bold
          "
        >

          {announcement.title}

        </h1>




        <p
          className="
            text-gray-500
          "
        >

          تاریخ انتشار:

          {" "}

          {
            new Date(
              announcement.createdAt
            ).toLocaleDateString(
              "fa-IR"
            )
          }


        </p>



      </section>






      {/* Content */}

      <section

        className="
          max-w-4xl
          mx-auto
          text-lg
          leading-10
        "

      >

        {
          announcement.content
        }


      </section>






      {/* Gallery */}

      <GallerySlider

        images={
          announcement.images
        }

      />





    </main>

  );

}