"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function PreRegistrationPage() {
  const [form, setForm] = useState({
    studentFirstName: "",
    studentLastName: "",
    fatherName: "",
    phoneNumber: "",
    requestedGrade: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setIsSuccess(false);

    try {
      const response = await fetch("/api/public/preregistrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setMessage("درخواست پیش ثبت نام با موفقیت ارسال شد");
      setIsSuccess(true);

      setForm({
        studentFirstName: "",
        studentLastName: "",
        fatherName: "",
        phoneNumber: "",
        requestedGrade: "",
        description: "",
      });
    } catch {
      setMessage("خطا در ارسال درخواست");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main dir="rtl" className="min-h-screen bg-background px-4 py-10">
      <div className="content-card mx-auto w-full max-w-xl p-8">
        <div className="page-header mb-8">
          <h1 className="page-title">پیش ثبت نام مدرسه</h1>
          <p className="page-description">
            فرم زیر را تکمیل کنید تا درخواست شما بررسی شود.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-field">
            <Label htmlFor="studentFirstName">نام دانش‌آموز</Label>
            <Input
              id="studentFirstName"
              name="studentFirstName"
              value={form.studentFirstName}
              onChange={handleChange}
              required
              className="h-10"
            />
          </div>

          <div className="form-field">
            <Label htmlFor="studentLastName">نام خانوادگی</Label>
            <Input
              id="studentLastName"
              name="studentLastName"
              value={form.studentLastName}
              onChange={handleChange}
              required
              className="h-10"
            />
          </div>

          <div className="form-field">
            <Label htmlFor="fatherName">نام پدر</Label>
            <Input
              id="fatherName"
              name="fatherName"
              value={form.fatherName}
              onChange={handleChange}
              className="h-10"
            />
          </div>

          <div className="form-field">
            <Label htmlFor="phoneNumber">شماره تماس</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              required
              className="h-10"
            />
          </div>

          <div className="form-field">
            <Label htmlFor="requestedGrade">پایه مورد درخواست</Label>
            <Input
              id="requestedGrade"
              name="requestedGrade"
              value={form.requestedGrade}
              onChange={handleChange}
              required
              className="h-10"
            />
          </div>

          <div className="form-field">
            <Label htmlFor="description">توضیحات</Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="min-h-28"
            />
          </div>

          <Button type="submit" disabled={loading} className="h-10 w-full">
            {loading ? "در حال ارسال..." : "ارسال درخواست"}
          </Button>
        </form>

        {message && (
          <p className={`mt-5 text-center ${isSuccess ? "ui-success" : "ui-error"}`}>
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
