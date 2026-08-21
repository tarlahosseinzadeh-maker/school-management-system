import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

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
      className="content-card group block overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
    >
      {announcement.coverImage && (
        <div className="overflow-hidden">
          <Image
            src={announcement.coverImage}
            alt={announcement.title}
            width={500}
            height={300}
            className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
          {announcement.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {announcement.content}
        </p>

        <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5" />
          {new Date(announcement.createdAt).toLocaleDateString("fa-IR")}
        </p>
      </div>
    </Link>
  );
}
