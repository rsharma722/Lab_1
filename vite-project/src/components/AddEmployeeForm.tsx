import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import type { Department } from "../types";

export default function AddEmployeeForm(props: {
  departments: Department[];
  onAddEmployee: (departmentName: string, firstName: string, lastName?: string) => void;
}) {
  const { departments, onAddEmployee } = props;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [departmentName, setDepartmentName] = useState(departments[0]?.name ?? "");
  const [errors, setErrors] = useState<string[]>([]);

  const deptNameSet = useMemo(
    () => new Set(departments.map((d) => d.name)),
    [departments]
  );

  function validate(): string[] {
    const next: string[] = [];

    if (firstName.trim().length < 3) {
      next.push("First Name must be at least 3 characters.");
    }

    if (!deptNameSet.has(departmentName)) {
      next.push("Please select a valid Department.");
    }

    return next;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setErrors([]);

    const nextErrors = validate();
    if (nextErrors.length > 0) {
      setErrors(nextErrors);
      return; 
    }

    onAddEmployee(
      departmentName,
      firstName.trim(),
      lastName.trim() || undefined
    );

    setFirstName("");
    setLastName("");
    setDepartmentName(departments[0]?.name ?? "");
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginTop: "24px", padding: "12px", border: "2px solid #333" }}
    >
      <h2 style={{ marginTop: 0 }}>Add Employee</h2>

      {errors.length > 0 && (
        <div style={{ border: "1px solid crimson", padding: 10, marginBottom: 12 }}>
          <ul style={{ margin: 0 }}>
            {errors.map((msg) => (
              <li key={msg}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
        <label style={{ display: "grid", gap: 6 }}>
          First Name
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          Last Name
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          Department
          <select
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
          >
            {departments.map((d) => (
              <option key={d.name} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </label>

        <div style={{ alignSelf: "end" }}>
          <button type="submit">Add</button>
        </div>
      </div>
    </form>
  );
}
