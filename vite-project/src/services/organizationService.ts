import { organizationRepo } from "../repos/organizationRepo";

export type CreatePersonInput = {
  firstName: string;
  lastName: string;
  role: string;
};

export type CreatePersonResult =
  | { ok: true }
  | {
      ok: false;
      fieldErrors: Partial<Record<keyof CreatePersonInput, string[]>>;
    };

export const organizationService = {
  createPerson(input: CreatePersonInput): CreatePersonResult {
    const fieldErrors: Partial<Record<keyof CreatePersonInput, string[]>> = {};

    if (input.firstName.trim().length < 3) {
      fieldErrors.firstName = ["First Name must be at least 3 characters."];
    }

    if (input.lastName.trim().length === 0) {
      fieldErrors.lastName = ["Last Name is required."];
    }

    if (input.role.trim().length === 0) {
      fieldErrors.role = ["Role is required."];
    } else if (organizationRepo.roleIsOccupied(input.role)) {
      fieldErrors.role = ["A person cannot be created for a Role if that Role is already existing and occupied."];
    }

    if (Object.keys(fieldErrors).length > 0) {
      return { ok: false, fieldErrors };
    }

    organizationRepo.createPerson(input);
    return { ok: true };
  },
};