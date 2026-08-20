"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TeacherClassSubject, TeacherFile } from "../types";

type FilesClientProps = {
  classes: TeacherClassSubject[];
};

export default function FilesClient({ classes }: FilesClientProps) {
  const [files, setFiles] = useState<TeacherFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    classSubjectId: "",
  });

  const loadFiles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/teacher/files");
      if (!response.ok) {
        throw new Error("بارگذاری فایل‌ها ناموفق بود");
      }
      const data = await response.json();
      setFiles(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "خطای ناشناخته");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  function resetForm() {
    setForm({
      title: "",
      description: "",
      classSubjectId: "",
    });
    setSelectedFile(null);
  }

  async function handleUpload() {
    if (!selectedFile || !form.classSubjectId || !form.title) {
      setError("عنوان، کلاس/درس و فایل الزامی است");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const uploadData = new FormData();
      uploadData.append("file", selectedFile);

      const uploadResponse = await fetch("/api/uploads/educational-files", {
        method: "POST",
        body: uploadData,
      });

      if (!uploadResponse.ok) {
        throw new Error("آپلود فایل ناموفق بود");
      }

      const uploaded = await uploadResponse.json();

      const saveResponse = await fetch("/api/teacher/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          classSubjectId: Number(form.classSubjectId),
          fileName: uploaded.fileName,
          fileType: uploaded.fileType,
          filePath: uploaded.url,
        }),
      });

      if (!saveResponse.ok) {
        throw new Error("ثبت اطلاعات فایل ناموفق بود");
      }

      setUploadOpen(false);
      resetForm();
      await loadFiles();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "خطای ناشناخته");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(fileId: number) {
    if (!confirm("آیا از حذف این فایل مطمئن هستید؟")) return;

    setError(null);

    try {
      const response = await fetch(`/api/teacher/files/${fileId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("حذف فایل ناموفق بود");
      }

      await loadFiles();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "خطای ناشناخته");
    }
  }
return (
  <div dir="rtl" className="space-y-6">

    <div className="flex flex-wrap items-center justify-between gap-4">

      <div>
        <h1 className="text-3xl font-bold">
          فایل‌های آموزشی
        </h1>

        <p className="mt-2 text-gray-600">
          مدیریت فایل‌های آموزشی کلاس‌ها
        </p>
      </div>


      <Dialog
        open={uploadOpen}
        onOpenChange={(open) => {
          setUploadOpen(open);

          if (!open) {
            resetForm();
          }
        }}
      >

        <DialogTrigger>
          <Button disabled={classes.length === 0}>
            آپلود فایل
          </Button>
        </DialogTrigger>



        <DialogContent>

          <DialogHeader>

            <DialogTitle>
              آپلود فایل آموزشی
            </DialogTitle>

          </DialogHeader>



          <div className="space-y-4">


            <div>

              <Label>
                کلاس / درس
              </Label>


              <Select
                value={form.classSubjectId}
                onValueChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    classSubjectId: value ?? "",
                  }))
                }
              >

                <SelectTrigger>

                  <SelectValue
                    placeholder="انتخاب کنید"
                  />

                </SelectTrigger>


                <SelectContent>

                  {
                    classes.map((item) => (

                      <SelectItem
                        key={item.classSubjectId}
                        value={item.classSubjectId.toString()}
                      >

                        {item.class.className}
                        {" - "}
                        {item.subject.subjectName}

                      </SelectItem>

                    ))
                  }

                </SelectContent>


              </Select>

            </div>




            <div>

              <Label>
                عنوان
              </Label>


              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    title:e.target.value,
                  }))
                }
              />

            </div>




            <div>

              <Label>
                توضیحات
              </Label>


              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    description:e.target.value,
                  }))
                }
              />

            </div>




            <div>

              <Label>
                فایل
              </Label>


              <Input
                type="file"
                onChange={(e) =>
                  setSelectedFile(
                    e.target.files?.[0] ?? null
                  )
                }
              />

            </div>


          </div>




          <Button
            onClick={handleUpload}
            disabled={submitting}
          >

            {
              submitting
              ? "در حال آپلود..."
              : "ثبت فایل"
            }

          </Button>


        </DialogContent>


      </Dialog>


    </div>

      {loading && <p className="text-gray-500">در حال بارگذاری...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && files.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <p className="text-lg text-gray-500">هیچ فایلی آپلود نشده است.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {files.map((file) => (
            <div
              key={file.fileId}
              className="rounded-lg border p-4 transition hover:bg-gray-50"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{file.title}</h3>
                  {file.description && (
                    <p className="mt-1 text-sm text-gray-600">
                      {file.description}
                    </p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                    <span>فایل: {file.fileName}</span>
                    <span>کلاس: {file.classSubject.class.className}</span>
                    <span>درس: {file.classSubject.subject.subjectName}</span>
                    <span>
                      تاریخ:{" "}
                      {new Date(file.uploadDate).toLocaleDateString("fa-IR")}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href={file.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                  >
                    دانلود
                  </a>
                  <Button
                    variant="outline"
                    className="text-red-600"
                    onClick={() => handleDelete(file.fileId)}
                  >
                    حذف
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  }