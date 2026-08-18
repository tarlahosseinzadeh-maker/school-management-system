import Image from "next/image";
import Link from "next/link";

interface Props {
  announcement: {
    announcementId: number;
    title: string;
    content: string;
    coverImage?: string;
    createdAt: string;
  };
}

export default function AnnouncementCard({ announcement }: Props) {
  return (
    <Link
      href={`/announcements/${announcement.announcementId}`}
      className="content-card group block overflow-hidden transition-shadow hover:shadow-md"
    >
      {announcement.coverImage && (
        <Image
          src={announcement.coverImage}
          alt={announcement.title}
          width={500}
          height={300}
          className="h-44 w-full object-cover"
        />
      )}

      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary">
          {announcement.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {announcement.content}
        </p>

        <p className="mt-4 text-xs text-muted-foreground">
          {new Date(announcement.createdAt).toLocaleDateString("fa-IR")}
        </p>
      </div>
    </Link>
  );
}
