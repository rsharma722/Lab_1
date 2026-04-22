import express from "express";
import { requireAuth } from "@clerk/express";
import { employeeService } from "../services/employeeService.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

router.post("/", requireAuth(), async (req, res) => {
  try {
    const newEmployee = await employeeService.createEmployee(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      if (
        error.message === "First name and department are required" ||
        error.message === "Invalid department/role"
      ) {
        return res.status(400).json({ error: error.message });
      }
    }

    res.status(500).json({ error: "Failed to create employee" });
  }
});

export default router;