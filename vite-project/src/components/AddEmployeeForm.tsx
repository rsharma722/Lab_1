import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
} from "@clerk/clerk-react";
import { useFormInput } from "../hooks/useFormInput";
import { employeeService } from "../services/employeeService";

type RoleOption = {
  id: number;
  name: string;
  description?: string;
};

export default function AddEmployeeForm(props: { onEmployeeAdded?: () => void }) {
  const { onEmployeeAdded } = props;
  const { getToken, isSignedIn } = useAuth();

  const firstName = useFormInput("");
  const lastName = useFormInput("");

  const [departmentName, setDepartmentName] = useState("");
  const [departmentMessages, setDepartmentMessages] = useState<string[]>([]);
  const [roles, setRoles] = useState<RoleOption[]>([]);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    async function loadRoles() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/roles`);

        if (!response.ok) {
          throw new Error("Failed to fetch roles");
        }

        const data: RoleOption[] = await response.json();
        setRoles(data);

        if (data.length > 0) {
          setDepartmentName(data[0].name);
        }
      } catch (error) {
        console.error("Error loading roles:", error);
      }
    }

    loadRoles();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSuccessMsg("");

    firstName.clearMessages();
    lastName.clearMessages();
    setDepartmentMessages([]);

    if (!isSignedIn) return;

    try {
      const token = await getToken();

      const result = await employeeService.createEmployee(
        {
          departmentName,
          firstName: firstName.value,
          lastName: lastName.value.trim() || undefined,
        },
        token || "",
      );

      if (!result.ok) {
        if (result.fieldErrors.firstName) {
          firstName.setMessages(result.fieldErrors.firstName);
        }

        if (result.fieldErrors.lastName) {
          lastName.setMessages(result.fieldErrors.lastName);
        }

        if (result.fieldErrors.departmentName) {
          setDepartmentMessages(result.fieldErrors.departmentName);
        }

        return;
      }

      setSuccessMsg("Employee added!");
      onEmployeeAdded?.();
      firstName.setValue("");
      lastName.setValue("");
      setDepartmentName(roles[0]?.name ?? "");
    } catch (error) {
      console.error("Error creating employee:", error);
      firstName.setMessages(["Failed to add employee. Check backend/server."]);
    }
  }

  return (
    <>
      <SignedIn>
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
              <select
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
              >
                {roles.length === 0 ? (
                  <option value="">Loading...</option>
                ) : (
                  roles.map((role) => (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  ))
                )}
              </select>

              {departmentMessages.map((msg) => (
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
      </SignedIn>

      <SignedOut>
        <div
          style={{
            marginTop: "24px",
            padding: "12px",
            border: "2px solid #333",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Add Employee</h2>
          <p>Please log in to create a new employee.</p>
          <SignInButton mode="modal">
            <button>Log In</button>
          </SignInButton>
        </div>
      </SignedOut>
    </>
  );
}