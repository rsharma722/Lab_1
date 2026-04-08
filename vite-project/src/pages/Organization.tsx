import { useEffect, useState, type JSX } from "react";
import AddOrganizationForm from "../components/AddOrganizationForm";

type Role = {
  id: number;
  name: string;
  description?: string;
};

export default function Organization(): JSX.Element {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  function fetchRoles() {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/roles`)
      .then((res) => res.json())
      .then((data) => {
        setRoles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchRoles();
  }, []);

  if (loading) return <p>Loading organization...</p>;

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

      <AddOrganizationForm onRoleAdded={fetchRoles} />
    </main>
  );
}