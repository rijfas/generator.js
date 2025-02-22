import AppDetailPage from "@/pages/app-detail";
import DashboardPage from "@/pages/dashboard";
import { Route, Routes } from "react-router";
import { RootLayout } from "@/components/layout/root-layout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/app/:id" element={<RootLayout />}>
        <Route path="collection" element={<AppDetailPage />} />
      </Route>
    </Routes>
  );
}
