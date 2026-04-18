"use client";
import { Navbar } from "@/components/Navbar";
import { useState, type FormEvent } from "react";
import { useI18n } from "@/components/I18nProvider";

export default function ForgotPasswordPage() {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call to backend
    try {
      const res = await fetch("http://localhost:3001/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setMessage(t("auth.forgot.success"));
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to connect to server.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div style={{ maxWidth: "520px", margin: "0 auto", padding: "96px 24px 64px" }}>
        <div className="glass-card" style={{ padding: "22px" }}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 900, color: "white" }}>{t("auth.forgot.title")}</h1>
          <p style={{ marginTop: "6px", color: "var(--pulse-text-muted)" }}>{t("auth.forgot.desc")}</p>

          {message ? (
            <div style={{ marginTop: "20px", padding: "12px", background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: "12px", color: "#00d4ff", fontSize: "0.9rem" }}>
              {message}
            </div>
          ) : (
            <form onSubmit={onSubmit} style={{ marginTop: "16px", display: "grid", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", color: "var(--pulse-text-muted)", marginBottom: "6px" }}>{t("auth.login.email")}</label>
                <input
                  required
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  style={{ width: "100%", background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px", padding: "12px 12px", color: "white", outline: "none" }}
                />
              </div>
              <button className="btn-primary" type="submit" disabled={loading} style={{ justifyContent: "center" }}>
                {loading ? t("auth.login.submitting") : t("auth.forgot.submit")}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
