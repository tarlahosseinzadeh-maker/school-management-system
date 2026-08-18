import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/profile/:path*",
    "/role-test/:path*",
    "/student/:path*",
    "/teacher/:path*",
    "/principal/:path*",
  ],
};