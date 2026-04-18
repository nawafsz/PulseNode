"use client";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ADMIN_EMAIL, writeAuthUser } from "@/lib/auth";
import { useI18n } from "@/components/I18nProvider";

export default function RegisterPage() {
  const router = useRouter();
  const { locale, t } = useI18n();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const fallbackName = locale === "ar" ? "مستخدم" : locale === "fr" ? "Utilisateur" : locale === "zh" ? "用户" : "User";
    const rawEmail = email.trim();
    const isAdmin = rawEmail.toLowerCase() === ADMIN_EMAIL.toLowerCase();
    
    const finalName = name.trim() || (isAdmin ? "Mindly Admin" : fallbackName);
    const finalUsername = isAdmin ? rawEmail : (username.trim() || "user");

    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: rawEmail, name: finalName, username: finalUsername }),
      });
      
      if (!res.ok) throw new Error("Backend registration failed");
      const user = await res.json();

      writeAuthUser({
        id: user.id,
        name: user.name || finalName,
        username: user.username || finalUsername,
        email: rawEmail || undefined,
        role: isAdmin ? "admin" : "user",
      });

      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
      router.push(isAdmin ? "/control-center" : "/profile");
    } catch (err) {
      console.error(err);
      // Fallback if backend is down
      writeAuthUser({
        id: "reg-" + Date.now(),
        name: finalName,
        username: finalUsername,
        email: rawEmail || undefined,
        role: isAdmin ? "admin" : "user",
      });
      router.push(isAdmin ? "/control-center" : "/profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div style={{ maxWidth: "520px", margin: "0 auto", padding: "96px 24px 64px" }}>
        <div className="glass-card" style={{ padding: "22px" }}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--pulse-text)" }}>{t("auth.register.title")}</h1>
          <p style={{ marginTop: "6px", color: "var(--pulse-text-muted)" }}>{t("auth.register.desc")}</p>

          <form onSubmit={onSubmit} style={{ marginTop: "16px", display: "grid", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "var(--pulse-text-muted)", marginBottom: "6px" }}>{t("auth.register.name")}</label>
              <input
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=""
                style={{ width: "100%", background: "var(--pulse-surface)", border: "1px solid var(--pulse-border)", borderRadius: "12px", padding: "12px 12px", color: "var(--pulse-text)", outline: "none" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "var(--pulse-text-muted)", marginBottom: "6px" }}>{t("auth.register.username")}</label>
              <input
                required
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=""
                style={{ width: "100%", background: "var(--pulse-surface)", border: "1px solid var(--pulse-border)", borderRadius: "12px", padding: "12px 12px", color: "var(--pulse-text)", outline: "none" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "var(--pulse-text-muted)", marginBottom: "6px" }}>{t("auth.register.email")}</label>
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
              <label style={{ display: "block", fontSize: "0.8rem", color: "var(--pulse-text-muted)", marginBottom: "6px" }}>{t("auth.register.password")}</label>
              <input
                required
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                style={{ width: "100%", background: "var(--pulse-surface)", border: "1px solid var(--pulse-border)", borderRadius: "12px", padding: "12px 12px", color: "var(--pulse-text)", outline: "none" }}
              />
            </div>

            <button className="btn-primary" type="submit" disabled={loading} style={{ justifyContent: "center" }}>
              {loading ? t("auth.register.submitting") : t("auth.register.submit")}
            </button>
          </form>

          <p style={{ marginTop: "14px", fontSize: "0.85rem", color: "var(--pulse-text-muted)" }}>
            {t("auth.register.haveAccount")}{" "}
            <Link href="/login" style={{ color: "var(--pulse-secondary)", textDecoration: "none", fontWeight: 700 }}>
              {t("auth.register.toLogin")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
