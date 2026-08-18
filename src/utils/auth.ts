import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { prisma } from "@/src/database/prisma";


export class AuthError extends Error {

  status: 401 | 403;


  constructor(
    message: "UNAUTHORIZED" | "FORBIDDEN"
  ) {

    super(message);

    this.name = "AuthError";

    this.status =
      message === "UNAUTHORIZED"
        ? 401
        : 403;

  }

}




export async function requireAuth() {


  const session =
    await getServerSession(authOptions);



  console.log(
    "SERVER SESSION:",
    JSON.stringify(session, null, 2)
  );



  if (!session) {

    throw new AuthError(
      "UNAUTHORIZED"
    );

  }



  return session;

}





export async function requireRole(
  allowedRoles:
    (
      | "STUDENT"
      | "TEACHER"
      | "PRINCIPAL"
    )[]
) {


  const session =
    await requireAuth();



  const role =
    session.user?.role;



  console.log(
    "CURRENT ROLE:",
    role
  );



  if (!role) {

    throw new AuthError(
      "FORBIDDEN"
    );

  }



  if (
    !allowedRoles.includes(role)
  ) {

    throw new AuthError(
      "FORBIDDEN"
    );

  }



  return session;

}


export async function requireTeacher() {
  const session = await requireRole(["TEACHER"]);

  const userId = session.user?.userId;

  if (!userId) {
    throw new AuthError("UNAUTHORIZED");
  }

  const teacher = await prisma.teachers.findUnique({
    where: { userId },
  });

  if (!teacher) {
    throw new AuthError("FORBIDDEN");
  }

  return {
    session,
    teacherId: teacher.userId,
  };
}