import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "./src/database/prisma";
import { verifyPassword } from "./src/utils/password";


export const authOptions: NextAuthOptions = {

  providers: [

    CredentialsProvider({

      name: "Credentials",


      credentials: {

        nationalCode: {
          label: "National Code",
          type: "text",
        },


        password: {
          label: "Password",
          type: "password",
        },

      },



      async authorize(credentials) {

        console.log("AUTHORIZE START", {
          nationalCode: credentials?.nationalCode,
        });


        if (
          !credentials?.nationalCode ||
          !credentials?.password
        ) {

          console.log("AUTHORIZE: missing credentials?", {
            hasNationalCode: !!credentials?.nationalCode,
            hasPassword: !!credentials?.password,
          });

          return null;

        }




        // پیدا کردن User با کد ملی
        console.log("AUTHORIZE: querying user by nationalCode", credentials.nationalCode);
        let user: any = null;
        try {
          user = await prisma.users.findUnique({
            where: {
              nationalCode: credentials.nationalCode,
            },
          });

          console.log("FOUND USER:", user);
        } catch (err) {
          console.log("AUTHORIZE: prisma.users.findUnique error:", err);
          return null;
        }



        if (!user) {

          return null;

        }




        // بررسی فعال بودن حساب
        if (!user.isActive) {

          return null;

        }




        // بررسی Password
        const passwordIsValid =
          await verifyPassword(
            credentials.password,
            user.password
            
          );

console.log(
  "PASSWORD CHECK:",
  passwordIsValid
);

        if (!passwordIsValid) {

          return null;

        }




        // تشخیص Role



        // Student
        let student: any = null;
        try {
          student = await prisma.students.findUnique({
            where: { userId: user.userId },
          });
        } catch (err) {
          console.log("AUTHORIZE: prisma.students.findUnique error:", err);
        }

        if (student) {

          return {

            id:
              user.userId.toString(),


            userId:
              user.userId,


            name:
              `${user.firstName} ${user.lastName}`,


            username:
              user.username,


            role:
              "STUDENT",

          };

        }





        // Teacher
        let teacher: any = null;
        try {
          teacher = await prisma.teachers.findUnique({
            where: { userId: user.userId },
          });
        } catch (err) {
          console.log("AUTHORIZE: prisma.teachers.findUnique error:", err);
        }

        if (teacher) {

          return {

            id:
              user.userId.toString(),


            userId:
              user.userId,


            name:
              `${user.firstName} ${user.lastName}`,


            username:
              user.username,


            role:
              "TEACHER",

          };

        }






        // Principal
        let principal: any = null;
        try {
          principal = await prisma.principals.findUnique({
            where: { userId: user.userId },
          });
        } catch (err) {
          console.log("AUTHORIZE: prisma.principals.findUnique error:", err);
        }

        if (principal) {

          console.log("AUTHORIZE: principal role found for userId", user.userId);

          return {

            id:
              user.userId.toString(),


            userId:
              user.userId,


            name:
              `${user.firstName} ${user.lastName}`,


            username:
              user.username,


            role:
              "PRINCIPAL",

          };

        }





        // User وجود دارد ولی Role ندارد
        return null;

      },

    }),

  ],




  session: {

    strategy: "jwt",

  },




  pages: {

    signIn:
      "/login",

  },




  callbacks: {



    async jwt({
      token,
      user,
    }) {

      console.log("JWT CALLBACK start", { token, user });



      // Login موفق
      if (user) {


        token.userId =
          user.userId;


        token.username =
          user.username;


        token.role =
          user.role;

      }





      // بررسی فعال بودن User
      if (token.userId) {


        const currentUser =
          await prisma.users.findUnique({

            where: {

              userId:
                token.userId,

            },


            select: {

              isActive:
                true,

            },

          });





        if (
          !currentUser ||
          !currentUser.isActive
        ) {

          token.isActive =
            false;

        }

        else {

          token.isActive =
            true;

        }

      }



      return token;

    },







async session({ session, token }) {

  console.log("SESSION CALLBACK start", { session, token });

  session.user = {
    ...session.user,

    userId: token.userId,
    username: token.username,
    role: token.role,
  };

  return session;

},

  },




  secret:
    process.env.NEXTAUTH_SECRET,

};

export default NextAuth(authOptions);