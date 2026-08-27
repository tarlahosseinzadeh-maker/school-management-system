"use client";

import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

import { DAYS, PERIODS } from "@/src/constants/timetable";

import TimetableGrid from "./components/TimetableGrid";

import TimetableDialog from "./components/TimetableDialog";

type ClassItem = {
  classId: number;
  className: string;
  gradeLevel: string;
};

type TimetableEntry = {
  timetableId: number;
  dayOfWeek: number;
  period: number;
  classSubjectId: number;
  subjectName: string;
  teacherName: string;
};

type DialogEntry = {
  timetableId: number;
  dayOfWeek: number;
  period: number;
  classSubjectId: number;
};

export default function TimetableClient() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<DialogEntry | null>(null);

  useEffect(() => {
    async function loadClasses() {
      const res = await fetch("/api/classes");
      const data = await res.json();
      setClasses(data);
    }
    loadClasses();
  }, []);

  useEffect(() => {
    if (!selectedClassId) {
      setTimetable([]);
      return;
    }

    async function loadTimetable() {
      setLoading(true);
      const res = await fetch(`/api/timetables/class/${selectedClassId}`);
      if (res.ok) {
        const data = await res.json();
        setTimetable(data);
      }
      setLoading(false);
    }
    loadTimetable();
  }, [selectedClassId]);

  function handleAddEntry(dayOfWeek: number, period: number) {
    setSelectedEntry(null);
    setDialogOpen(true);
  }

  function handleEditEntry(entry: TimetableEntry) {
    setSelectedEntry({
      timetableId: entry.timetableId,
      dayOfWeek: entry.dayOfWeek,
      period: entry.period,
      classSubjectId: entry.classSubjectId,
    });
    setDialogOpen(true);
  }

  function handleDialogClose() {
    setDialogOpen(false);
    setSelectedEntry(null);
  }

  function handleDialogSuccess() {
    setDialogOpen(false);
    setSelectedEntry(null);
    if (selectedClassId) {
      setLoading(true);
      fetch(`/api/timetables/class/${selectedClassId}`)
        .then((res) => res.json())
        .then((data) => setTimetable(data))
        .finally(() => setLoading(false));
    }
  }

  return (
    <div className="space-y-4" dir="rtl">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="space-y-2">
          <Label>انتخاب کلاس</Label>
          <Select
            value={selectedClassId?.toString() ?? ""}
            onValueChange={(value) =>
              setSelectedClassId(value ? Number(value) : null)
            }
          >
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="کلاس را انتخاب کنید" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((cls) => (
                <SelectItem
                  key={cls.classId}
                  value={cls.classId.toString()}
                >
                  {cls.className} - {cls.gradeLevel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedClassId && (
        <TimetableGrid
          timetable={timetable}
          loading={loading}
          onAddEntry={handleAddEntry}
          onEditEntry={handleEditEntry}
        />
      )}

      {dialogOpen && selectedClassId && (
        <TimetableDialog
          classId={selectedClassId}
          entry={selectedEntry}
          onClose={handleDialogClose}
          onSuccess={handleDialogSuccess}
        />
      )}
    </div>
  );
}
