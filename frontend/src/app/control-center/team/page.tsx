"use client";
import { useI18n } from "@/components/I18nProvider";

export default function TeamPage() {
  const { t } = useI18n();

  const members = [
    { name: "Mindly Admin", roleKey: "team.role.owner", handle: "nsznsz201@gmail.com" },
    { name: "Support", roleKey: "team.role.support", handle: "@support" },
    { name: "Moderator", roleKey: "team.role.moderator", handle: "@moderation" },
  ];

  return (
    <div className="glass-card" style={{ padding: "16px" }}>
      <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "white" }}>{t("team.title")}</h1>
      <p style={{ marginTop: "6px", color: "var(--pulse-text-muted)" }}>{t("team.desc")}</p>

      <div style={{ marginTop: "12px", display: "grid", gap: "10px" }}>
        {members.map((m) => (
          <div key={m.handle} className="glass" style={{ padding: "14px", borderRadius: "14px", display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: "0.9rem", fontWeight: 800, color: "white" }}>{m.name}</p>
              <p style={{ marginTop: "4px", fontSize: "0.8rem", color: "var(--pulse-text-muted)" }}>{m.handle}</p>
            </div>
            <span style={{ fontSize: "0.75rem", fontWeight: 900, padding: "3px 10px", borderRadius: "999px", background: "rgba(108,99,255,0.12)", border: "1px solid rgba(108,99,255,0.22)", color: "#a78bfa" }}>
              {t(m.roleKey)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
