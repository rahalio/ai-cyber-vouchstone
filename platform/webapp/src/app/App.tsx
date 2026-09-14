import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./AppShell";
import { LoginPage } from "../features/auth/LoginPage";

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<AppShell />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
