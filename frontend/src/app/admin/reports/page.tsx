"use client";
import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";

export default function AdminReportsPage() {
  const { t } = useI18n();
  const reports = [
    { id: "r1", type: "Spam", target: "Post #5", status: "Open", priority: "High" },
    { id: "r2", type: "Misinformation", target: "Post #3", status: "Open", priority: "Medium" },
    { id: "r3", type: "Harassment", target: "User @zoek", status: "Resolved", priority: "Low" },
  ];

  const statusLabel = (s: string) => {
    if (s === "Open") return t("adminReports.status.open");
    if (s === "Resolved") return t("adminReports.status.resolved");
    return s;
  };

  const priorityLabel = (p: string) => {
    if (p === "High") return t("adminReports.priority.high");
    if (p === "Medium") return t("adminReports.priority.medium");
    if (p === "Low") return t("adminReports.priority.low");
    return p;
  };

  return (
    <div className="glass-card" style={{ padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "white" }}>{t("adminReports.title")}</h1>
          <p style={{ marginTop: "6px", color: "var(--pulse-text-muted)" }}>{t("adminReports.desc")}</p>
        </div>
        <Link href="/control-center" className="btn-ghost">
          {t("adminReports.back")}
        </Link>
      </div>

      <div style={{ marginTop: "12px", overflowX: "auto" }} className="glass">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "start", padding: "12px", fontSize: "0.75rem", color: "var(--pulse-text-muted)" }}>{t("adminReports.col.type")}</th>
              <th style={{ textAlign: "start", padding: "12px", fontSize: "0.75rem", color: "var(--pulse-text-muted)" }}>{t("adminReports.col.target")}</th>
              <th style={{ textAlign: "start", padding: "12px", fontSize: "0.75rem", color: "var(--pulse-text-muted)" }}>{t("adminReports.col.status")}</th>
              <th style={{ textAlign: "start", padding: "12px", fontSize: "0.75rem", color: "var(--pulse-text-muted)" }}>{t("adminReports.col.priority")}</th>
              <th style={{ textAlign: "start", padding: "12px", fontSize: "0.75rem", color: "var(--pulse-text-muted)" }} />
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <td style={{ padding: "12px", color: "white", fontWeight: 800, fontSize: "0.9rem" }}>{r.type}</td>
                <td style={{ padding: "12px", color: "rgba(232,234,246,0.75)" }}>{r.target}</td>
                <td style={{ padding: "12px", color: r.status === "Open" ? "#f5a623" : "#00f5a0", fontWeight: 800 }}>{statusLabel(r.status)}</td>
                <td style={{ padding: "12px", color: "rgba(232,234,246,0.75)" }}>{priorityLabel(r.priority)}</td>
                <td style={{ padding: "12px" }}>
                  <button className="btn-primary">{t("adminReports.resolve")}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
