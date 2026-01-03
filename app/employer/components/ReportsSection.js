"use client";

import { getToken } from "@/utils/auth";
import toast from "react-hot-toast";

export default function ReportsSection() {
  const token = getToken();
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  // =========================
  // CSV HELPERS
  // =========================
  function toCSV(rows) {
    return rows
      .map((row) =>
        row
          .map((v) =>
            `"${String(v ?? "").replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");
  }

  function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  // =========================
  // 1️⃣ EMPLOYEE LIST CSV
  // =========================
  async function downloadEmployees() {
    try {
      const res = await fetch(`${API_BASE}/employees`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch employees");

      const employees = await res.json();

      const rows = [
        ["Name", "Email", "Designation", "Active", "Created At"],
        ...employees.map((e) => [
          e.name,
          e.email,
          e.jobRole || "-",
          e.isActive ? "Yes" : "No",
          e.createdAt?.split("T")[0],
        ]),
      ];

      downloadCSV(toCSV(rows), "employees.csv");
      toast.success("Employees CSV downloaded");
    } catch (err) {
      console.error(err);
      toast.error("Failed to download employees CSV");
    }
  }

  // =========================
  // 2️⃣ LEAVE HISTORY CSV
  // =========================
  async function downloadLeaveHistory() {
    try {
      const res = await fetch(
        `${API_BASE}/reports/leaves/export`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok)
        throw new Error("Failed to export leave history");

      const csv = await res.text();
      downloadCSV(csv, "leave-history.csv");
      toast.success("Leave history CSV downloaded");
    } catch (err) {
      console.error(err);
      toast.error("Failed to download leave history CSV");
    }
  }

  // =========================
  // 3️⃣ DAILY ABSENTEES CSV
  // =========================
  async function downloadDailyAbsentees() {
    try {
      const today = new Date().toISOString().split("T")[0];

      const res = await fetch(
        `${API_BASE}/leaves/by-date?date=${today}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok)
        throw new Error("Failed to fetch absentees");

      const leaves = await res.json();

      const rows = [
        ["Name", "Email", "Designation", "Leave Type", "From", "To"],
        ...leaves.map((l) => [
          l.user.name,
          l.user.email,
          l.user.jobRole || "-",
          l.type,
          l.fromDate.split("T")[0],
          l.toDate.split("T")[0],
        ]),
      ];

      downloadCSV(
        toCSV(rows),
        `daily-absentees-${today}.csv`
      );

      toast.success("Daily absentees CSV downloaded");
    } catch (err) {
      console.error(err);
      toast.error("Failed to download daily absentees CSV");
    }
  }

  // =========================
  // UI
  // =========================
  return (
    <section className="table-card">
      <div className="table-header">
        <h3>Reports</h3>
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <button
          className="secondary-btn"
          onClick={downloadEmployees}
        >
          Download Employees CSV
        </button>

        <button
          className="secondary-btn"
          onClick={downloadLeaveHistory}
        >
          Download Leave History CSV
        </button>

        <button
          className="secondary-btn"
          onClick={downloadDailyAbsentees}
        >
          Download Today’s Absentees CSV
        </button>
      </div>
    </section>
  );
}
