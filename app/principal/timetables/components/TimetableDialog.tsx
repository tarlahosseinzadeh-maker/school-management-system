"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DAYS, PERIODS } from "@/src/constants/timetable";

import type { CreateTimetableInput, UpdateTimetableInput } from "@/src/validation/timetable.validation";

type ClassSubject = {
  classSubjectId: number;
  subject: {
    subjectName: string;
    gradeLevel: string;
  };
  teacher: {
    user: {
      firstName: string;
      lastName: string;
    };
  };
};

type TimetableEntry = {
  timetableId: number;
  dayOfWeek: number;
  period: number;
  classSubjectId: number;
};

type TimetableDialogProps = {
  classId: number;
  entry: TimetableEntry | null;
  onClose: () => void;
  onSuccess: () => void;
};

export default function TimetableDialog({
  classId,
  entry,
  onClose,
  onSuccess,
}: TimetableDialogProps) {
  const [classSubjects, setClassSubjects] = useState<ClassSubject[]>([]);
  const [selectedClassSubjectId, setSelectedClassSubjectId] = useState<
    number | ""
  >("");
  const [dayOfWeek, setDayOfWeek] = useState<number | "">("");
  const [period, setPeriod] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (entry) {
      setSelectedClassSubjectId(entry.classSubjectId);
      setDayOfWeek(entry.dayOfWeek);
      setPeriod(entry.period);
    } else {
      setSelectedClassSubjectId("");
      setDayOfWeek("");
      setPeriod("");
    }
  }, [entry]);

  useEffect(() => {
    async function loadClassSubjects() {
      const res = await fetch(`/api/class-subjects?classId=${classId}`);
      const data = await res.json();
      setClassSubjects(data);
    }
    loadClassSubjects();
  }, [classId]);

  async function handleSubmit() {
    if (!selectedClassSubjectId || dayOfWeek === "" || period === "") {
      return;
    }

    setLoading(true);

    const payload: CreateTimetableInput | UpdateTimetableInput = {
      classSubjectId: Number(selectedClassSubjectId),
      classId,
      dayOfWeek: Number(dayOfWeek),
      period: Number(period),
    };

    const url = entry
      ? `/api/timetables/${entry.timetableId}`
      : "/api/timetables";

    const res = await fetch(url, {
      method: entry ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      onSuccess();
    } else {
      const data = await res.json();
      alert(data.error || "خطا در ذخیره برنامه هفتگی");
    }

    setLoading(false);
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent dir="rtl">
        <DialogHeader>
          <DialogTitle>
            {entry ? "ویرایش درس" : "افزودن درس"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>درس / گروه تدریسی</Label>
            <Select
              value={selectedClassSubjectId.toString()}
              onValueChange={(value) =>
                setSelectedClassSubjectId(Number(value))
              }
              itemToStringLabel={(value) => {
                const cs = classSubjects.find(
                  (c) => c.classSubjectId.toString() === value
                );
                if (!cs) return "";
                return `${cs.subject.subjectName} - ${cs.teacher.user.firstName} ${cs.teacher.user.lastName}`;
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="انتخاب درس" />
              </SelectTrigger>
              <SelectContent>
                {classSubjects.map((cs) => (
                  <SelectItem
                    key={cs.classSubjectId}
                    value={cs.classSubjectId.toString()}
                  >
                    {cs.subject.subjectName} -{" "}
                    {cs.teacher.user.firstName}{" "}
                    {cs.teacher.user.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>روز هفته</Label>
            <Select
              value={dayOfWeek.toString()}
              onValueChange={(value) =>
                setDayOfWeek(Number(value))
              }
              itemToStringLabel={(value) =>
                DAYS.find((d) => d.value.toString() === value)?.label ?? ""
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="انتخاب روز" />
              </SelectTrigger>
              <SelectContent>
                {DAYS.map((day) => (
                  <SelectItem
                    key={day.value}
                    value={day.value.toString()}
                  >
                    {day.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>زنگ</Label>
            <Select
              value={period.toString()}
              onValueChange={(value) =>
                setPeriod(Number(value))
              }
              itemToStringLabel={(value) =>
                PERIODS.find((p) => p.value.toString() === value)?.label ?? ""
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="انتخاب زنگ" />
              </SelectTrigger>
              <SelectContent>
                {PERIODS.map((p) => (
                  <SelectItem
                    key={p.value}
                    value={p.value.toString()}
                  >
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "در حال ذخیره..." : "ذخیره"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
