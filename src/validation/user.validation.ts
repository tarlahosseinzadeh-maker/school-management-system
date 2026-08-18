import { z } from "zod";


const studentFields = z.object({
  studentCode: z
    .string()
    .min(1, "Student code is required")
    .max(20),

  birthDate: z
    .string()
    .optional(),

  classId: z
    .number()
    .int()
    .positive()
    .nullable()
    .optional(),
});


const teacherFields = z.object({
  specialization: z
    .string()
    .max(100)
    .optional(),
});


const baseUserSchema = z.object({

  firstName: z
    .string()
    .min(1)
    .max(50),

  lastName: z
    .string()
    .min(1)
    .max(50),

  nationalCode: z
    .string()
    .length(10)
    .regex(/^\d+$/),

  phoneNumber: z
    .string()
    .max(20)
    .optional(),

  username: z
    .string()
    .min(3)
    .max(50),

  password: z
    .string()
    .min(8),

  role: z.enum([
    "STUDENT",
    "TEACHER",
    "PRINCIPAL",
  ]),

});


export const createUserSchema =
  z.discriminatedUnion("role", [

    baseUserSchema.extend({
      role: z.literal("STUDENT"),
      ...studentFields.shape,
    }),


    baseUserSchema.extend({
      role: z.literal("TEACHER"),
      ...teacherFields.shape,
    }),


    baseUserSchema.extend({
      role: z.literal("PRINCIPAL"),
    }),

  ]);



export const updateUserSchema =
  z.object({

    firstName: z.string().min(1).max(50).optional(),

    lastName: z.string().min(1).max(50).optional(),

    nationalCode: z
      .string()
      .length(10)
      .regex(/^\d+$/)
      .optional(),

    phoneNumber: z.string().max(20).optional(),

    username: z.string().min(3).max(50).optional(),

    password: z.string().min(8).optional(),

  });



export type CreateUserInput =
  z.infer<typeof createUserSchema>;


export type UpdateUserInput =
  z.infer<typeof updateUserSchema>;