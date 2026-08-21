"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Award,
  BookOpen,
  ClipboardList,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  School,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import LogoutButton from "@/components/LogoutButton";

const menu = [
  {
    title: "داشبورد",
    href: "/students",
    icon: LayoutDashboard,
  },
  {
    title: "پروفایل",
    href: "/students/profile",
    icon: User,
  },
  {
    title: "کلاس من",
    href: "/students/class",
    icon: School,
  },
  {
    title: "درس‌ها",
    href: "/students/subjects",
    icon: BookOpen,
  },
  {
    title: "نمرات و کارنامه",
    href: "/students/grades",
    icon: Award,
  },
  {
    title: "تکالیف",
    href: "/students/assignments",
    icon: ClipboardList,
  },
  {
    title: "فایل‌های آموزشی",
    href: "/students/files",
    icon: FolderOpen,
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
    <aside className="sidebar-shell" dir="rtl">
      <div className="sidebar-brand">
        <div className="flex items-center gap-3">
          <span className="brand-mark">
            <GraduationCap className="size-5" />
          </span>
          <div>
            <h2 className="sidebar-brand-title">پنل دانش‌آموز</h2>
            <p className="sidebar-brand-subtitle">پیگیری درس و نمرات</p>
          </div>
        </div>
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
