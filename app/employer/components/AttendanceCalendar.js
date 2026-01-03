"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/utils/auth";

export default function AttendanceCalendar() {
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [absentEmployees, setAbsentEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  async function onDateSelect(date) {
    if (!date) return;

    setSelectedDate(date);
    setLoading(true);

    try {
      const token = getToken();
      const API_BASE = process.env.NEXT_PUBLIC_API_URL;

      const res = await fetch(
        `${API_BASE}/leaves/by-date?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setAbsentEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setAbsentEmployees([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    onDateSelect(today);
  }, []);

  return (
    <section className="table-card">
      <div className="table-header">
        <h3>Attendance Calendar</h3>
      </div>

      <input
        type="date"
        className="calendar-input"
        value={selectedDate}
        onChange={(e) => onDateSelect(e.target.value)}
      />

      <div style={{ marginTop: 16 }}>
        <h4>Absent on {selectedDate}</h4>

        {loading ? (
          <p>Loading...</p>
        ) : absentEmployees.length === 0 ? (
          <p>🎉 No employees absent</p>
        ) : (
          <>
            {/* DESKTOP TABLE */}
            <div className="desktop-only">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Leave Type</th>
                  </tr>
                </thead>
                <tbody>
                  {absentEmployees.map((leave) => (
                    <tr key={leave.id}>
                      <td>{leave.user.name}</td>
                      <td>{leave.user.jobRole || "-"}</td>
                      <td>{leave.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="mobile-only">
              {absentEmployees.map((leave) => (
                <div
                  key={leave.id}
                  className="attendance-mobile-card"
                >
                  <strong>{leave.user.name}</strong>
                  <p className="muted">
                    {leave.user.jobRole || "—"}
                  </p>
                  <span className="leave-pill">
                    {leave.type} Leave
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
