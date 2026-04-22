import { employeeRepo } from "../repos/employeeRepo.js";
import { roleRepo } from "../repos/roleRepo.js";

type CreateEmployeeInput = {
  firstName: string;
  lastName?: string;
  departmentName: string;
};

export const employeeService = {
  async getAllEmployees() {
    return employeeRepo.getAll();
  },

  async createEmployee(input: CreateEmployeeInput) {
    const { firstName, lastName, departmentName } = input;

    if (!firstName || !departmentName) {
      throw new Error("First name and department are required");
    }

    const role = await roleRepo.findByName(departmentName);

    if (!role) {
      throw new Error("Invalid department/role");
    }

    const safeFirstName = firstName.trim();
    const safeLastName = lastName?.trim() || "";
    const generatedEmail = `${safeFirstName.toLowerCase()}.${safeLastName.toLowerCase() || "user"}@pixellriver.com`;

    return employeeRepo.create({
      firstName: safeFirstName,
      lastName: safeLastName,
      email: generatedEmail,
      roleId: role.id,
    });
  },
};