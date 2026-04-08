import { NavLink } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export default function NavBar() {
  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    textDecoration: "none",
    fontWeight: 700,
    color: isActive ? "#000" : "#444",
    borderBottom: isActive ? "2px solid #000" : "2px solid transparent",
    paddingBottom: "4px",
  });

  return (
    <nav
      style={{
        display: "flex",
        gap: "16px",
        marginTop: "8px",
        alignItems: "center",
      }}
    >
      <NavLink to="/employees" style={linkStyle}>
        Employees
      </NavLink>
      <NavLink to="/organization" style={linkStyle}>
        Organization
      </NavLink>

      {/* push auth buttons to the right */}
      <div style={{ marginLeft: "auto" }}>
        <SignedOut>
          <SignInButton mode="modal">
            <button>Log In</button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}