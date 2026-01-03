"use client";

export default function StatCards({ stats }) {
  return (
    <div className="stat-cards">
      <div className="stat-card gradient-blue">
        <p className="stat-title">Pending Requests</p>
        <h2 className="stat-value">{stats.pending}</h2>
      </div>

      <div className="stat-card gradient-green">
        <p className="stat-title">Total Employees</p>
        <h2 className="stat-value">{stats.employees}</h2>
      </div>
    </div>
  );
}
