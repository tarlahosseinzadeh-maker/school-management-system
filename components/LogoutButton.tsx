"use client";

import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

export default function LogoutButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className={cn(
        "w-full rounded-md px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10",
        className
      )}
    >
      خروج از حساب
    </button>
  );
}
