import {
  createAnnouncement,
  findAnnouncements,
  findPublishedAnnouncements,
  deleteAnnouncement,
  findAnnouncementById,
} from "@/src/repositories/announcement.repository";


export async function getAnnouncementById(
  announcementId: number
) {

  return await findAnnouncementById(
    announcementId
  );

}

export async function createNewAnnouncement(
  data: {
    title: string;
    content: string;
    coverImage?: string;
    isPublished?: boolean;
    images?: string[];
  }
) {

  return await createAnnouncement(data);

}


export async function getAnnouncements() {

  return await findAnnouncements();

}



export async function getPublishedAnnouncements() {

  return await findPublishedAnnouncements();

}



export async function removeAnnouncement(
  id: number
) {

  return await deleteAnnouncement(id);

}