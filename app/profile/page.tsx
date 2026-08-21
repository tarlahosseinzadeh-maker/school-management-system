import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";
import LogoutButton from "@/components/LogoutButton";

export default async function ProfilePage() {

  const session = await getServerSession(authOptions);

  console.log("PROFILE SESSION:", session);

  return (
    <main>
      <h1>اطلاعات کاربر</h1>

      <p>نام: {session?.user?.name}</p>
      <p>نام کاربری: {session?.user?.username}</p>
      <p>نقش: {session?.user?.role}</p>
      <p>شناسه کاربر: {session?.user?.userId}</p>

      <LogoutButton />
    </main>
  );
}