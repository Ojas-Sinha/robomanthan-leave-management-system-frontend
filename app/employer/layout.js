"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";

export default function EmployerLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="employee-layout">
      {/* ✅ MOBILE HEADER */}
      <header className="mobile-header">
        <button
          className="mobile-menu-btn"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        <div className="mobile-logo">
          <img src="/logo.png" alt="Logo" />
          <span>ROBOMANTHAN</span>
        </div>
      </header>

      {/* ✅ SIDEBAR */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ✅ CONTENT */}
      <main className="employee-content" id="content-scroll">
        {children}
      </main>
    </div>
  );
}
