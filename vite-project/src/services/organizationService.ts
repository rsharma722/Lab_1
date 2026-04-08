import { organizationRepo } from "../repos/organizationRepo";

export type CreateRoleInput = {
  name: string;
  description?: string;
};

export type CreateRoleResult =
  | { ok: true }
  | {
      ok: false;
      fieldErrors: Partial<Record<keyof CreateRoleInput, string[]>>;
    };

export const organizationService = {
  async createRole(
    input: CreateRoleInput,
    token: string,
  ): Promise<CreateRoleResult> {
    const fieldErrors: Partial<Record<keyof CreateRoleInput, string[]>> = {};

    if (!input.name.trim()) {
      fieldErrors.name = ["Role name is required."];
    }

    if (Object.keys(fieldErrors).length > 0) {
      return { ok: false, fieldErrors };
    }

    await organizationRepo.createRole(input, token);
    return { ok: true };
  },
};