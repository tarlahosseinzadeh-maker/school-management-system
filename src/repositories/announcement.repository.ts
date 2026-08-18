import { prisma } from "@/src/database/prisma";


export async function createAnnouncement(data: {
  title: string;
  content: string;
  coverImage?: string;
  isPublished?: boolean;
  images?: string[];
}) {

  return await prisma.announcements.create({

    data: {

      title: data.title,

      content: data.content,

      coverImage: data.coverImage ?? "",

      isPublished:
        data.isPublished ?? true,


      images: {

        create:
          data.images?.map((url) => ({

            imageUrl: url,

          })) ?? [],

      },

    },

    include: {

      images: true,

    },

  });

}


export async function findAnnouncements() {

  return await prisma.announcements.findMany({

    include: {
      images: true,
    },

    orderBy: {
      createdAt: "desc",
    },

  });

}

export async function findPublishedAnnouncements() {

  return await prisma.announcements.findMany({

    where: {
      isPublished: true,
    },

    include: {
      images: true,
    },

    orderBy: {
      createdAt: "desc",
    },

  });

}



export async function deleteAnnouncement(
  announcementId: number
) {

  return await prisma.announcements.delete({

    where: {
      announcementId,
    },

  });

}
export async function findAnnouncementById(
  announcementId: number
) {

  return await prisma.announcements.findFirst({

    where: {

      announcementId,

      isPublished: true,

    },


    include: {

      images: true,

    },

  });

}