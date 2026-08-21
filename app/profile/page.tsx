import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";
import LogoutButton from "@/components/LogoutButton";

export default async function ProfilePage() {

  const session = await getServerSession(authOptions);

  console.log("PROFILE SESSION:", session);

  return (
    <main>
      <div className="content-card p-6 md:p-8">
        <div className="page-header mb-6">
          <h1 className="page-title">اطلاعات کاربر</h1>
          <p className="page-description mt-1">مشخصات حساب کاربری شما</p>
        </div>

        <div className="space-y-3">
          <p className="rounded-lg bg-muted/60 px-4 py-3 text-sm">
            نام: {session?.user?.name}
          </p>
          <p className="rounded-lg bg-muted/60 px-4 py-3 text-sm">
            نام کاربری: {session?.user?.username}
          </p>
          <p className="rounded-lg bg-muted/60 px-4 py-3 text-sm">
            نقش: {session?.user?.role}
          </p>
          <p className="rounded-lg bg-muted/60 px-4 py-3 text-sm">
            شناسه کاربر: {session?.user?.userId}
          </p>
        </div>

        <div className="mt-6 border-t border-border pt-5">
          <LogoutButton className="w-auto rounded-lg border border-destructive/30 px-5" />
        </div>
      </div>
    </main>
  );
}