"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
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
      className="flex min-h-screen items-center justify-center bg-background px-4 py-10"
    >
      <div className="content-card w-full max-w-md p-8">
        <div className="page-header mb-8 text-center">
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
              className="h-10"
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
              className="h-10"
            />
          </div>

          {error && <div className="ui-error">{error}</div>}

          <Button type="submit" disabled={loading} className="h-10 w-full">
            {loading ? "در حال ورود..." : "ورود"}
          </Button>
        </form>
      </div>
    </main>
  );
}
