import { prisma } from "@/src/database/prisma";
import { hashPassword } from "@/src/utils/password";

import { findUserById } from "@/src/repositories/user.repository";

import type {
  CreateUserInput,
  UpdateUserInput,
} from "@/src/validation/user.validation";


// Create User
export async function createUser(
  data: CreateUserInput
) {
  const hashedPassword =
    await hashPassword(data.password);

  return await prisma.$transaction(async (tx) => {

    // Create base user
    const user = await tx.users.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        nationalCode: data.nationalCode,
        phoneNumber: data.phoneNumber ?? "",
        username: data.username,
        password: hashedPassword,
        isActive: true,
      },
    });


    // Create Student
if (data.role === "STUDENT") {

  await tx.students.create({

    data: {

      userId: user.userId,

      studentCode:
        data.studentCode,

      birthDate:
        data.birthDate
        ? new Date(data.birthDate)
        : new Date(),

      ...(data.classId
        ? {
            classId: data.classId
          }
        : {}),

    },

  });

}

    // Create Teacher
    if (data.role === "TEACHER") {
      await tx.teachers.create({
        data: {
          userId: user.userId,
          specialization:
            data.specialization ?? "",
        },
      });
    }


    // Create Principal
    if (data.role === "PRINCIPAL") {
      await tx.principals.create({
        data: {
          userId: user.userId,
        },
      });
    }


    // Password را هرگز برنمی‌گردانیم
    return {
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      role: data.role,
    };
  });
}


// Get single User
export async function getUserById(
  userId: number
) {
  const user =
    await findUserById(userId);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  return user;
}


// Update User
export async function updateUser(
  userId: number,
  data: UpdateUserInput
) {
  const updateData: {
    firstName?: string;
    lastName?: string;
    nationalCode?: string;
    phoneNumber?: string;
    username?: string;
    password?: string;
  } = {};


  if (data.firstName !== undefined) {
    updateData.firstName = data.firstName;
  }

  if (data.lastName !== undefined) {
    updateData.lastName = data.lastName;
  }

  if (data.nationalCode !== undefined) {
    updateData.nationalCode =
      data.nationalCode;
  }

  if (data.phoneNumber !== undefined) {
    updateData.phoneNumber =
      data.phoneNumber;
  }

  if (data.username !== undefined) {
    updateData.username =
      data.username;
  }


  // فقط اگر Password جدید ارسال شده باشد
  if (data.password !== undefined) {
    updateData.password =
      await hashPassword(data.password);
  }


  const updatedUser =
    await prisma.users.update({
      where: {
        userId,
      },

      data: updateData,

      select: {
        userId: true,
        firstName: true,
        lastName: true,
        nationalCode: true,
        phoneNumber: true,
        username: true,
        isActive: true,
      },
    });


  return updatedUser;
}


// Activate / Deactivate User
export async function updateUserStatus(
  userId: number,
  isActive: boolean
) {
  return await prisma.users.update({
    where: {
      userId,
    },

    data: {
      isActive,
    },

    select: {
      userId: true,
      isActive: true,
    },
  });
}