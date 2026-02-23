import { useEffect, useState } from "react";
import AddEmployeeForm from "../components/AddEmployeeForm";
import { employeeRepo } from "../repos/employeeRepo";
import type { Department } from "../types";

export default function Employees() {
  const [departments, setDepartments] = useState<Department[]>([]);

  function refreshDepartments() {
    setDepartments(employeeRepo.getDepartments());
  }

  useEffect(() => {
    refreshDepartments();
  }, []);

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

      <AddEmployeeForm onEmployeeAdded={refreshDepartments} />
    </main>
  );
}