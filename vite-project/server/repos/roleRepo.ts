import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type CreateRoleRepoInput = {
  name: string;
  description: string | null;
};

export const roleRepo = {
  async getAll() {
    return prisma.role.findMany({
      orderBy: { name: "asc" },
    });
  },

  async findByName(name: string) {
    return prisma.role.findFirst({
      where: { name },
    });
  },

  async existsByName(name: string) {
    return prisma.role.findUnique({
      where: { name },
    });
  },

  async create(data: CreateRoleRepoInput) {
    return prisma.role.create({
      data,
    });
  },
};