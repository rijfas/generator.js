import { Outlet } from "react-router";
import { Sidebar } from "./sidebar";

export function RootLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
