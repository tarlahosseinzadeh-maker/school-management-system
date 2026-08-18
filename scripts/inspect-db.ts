import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const url = new URL(process.env.DATABASE_URL!);
const adapterConfig = {
  host: url.hostname,
  port: Number(url.port) || 3306,
  user: url.username,
  password: url.password,
  database: url.pathname.replace(/^\//, ""),
};

const adapter = new PrismaMariaDb(adapterConfig as any);
const prisma = new PrismaClient({ adapter });

async function main() {
  const tables = await prisma.$queryRaw<
    { TABLE_NAME: string }[]
  >`SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'SchoolManagementSystem' ORDER BY TABLE_NAME`;

  console.log("=== TABLES ===");
  console.log(tables.map((t) => t.TABLE_NAME).join("\n"));

  for (const table of ["announcements", "announcementimages"]) {
    const cols = await prisma.$queryRaw<
      {
        COLUMN_NAME: string;
        COLUMN_TYPE: string;
        IS_NULLABLE: string;
        COLUMN_DEFAULT: string | null;
        EXTRA: string;
      }[]
    >`SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE, COLUMN_DEFAULT, EXTRA
      FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = 'SchoolManagementSystem' AND TABLE_NAME = ${table}
      ORDER BY ORDINAL_POSITION`;

    console.log(`\n=== ${table} COLUMNS ===`);
    console.table(cols);
  }

  const fks = await prisma.$queryRaw<
    {
      TABLE_NAME: string;
      CONSTRAINT_NAME: string;
      COLUMN_NAME: string;
      REFERENCED_TABLE_NAME: string;
    }[]
  >`SELECT TABLE_NAME, CONSTRAINT_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME
    FROM information_schema.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = 'SchoolManagementSystem'
      AND TABLE_NAME IN ('announcementimages', 'announcements')
      AND REFERENCED_TABLE_NAME IS NOT NULL`;

  console.log("\n=== FK CONSTRAINTS ===");
  console.table(fks);

  const indexes = await prisma.$queryRaw<
    {
      TABLE_NAME: string;
      INDEX_NAME: string;
      COLUMN_NAME: string;
      NON_UNIQUE: number;
    }[]
  >`SELECT TABLE_NAME, INDEX_NAME, COLUMN_NAME, NON_UNIQUE
    FROM information_schema.STATISTICS
    WHERE TABLE_SCHEMA = 'SchoolManagementSystem'
      AND TABLE_NAME IN ('announcementimages', 'announcements')
    ORDER BY TABLE_NAME, INDEX_NAME, SEQ_IN_INDEX`;

  console.log("\n=== INDEXES ===");
  console.table(indexes);

  console.log("\n=== TEST CREATE ===");
  try {
    const result = await prisma.announcements.create({
      data: {
        title: "Test Announcement",
        content: "Test content for debugging",
        coverImage: "",
        isPublished: true,
        images: {
          create: [{ imageUrl: "/uploads/test.jpg" }],
        },
      },
      include: { images: true },
    });
    console.log("CREATE SUCCESS:", result.announcementId);
    await prisma.announcements.delete({
      where: { announcementId: result.announcementId },
    });
    console.log("CLEANUP OK");
  } catch (err) {
    console.error("CREATE FAILED:", err);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
