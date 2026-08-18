import { requireRole } from "@/src/utils/auth";
import UsersClient from "./UsersClient";


export default async function UsersPage() {

  await requireRole(["PRINCIPAL"]);


  return (
    <UsersClient />
  );
}