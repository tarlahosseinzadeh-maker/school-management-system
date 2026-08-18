import { z } from "zod";

export const gradeSchema = z.object({
  score: z.number().min(0).max(100),
  examType: z.string().min(1).max(50),
  classSubjectId: z.number().int().positive(),
  studentId: z.number().int().positive(),
});

export const gradeUpdateSchema = z.object({
  score: z.number().min(0).max(100).optional(),
  examType: z.string().min(1).max(50).optional(),
});

export const assignmentSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(1),
  deadline: z.string().datetime(),
  classSubjectId: z.number().int().positive(),
});

export const assignmentUpdateSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  description: z.string().min(1).optional(),
  deadline: z.string().datetime().optional(),
  status: z.enum(["ACTIVE", "CLOSED", "ARCHIVED"]).optional(),
});

export const fileUploadSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().optional(),
  classSubjectId: z.number().int().positive(),
  fileName: z.string().min(1),
  fileType: z.string().min(1).max(50),
  filePath: z.string().min(1),
});

export type GradeInput = z.infer<typeof gradeSchema>;
export type GradeUpdateInput = z.infer<typeof gradeUpdateSchema>;
export type AssignmentInput = z.infer<typeof assignmentSchema>;
export type AssignmentUpdateInput = z.infer<typeof assignmentUpdateSchema>;
export type FileUploadInput = z.infer<typeof fileUploadSchema>;
