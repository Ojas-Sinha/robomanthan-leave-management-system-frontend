"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL;

      const res = await fetch(
        `${API_BASE}/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to send reset link"
        );
      }

      toast.success(
        "Password reset link sent to your email"
      );
      setEmail("");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="forgot-page">
      {/* LOGO */}
      <div className="forgot-logo">
        <img src="/logo.png" alt="Robomanthan" />
        <span>ROBOMANTHAN</span>
      </div>

      {/* CARD */}
      <div className="forgot-card">
        <h2>Forgot Password</h2>
        <p className="forgot-subtext">
          Enter your registered email to receive a reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="forgot-footer">
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
}
