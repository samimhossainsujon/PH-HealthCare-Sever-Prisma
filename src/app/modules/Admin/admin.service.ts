import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const getAllFromDB = async () => {
    const result = await prisma.admin.findMany();
    return result
}

export const AdminService = {
    getAllFromDB
}