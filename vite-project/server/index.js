import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import pkg from "@prisma/client";

dotenv.config({ path: "./server/.env" });

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.get("/employees", async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      include: { role: true },
      orderBy: { lastName: "asc" },
    });
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

app.post("/employees", requireAuth(), async (req, res) => {
  try {
    const { firstName, lastName, departmentName } = req.body;

    if (!firstName || !departmentName) {
      return res.status(400).json({ error: "First name and department are required" });
    }

    const role = await prisma.role.findFirst({
      where: { name: departmentName },
    });

    if (!role) {
      return res.status(400).json({ error: "Invalid department/role" });
    }

    const safeFirstName = firstName.trim();
    const safeLastName = lastName?.trim() || "";
    const generatedEmail = `${safeFirstName.toLowerCase()}.${safeLastName.toLowerCase() || "user"}@pixellriver.com`;

    const newEmployee = await prisma.employee.create({
      data: {
        firstName: safeFirstName,
        lastName: safeLastName,
        email: generatedEmail,
        roleId: role.id,
      },
      include: { role: true },
    });

    res.status(201).json(newEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create employee" });
  }
});

app.get("/roles", async (req, res) => {
  try {
    const roles = await prisma.role.findMany({
      orderBy: { name: "asc" },
    });
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch roles" });
  }
});

app.post("/roles", requireAuth(), async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Role name is required" });
    }

    const existingRole = await prisma.role.findUnique({
      where: { name: name.trim() },
    });

    if (existingRole) {
      return res.status(400).json({ error: "Role already exists" });
    }

    const newRole = await prisma.role.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
      },
    });

    res.status(201).json(newRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create role" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});