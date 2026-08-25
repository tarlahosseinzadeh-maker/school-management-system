import { z } from "zod";


// Create Subject Validation
export const createSubjectSchema =
  z.object({

    subjectName: z
      .string()
      .min(
        2,
        "نام درس باید حداقل ۲ کاراکتر باشد"
      )
      .max(
        100,
        "نام درس خیلی طولانی است"
      ),


    gradeLevel: z
      .string()
      .max(
        30,
        "پایه تحصیلی نامعتبر است"
      ),



    description: z
      .string()
      .optional()
      .nullable(),

  });





// Update Subject Validation
export const updateSubjectSchema =
  z.object({

    subjectName: z
      .string()
      .min(
        2,
        "نام درس باید حداقل ۲ کاراکتر باشد"
      )
      .max(
        100,
        "نام درس خیلی طولانی است"
      )
      .optional(),


    gradeLevel: z
      .string()
      .max(
        30,
        "پایه تحصیلی نامعتبر است"
      )
      .optional(),



    description: z
      .string()
      .optional()
      .nullable(),

  });





export type CreateSubjectInput =
  z.infer<typeof createSubjectSchema>;



export type UpdateSubjectInput =
  z.infer<typeof updateSubjectSchema>;
