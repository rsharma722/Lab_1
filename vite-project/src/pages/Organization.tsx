import { useEffect, useState, type JSX } from "react";
import AddOrganizationForm from "../components/AddOrganizationForm";
import { organizationRepo } from "../repos/organizationRepo";
import type { Person } from "../types";

export default function Organization(): JSX.Element {
  const [people, setPeople] = useState<Person[]>([]);

  function refresh() {
    setPeople(organizationRepo.getPeople());
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <main>
      <h2>Organization</h2>

      <AddOrganizationForm onPersonAdded={refresh} />

      <ul style={{ paddingLeft: 0, listStyle: "none", marginTop: 24 }}>
        {people.map((p) => (
          <li
            key={`${p.firstName}-${p.lastName}-${p.role}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              padding: "8px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <span>
              {p.firstName} {p.lastName}
            </span>
            <strong>{p.role}</strong>
          </li>
        ))}
      </ul>
    </main>
  );
}