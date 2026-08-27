require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');

async function main() {
  const url = new URL(process.env.DATABASE_URL);
  const adapter = new PrismaMariaDb({
    host: url.hostname,
    port: Number(url.port),
    user: url.username,
    password: url.password,
    database: url.pathname.replace('/', ''),
    connectionLimit: 1,
  });

  const prisma = new PrismaClient({ adapter });

  try {
    await prisma.$connect();
    console.log('DB CONNECT OK');
    const result = await prisma.$queryRaw`SELECT 1 AS ok`;
    console.log('QUERY OK', result);
  } catch (e) {
    console.error('DB ERR', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
