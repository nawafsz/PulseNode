"use client";
import { useI18n } from "@/components/I18nProvider";

export default function AdminPathsPage() {
  const { t } = useI18n();
  const paths = [
    { id: "p1", title: "Understanding Large Language Models", nodes: 12, followers: 8420, status: "Active" },
    { id: "p2", title: "Semiconductor Supply Chains", nodes: 9, followers: 5610, status: "Active" },
    { id: "p3", title: "Climate Science: Beyond CO₂", nodes: 15, followers: 12300, status: "Draft" },
  ];

  const statusLabel = (s: string) => {
    if (s === "Active") return t("adminPaths.status.active");
    if (s === "Draft") return t("adminPaths.status.draft");
    return s;
  };

  return (
    <div className="glass-card" style={{ padding: "16px" }}>
      <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "white" }}>{t("adminPaths.title")}</h1>
      <p style={{ marginTop: "6px", color: "var(--pulse-text-muted)" }}>{t("adminPaths.desc")}</p>

      <div style={{ marginTop: "12px", display: "grid", gap: "10px" }}>
        {paths.map((p) => (
          <div key={p.id} className="glass" style={{ padding: "14px", borderRadius: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", flexWrap: "wrap" }}>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: "0.95rem", fontWeight: 900, color: "white" }}>{p.title}</p>
                <p style={{ marginTop: "6px", fontSize: "0.8rem", color: "rgba(232,234,246,0.7)" }}>
                  {p.nodes} {t("adminPaths.nodes")} · {p.followers.toLocaleString()} {t("adminPaths.following")}
                </p>
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 900,
                    padding: "3px 10px",
                    borderRadius: "999px",
                    background: p.status === "Active" ? "rgba(0,245,160,0.10)" : "rgba(255,255,255,0.06)",
                    border: `1px solid ${p.status === "Active" ? "rgba(0,245,160,0.22)" : "rgba(255,255,255,0.12)"}`,
                    color: p.status === "Active" ? "#00f5a0" : "rgba(232,234,246,0.75)",
                  }}
                >
                  {statusLabel(p.status)}
                </span>
                <button className="btn-primary">{t("adminPaths.edit")}</button>
                <button className="btn-ghost">{t("adminPaths.publish")}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
