"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Database, Settings } from "lucide-react";
import { Link } from "react-router";

const navItems = [
  { name: "Collection", href: "/collection", icon: <Database className="w-5 h-5" /> },
  { name: "Settings", href: "/settings", icon: <Settings className="w-5 h-5" /> },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`h-screen border-r p-4 transition-all ${collapsed ? "w-16" : "w-60"}`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between">
        {!collapsed && <span className="font-semibold">Generator.js</span>}
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="mt-6 space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} to={item.href}>
            <Button
              variant="ghost"
              className={`w-full flex items-center gap-2 ${collapsed ? "justify-center" : "justify-start"}`}
            >
              {item.icon}
              {!collapsed && <span>{item.name}</span>}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
}
