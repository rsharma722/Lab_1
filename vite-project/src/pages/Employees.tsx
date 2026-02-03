import { useState } from "react";
import { departments as initialDepartments } from "../data/departments";
import AddEmployeeForm from "../components/AddEmployeeForm";
import type { Department } from "../types";

export default function Employees() {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);

  function handleAddEmployee(
    departmentName: string,
    firstName: string,
    lastName?: string
  ) {
    setDepartments((prev) =>
      prev.map((dept) => {
        if (dept.name !== departmentName) return dept;

        return {
          ...dept,
          employees: [...dept.employees, { firstName, lastName }],
        };
      })
    );
  }

  return (
    <main>
      {departments.map((department) => (
        <section key={department.name} style={{ marginBottom: 20 }}>
          <h2>{department.name}</h2>
          <ul>
            {department.employees.map((employee, index) => (
              <li key={index}>
                {employee.firstName} {employee.lastName ?? ""}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <AddEmployeeForm
        departments={departments}
        onAddEmployee={handleAddEmployee}
      />
    </main>
  );
}
