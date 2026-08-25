export const GRADE_OPTIONS = [
  { value: "دهم", label: "دهم" },
  { value: "یازدهم", label: "یازدهم" },
  { value: "دوازدهم", label: "دوازدهم" },
] as const;

export type GradeValue = typeof GRADE_OPTIONS[number]["value"];
