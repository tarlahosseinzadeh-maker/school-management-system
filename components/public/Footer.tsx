import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer
      dir="rtl"
      className="border-t border-border bg-card px-6 py-10 text-center text-sm text-muted-foreground"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3">
        <span className="brand-mark size-8 rounded-lg">
          <GraduationCap className="size-4" />
        </span>
        <p>© مدرسه ما — تمامی حقوق محفوظ است</p>
      </div>
    </footer>
  );
}
