import Image from "next/image";

import GallerySlider from "./GallerySlider";

import {
  getAnnouncementById,
} from "@/src/services/announcement.service";



export default async function AnnouncementDetailPage({

  params,

}: {

  params: Promise<{
    id: string;
  }>;

}) {


  const {
    id,
  } = await params;



  const announcement =
    await getAnnouncementById(
      Number(id)
    );



  if (!announcement) {

    return (

      <main
        dir="rtl"
        className="
          min-h-screen
          flex
          items-center
          justify-center
          p-10
        "
      >

        <h1 className="text-2xl font-bold">
          اطلاعیه پیدا نشد
        </h1>

      </main>

    );

  }





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




        <p className="text-gray-500">

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







      <section

        className="
          max-w-4xl
          mx-auto
          text-lg
          leading-10
        "

      >

        {announcement.content}

      </section>







      {
        announcement.images &&
        announcement.images.length > 0 && (

          <GallerySlider

            images={
              announcement.images
            }

          />

        )
      }



    </main>

  );

}