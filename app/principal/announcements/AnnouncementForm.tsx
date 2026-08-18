"use client";


import {
  useState
} from "react";



interface Props {

  onCreated: () => void;

}



export default function AnnouncementForm({

  onCreated,

}: Props) {



  const [title,setTitle] =
    useState("");



  const [content,setContent] =
    useState("");



  const [coverImage,setCoverImage] =
    useState<File | null>(null);



  const [galleryImages,setGalleryImages] =
    useState<File[]>([]);



  const [loading,setLoading] =
    useState(false);








  async function uploadFile(
    file: File
  ) {



    const formData =
      new FormData();



    formData.append(
      "file",
      file
    );





    const response =
      await fetch(
        "/api/uploads/announcements",
        {
          method:"POST",
          body:formData,
        }
      );




    const data =
      await response.json();




    if(!response.ok){

      throw new Error(
        data.error ||
        "خطا در آپلود فایل"
      );

    }



    return data.url;


  }









  async function handleSubmit(
    event: React.FormEvent
  ){


    event.preventDefault();



    setLoading(true);




    try {



      let coverUrl = "";




      if(coverImage){


        coverUrl =
          await uploadFile(
            coverImage
          );


      }







      const galleryUrls =
        await Promise.all(

          galleryImages.map(
            image =>
              uploadFile(image)
          )

        );









      const response =
        await fetch(

          "/api/announcements",

          {

            method:"POST",


            headers:{

              "Content-Type":
                "application/json",

            },



            body:JSON.stringify({

              title,

              content,


              coverImage:
                coverUrl,


              images:
                galleryUrls,


              isPublished:
                true,


            }),


          }

        );








      const data =
        await response.json();





      if(!response.ok){


        console.error(
          "CREATE ERROR:",
          data
        );



        alert(
          JSON.stringify(data)
        );


        return;


      }








      alert(
        "اطلاعیه با موفقیت ثبت شد"
      );





      setTitle("");

      setContent("");

      setCoverImage(null);

      setGalleryImages([]);





      onCreated();





    }

    catch(error){


      console.error(
        error
      );



      alert(
        "خطا در ثبت اطلاعیه"
      );


    }

    finally{


      setLoading(false);


    }



  }









  return (


    <form

      onSubmit={handleSubmit}

      dir="rtl"

      className="
        border
        rounded-xl
        p-5
        space-y-4
      "

    >




      <h2
        className="
          font-bold
          text-lg
        "
      >

        ایجاد اطلاعیه جدید

      </h2>







      <input

        className="
          border
          p-2
          rounded
          w-full
        "

        placeholder="عنوان"

        value={title}

        onChange={
          e =>
          setTitle(
            e.target.value
          )
        }

        required

      />








      <textarea

        className="
          border
          p-2
          rounded
          w-full
          h-32
        "

        placeholder="متن اطلاعیه"

        value={content}

        onChange={
          e =>
          setContent(
            e.target.value
          )
        }

        required

      />









      <div>


        <label>

          عکس اصلی:

        </label>



        <input

          type="file"

          accept="image/*"

          onChange={
            e =>
            setCoverImage(
              e.target.files?.[0] ?? null
            )
          }

        />


      </div>









      <div>


        <label>

          تصاویر گالری:

        </label>



        <input

          type="file"

          multiple

          accept="image/*"

          onChange={
            e =>
            setGalleryImages(
              Array.from(
                e.target.files ?? []
              )
            )
          }

        />


      </div>








      <button

        disabled={loading}

        className="
          bg-blue-600
          text-white
          px-5
          py-2
          rounded
          hover:bg-blue-700
        "

      >


        {
          loading

          ?

          "در حال ثبت..."

          :

          "ثبت اطلاعیه"

        }



      </button>





    </form>


  );


}