import AppDetailPage from "@/pages/app-detail";
import DashboardPage from "@/pages/dashboard";
import { Route, Routes } from "react-router";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/app/:id" element={<AppDetailPage />} />
    </Routes>
  );
}
