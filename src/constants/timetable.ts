export const DAYS = [
  { value: 0, label: "شنبه" },
  { value: 1, label: "یکشنبه" },
  { value: 2, label: "دوشنبه" },
  { value: 3, label: "سه‌شنبه" },
  { value: 4, label: "چهارشنبه" },
] as const;

export const PERIODS = [
  { value: 1, label: "زنگ اول" },
  { value: 2, label: "زنگ دوم" },
  { value: 3, label: "زنگ سوم" },
  { value: 4, label: "زنگ چهارم" },
  { value: 5, label: "زنگ پنجم" },
  { value: 6, label: "زنگ ششم" },
] as const;

export type DayValue = typeof DAYS[number]["value"];
export type PeriodValue = typeof PERIODS[number]["value"];
