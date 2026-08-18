const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

(async () => {
  const prisma = new PrismaClient();
  try {
    const newHash = '$2b$12$RpcP2yGp4lv9df4mxBoPtuKA7Svd.MNjHA2GLjZrmzKvNuWt.cEGS';

    await prisma.users.updateMany({
      where: { nationalCode: '1111111111' },
      data: { password: newHash },
    });

    const user = await prisma.users.findUnique({
      where: { nationalCode: '1111111111' },
      select: { userId: true, nationalCode: true, password: true },
    });

    console.log('UPDATED USER:', user);
  } catch (err) {
    console.error('ERROR updating password:', err);
  } finally {
    await prisma.$disconnect();
  }
})();
