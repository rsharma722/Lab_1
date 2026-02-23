import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { Department } from "../types";
import { useFormInput } from "../hooks/useFormInput";
import { employeeRepo } from "../repos/employeeRepo";
import { employeeService } from "../services/employeeService";

export default function AddEmployeeForm(props: { onEmployeeAdded?: () => void }) {
  const { onEmployeeAdded } = props;

  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const departmentName = useFormInput("");

  const [departments, setDepartments] = useState<Department[]>([]);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const deps = employeeRepo.getDepartments();
    setDepartments(deps);

    if (!departmentName.value) {
      departmentName.setValue(deps[0]?.name ?? "");
    }
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSuccessMsg("");

    firstName.clearMessages();
    lastName.clearMessages();
    departmentName.clearMessages();

    const result = employeeService.createEmployee({
      departmentName: departmentName.value,
      firstName: firstName.value,
      lastName: lastName.value.trim() || undefined,
    });

    if (!result.ok) {
      if (result.fieldErrors.firstName) firstName.setMessages(result.fieldErrors.firstName);
      if (result.fieldErrors.lastName) lastName.setMessages(result.fieldErrors.lastName);
      if (result.fieldErrors.departmentName) departmentName.setMessages(result.fieldErrors.departmentName);
      return;
    }

    setSuccessMsg("Employee added!");
    onEmployeeAdded?.(); 
    firstName.setValue("");
    lastName.setValue("");
    departmentName.setValue(departments[0]?.name ?? "");
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginTop: "24px", padding: "12px", border: "2px solid #333" }}
    >
      <h2 style={{ marginTop: 0 }}>Add Employee</h2>

      {successMsg && (
        <div style={{ border: "1px solid green", padding: 10, marginBottom: 12 }}>
          {successMsg}
        </div>
      )}

      <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
        <label style={{ display: "grid", gap: 6 }}>
          First Name
          <input value={firstName.value} onChange={firstName.onChange} />
          {firstName.messages.map((msg) => (
            <small key={msg} style={{ color: "crimson" }}>
              {msg}
            </small>
          ))}
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          Last Name
          <input value={lastName.value} onChange={lastName.onChange} />
          {lastName.messages.map((msg) => (
            <small key={msg} style={{ color: "crimson" }}>
              {msg}
            </small>
          ))}
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          Department
          <select value={departmentName.value} onChange={departmentName.onChange}>
            {departments.map((d) => (
              <option key={d.name} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
          {departmentName.messages.map((msg) => (
            <small key={msg} style={{ color: "crimson" }}>
              {msg}
            </small>
          ))}
        </label>

        <div style={{ alignSelf: "end" }}>
          <button type="submit">Add</button>
        </div>
      </div>
    </form>
  );
}