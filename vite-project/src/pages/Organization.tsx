import { useQuery } from "@tanstack/react-query";
import AddOrganizationForm from "../components/AddOrganizationForm";

type Role = {
  id: number;
  name: string;
  description?: string;
};

async function fetchRoles(): Promise<Role[]> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/roles`);

  if (!response.ok) {
    throw new Error("Failed to fetch roles");
  }

  return response.json();
}

export default function Organization() {
  const {
    data: roles = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["roles"],
    queryFn: fetchRoles,
  });

  if (isLoading) return <p>Loading organization...</p>;
  if (isError) return <p>Failed to load roles.</p>;

  return (
    <main>
      <h2>Organization</h2>

      <ul style={{ paddingLeft: 0, listStyle: "none", marginTop: 24 }}>
        {roles.map((role) => (
          <li
            key={role.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              padding: "8px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <span>{role.name}</span>
            <strong>{role.description}</strong>
          </li>
        ))}
      </ul>

      <AddOrganizationForm onRoleAdded={refetch} />
    </main>
  );
}