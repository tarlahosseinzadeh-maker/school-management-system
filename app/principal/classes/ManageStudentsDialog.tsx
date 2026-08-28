"use client";

import { useEffect, useState, useMemo } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";

import {
  Search,
  UserPlus,
  UserMinus,
  Users,
  SearchX,
  UserX,
  Check,
} from "lucide-react";

type Props = {
  schoolClass: {
    classId: number;
    className: string;
    gradeLevel: string;
  };
  open: boolean;
  onClose: () => void;
};

type CurrentStudentApi = {
  userId: number;
  studentCode: string;
  user?: {
    firstName?: string;
    lastName?: string;
    nationalCode?: string;
  };
};

type Student = {
  userId: number;
  studentCode: string;
  firstName: string;
  lastName: string;
  nationalCode: string;
};

export default function ManageStudentsDialog({
  schoolClass,
  open,
  onClose,
}: Props) {
  const [students, setStudents] = useState<Student[]>([]);
  const [availableStudents, setAvailableStudents] = useState<Student[]>([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);

      const [currentRes, availableRes] = await Promise.all([
        fetch(`/api/classes/${schoolClass.classId}/students`),
        fetch("/api/students/available"),
      ]);

      if (!currentRes.ok) throw new Error("خطا در دریافت لیست دانش‌آموزان کلاس");
      if (!availableRes.ok) throw new Error("خطا در دریافت لیست دانش‌آموزان قابل افزودن");

      const currentData = await currentRes.json();
      const availableData = await availableRes.json();

      setStudents(
        Array.isArray(currentData)
          ? currentData.map((item: CurrentStudentApi) => ({
              userId: item.userId,
              studentCode: item.studentCode,
              firstName: item.user?.firstName ?? "",
              lastName: item.user?.lastName ?? "",
              nationalCode: item.user?.nationalCode ?? "",
            }))
          : []
      );

      setAvailableStudents(
        Array.isArray(availableData) ? availableData : []
      );

      setSelectedStudentIds(new Set());
      setSearchQuery("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطای ناشناخته");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (open) {
      loadData();
    }
  }, [open]);

  const filteredAvailable = useMemo(() => {
    if (!searchQuery.trim()) return availableStudents;
    const q = searchQuery.trim().toLowerCase();
    return availableStudents.filter(
      (s) =>
        s.firstName.toLowerCase().includes(q) ||
        s.lastName.toLowerCase().includes(q) ||
        s.studentCode.toLowerCase().includes(q) ||
        s.nationalCode.toLowerCase().includes(q)
    );
  }, [availableStudents, searchQuery]);

  function toggleSelection(userId: number) {
    setSelectedStudentIds((prev) => {
      const next = new Set(prev);
      if (next.has(userId)) {
        next.delete(userId);
      } else {
        next.add(userId);
      }
      return next;
    });
  }

  const allFilteredSelected =
    filteredAvailable.length > 0 && selectedStudentIds.size === filteredAvailable.length;

  function toggleSelectAll() {
    if (allFilteredSelected) {
      setSelectedStudentIds(new Set());
    } else {
      setSelectedStudentIds(new Set(filteredAvailable.map((s) => s.userId)));
    }
  }

  async function addSelected() {
    if (selectedStudentIds.size === 0) return;

    setAdding(true);
    setError(null);

    try {
      const promises = Array.from(selectedStudentIds).map((userId) =>
        fetch(`/api/classes/${schoolClass.classId}/students`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId: userId }),
        })
      );

      const results = await Promise.all(promises);
      const failed = results.filter((r) => !r.ok);

      if (failed.length > 0) {
        const firstError = await failed[0].json().catch(() => ({}));
        throw new Error(firstError.error || `خطا در افزودن ${failed.length} دانش‌آموز`);
      }

      setSelectedStudentIds(new Set());
      setSearchQuery("");
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در افزودن دانش‌آموزان");
    } finally {
      setAdding(false);
    }
  }

  async function removeStudent(userId: number) {
    if (!window.confirm("آیا از حذف این دانش‌آموز از کلاس اطمینان دارید؟")) {
      return;
    }

    setRemovingId(userId);
    setError(null);

    try {
      const res = await fetch(`/api/classes/${schoolClass.classId}/students`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: userId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "خطا در حذف دانش‌آموز");
      }

      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطای ارتباط با سرور");
    } finally {
      setRemovingId(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent
        dir="rtl"
        className="max-h-[92vh] w-full max-w-2xl gap-0 overflow-hidden p-0 lg:max-w-3xl"
      >
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="text-base font-bold">
            مدیریت دانش‌آموزان کلاس
          </DialogTitle>
          <DialogDescription className="mt-1 flex items-center gap-2">
            <span>{schoolClass.className}</span>
            <Badge variant="secondary">{schoolClass.gradeLevel}</Badge>
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="mx-6 mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid max-h-[calc(92vh-140px)] grid-cols-1 overflow-hidden lg:max-h-none lg:grid-cols-2 lg:divide-x">
          {/* Current Students */}
          <div className="flex min-h-0 flex-col">
            <div className="flex items-center justify-between border-b px-6 py-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Users className="size-4" />
                دانش‌آموزان کلاس
              </h3>
              <Badge variant="secondary">{students.length} نفر</Badge>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-2">
              {loading && students.length === 0 ? (
                <div className="space-y-2 py-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-14 animate-pulse rounded-lg bg-gray-100" />
                  ))}
                </div>
              ) : students.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <UserX className="mb-2 size-10 text-gray-300" />
                  <p className="text-sm text-gray-500">هنوز دانش‌آموزی در این کلاس ثبت نشده است</p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {students.map((student) => (
                    <div
                      key={student.userId}
                      className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-gray-50"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {student.firstName} {student.lastName}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500">
                          {student.studentCode}
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeStudent(student.userId)}
                        disabled={removingId === student.userId}
                      >
                        <UserMinus className="size-3.5" />
                        <span className="mr-1.5">حذف</span>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Available Students */}
          <div className="flex min-h-0 flex-col">
            <div className="border-b px-6 py-3">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <UserPlus className="size-4" />
                  دانش‌آموزان قابل افزودن
                </h3>
                <Badge variant="outline">{availableStudents.length} نفر</Badge>
              </div>

              <div className="relative">
                <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="جستجو بر اساس نام، نام خانوادگی یا کد دانش‌آموزی..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-9"
                />
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-2">
              {loading && availableStudents.length === 0 ? (
                <div className="space-y-2 py-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-14 animate-pulse rounded-lg bg-gray-100" />
                  ))}
                </div>
              ) : filteredAvailable.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  {searchQuery ? (
                    <>
                      <SearchX className="mb-2 size-10 text-gray-300" />
                      <p className="text-sm text-gray-500">هیچ دانش‌آموزی با این جستجو پیدا نشد</p>
                    </>
                  ) : (
                    <>
                      <Users className="mb-2 size-10 text-gray-300" />
                      <p className="text-sm text-gray-500">همه دانش‌آموزان در کلاس‌ها ثبت شده‌اند</p>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredAvailable.length > 0 && (
                    <label className="flex items-center gap-2 px-1 py-1.5 text-xs font-medium text-gray-600">
                      <input
                        type="checkbox"
                        checked={allFilteredSelected}
                        onChange={toggleSelectAll}
                        className="size-3.5 rounded border-gray-300"
                      />
                      {allFilteredSelected ? "لغو انتخاب همه" : "انتخاب همه"}
                    </label>
                  )}
                  {filteredAvailable.map((student) => {
                    const isSelected = selectedStudentIds.has(student.userId);
                    return (
                      <label
                        key={student.userId}
                        className={`
                          flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors
                          ${isSelected ? "border-primary bg-primary/5" : "hover:bg-gray-50"}
                        `}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelection(student.userId)}
                          className="size-4 shrink-0 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900">
                            {student.firstName} {student.lastName}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-500">
                            {student.studentCode}
                          </p>
                        </div>
                        {isSelected && (
                          <Check className="size-4 shrink-0 text-primary" />
                        )}
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="border-t px-6 py-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {selectedStudentIds.size > 0
                    ? `${selectedStudentIds.size} دانش‌آموز انتخاب شده`
                    : "دانش‌آموزی انتخاب نشده"}
                </span>
                <Button
                  onClick={addSelected}
                  disabled={selectedStudentIds.size === 0 || adding}
                >
                  <UserPlus className="size-4" />
                  <span className="mr-1.5">افزودن انتخاب‌ها</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
