import { RootLayout } from "@/components/layout/root-layout";
import AppsPage from "@/pages/apps";
import EndpointsPage from "@/pages/endpoints";
import SchemaListingPage from "@/pages/schemas";
import SettingsPage from "@/pages/settings";
import { Route, Routes } from "react-router";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<AppsPage />} />
      <Route path='/:id/' element={<RootLayout />}>
        <Route index={true} path='schemas' element={<SchemaListingPage />} />
        <Route path='settings' element={<SettingsPage />} />
        <Route path='endpoints' element={<EndpointsPage />} />
      </Route>
    </Routes>
  );
}
