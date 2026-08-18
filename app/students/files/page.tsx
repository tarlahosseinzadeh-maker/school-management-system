"use client";

import {
  useEffect,
  useState,
} from "react";


type EducationalFile = {

  fileId: number;

  title: string;

  fileName: string;

  fileType: string;

  filePath: string;

  description: string;

  uploadDate: string;

  subject: string;

};




export default function StudentFilesPage() {


  const [files, setFiles] =
    useState<EducationalFile[]>([]);


  const [loading, setLoading] =
    useState(true);




  async function loadFiles() {

    try {

      setLoading(true);


      const response =
        await fetch(
          "/api/students/files"
        );


      const data =
        await response.json();


      console.log(
        "MY EDUCATIONAL FILES:",
        data
      );


      if (
        response.ok &&
        Array.isArray(data)
      ) {

        setFiles(data);

      } else {

        setFiles([]);

      }


    } catch (error) {

      console.error(
        "FILES PAGE ERROR:",
        error
      );

      setFiles([]);

    } finally {

      setLoading(false);

    }

  }




  useEffect(() => {

    loadFiles();

  }, []);





  if (loading) {

    return (

      <div
        className="p-6"
        dir="rtl"
      >

        در حال بارگذاری فایل‌های آموزشی...

      </div>

    );

  }





  return (

    <div
      className="space-y-6"
      dir="rtl"
    >


      <div>

        <h1 className="page-title">

          فایل‌های آموزشی

        </h1>


        <p className="text-gray-500 mt-2">

          فایل‌های آموزشی مربوط به درس‌های کلاس شما

        </p>

      </div>





      {
        files.length === 0 && (

          <div
            className="
              bg-white
              border
              rounded-xl
              p-6
              text-gray-500
            "
          >

            هنوز فایل آموزشی برای شما ثبت نشده است.

          </div>

        )
      }





      {
        files.length > 0 && (

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-4
            "
          >

            {
              files.map((file) => (

                <div
                  key={file.fileId}
                  className="
                    bg-white
                    border
                    rounded-xl
                    p-5
                    space-y-4
                  "
                >


                  <div>

                    <p className="text-sm text-gray-500">

                      درس

                    </p>


                    <h2 className="text-lg font-bold">

                      {file.subject}

                    </h2>

                  </div>





                  <div>

                    <h3 className="font-semibold">

                      {file.title}

                    </h3>


                    <p className="text-sm text-gray-500 mt-1">

                      {file.fileName}

                    </p>

                  </div>





                  {
                    file.description && (

                      <p className="text-sm text-gray-600">

                        {file.description}

                      </p>

                    )
                  }





                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      text-sm
                      text-gray-500
                    "
                  >

                    <span>

                      {file.fileType}

                    </span>


                    <span>

                      {
                        new Date(
                          file.uploadDate
                        ).toLocaleDateString(
                          "fa-IR"
                        )
                      }

                    </span>

                  </div>





                  <a
                    href={file.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      block
                      text-center
                      bg-black
                      text-white
                      rounded-lg
                      py-2
                      hover:opacity-90
                    "
                  >

                    مشاهده / دانلود فایل

                  </a>


                </div>

              ))
            }

          </div>

        )
      }


    </div>

  );

}