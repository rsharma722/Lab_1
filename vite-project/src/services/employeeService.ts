import { employeeRepo } from "../repos/employeeRepo";

export type CreateEmployeeInput = {
  departmentName: string;
  firstName: string;
  lastName?: string;
};

export type CreateEmployeeResult =
  | { ok: true }
  | {
      ok: false;
      fieldErrors: Partial<Record<keyof CreateEmployeeInput, string[]>>;
    };

export const employeeService = {
  async createEmployee(
    input: CreateEmployeeInput,
    token: string,
  ): Promise<CreateEmployeeResult> {
    const fieldErrors: Partial<Record<keyof CreateEmployeeInput, string[]>> = {};

    if (!input.departmentName.trim()) {
      fieldErrors.departmentName = ["Please select a valid Department."];
    }

    if (input.firstName.trim().length < 3) {
      fieldErrors.firstName = ["First Name must be at least 3 characters."];
    }

    if (Object.keys(fieldErrors).length > 0) {
      return { ok: false, fieldErrors };
    }

    await employeeRepo.createEmployee(input, token);
    return { ok: true };
  },
};