import { departments as initialDepartments } from "../data/departments";
import type { Department } from "../types";

export type CreateEmployeeDTO = {
departmentName: string;
firstName: string;
lastName?: string;
};

let departments: Department[] = initialDepartments;

export const employeeRepo = {
getDepartments(): Department[] {
    return departments;
},

createEmployee(dto: CreateEmployeeDTO): Department[] {
    const next = departments.map((dept) => {
    if (dept.name !== dto.departmentName) return dept;

    return {
        ...dept,
        employees: [
        ...dept.employees,
        { firstName: dto.firstName.trim(), lastName: dto.lastName?.trim() || undefined },
        ],
    };
    });

    departments = next;
    return departments;
},
};