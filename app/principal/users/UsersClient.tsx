"use client";

import {
  useEffect,
  useState
} from "react";


import { useUsers } from "./hooks/useUsers";

import UserTable from "./components/UserTable";

import CreateUserDialog from "./components/CreateUserDialog";



export default function UsersClient() {



  const [search,setSearch] =
    useState("");



  const [searchValue,setSearchValue] =
    useState("");



  const [role,setRole] =
    useState<
      "STUDENT"
      |
      "TEACHER"
      |
      "PRINCIPAL"
      |
      ""
    >("");





  useEffect(()=>{



    const timer =
      setTimeout(()=>{



        setSearch(searchValue);



      },500);



    return ()=>{



      clearTimeout(timer);



    };



  },[searchValue]);





  const {
    users,
    loading,
    error,
    refresh,
  } = useUsers(
    search,
    role
  );



  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    setDataLoading(loading);
  }, [loading]);



  return (

    <main

      dir="rtl"

      className="
      space-y-6
      "

    >





      <section

        className="
        bg-white
        border
        rounded-xl
        p-6
        "

      >




        <div

          className="
          flex
          items-center
          justify-between
          gap-4
          "

        >




          <div>




            <h1

              className="
              text-2xl
              font-bold
              text-gray-800
              "

            >

              مدیریت کاربران

            </h1>




            <p

              className="
              mt-2
              text-sm
              text-gray-500
              "

            >

              مدیریت دانش‌آموزان، معلمان و کاربران سیستم

            </p>




          </div>




          <CreateUserDialog

            onSuccess={refresh}

          />




        </div>




      </section>






      <section

        className="
        bg-white
        border
        rounded-xl
        p-4
        space-y-4
        "

      >




        <div

          className="
          flex
          flex-col
          md:flex-row
          gap-3
          "

        >




          <input

            className="
            border
            rounded-lg
            p-2
            flex-1
            "

            placeholder="جستجوی نام، نام خانوادگی، کد ملی یا نام کاربری"

            value={searchValue}

            onChange={(e)=>
              setSearchValue(
                e.target.value
              )
            }

          />





          <select

            className="
            border
            rounded-lg
            p-2
            md:w-48
            "

            value={role}

            onChange={(e)=>
              setRole(
                e.target.value as
                | "STUDENT"
                | "TEACHER"
                | "PRINCIPAL"
                | ""
              )
            }

          >




            <option value="">
              همه کاربران
            </option>




            <option value="STUDENT">
              دانش‌آموز
            </option>




            <option value="TEACHER">
              معلم
            </option>




            <option value="PRINCIPAL">
              مدیر
            </option>




          </select>




        </div>



        {dataLoading && (
          <div
            className="
            flex
            min-h-[200px]
            items-center
            justify-center
            text-gray-500
            "
          >
            در حال بارگذاری...
          </div>
        )}

        {!dataLoading && error && (
          <div
            className="
            rounded-xl
            border
            bg-red-50
            p-5
            text-red-700
            "
          >
            {error}
          </div>
        )}

        {!dataLoading && !error && (
          <UserTable
            users={users}
            onSuccess={refresh}
          />
        )}




      </section>




    </main>

  );
}
