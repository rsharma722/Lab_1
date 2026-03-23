import { useEffect, useState } from "react";
import AddEmployeeForm from "../components/AddEmployeeForm";

type Role = {
  id: number;
  name: string;
};

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: Role;
};

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  function fetchEmployees() {
    fetch("http://localhost:3001/employees")
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) return <p>Loading employees...</p>;

  return (
    <main>
      <h1>Employees</h1>

      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            {emp.firstName} {emp.lastName} - {emp.role?.name}
          </li>
        ))}
      </ul>

      <AddEmployeeForm onEmployeeAdded={fetchEmployees} />
    </main>
  );
}