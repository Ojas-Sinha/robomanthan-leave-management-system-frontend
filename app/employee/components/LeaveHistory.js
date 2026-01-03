export default function LeaveHistory({ leaves = [] }) {
  return (
    <section className="leave-history leave-history-section">
      <h3>My Leave History</h3>

      {/* ===== DESKTOP TABLE ===== */}
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Dates</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No leave records found
              </td>
            </tr>
          ) : (
            leaves.map((l) => (
              <tr key={l.id}>
                <td>{l.type}</td>
                <td>
                  {new Date(l.fromDate).toDateString()}{" "}
                  <b>to</b>{" "}
                  {new Date(l.toDate).toDateString()}
                </td>
                <td className={l.status.toLowerCase()}>
                  {l.status}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ===== MOBILE CARDS ===== */}
      <div className="leave-history-mobile">
        {leaves.map((l) => (
          <div key={l.id} className="leave-history-card">
            <strong>{l.type} Leave</strong>

            <p>
              <b>From:</b>{" "}
              {new Date(l.fromDate).toDateString()}
            </p>

            <p>
              <b>To:</b>{" "}
              {new Date(l.toDate).toDateString()}
            </p>

            <span className={`status ${l.status.toLowerCase()}`}>
              {l.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
