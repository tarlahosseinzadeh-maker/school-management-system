import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";


const globalForPrisma =
  globalThis as unknown as {
    prisma: PrismaClient | undefined;
  };


// Prefer DATABASE_URL when available (format: mysql://user:pass@host:port/db)
let adapterConfig = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "SchoolManagementSystem",
};

if (process.env.DATABASE_URL) {
  try {
    const url = new URL(process.env.DATABASE_URL);
    adapterConfig = {
      host: url.hostname || adapterConfig.host,
      port: Number(url.port) || adapterConfig.port,
      user: url.username || adapterConfig.user,
      password: url.password || adapterConfig.password,
      database: url.pathname ? url.pathname.replace(/^\//, "") : adapterConfig.database,
    };
  } catch (err) {
    // ignore and fall back to defaults
    console.warn("Failed to parse DATABASE_URL, using defaults", err);
  }
}

console.log("Prisma adapter config:", adapterConfig);
const adapter = new PrismaMariaDb(adapterConfig as any);


export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });



if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}