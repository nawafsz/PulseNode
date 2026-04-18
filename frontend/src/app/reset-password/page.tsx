"use client";
import { Navbar } from "@/components/Navbar";
import { useState, type FormEvent, useEffect, Suspense } from "react";
import { useI18n } from "@/components/I18nProvider";
import { useRouter, useSearchParams } from "next/navigation";

function ResetPasswordContent() {
  const { t } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) {
      setMessage("Invalid token.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      if (res.ok) {
        setMessage(t("auth.reset.success"));
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setMessage("Invalid or expired token.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to connect to server.");
    }
    setLoading(false);
  };

  return (
    <div className="glass-card" style={{ padding: "22px" }}>
      <h1 style={{ fontSize: "1.8rem", fontWeight: 900, color: "white" }}>{t("auth.reset.title")}</h1>
      <p style={{ marginTop: "6px", color: "var(--pulse-text-muted)" }}>{t("auth.reset.desc")}</p>

      {message ? (
        <div style={{ marginTop: "20px", padding: "12px", background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: "12px", color: "#00d4ff", fontSize: "0.9rem" }}>
          {message}
        </div>
      ) : (
        <form onSubmit={onSubmit} style={{ marginTop: "16px", display: "grid", gap: "12px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "var(--pulse-text-muted)", marginBottom: "6px" }}>{t("auth.login.password")}</label>
            <input
              required
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: "100%", background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px", padding: "12px 12px", color: "white", outline: "none" }}
            />
          </div>
          <button className="btn-primary" type="submit" disabled={loading} style={{ justifyContent: "center" }}>
            {loading ? t("auth.login.submitting") : t("auth.reset.submit")}
          </button>
        </form>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div style={{ maxWidth: "520px", margin: "0 auto", padding: "96px 24px 64px" }}>
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordContent />
        </Suspense>
      </div>
    </div>
  );
}
