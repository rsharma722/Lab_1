import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type CreateEmployeeRepoInput = {
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
};

export const employeeRepo = {
  async getAll() {
    return prisma.employee.findMany({
      include: { role: true },
      orderBy: { lastName: "asc" },
    });
  },

  async create(data: CreateEmployeeRepoInput) {
    return prisma.employee.create({
      data,
      include: { role: true },
    });
  },
};