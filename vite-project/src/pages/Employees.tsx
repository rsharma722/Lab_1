import { useQuery } from "@tanstack/react-query";
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

async function fetchEmployees(): Promise<Employee[]> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/employees`);

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  return response.json();
}

export default function Employees() {
  const {
    data: employees = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  if (isLoading) return <p>Loading employees...</p>;
  if (isError) return <p>Failed to load employees.</p>;

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

      <AddEmployeeForm onEmployeeAdded={refetch} />
    </main>
  );
}