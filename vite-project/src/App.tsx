import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Employees from "./pages/Employees";
import Organization from "./pages/Organization";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/employees" replace />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/organization" element={<Organization />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
