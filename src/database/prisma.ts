import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";


const globalForPrisma =
  globalThis as unknown as {
    prisma: PrismaClient | undefined;
  };


function getDatabaseConfig() {

  const url = new URL(
    process.env.DATABASE_URL!
  );


  return {
    host: url.hostname,
    port: Number(url.port),
    user: url.username,
    password: url.password,
    database: url.pathname.replace("/", ""),
  };

}


const adapter =
  new PrismaMariaDb(
    getDatabaseConfig()
  );


export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });


if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}