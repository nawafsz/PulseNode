"use client";
import { useI18n } from "@/components/I18nProvider";

export default function SupportPage() {
  const { t } = useI18n();

  const tickets = [
    { id: "t1", subject: "Login issue", status: "Open", priority: "High" },
    { id: "t2", subject: "Report review request", status: "Open", priority: "Medium" },
    { id: "t3", subject: "Account recovery", status: "Resolved", priority: "Low" },
  ];

  const statusLabel = (s: string) => {
    if (s === "Open") return t("support.status.open");
    if (s === "Resolved") return t("support.status.resolved");
    return s;
  };

  const priorityLabel = (p: string) => {
    if (p === "High") return t("support.priority.high");
    if (p === "Medium") return t("support.priority.medium");
    if (p === "Low") return t("support.priority.low");
    return p;
  };

  return (
    <div className="glass-card" style={{ padding: "16px" }}>
      <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "white" }}>{t("support.title")}</h1>
      <p style={{ marginTop: "6px", color: "var(--pulse-text-muted)" }}>{t("support.desc")}</p>

      <div style={{ marginTop: "12px", overflowX: "auto" }} className="glass">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "start", padding: "12px", fontSize: "0.75rem", color: "var(--pulse-text-muted)" }}>{t("support.col.id")}</th>
              <th style={{ textAlign: "start", padding: "12px", fontSize: "0.75rem", color: "var(--pulse-text-muted)" }}>{t("support.col.subject")}</th>
              <th style={{ textAlign: "start", padding: "12px", fontSize: "0.75rem", color: "var(--pulse-text-muted)" }}>{t("support.col.status")}</th>
              <th style={{ textAlign: "start", padding: "12px", fontSize: "0.75rem", color: "var(--pulse-text-muted)" }}>{t("support.col.priority")}</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((r) => (
              <tr key={r.id} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <td style={{ padding: "12px", color: "white", fontWeight: 800, fontSize: "0.9rem" }}>{r.id}</td>
                <td style={{ padding: "12px", color: "rgba(232,234,246,0.75)" }}>{r.subject}</td>
                <td style={{ padding: "12px", color: r.status === "Open" ? "#f5a623" : "#00f5a0", fontWeight: 800 }}>{statusLabel(r.status)}</td>
                <td style={{ padding: "12px", color: "rgba(232,234,246,0.75)" }}>{priorityLabel(r.priority)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
