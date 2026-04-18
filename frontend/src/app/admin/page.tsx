"use client";
import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";

export default function AdminDashboardPage() {
  const { t } = useI18n();
  const stats = [
    { label: t("admin.users"), value: "12,480" },
    { label: t("admin.stats.postsToday"), value: "1,204" },
    { label: t("admin.stats.openReports"), value: "18" },
    { label: t("admin.paths"), value: "312" },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "white" }}>{t("admin.dashboard")}</h1>
          <p style={{ marginTop: "6px", color: "var(--pulse-text-muted)" }}>{t("admin.manageDesc")}</p>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Link href="/control-center/posts" className="btn-primary">
            {t("admin.reviewPosts")}
          </Link>
          <Link href="/control-center/reports" className="btn-ghost">
            {t("admin.reports")}
          </Link>
        </div>
      </div>

      <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px" }}>
        {stats.map((s) => (
          <div key={s.label} className="glass-card" style={{ padding: "16px" }}>
            <p style={{ fontSize: "0.8rem", color: "var(--pulse-text-muted)" }}>{s.label}</p>
            <p className="gradient-text" style={{ fontSize: "1.8rem", fontWeight: 900, marginTop: "6px" }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "14px" }} className="glass-card">
        <div style={{ padding: "16px" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "white" }}>{t("admin.shortcuts")}</h2>
          <div style={{ marginTop: "12px", display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "10px" }}>
            {[
              { href: "/control-center/users", title: t("admin.users"), desc: t("admin.shortcut.usersDesc") },
              { href: "/control-center/posts", title: t("admin.posts"), desc: t("admin.shortcut.postsDesc") },
              { href: "/control-center/reports", title: t("admin.reports"), desc: t("admin.shortcut.reportsDesc") },
              { href: "/control-center/paths", title: t("admin.paths"), desc: t("admin.shortcut.pathsDesc") },
              { href: "/control-center/settings", title: t("admin.adminSettings"), desc: t("admin.shortcut.settingsDesc") },
            ].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="glass"
                style={{ padding: "14px", borderRadius: "14px", textDecoration: "none", display: "block" }}
              >
                <p style={{ fontSize: "0.95rem", fontWeight: 800, color: "white" }}>{c.title}</p>
                <p style={{ marginTop: "6px", fontSize: "0.82rem", color: "rgba(232,234,246,0.7)", lineHeight: 1.5 }}>{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
