import { NavLink } from "react-router-dom";

export default function NavBar() {
  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    textDecoration: "none",
    fontWeight: 700,
    color: isActive ? "#000" : "#444",
    borderBottom: isActive ? "2px solid #000" : "2px solid transparent",
    paddingBottom: "4px",
  });

  return (
    <nav style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
      <NavLink to="/employees" style={linkStyle}>
        Employees
      </NavLink>
      <NavLink to="/organization" style={linkStyle}>
        Organization
      </NavLink>
    </nav>
  );
}
