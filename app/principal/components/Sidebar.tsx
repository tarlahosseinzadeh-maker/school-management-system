"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";


const menuItems = [
  {
    title: "داشبورد",
    href: "/principal",
  },
  {
    title: "مدیریت کاربران",
    href: "/principal/users",
  },
  {
    title: "مدیریت کلاس‌ها",
    href: "/principal/classes",
  },
  {
    title: "مدیریت دروس",
    href: "/principal/subjects",
  },
  {
    title: "پیش‌ثبت‌نام‌ها",
    href: "/principal/pre-registrations",
  },
  {
    title: "اطلاعیه‌ها",
    href: "/principal/announcements",
  },
  {
    title: "کارنامه‌ها",
    href: "/principal/grades",
  },
];


function isActive(
  pathname:string,
  href:string
){

  if(href === "/principal"){
    return pathname === href;
  }

  return pathname.startsWith(href);

}



export default function Sidebar(){

  const pathname = usePathname();


  return (

    <aside
      dir="rtl"
      className="
      w-64
      min-h-screen
      bg-white
      border-l
      p-5
      "
    >


      <div className="mb-8">

        <h2 className="
          text-xl
          font-bold
          text-gray-800
        ">
          سیستم مدیریت مدرسه
        </h2>


        <p className="
          text-sm
          text-gray-500
          mt-2
        ">
          پنل مدیر
        </p>

      </div>



      <nav className="space-y-2">


        {
          menuItems.map(item=>(

            <Link

              key={item.href}

              href={item.href}

              className={cn(

                "block rounded-lg px-4 py-3 text-sm transition",

                isActive(
                  pathname,
                  item.href
                )

                ?

                "bg-blue-50 text-blue-700 font-semibold"

                :

                "text-gray-700 hover:bg-gray-100"

              )}

            >

              {item.title}

            </Link>


          ))
        }


      </nav>


    </aside>

  );

}