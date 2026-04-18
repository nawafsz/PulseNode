"use client";
import { useI18n } from "@/components/I18nProvider";

export default function AdminUsersPage() {
  const { t } = useI18n();
  const users = [
    { id: "u1", name: "Nawaf", username: "nawaf", role: "Admin", status: "Active", reputation: 8420 },
    { id: "u2", name: "Sarah Chen", username: "sarahc", role: "User", status: "Active", reputation: 9420 },
    { id: "u3", name: "Zoe Kim", username: "zoek", role: "User", status: "Flagged", reputation: 3100 },
  ];

  const statusLabel = (s: string) => {
    if (s === "Active") return t("adminUsers.status.active");
    if (s === "Flagged") return t("adminUsers.status.flagged");
    return s;
  };

  return (
    <div className="glass-card" style={{ padding: "16px" }}>
      <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "white" }}>{t("adminUsers.title")}</h1>
      <p style={{ marginTop: "6px", color: "var(--pulse-text-muted)" }}>{t("adminUsers.desc")}</p>

      <div style={{ marginTop: "12px", overflowX: "auto" }} className="glass">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "start", padding: "12px", fontSize: "0.75rem", color: "var(--pulse-text-muted)" }}>{t("adminUsers.col.name")}</th>
              <th style={{ textAlign: "start", padding: "12px", fontSize: "0.75rem", color: "var(--pulse-text-muted)" }}>{t("adminUsers.col.handle")}</th>
              <th style={{ textAlign: "start", padding: "12px", fontSize: "0.75rem", color: "var(--pulse-text-muted)" }}>{t("adminUsers.col.role")}</th>
              <th style={{ textAlign: "start", padding: "12px", fontSize: "0.75rem", color: "var(--pulse-text-muted)" }}>{t("adminUsers.col.status")}</th>
              <th style={{ textAlign: "start", padding: "12px", fontSize: "0.75rem", color: "var(--pulse-text-muted)" }}>{t("adminUsers.col.reputation")}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <td style={{ padding: "12px", color: "white", fontWeight: 700, fontSize: "0.9rem" }}>{u.name}</td>
                <td style={{ padding: "12px", color: "rgba(232,234,246,0.75)" }}>@{u.username}</td>
                <td style={{ padding: "12px", color: "rgba(232,234,246,0.75)" }}>{u.role}</td>
                <td style={{ padding: "12px" }}>
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: "999px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: u.status === "Active" ? "#00f5a0" : "#f5a623",
                      background: u.status === "Active" ? "rgba(0,245,160,0.10)" : "rgba(245,166,35,0.10)",
                      border: `1px solid ${u.status === "Active" ? "rgba(0,245,160,0.22)" : "rgba(245,166,35,0.22)"}`,
                    }}
                  >
                    {statusLabel(u.status)}
                  </span>
                </td>
                <td style={{ padding: "12px", color: "rgba(232,234,246,0.75)" }}>{u.reputation.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
