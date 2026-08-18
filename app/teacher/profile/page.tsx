import Link from "next/link";
import { requireTeacher } from "@/src/utils/auth";

export default async function TeacherProfilePage() {
  const { session } = await requireTeacher();

  return (
    <main dir="rtl" className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold">پروفایل</h1>
        <p className="mt-2 text-gray-600">اطلاعات پروفایل شما</p>
      </section>

      <div className="max-w-2xl rounded-lg border p-8">
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-500">نام</p>
            <p className="text-xl font-semibold">{session.user.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">نام کاربری</p>
            <p className="text-xl font-semibold">{session.user.username}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">نقش</p>
            <p className="text-xl font-semibold">معلم</p>
          </div>

          <div className="border-t pt-4">
            <Link
              href="/profile"
              className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
            >
              ویرایش پروفایل
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
