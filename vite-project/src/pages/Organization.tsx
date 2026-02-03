import { organization } from "../data/organization";

export default function Organization() {
  return (
    <main>
      <h2>Organization</h2>

      <ul style={{ paddingLeft: 0, listStyle: "none" }}>
        {organization.map((p) => (
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
