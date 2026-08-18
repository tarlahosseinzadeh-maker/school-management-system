import { z } from "zod";



// ساخت کلاس
export const createClassSchema = z.object({

  className: z
    .string()
    .min(
      1,
      "نام کلاس الزامی است"
    )
    .max(
      100,
      "نام کلاس بیش از حد طولانی است"
    ),



  gradeLevel: z
    .string()
    .min(
      1,
      "پایه تحصیلی الزامی است"
    )
    .max(
      30,
      "پایه تحصیلی نامعتبر است"
    ),



  capacity: z
    .number()
    .int()
    .positive(
      "ظرفیت باید عدد مثبت باشد"
    ),



  academicYear: z
    .string()
    .min(
      1,
      "سال تحصیلی الزامی است"
    )
    .max(
      20,
      "سال تحصیلی نامعتبر است"
    ),

});





// ویرایش کلاس
export const updateClassSchema = z.object({

  className: z
    .string()
    .min(1)
    .max(100)
    .optional(),



  gradeLevel: z
    .string()
    .min(1)
    .max(30)
    .optional(),



  capacity: z
    .number()
    .int()
    .positive()
    .optional(),



  academicYear: z
    .string()
    .min(1)
    .max(20)
    .optional(),

});





export type CreateClassInput =
  z.infer<typeof createClassSchema>;



export type UpdateClassInput =
  z.infer<typeof updateClassSchema>;