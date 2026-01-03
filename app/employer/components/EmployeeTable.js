"use client";

import { useRouter } from "next/navigation";

export default function EmployeeTable({ employees = [] }) {
  const router = useRouter();

  return (
    <section className="table-card">
      <div className="table-header">
        <h3>Employees</h3>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="desktop-only">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No employees found
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.jobRole || "-"}</td>
                  <td>
                    <button
                      className="link-btn"
                      onClick={() =>
                        router.push(`/employer/employees/${emp.id}`)
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="mobile-only">
        {employees.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            No employees found
          </p>
        ) : (
          employees.map((emp) => (
            <div key={emp.id} className="employee-mobile-card">
              <div>
                <strong>{emp.name}</strong>
                <p className="muted">{emp.email}</p>
                <p className="muted">
                  Designation: {emp.jobRole || "-"}
                </p>
              </div>

              <button
                className="link-btn"
                onClick={() =>
                  router.push(`/employer/employees/${emp.id}`)
                }
              >
                View
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
