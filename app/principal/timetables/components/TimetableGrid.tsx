"use client";

import { DAYS, PERIODS } from "@/src/constants/timetable";

import { Button } from "@/components/ui/button";

type TimetableEntry = {
  timetableId: number;
  dayOfWeek: number;
  period: number;
  classSubjectId: number;
  subjectName: string;
  teacherName: string;
};

type TimetableGridProps = {
  timetable: TimetableEntry[];
  loading: boolean;
  onAddEntry: (dayOfWeek: number, period: number) => void;
  onEditEntry: (entry: TimetableEntry) => void;
};

export default function TimetableGrid({
  timetable,
  loading,
  onAddEntry,
  onEditEntry,
}: TimetableGridProps) {
  function getEntry(dayOfWeek: number, period: number) {
    return timetable.find(
      (entry) => entry.dayOfWeek === dayOfWeek && entry.period === period
    );
  }

  return (
    <div className="overflow-x-auto" dir="rtl">
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
                      <div
                        className="space-y-1 cursor-pointer"
                        onClick={() => onEditEntry(entry)}
                      >
                        <p className="font-medium text-sm">
                          {entry.subjectName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {entry.teacherName}
                        </p>
                      </div>
                    ) : loading ? (
                      <div className="text-gray-400 text-sm">
                        ...
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full h-full min-h-[60px] text-gray-400 hover:text-gray-600"
                        onClick={() => onAddEntry(day.value, period.value)}
                      >
                        +
                      </Button>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
