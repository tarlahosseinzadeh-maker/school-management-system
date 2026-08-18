import { prisma } from "./prisma";

async function main() {
  const user = await prisma.users.findFirst();

  console.log(user);
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });