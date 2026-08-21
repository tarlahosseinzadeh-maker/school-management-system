import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "خانه" },
  { href: "#announcements", label: "اطلاعیه‌ها" },
  { href: "/pre-registration", label: "پیش ثبت نام" },
  { href: "/login", label: "ورود به سامانه" },
];

export default function Header() {
  return (
    <header
      dir="rtl"
      className="sticky top-0 z-40 border-b border-border/80 bg-card/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="brand-mark size-8 rounded-lg">
            <GraduationCap className="size-4" />
          </span>
          <span className="font-heading text-lg font-bold text-foreground">
            مدرسه ما
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground sm:px-4 sm:py-2",
                link.href === "/login" &&
                  "bg-primary text-primary-foreground shadow-sm shadow-primary/25 hover:bg-primary/90 hover:text-primary-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
