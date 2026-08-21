"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import LogoutButton from "@/components/LogoutButton";

const menu = [
  {
    title: "داشبورد",
    href: "/students",
  },
  {
    title: "پروفایل",
    href: "/students/profile",
  },
  {
    title: "کلاس من",
    href: "/students/class",
  },
  {
    title: "درس‌ها",
    href: "/students/subjects",
  },
  {
    title: "نمرات و کارنامه",
    href: "/students/grades",
  },
  {
    title: "تکالیف",
    href: "/students/assignments",
  },
  {
    title: "فایل‌های آموزشی",
    href: "/students/files",
  },
];

function isActive(pathname: string, href: string) {
  if (href === "/students") {
    return pathname === "/students";
  }

  return pathname.startsWith(href);
}

export default function StudentSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar-shell min-h-screen" dir="rtl">
      <div className="sidebar-brand">
        <h2 className="sidebar-brand-title">پنل دانش‌آموز</h2>
        <p className="sidebar-brand-subtitle">پیگیری درس و نمرات</p>
      </div>

      <nav className="sidebar-nav">
        {menu.map((item) => (
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

      <div className="border-t border-sidebar-border p-3">
        <LogoutButton />
      </div>
    </aside>
  );
}
