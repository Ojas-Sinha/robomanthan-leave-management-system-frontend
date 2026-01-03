"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getToken } from "@/utils/auth";

export default function EmployeeDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [employee, setEmployee] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;

    Promise.all([
      fetch(`${API_BASE}/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()),

      fetch(`${API_BASE}/employees/${id}/leaves`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()),
    ])
      .then(([empData, leaveData]) => {
        setEmployee(empData);
        setLeaves(Array.isArray(leaveData) ? leaveData : []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6">Loading employee details...</p>;

  if (!employee) {
    return (
      <div className="p-6">
        <p className="text-red-500">Employee not found</p>
        <button
          className="secondary-btn mt-4"
          onClick={() => router.push("/employer")}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="employee-view-page">
      {/* HEADER */}
      <div className="employee-header">
        <h2>{employee.name}</h2>
      </div>

      {/* BASIC INFO */}
      <section className="table-card">
        <div className="table-header">
          <h3>Employee Information</h3>
        </div>

        <div style={{ padding: "16px" }}>
          <p><b>Email:</b> {employee.email}</p>
          <p><b>Designation:</b> {employee.jobRole || "-"}</p>
          <p><b>Status:</b> {employee.isActive ? "Active" : "Inactive"}</p>
          <p>
            <b>Joined On:</b>{" "}
            {new Date(employee.createdAt).toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* LEAVE BALANCES */}
      <section className="table-card">
        <div className="table-header">
          <h3>Leave Balances</h3>
        </div>

        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Total</th>
              <th>Used</th>
              <th>Remaining</th>
            </tr>
          </thead>
          <tbody>
            {employee.leaveBalances.map((b) => (
              <tr key={b.type}>
                <td>{b.type}</td>
                <td>{b.total}</td>
                <td>{b.used}</td>
                <td>{b.total - b.used}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* LEAVE HISTORY */}
      <section className="table-card leave-history-section">
        <div className="table-header">
          <h3>Leave History</h3>
        </div>

        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Reason</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No leave records found
                </td>
              </tr>
            ) : (
              leaves.map((l) => (
                <tr key={l.id}>
                  <td>{l.type}</td>
                  <td>{l.reason || "-"}</td>
                  <td>{new Date(l.fromDate).toLocaleDateString()}</td>
                  <td>{new Date(l.toDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`status ${l.status.toLowerCase()}`}>
                      {l.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* MOBILE */}
        <div className="leave-history-mobile">
          {leaves.length === 0 ? (
            <p style={{ textAlign: "center" }}>
              No leave records found
            </p>
          ) : (
            leaves.map((l) => (
              <div key={l.id} className="leave-history-card">
                <strong>{l.type} Leave</strong>
                <p>{l.reason || "—"}</p>
                <p><b>From:</b> {new Date(l.fromDate).toLocaleDateString()}</p>
                <p><b>To:</b> {new Date(l.toDate).toLocaleDateString()}</p>
                <span className={`status ${l.status.toLowerCase()}`}>
                  {l.status}
                </span>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
