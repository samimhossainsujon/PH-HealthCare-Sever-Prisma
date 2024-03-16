import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

const createAdmin = async (data: any) => {
  const hashedPassword: string = await bcrypt.hash(data.password, 12);
  
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.admin.email,
      },
    });

    if (existingUser) {
      throw new Error("Email address is already in use.");
    }

    const userData = {
      email: data.admin.email,
      password: hashedPassword,
      role: UserRole.ADMIN,
    };

    const result = await prisma.$transaction(async (transactionClient) => {
      await transactionClient.user.create({
        data: userData,
      });

      const createdAdminData = await transactionClient.admin.create({
        data: data.admin,
      });

      return createdAdminData;
    });

    return result;
  } catch (error) {
    // Handle error appropriately, such as logging or throwing a custom error
    console.error("Error creating admin:", error);
    throw error;
  }
};

export const userService = {
  createAdmin,
};
