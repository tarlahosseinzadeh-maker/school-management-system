"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "داشبورد اصلی",
    href: "/teacher",
  },
  {
    title: "کلاس‌های من",
    href: "/teacher/classes",
  },
  {
    title: "دانش‌آموزان",
    href: "/teacher/students",
  },
  {
    title: "نمرات",
    href: "/teacher/grades",
  },
  {
    title: "تکالیف",
    href: "/teacher/assignments",
  },
  {
    title: "فایل‌های آموزشی",
    href: "/teacher/files",
  },
  {
    title: "پروفایل",
    href: "/teacher/profile",
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
    <aside className="sidebar-shell min-h-screen" dir="rtl">
      <div className="sidebar-brand">
        <h2 className="sidebar-brand-title">پنل معلم</h2>
        <p className="sidebar-brand-subtitle">مدیریت کلاس و درس</p>
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
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
