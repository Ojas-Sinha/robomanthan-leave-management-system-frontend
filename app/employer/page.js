"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/auth";
import AttendanceCalendar from "./components/AttendanceCalendar";
import StatCards from "./components/StatCards";
import PendingLeavesTable from "./components/PendingLeavesTable";
import EmployeeTable from "./components/EmployeeTable";
import ReportsSection from "./components/ReportsSection";

export default function EmployerPage() {
  const router = useRouter();

  const [dashboard, setDashboard] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingLeaves, setPendingLeaves] = useState([]);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  // ==========================
  // LOAD DASHBOARD DATA
  // ==========================
  async function loadDashboard() {
    try {
      const token = getToken();

      const res = await fetch(`${API_BASE}/dashboard/employer`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setDashboard(data);
    } catch (err) {
      console.error("Dashboard load failed:", err);
    }
  }

  // ==========================
  // LOAD EMPLOYEES
  // ==========================
  async function loadEmployees() {
    try {
      const token = getToken();

      const res = await fetch(`${API_BASE}/employees`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Employees load failed:", err);
    }
  }

  // ==========================
  // LOAD PENDING LEAVES
  // ==========================
  async function loadPendingLeaves() {
    try {
      const token = getToken();

      const res = await fetch(`${API_BASE}/leaves/pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setPendingLeaves(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Pending leaves load failed:", err);
    }
  }

  // ==========================
  // INITIAL LOAD
  // ==========================
  useEffect(() => {
    Promise.all([
      loadDashboard(),
      loadEmployees(),
      loadPendingLeaves(),
    ]).finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (!dashboard) return <p>Failed to load dashboard</p>;

  return (
    <>
      {/* HEADER */}
      <div className="employee-header" id="dashboard">
        <h2>Overview</h2>
        <button
          className="primary-btn"
          onClick={() => router.push("/employer/add-employee")}
        >
          + Add New Employee
        </button>
      </div>

      {/* STATS */}
      <StatCards
        stats={{
          pending: dashboard.pendingLeaves || 0,
          employees: dashboard.employeesCount || 0,
          monthlyLeaves: dashboard.recentLeaves?.length || 0,
        }}
      />

      {/* CALENDAR */}
      <AttendanceCalendar employees={employees} />

      {/* PENDING LEAVES */}
      <section id="pending">
        <PendingLeavesTable
          leaves={pendingLeaves}
          onAction={loadPendingLeaves}
        />
      </section>

      {/* EMPLOYEES */}
      <section id="employees">
        <EmployeeTable employees={employees} />
      </section>

      {/* REPORTS */}
      <section id="reports">
        <ReportsSection />
      </section>
    </>
  );
}
