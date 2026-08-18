import { z } from "zod";



// Create ClassSubject Validation
export const createClassSubjectSchema =
  z.object({

    classId: z
      .number()
      .int()
      .positive(
        "کلاس نامعتبر است"
      ),


    subjectId: z
      .number()
      .int()
      .positive(
        "درس نامعتبر است"
      ),

    teacherId: z
      .number()
      .int()
      .positive(
        "معلم نامعتبر است"
      ),

  });





// Update ClassSubject Validation
export const updateClassSubjectSchema =
  z.object({

    classId: z
      .number()
      .int()
      .positive(
        "کلاس نامعتبر است"
      )
      .optional(),


    subjectId: z
      .number()
      .int()
      .positive(
        "درس نامعتبر است"
      )
      .optional(),

    teacherId: z
      .number()
      .int()
      .positive(
        "معلم نامعتبر است"
      )
      .optional(),

  });







export type CreateClassSubjectInput =
  z.infer<
    typeof createClassSubjectSchema
  >;



export type UpdateClassSubjectInput =
  z.infer<
    typeof updateClassSubjectSchema
  >;