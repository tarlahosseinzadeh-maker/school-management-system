import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userId: number;
      username: string;
      name: string;
      role: "STUDENT" | "TEACHER" | "PRINCIPAL";
    };
  }

  interface User {
    id: string;
    userId: number;
    username: string;
    role: "STUDENT" | "TEACHER" | "PRINCIPAL";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: number;
    username: string;
    role: "STUDENT" | "TEACHER" | "PRINCIPAL";
  }
}