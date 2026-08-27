"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  School,
  UserPlus,
  Users,
  CalendarDays,
} from "lucide-react";
import { cn } from "@/lib/utils";
import LogoutButton from "@/components/LogoutButton";


const menuItems = [
  {
    title: "داشبورد",
    href: "/principal",
    icon: LayoutDashboard,
  },
  {
    title: "مدیریت کاربران",
    href: "/principal/users",
    icon: Users,
  },
  {
    title: "مدیریت کلاس‌ها",
    href: "/principal/classes",
    icon: School,
  },
  {
    title: "مدیریت دروس",
    href: "/principal/subjects",
    icon: BookOpen,
  },
  {
    title: "پیش‌ثبت‌نام‌ها",
    href: "/principal/pre-registrations",
    icon: UserPlus,
  },
  {
    title: "اطلاعیه‌ها",
    href: "/principal/announcements",
    icon: Megaphone,
  },
  {
    title: "کارنامه‌ها",
    href: "/principal/grades",
    icon: ClipboardList,
  },
  {
    title: "برنامه هفتگی",
    href: "/principal/timetables",
    icon: CalendarDays,
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
      className="sidebar-shell"
    >


      <div className="sidebar-brand">

        <div className="flex items-center gap-3">

          <span className="brand-mark">
            <GraduationCap className="size-5" />
          </span>


          <div>
            <h2 className="sidebar-brand-title">
              سیستم مدیریت مدرسه
            </h2>

            <p className="sidebar-brand-subtitle">
              پنل مدیر
            </p>
          </div>

        </div>

      </div>



      <nav className="sidebar-nav">


        {
          menuItems.map(item=>(

            <Link

              key={item.href}

              href={item.href}

              className={cn(

                "sidebar-nav-link",

                isActive(
                  pathname,
                  item.href
                )

                ?

                "sidebar-nav-link-active"

                :

                ""

              )}

            >

              <item.icon className="size-4 shrink-0" />

              {item.title}

            </Link>


          ))
        }


      </nav>


      <div className="sidebar-footer">
        <LogoutButton />
      </div>


    </aside>

  );

}
