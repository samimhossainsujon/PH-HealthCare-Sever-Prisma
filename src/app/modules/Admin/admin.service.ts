import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const getAllFromDB = async (params: any) => {
  const { searchTerm, ...filterData } = params;
  const andCondions: Prisma.AdminWhereInput[] = [];
  const adminSearchAbleFields = ["name", "email"];

  console.log(filterData);
  if (params.searchTerm) {
    andCondions.push({
      OR: adminSearchAbleFields.map((filed) => ({
        [filed]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length>0) {
    andCondions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
            equals :filterData[key]
          }
        }))
      })
  }

  console.dir(andCondions, { depth: "infinity" });

  const WhereConditions: Prisma.AdminWhereInput = { AND: andCondions };
  const result = await prisma.admin.findMany({
    where: WhereConditions,
  });
  return result;
};

export const AdminService = {
  getAllFromDB,
};
