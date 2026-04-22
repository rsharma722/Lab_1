import express from "express";
import { requireAuth } from "@clerk/express";
import { roleService } from "../services/roleService.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const roles = await roleService.getAllRoles();
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch roles" });
  }
});

router.post("/", requireAuth(), async (req, res) => {
  try {
    const newRole = await roleService.createRole(req.body);
    res.status(201).json(newRole);
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      if (
        error.message === "Role name is required" ||
        error.message === "Role already exists"
      ) {
        return res.status(400).json({ error: error.message });
      }
    }

    res.status(500).json({ error: "Failed to create role" });
  }
});

export default router;