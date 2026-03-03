import { useState } from "react";
import type { FormEvent, JSX } from "react";
import { useFormInput } from "../hooks/useFormInput";
import { organizationService } from "../services/organizationService";

export default function AddOrganizationForm(props: {
  onPersonAdded?: () => void;
}): JSX.Element {
  const { onPersonAdded } = props;

  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const role = useFormInput("");

  const [successMsg, setSuccessMsg] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSuccessMsg("");

    firstName.clearMessages();
    lastName.clearMessages();
    role.clearMessages();

    const result = organizationService.createPerson({
      firstName: firstName.value,
      lastName: lastName.value,
      role: role.value,
    });

    if (!result.ok) {
      if (result.fieldErrors.firstName) firstName.setMessages(result.fieldErrors.firstName);
      if (result.fieldErrors.lastName) lastName.setMessages(result.fieldErrors.lastName);
      if (result.fieldErrors.role) role.setMessages(result.fieldErrors.role);
      return;
    }

    setSuccessMsg("Organization entry added!");
    onPersonAdded?.();

    firstName.setValue("");
    lastName.setValue("");
    role.setValue("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginTop: "24px", padding: "12px", border: "2px solid #333" }}
    >
      <h2 style={{ marginTop: 0 }}>Add Organization Entry</h2>

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
          Role
          <input value={role.value} onChange={role.onChange} />
          {role.messages.map((msg) => (
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