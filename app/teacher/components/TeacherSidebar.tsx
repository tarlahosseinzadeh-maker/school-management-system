"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Award,
  CalendarDays,
  ClipboardList,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  School,
  User,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import LogoutButton from "@/components/LogoutButton";
const menuItems = [
  {
    title: "داشبورد اصلی",
    href: "/teacher",
    icon: LayoutDashboard,
  },
  {
    title: "کلاس‌های من",
    href: "/teacher/classes",
    icon: School,
  },
  {
    title: "دانش‌آموزان",
    href: "/teacher/students",
    icon: Users,
  },
  {
    title: "نمرات",
    href: "/teacher/grades",
    icon: Award,
  },
  {
    title: "تکالیف",
    href: "/teacher/assignments",
    icon: ClipboardList,
  },
  {
    title: "فایل‌های آموزشی",
    href: "/teacher/files",
    icon: FolderOpen,
  },
  {
    title: "برنامه هفتگی",
    href: "/teacher/timetables",
    icon: CalendarDays,
  },
  {
    title: "پروفایل",
    href: "/teacher/profile",
    icon: User,
  },
];

function isActive(pathname: string, href: string) {
  if (href === "/teacher") {
    return pathname === "/teacher";
  }

  return pathname.startsWith(href);
}

export default function TeacherSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar-shell" dir="rtl">
      <div className="sidebar-brand">
        <div className="flex items-center gap-3">
          <span className="brand-mark">
            <GraduationCap className="size-5" />
          </span>
          <div>
            <h2 className="sidebar-brand-title">پنل معلم</h2>
            <p className="sidebar-brand-subtitle">مدیریت کلاس و درس</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "sidebar-nav-link",
              isActive(pathname, item.href) && "sidebar-nav-link-active"
            )}
          >
            <item.icon className="size-4 shrink-0" />
            {item.title}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <LogoutButton />
      </div>
    </aside>
  );
}
