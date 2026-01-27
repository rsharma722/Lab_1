import { useState } from "react";
import { departments as initialDepartments } from "./data/departments";
import AddEmployeeForm from "./components/AddEmployeeForm";
import type { Department } from "./types";

export default function App() {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);

  function handleAddEmployee(departmentName: string, firstName: string, lastName?: string) {
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
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header style={{ marginBottom: "24px" }}>
        <h1>Pixell River Employee Directory</h1>
        <p>Welcome! Below is the list of employees by department.</p>
      </header>

      <main>
        {departments.map((department) => (
          <section key={department.name} style={{ marginBottom: "20px" }}>
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

        <AddEmployeeForm departments={departments} onAddEmployee={handleAddEmployee} />
      </main>

      <footer
        style={{
          marginTop: "32px",
          paddingTop: "12px",
          borderTop: "1px solid #ccc",
        }}
      >
        <small>Copyright Pixell River Financial {new Date().getFullYear()}.</small>
      </footer>
    </div>
  );
}
