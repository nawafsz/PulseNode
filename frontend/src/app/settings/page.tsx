"use client";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import Image from "next/image";

export default function SettingsPage() {
  const { locale, setLocale, t } = useI18n();
  const [emailDigest, setEmailDigest] = useState(true);
  const [semanticFeed, setSemanticFeed] = useState(true);
  const [saved, setSaved] = useState<"idle" | "saved">("idle");

  const toggleTheme = () => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const current = root.dataset.theme === "light" ? "light" : "dark";
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      window.localStorage.setItem("pulsenode.theme", next);
    } catch {}
  };

  const onSave = () => {
    setSaved("saved");
    setTimeout(() => setSaved("idle"), 1200);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "96px 24px 64px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "white" }}>{t("settings.title")}</h1>
            <p style={{ marginTop: "6px", color: "var(--pulse-text-muted)" }}>{t("settings.desc")}</p>
          </div>
          <button className="btn-primary" onClick={onSave}>
            {saved === "saved" ? t("settings.saved") : t("settings.save")}
          </button>
        </div>

        <div style={{ marginTop: "18px", display: "grid", gridTemplateColumns: "1fr", gap: "14px" }}>
          <div className="glass-card" style={{ padding: "18px" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "white" }}>{t("settings.appearance")}</h2>
            <p style={{ marginTop: "6px", color: "var(--pulse-text-muted)" }}>{t("settings.appearanceDesc")}</p>
            <div style={{ marginTop: "12px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button className="btn-ghost" onClick={toggleTheme} type="button">
                <span className="theme-text-light">{t("settings.switchToDark")}</span>
                <span className="theme-text-dark">{t("settings.switchToLight")}</span>
              </button>
            </div>
          </div>

          <div className="glass-card" style={{ padding: "18px" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "white" }}>{t("settings.language")}</h2>
            <div style={{ marginTop: "12px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {[
                { code: "en" as const, label: "English", flag: "/flag-en.svg" },
                { code: "ar" as const, label: "العربية", flag: "/flag-ar.svg" },
                { code: "fr" as const, label: "Français", flag: "/flag-fr.svg" },
                { code: "zh" as const, label: "中文", flag: "/flag-zh.svg" },
              ].map((opt) => (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => setLocale(opt.code)}
                  className={locale === opt.code ? "btn-primary" : "btn-ghost"}
                  style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}
                >
                  <Image src={opt.flag} alt={opt.label} width={20} height={14} />
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card" style={{ padding: "18px" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "white" }}>{t("settings.feed")}</h2>
            <div style={{ marginTop: "12px", display: "grid", gap: "10px" }}>
              <label className="glass" style={{ padding: "12px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                <span style={{ color: "rgba(232,234,246,0.78)", fontSize: "0.9rem", fontWeight: 600 }}>
                  {t("settings.semantic")}
                </span>
                <input type="checkbox" checked={semanticFeed} onChange={(e) => setSemanticFeed(e.target.checked)} />
              </label>
              <label className="glass" style={{ padding: "12px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                <span style={{ color: "rgba(232,234,246,0.78)", fontSize: "0.9rem", fontWeight: 600 }}>
                  {t("settings.digest")}
                </span>
                <input type="checkbox" checked={emailDigest} onChange={(e) => setEmailDigest(e.target.checked)} />
              </label>
            </div>
          </div>

          <div className="glass-card" style={{ padding: "18px" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "white" }}>{t("settings.account")}</h2>
            <div style={{ marginTop: "12px", display: "grid", gap: "10px" }}>
              <div className="glass" style={{ padding: "12px", borderRadius: "14px" }}>
                <p style={{ fontSize: "0.75rem", color: "var(--pulse-text-muted)", marginBottom: "6px" }}>{t("settings.username")}</p>
                <input
                  defaultValue="nawaf"
                  style={{ width: "100%", background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", padding: "10px 12px", color: "white", outline: "none" }}
                />
              </div>
              <div className="glass" style={{ padding: "12px", borderRadius: "14px" }}>
                <p style={{ fontSize: "0.75rem", color: "var(--pulse-text-muted)", marginBottom: "6px" }}>{t("settings.bio")}</p>
                <textarea
                  defaultValue="Building a knowledge platform that reduces distraction and turns content into trackable learning paths."
                  rows={3}
                  style={{ width: "100%", background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", padding: "10px 12px", color: "white", outline: "none", resize: "vertical" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
