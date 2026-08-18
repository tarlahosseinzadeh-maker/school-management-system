"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

type GradeItem = {
  gradeId: number;
  score: number;
  examType: string;
  examDate: string;
  subject: string;
};

type SubjectReport = {
  subject: string;
  grades: GradeItem[];
  average: number;
};

export default function StudentGradesPage() {
  const [grades, setGrades] = useState<GradeItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadGrades() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/students/grades"
      );

      const data = await response.json();

      console.log("MY GRADES:", data);

      if (
        response.ok &&
        Array.isArray(data)
      ) {
        setGrades(data);
      } else {
        setGrades([]);
      }
    } catch (error) {
      console.error(
        "GRADES PAGE ERROR:",
        error
      );

      setGrades([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGrades();
  }, []);

  const report = useMemo<SubjectReport[]>(() => {
    const grouped: Record<
      string,
      GradeItem[]
    > = {};

    for (const grade of grades) {
      if (!grouped[grade.subject]) {
        grouped[grade.subject] = [];
      }

      grouped[grade.subject].push(grade);
    }

    return Object.entries(grouped).map(
      ([subject, subjectGrades]) => {
        const total = subjectGrades.reduce(
          (sum, item) =>
            sum + item.score,
          0
        );

        const average =
          total / subjectGrades.length;

        return {
          subject,
          grades: subjectGrades,
          average,
        };
      }
    );
  }, [grades]);

  const overallAverage = useMemo(() => {
    if (grades.length === 0) {
      return 0;
    }

    const total = grades.reduce(
      (sum, item) =>
        sum + item.score,
      0
    );

    return total / grades.length;
  }, [grades]);

  if (loading) {
    return (
      <div
        className="p-6"
        dir="rtl"
      >
        در حال بارگذاری نمرات...
      </div>
    );
  }

  return (
    <div
      className="space-y-6"
      dir="rtl"
    >
      {/* Header */}

      <div>
        <h1 className="page-title">
          نمرات و کارنامه
        </h1>

        <p className="text-gray-500 mt-2">
          مشاهده نمرات و عملکرد درسی شما
        </p>
      </div>

      {/* Overall Average */}

      {grades.length > 0 && (
        <div
          className="
            bg-white
            border
            rounded-xl
            p-6
          "
        >
          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-500">
                میانگین کل
              </p>

              <p className="text-sm text-gray-400 mt-1">
                بر اساس تمام نمرات ثبت‌شده
              </p>
            </div>

            <div
              className="
                text-4xl
                font-bold
              "
            >
              {overallAverage.toFixed(2)}
            </div>

          </div>
        </div>
      )}

      {/* Empty State */}

      {grades.length === 0 && (
        <div
          className="
            bg-white
            border
            rounded-xl
            p-6
            text-gray-500
          "
        >
          هنوز نمره‌ای برای شما ثبت نشده است.
        </div>
      )}

      {/* Subject Report */}

      {report.length > 0 && (
        <div className="space-y-4">

          <h2 className="text-xl font-bold">
            خلاصه نمرات به تفکیک درس
          </h2>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-4
            "
          >

            {report.map((item) => (
              <div
                key={item.subject}
                className="
                  bg-white
                  border
                  rounded-xl
                  p-5
                  space-y-4
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    pb-3
                  "
                >

                  <h3 className="text-lg font-bold">
                    {item.subject}
                  </h3>

                  <div className="text-left">

                    <p className="text-xs text-gray-500">
                      میانگین
                    </p>

                    <p className="font-bold text-lg">
                      {item.average.toFixed(2)}
                    </p>

                  </div>

                </div>

                <div className="space-y-3">

                  {item.grades.map((grade) => (
                    <div
                      key={grade.gradeId}
                      className="
                        flex
                        items-center
                        justify-between
                        border-b
                        last:border-b-0
                        pb-2
                        last:pb-0
                      "
                    >

                      <div>

                        <p className="font-medium">
                          {grade.examType}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(
                            grade.examDate
                          ).toLocaleDateString(
                            "fa-IR"
                          )}
                        </p>

                      </div>

                      <span className="font-bold text-lg">
                        {grade.score}
                      </span>

                    </div>
                  ))}

                </div>

              </div>
            ))}

          </div>
        </div>
      )}

      {/* Detailed Grades */}

      {grades.length > 0 && (
        <div
          className="
            bg-white
            border
            rounded-xl
            overflow-hidden
          "
        >

          <div className="p-5 border-b">

            <h2 className="text-xl font-bold">
              جزئیات نمرات
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table
              className="
                w-full
                text-right
              "
            >

              <thead
                className="
                  bg-gray-50
                  border-b
                "
              >

                <tr>

                  <th className="p-4">
                    درس
                  </th>

                  <th className="p-4">
                    نمره
                  </th>

                  <th className="p-4">
                    نوع آزمون
                  </th>

                  <th className="p-4">
                    تاریخ
                  </th>

                </tr>

              </thead>

              <tbody>

                {grades.map((item) => (
                  <tr
                    key={item.gradeId}
                    className="
                      border-b
                      last:border-b-0
                    "
                  >

                    <td className="p-4 font-medium">
                      {item.subject}
                    </td>

                    <td className="p-4 font-bold">
                      {item.score}
                    </td>

                    <td className="p-4">
                      {item.examType}
                    </td>

                    <td className="p-4">
                      {new Date(
                        item.examDate
                      ).toLocaleDateString(
                        "fa-IR"
                      )}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>
      )}

    </div>
  );
}