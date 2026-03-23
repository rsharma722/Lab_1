import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.employee.deleteMany();
  await prisma.role.deleteMany();

  const financialAdvisor = await prisma.role.create({
    data: {
      name: "Financial Advisor",
      description: "Provides financial planning and investment advice",
    },
  });

  const branchManager = await prisma.role.create({
    data: {
      name: "Branch Manager",
      description: "Supervises branch operations and employees",
    },
  });

  const analyst = await prisma.role.create({
    data: {
      name: "Financial Analyst",
      description: "Analyzes financial data and prepares reports",
    },
  });

  await prisma.employee.createMany({
    data: [
      {
        firstName: "Sarah",
        lastName: "Chen",
        email: "sarah.chen@pixellriver.com",
        phone: "204-555-1001",
        salary: 72000,
        hireDate: new Date("2023-01-15"),
        isActive: true,
        roleId: financialAdvisor.id,
      },
      {
        firstName: "David",
        lastName: "Singh",
        email: "david.singh@pixellriver.com",
        phone: "204-555-1002",
        salary: 91000,
        hireDate: new Date("2022-06-10"),
        isActive: true,
        roleId: branchManager.id,
      },
      {
        firstName: "Emily",
        lastName: "Martinez",
        email: "emily.martinez@pixellriver.com",
        phone: "204-555-1003",
        salary: 68000,
        hireDate: new Date("2024-03-01"),
        isActive: true,
        roleId: analyst.id,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });