"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
import toast from "react-hot-toast";
import { loginUser } from "@/services/auth";
import { saveAuth } from "@/utils/auth";

const brandFont = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export default function LoginPage() {
  const router = useRouter();

  const [role, setRole] = useState("EMPLOYEE");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);

    try {
      const res = await loginUser({ email, password });

      saveAuth(
        res.accessToken,
        { role: res.role, email },
        remember
      );

      toast.success("Login successful");

      if (res.role === "EMPLOYER") {
        router.push("/employer");
      } else {
        router.push("/employee");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-logo">
        <img src="/logo.png" alt="Robomanthan" />
        <span className={`brand-text ${brandFont.className}`}>
          ROBOMANTHAN
        </span>
      </div>

      <div className="login-card">
        <h2>Login</h2>
        <p className="subtitle">
          Welcome back! Please login to your account.
        </p>

        <div className="login-tabs">
          <button
            className={role === "EMPLOYEE" ? "active" : ""}
            onClick={() => setRole("EMPLOYEE")}
          >
            👤 Employee
          </button>
          <button
            className={role === "EMPLOYER" ? "active" : ""}
            onClick={() => setRole("EMPLOYER")}
          >
            💼 Employer
          </button>
        </div>

        <div className="input-group">
          <span className="icon">👤</span>
          <input
            type="email"
            placeholder="johndoe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <span className="icon">🔒</span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="show"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <div className="forgot-password">
          <a href="/forgot-password">Forgot Password?</a>
        </div>

        <button
          className="login-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="login-options">
          <label>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />{" "}
            Remember Me
          </label>
        </div>
      </div>
    </div>
  );
}
