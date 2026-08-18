const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "SchoolManagementSystem",
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const teachers = await prisma.teachers.findMany({
    include: {
      user: true,
      classSubjects: {
        include: {
          class: true,
          subject: true,
        },
      },
    },
  });

  console.log("=== Teachers in Database ===");
  console.log(JSON.stringify(teachers, null, 2));

  const allUsers = await prisma.users.findMany();
  console.log("\n=== All Users ===");
  console.log(
    JSON.stringify(
      allUsers.map((u) => ({
        userId: u.userId,
        firstName: u.firstName,
        lastName: u.lastName,
        nationalCode: u.nationalCode,
      })),
      null,
      2
    )
  );
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
