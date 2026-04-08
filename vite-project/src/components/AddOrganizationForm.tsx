import { useState } from "react";
import type { FormEvent, JSX } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
} from "@clerk/clerk-react";
import { useFormInput } from "../hooks/useFormInput";
import { organizationService } from "../services/organizationService";

export default function AddOrganizationForm(props: {
  onRoleAdded?: () => void;
}): JSX.Element {
  const { onRoleAdded } = props;
  const { getToken, isSignedIn } = useAuth();

  const name = useFormInput("");
  const description = useFormInput("");

  const [successMsg, setSuccessMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSuccessMsg("");

    name.clearMessages();
    description.clearMessages();

    if (!isSignedIn) {
      return;
    }

    try {
      const token = await getToken();

      const result = await organizationService.createRole(
        {
          name: name.value,
          description: description.value.trim() || undefined,
        },
        token || "",
      );

      if (!result.ok) {
        if (result.fieldErrors.name) name.setMessages(result.fieldErrors.name);
        if (result.fieldErrors.description) description.setMessages(result.fieldErrors.description);
        return;
      }

      setSuccessMsg("Role added!");
      onRoleAdded?.();
      name.setValue("");
      description.setValue("");
    } catch (error) {
      console.error("Error creating role:", error);
      name.setMessages(["Failed to add role. Check backend/server."]);
    }
  }

  return (
    <>
      <SignedIn>
        <form
          onSubmit={handleSubmit}
          style={{ marginTop: "24px", padding: "12px", border: "2px solid #333" }}
        >
          <h2 style={{ marginTop: 0 }}>Add Organization Role</h2>

          {successMsg && (
            <div style={{ border: "1px solid green", padding: 10, marginBottom: 12 }}>
              {successMsg}
            </div>
          )}

          <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
            <label style={{ display: "grid", gap: 6 }}>
              Role Name
              <input value={name.value} onChange={name.onChange} />
              {name.messages.map((msg) => (
                <small key={msg} style={{ color: "crimson" }}>
                  {msg}
                </small>
              ))}
            </label>

            <label style={{ display: "grid", gap: 6 }}>
              Description
              <input value={description.value} onChange={description.onChange} />
              {description.messages.map((msg) => (
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
          <h2 style={{ marginTop: 0 }}>Add Organization Role</h2>
          <p>Please log in to create a new role.</p>
          <SignInButton mode="modal">
            <button>Log In</button>
          </SignInButton>
        </div>
      </SignedOut>
    </>
  );
}