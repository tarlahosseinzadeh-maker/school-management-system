import { z } from "zod";


export const createAnnouncementSchema =
  z.object({

    title:
      z.string()
      .min(3)
      .max(200),


    content:
      z.string()
      .min(5),


    coverImage:
      z.string()
      .optional(),


    images:
      z.array(
        z.string()
      )
      .optional(),


    isPublished:
      z.boolean()
      .optional(),

  });