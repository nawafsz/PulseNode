"use client";
import { useState } from "react";
import { useI18n } from "@/components/I18nProvider";

export default function AdminSettingsPage() {
  const { t } = useI18n();
  const [autoModeration, setAutoModeration] = useState(true);
  const [requireSources, setRequireSources] = useState(false);
  const [saved, setSaved] = useState<"idle" | "saved">("idle");

  const onSave = () => {
    setSaved("saved");
    setTimeout(() => setSaved("idle"), 1200);
  };

  return (
    <div className="glass-card" style={{ padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "white" }}>{t("adminSettings.title")}</h1>
          <p style={{ marginTop: "6px", color: "var(--pulse-text-muted)" }}>{t("adminSettings.desc")}</p>
        </div>
        <button className="btn-primary" onClick={onSave}>
          {saved === "saved" ? t("adminSettings.saved") : t("adminSettings.save")}
        </button>
      </div>

      <div style={{ marginTop: "12px", display: "grid", gap: "10px" }}>
        <label className="glass" style={{ padding: "12px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
          <span style={{ color: "rgba(232,234,246,0.78)", fontSize: "0.9rem", fontWeight: 700 }}>
            {t("adminSettings.autoModeration")}
          </span>
          <input type="checkbox" checked={autoModeration} onChange={(e) => setAutoModeration(e.target.checked)} />
        </label>
        <label className="glass" style={{ padding: "12px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
          <span style={{ color: "rgba(232,234,246,0.78)", fontSize: "0.9rem", fontWeight: 700 }}>
            {t("adminSettings.requireSources")}
          </span>
          <input type="checkbox" checked={requireSources} onChange={(e) => setRequireSources(e.target.checked)} />
        </label>
        <div className="glass" style={{ padding: "12px", borderRadius: "14px" }}>
          <p style={{ fontSize: "0.8rem", fontWeight: 800, color: "white" }}>{t("adminSettings.trustThreshold")}</p>
          <p style={{ marginTop: "6px", fontSize: "0.8rem", color: "rgba(232,234,246,0.7)", lineHeight: 1.6 }}>
            {t("adminSettings.trustDesc")}
          </p>
          <input type="range" min={0} max={100} defaultValue={60} style={{ width: "100%", marginTop: "10px" }} />
        </div>
      </div>
    </div>
  );
}
