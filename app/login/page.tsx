"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [nationalCode, setNationalCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      nationalCode,
      password,
      redirect: false,
    });

    console.log("نتیجه ورود:", result);

    if (result?.error) {
      setError("کد ملی یا رمز عبور اشتباه است");
      setLoading(false);
      return;
    }

    if (result?.ok) {
      const session = await fetch("/api/auth/session").then((res) => res.json());

      console.log("SESSION:", session);

      const role = session?.user?.role;

      if (role === "PRINCIPAL") {
        window.location.href = "/principal";
      } else if (role === "TEACHER") {
        window.location.href = "/teacher";
      } else if (role === "STUDENT") {
        window.location.href = "/students";
      } else {
        setError("نقش کاربر مشخص نیست");
      }
    }

    setLoading(false);
  }

  return (
    <main
      dir="rtl"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background px-4 py-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 start-1/2 size-96 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />

      <div className="content-card relative w-full max-w-md p-8 shadow-xl shadow-primary/5 sm:p-10">
        <div className="page-header mb-8 text-center">
          <span className="brand-mark mx-auto mb-4 size-14 rounded-2xl">
            <GraduationCap className="size-7" />
          </span>
          <h1 className="page-title">سیستم مدیریت مدرسه</h1>
          <p className="page-description mt-2">ورود به سامانه</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="form-field">
            <Label htmlFor="nationalCode">کد ملی</Label>
            <Input
              id="nationalCode"
              type="text"
              value={nationalCode}
              onChange={(event) => setNationalCode(event.target.value)}
              required
              className="h-11"
            />
          </div>

          <div className="form-field">
            <Label htmlFor="password">رمز عبور</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="h-11"
            />
          </div>

          {error && <div className="ui-error">{error}</div>}

          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full text-base shadow-lg shadow-primary/25"
          >
            {loading ? "در حال ورود..." : "ورود"}
          </Button>
        </form>
      </div>
    </main>
  );
}
