"use client";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ADMIN_EMAIL, writeAuthUser } from "@/lib/auth";
import { useI18n } from "@/components/I18nProvider";

export default function LoginPage() {
  const router = useRouter();
  const { locale, t } = useI18n();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const raw = email.trim();
    const fallbackName = locale === "ar" ? "مستخدم" : locale === "fr" ? "Utilisateur" : locale === "zh" ? "用户" : "User";
    const guess = raw.includes("@") ? raw.split("@")[0] : raw;
    const safe = guess.replace(/[^a-zA-Z0-9_\u0600-\u06FF]/g, "").slice(0, 20);
    const finalName = safe || fallbackName;
    const finalUsername = safe || "user";

    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: raw, name: finalName, username: finalUsername }),
      });
      if (!res.ok) throw new Error("Backend login failed");
      const user = await res.json();
      
      const isAdmin = raw.toLowerCase() === ADMIN_EMAIL.toLowerCase();
      writeAuthUser({ 
        id: user.id,
        name: user.name, 
        username: user.username, 
        email: user.email, 
        role: isAdmin ? "admin" : "user",
        avatarUrl: user.avatar 
      });
      
      router.push(isAdmin ? "/control-center" : "/");
    } catch (err) {
      console.error(err);
      // Fallback if backend is down
      writeAuthUser({ id: "dummy", name: finalName, username: finalUsername, email: raw, role: "user" });
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div style={{ maxWidth: "520px", margin: "0 auto", padding: "96px 24px 64px" }}>
        <div className="glass-card" style={{ padding: "22px" }}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--pulse-text)" }}>{t("auth.login.title")}</h1>
          <p style={{ marginTop: "6px", color: "var(--pulse-text-muted)" }}>{t("auth.login.desc")}</p>

          <form onSubmit={onSubmit} style={{ marginTop: "16px", display: "grid", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "var(--pulse-text-muted)", marginBottom: "6px" }}>{t("auth.login.email")}</label>
              <input
                required
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
                style={{ width: "100%", background: "var(--pulse-surface)", border: "1px solid var(--pulse-border)", borderRadius: "12px", padding: "12px 12px", color: "var(--pulse-text)", outline: "none" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "var(--pulse-text-muted)", marginBottom: "6px" }}>{t("auth.login.password")}</label>
              <input
                required
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                style={{ width: "100%", background: "var(--pulse-surface)", border: "1px solid var(--pulse-border)", borderRadius: "12px", padding: "12px 12px", color: "var(--pulse-text)", outline: "none" }}
              />
              <div style={{ marginTop: "8px", textAlign: "end" }}>
                <Link href="/forgot-password" style={{ fontSize: "0.8rem", color: "var(--pulse-text-muted)", textDecoration: "none" }}>
                  {t("auth.login.forgotPassword")}
                </Link>
              </div>
            </div>
            <button className="btn-primary" type="submit" disabled={loading} style={{ justifyContent: "center" }}>
              {loading ? t("auth.login.submitting") : t("auth.login.submit")}
            </button>
          </form>

          <p style={{ marginTop: "14px", fontSize: "0.85rem", color: "var(--pulse-text-muted)" }}>
            {t("auth.login.noAccount")}{" "}
            <Link href="/register" style={{ color: "var(--pulse-secondary)", textDecoration: "none", fontWeight: 700 }}>
              {t("auth.login.toRegister")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
