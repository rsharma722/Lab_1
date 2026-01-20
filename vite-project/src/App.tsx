import { departments } from "./data/departments";

export default function App() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: "24px" }}>
        <h1>Pixell River Employee Directory</h1>
        <p>Welcome! Below is the list of employees by department.</p>
      </header>

      {/* Main Content */}
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
      </main>

      {/* Footer */}
      <footer
        style={{
          marginTop: "32px",
          paddingTop: "12px",
          borderTop: "1px solid #ccc",
        }}
      >
        <small>
          Copyright Pixell River Financial{" "}
          {new Date().getFullYear()}.
        </small>
      </footer>
    </div>
  );
}
