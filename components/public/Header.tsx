import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "خانه" },
  { href: "#announcements", label: "اطلاعیه‌ها" },
  { href: "/pre-registration", label: "پیش ثبت نام" },
  { href: "/login", label: "ورود به سامانه" },
];

export default function Header() {
  return (
    <header dir="rtl" className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold text-foreground">
          مدرسه ما
        </Link>

        <nav className="flex flex-wrap items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                link.href === "/login" &&
                  "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
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
