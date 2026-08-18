"use client";


import Image from "next/image";
import { useState } from "react";


interface GalleryImage {

  imageId: number;

  imageUrl: string;

}



interface Props {

  images: GalleryImage[];

}



export default function GallerySlider({
  images,
}: Props) {


  const [currentIndex, setCurrentIndex] =
    useState(0);



  if (!images || images.length === 0) {

    return null;

  }





  function nextImage() {

    setCurrentIndex(
      (prev) =>
        (prev + 1) % images.length
    );

  }





  function previousImage() {

    setCurrentIndex(
      (prev) =>
        prev === 0
          ? images.length - 1
          : prev - 1
    );

  }





  return (

    <section
      dir="rtl"
      className="space-y-4"
    >


      <h2 className="text-2xl font-bold text-center">

        گالری تصاویر

      </h2>





      <div
        className="
          relative
          max-w-4xl
          mx-auto
        "
      >



        <Image

          src={
            images[currentIndex].imageUrl
          }

          alt="تصویر گالری"

          width={900}

          height={500}

          className="
            w-full
            h-[450px]
            object-cover
            rounded-2xl
          "

        />





        <button

          onClick={previousImage}

          className="
            absolute
            top-1/2
            right-4
            -translate-y-1/2
            bg-black/60
            text-white
            px-4
            py-2
            rounded-full
          "

        >

          قبلی

        </button>





        <button

          onClick={nextImage}

          className="
            absolute
            top-1/2
            left-4
            -translate-y-1/2
            bg-black/60
            text-white
            px-4
            py-2
            rounded-full
          "

        >

          بعدی

        </button>




      </div>





      <div
        className="
          text-center
          text-gray-500
        "
      >

        {currentIndex + 1}

        {" / "}

        {images.length}


      </div>


    </section>

  );

}