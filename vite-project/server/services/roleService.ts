import { roleRepo } from "../repos/roleRepo.js";

type CreateRoleInput = {
  name: string;
  description?: string;
};

export const roleService = {
  async getAllRoles() {
    return roleRepo.getAll();
  },

  async createRole(input: CreateRoleInput) {
    const trimmedName = input.name?.trim();

    if (!trimmedName) {
      throw new Error("Role name is required");
    }

    const existingRole = await roleRepo.existsByName(trimmedName);

    if (existingRole) {
      throw new Error("Role already exists");
    }

    return roleRepo.create({
      name: trimmedName,
      description: input.description?.trim() || null,
    });
  },
};