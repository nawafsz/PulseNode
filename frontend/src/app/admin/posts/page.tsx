"use client";
import Link from "next/link";
import { MOCK_POSTS } from "@/lib/mockPosts";
import { useI18n } from "@/components/I18nProvider";

export default function AdminPostsPage() {
  const { t } = useI18n();
  const posts = MOCK_POSTS.slice(0, 6);

  return (
    <div className="glass-card" style={{ padding: "16px" }}>
      <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "white" }}>{t("adminPosts.title")}</h1>
      <p style={{ marginTop: "6px", color: "var(--pulse-text-muted)" }}>{t("adminPosts.desc")}</p>

      <div style={{ marginTop: "12px", display: "grid", gap: "10px" }}>
        {posts.map((p) => (
          <div key={p.id} className="glass" style={{ padding: "14px", borderRadius: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: "0.9rem", fontWeight: 800, color: "white" }}>{p.author.name}</p>
                <p style={{ marginTop: "4px", fontSize: "0.82rem", lineHeight: 1.6, color: "rgba(232,234,246,0.72)" }}>
                  {(p.tldrSummary ?? p.content).slice(0, 160)}
                  {(p.tldrSummary ?? p.content).length > 160 ? "…" : ""}
                </p>
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    padding: "3px 10px",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(232,234,246,0.8)",
                  }}
                >
                  {p.factCheckStatus}
                </span>
                <Link href={`/posts/${encodeURIComponent(p.id)}`} className="btn-ghost">
                  {t("adminPosts.open")}
                </Link>
              </div>
            </div>

            <div style={{ marginTop: "10px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button className="btn-primary">{t("adminPosts.approve")}</button>
              <button className="btn-ghost">{t("adminPosts.delete")}</button>
              <button className="btn-ghost">{t("adminPosts.pin")}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
