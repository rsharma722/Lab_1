import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: 20,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header style={{ marginBottom: 24 }}>
        <h1>Pixell River Employee Directory</h1>
        <p>Welcome! Use the navigation to view Employees or Organization.</p>
        <NavBar />
      </header>

      <Outlet />

      <footer
        style={{
          marginTop: 32,
          paddingTop: 12,
          borderTop: "1px solid #ccc",
        }}
      >
        <small>
          Copyright Pixell River Financial {new Date().getFullYear()}.
        </small>
      </footer>
    </div>
  );
}
