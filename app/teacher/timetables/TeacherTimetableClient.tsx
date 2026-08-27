"use client";

import { useEffect, useState } from "react";

import { DAYS, PERIODS } from "@/src/constants/timetable";

type TimetableEntry = {
  timetableId: number;
  dayOfWeek: number;
  period: number;
  subjectName: string;
  teacherName: string;
  className: string;
  gradeLevel: string;
};

type TeacherTimetableClientProps = {
  teacherId: number;
};

export default function TeacherTimetableClient({
  teacherId,
}: TeacherTimetableClientProps) {
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTimetable() {
      setLoading(true);
      const res = await fetch("/api/timetables/teacher");
      if (res.ok) {
        const data = await res.json();
        setTimetable(data);
      }
      setLoading(false);
    }
    loadTimetable();
  }, [teacherId]);

  function getEntry(dayOfWeek: number, period: number) {
    return timetable.find(
      (entry) => entry.dayOfWeek === dayOfWeek && entry.period === period
    );
  }

  return (
    <div dir="rtl">
      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 p-2 bg-gray-50">
                  روز / پایه
                </th>
                {PERIODS.map((period) => (
                  <th
                    key={period.value}
                    className="border border-gray-200 p-2 bg-gray-50 min-w-[120px]"
                  >
                    {period.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DAYS.map((day) => (
                <tr key={day.value}>
                  <td className="border border-gray-200 p-2 font-medium bg-gray-50">
                    {day.label}
                  </td>
                  {PERIODS.map((period) => {
                    const entry = getEntry(day.value, period.value);
                    return (
                      <td
                        key={period.value}
                        className="border border-gray-200 p-2 min-h-[80px] align-top"
                      >
                        {entry ? (
                          <div className="space-y-1">
                            <p className="font-medium text-sm">
                              {entry.subjectName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {entry.className} - {entry.gradeLevel}
                            </p>
                          </div>
                        ) : (
                          <span className="text-gray-300">-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
