import { z } from "zod";


export const createPreRegistrationSchema = z.object({

  studentFirstName:
    z.string()
    .min(2, "نام دانش‌آموز الزامی است"),


  studentLastName:
    z.string()
    .min(2, "نام خانوادگی الزامی است"),


  fatherName:
    z.string()
    .optional(),


  phoneNumber:
    z.string()
    .min(10, "شماره تماس معتبر نیست"),


  requestedGrade:
    z.string()
    .min(1, "پایه الزامی است"),


  description:
    z.string()
    .optional(),

});



export type CreatePreRegistrationInput =
  z.infer<
    typeof createPreRegistrationSchema
  >;