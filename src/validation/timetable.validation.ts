import { z } from "zod";

export const createTimetableSchema = z.object({
  classSubjectId: z
    .number()
    .int()
    .positive("نامعتبر است"),

  classId: z
    .number()
    .int()
    .positive("نامعتبر است"),

  dayOfWeek: z
    .number()
    .int()
    .min(0)
    .max(4, "روز هفته نامعتبر است"),

  period: z
    .number()
    .int()
    .min(1, "پایه باید حداقل ۱ باشد"),
});

export const updateTimetableSchema = z.object({
  classSubjectId: z
    .number()
    .int()
    .positive("نامعتبر است")
    .optional(),

  classId: z
    .number()
    .int()
    .positive("نامعتبر است")
    .optional(),

  dayOfWeek: z
    .number()
    .int()
    .min(0)
    .max(4, "روز هفته نامعتبر است")
    .optional(),

  period: z
    .number()
    .int()
    .min(1, "پایه باید حداقل ۱ باشد")
    .optional(),
});

export type CreateTimetableInput = z.infer<typeof createTimetableSchema>;
export type UpdateTimetableInput = z.infer<typeof updateTimetableSchema>;
