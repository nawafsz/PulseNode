"use client";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { readAuthUser } from "@/lib/auth";
import { useI18n } from "@/components/I18nProvider";

export default function SharePage() {
  const router = useRouter();
  const { t } = useI18n();
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [topic, setTopic] = useState("");
  const [tags, setTags] = useState("AI, Knowledge");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!readAuthUser()) {
      router.replace("/register");
    }
  }, [router]);

  const tagList = useMemo(() => {
    return tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 8);
  }, [tags]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = readAuthUser();
    if (!user) {
      router.replace("/login");
      return;
    }

    setSubmitting(true);
    try {
      // Add topic to tags for better organization
      const finalTags = topic ? [t(topic), ...tagList] : tagList;
      
      await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorId: user.id,
          content,
          url,
          tags: finalTags,
        }),
      });
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Failed to post. Backend might be down.");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "96px 24px 64px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "var(--pulse-text)" }}>{t("share.title")}</h1>
            <p style={{ marginTop: "6px", color: "var(--pulse-text-muted)" }}>
              {t("share.desc")}
            </p>
          </div>
          <Link href="/" className="btn-ghost">
            {t("share.back")}
          </Link>
        </div>

        <div style={{ marginTop: "18px", display: "grid", gridTemplateColumns: "1fr", gap: "14px" }}>
          <form onSubmit={onSubmit} className="glass-card" style={{ padding: "18px", display: "grid", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "var(--pulse-text-muted)", marginBottom: "6px" }}>{t("share.content")}</label>
              <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={t("share.contentPh")}
                rows={6}
                style={{
                  width: "100%",
                  background: "var(--pulse-surface)",
                  border: "1px solid var(--pulse-border)",
                  borderRadius: "12px",
                  padding: "12px",
                  color: "var(--pulse-text)",
                  outline: "none",
                  resize: "vertical",
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", color: "var(--pulse-text-muted)", marginBottom: "6px" }}>{t("discover.byTopic")}</label>
                <select
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  style={{
                    width: "100%",
                    background: "var(--pulse-surface)",
                    border: "1px solid var(--pulse-border)",
                    borderRadius: "12px",
                    padding: "12px",
                    color: "var(--pulse-text)",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="" style={{ background: "var(--pulse-bg)" }}>-- {t("discover.byTopic")} --</option>
                  {[
                    "topic.ai", "topic.geopolitics", "topic.climate", "topic.philosophy",
                    "topic.economics", "topic.science", "topic.biology", "topic.quantum",
                    "topic.space", "topic.cyber", "topic.work", "topic.energy",
                    "topic.history", "topic.biotech", "topic.robotics", "topic.macro", "topic.arts"
                  ].map(key => (
                    <option key={key} value={key} style={{ background: "var(--pulse-bg)" }}>{t(key)}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--pulse-text-muted)", marginBottom: "6px" }}>{t("share.url")}</label>
                  <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    style={{
                      width: "100%",
                      background: "var(--pulse-surface)",
                      border: "1px solid var(--pulse-border)",
                      borderRadius: "12px",
                      padding: "12px",
                      color: "var(--pulse-text)",
                      outline: "none",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "var(--pulse-text-muted)", marginBottom: "6px" }}>{t("share.tags")}</label>
                  <input
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="AI, Science, Policy"
                    style={{
                      width: "100%",
                      background: "var(--pulse-surface)",
                      border: "1px solid var(--pulse-border)",
                      borderRadius: "12px",
                      padding: "12px",
                      color: "var(--pulse-text)",
                      outline: "none",
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {tagList.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: "0.75rem",
                    padding: "4px 10px",
                    borderRadius: "999px",
                    background: "var(--pulse-surface)",
                    border: "1px solid var(--pulse-border)",
                    color: "var(--pulse-text-muted)",
                    fontWeight: 500,
                  }}
                >
                  #{t}
                </span>
              ))}
            </div>

            <button className="btn-primary" type="submit" disabled={submitting} style={{ justifyContent: "center" }}>
              {submitting ? t("share.posting") : t("share.post")}
            </button>
          </form>

          <div className="glass-card" style={{ padding: "18px" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--pulse-text)" }}>{t("share.preview")}</h2>
            <div style={{ marginTop: "10px" }} className="glass">
              <div style={{ padding: "14px", borderRadius: "14px" }}>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--pulse-text-muted)" }}>
                  {content.trim() ? content.trim() : t("share.previewEmpty")}
                </p>
                {topic && (
                  <div style={{
                    marginTop: "12px", display: "inline-flex", alignItems: "center", gap: "6px",
                    fontSize: "0.7rem", padding: "2px 10px", borderRadius: "999px",
                    background: "var(--status-v-bg)", border: "1px solid var(--status-v-border)",
                    color: "var(--status-v-text)", fontWeight: 700
                  }}>
                    {t(topic)}
                  </div>
                )}
                {url.trim() && (
                  <p style={{ marginTop: "10px", fontSize: "0.8rem", color: "var(--pulse-secondary)", wordBreak: "break-word", fontWeight: 600 }}>
                    {url.trim()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
