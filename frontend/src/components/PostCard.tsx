"use client";
import { motion } from "framer-motion";
import { Shield, CheckCircle, AlertTriangle, XCircle, Clock, ExternalLink, Bookmark, Share2, ThumbsUp, Brain, Sparkles, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";

export type FactCheckStatus = "VERIFIED" | "DISPUTED" | "FALSE" | "PENDING";

export interface PostCardProps {
  id: string;
  author: { name: string; username: string; avatar?: string; reputationScore: number };
  content: string;
  tldrSummary?: string;
  originalUrl?: string;
  factCheckStatus: FactCheckStatus;
  trustScore?: number;
  tags: string[];
  timeAgo: string;
  likes: number;
  saves: number;
  showAvatar?: boolean;
}

const STATUS = {
  VERIFIED: { icon: CheckCircle, labelKey: "post.status.verified",  bg: "var(--status-v-bg)",  border: "var(--status-v-border)",  color: "var(--status-v-text)" },
  DISPUTED: { icon: AlertTriangle, labelKey: "post.status.disputed", bg: "var(--status-d-bg)",  border: "var(--status-d-border)",  color: "var(--status-d-text)" },
  FALSE:    { icon: XCircle,       labelKey: "post.status.false",    bg: "var(--status-f-bg)",  border: "var(--status-f-border)",  color: "var(--status-f-text)" },
  PENDING:  { icon: Clock,         labelKey: "post.status.pending",  bg: "var(--status-p-bg)",  border: "var(--status-p-border)",  color: "var(--status-p-text)" },
};

const AVATAR_GRADIENTS = [
  ["#6c63ff","#00d4ff"], ["#00d4ff","#00f5a0"], ["#ff6b9d","#6c63ff"],
  ["#f5a623","#ff6b9d"], ["#a78bfa","#6c63ff"], ["#34d399","#00d4ff"],
];

function getGradient(name: string) {
  const i = name.charCodeAt(0) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[i];
}

export function PostCard({ id, author, content, tldrSummary, originalUrl, factCheckStatus, trustScore, tags, timeAgo, likes, saves, showAvatar = true }: PostCardProps) {
  const [liked,       setLiked]       = useState(false);
  const [saved,       setSaved]       = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [likeCount,   setLikeCount]   = useState(likes);
  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "failed">("idle");
  const { t } = useI18n();

  const s = STATUS[factCheckStatus];
  const Icon = s.icon;
  const [from, to] = getGradient(author.name);

  const handleLike = () => {
    setLiked(p => !p);
    setLikeCount(c => liked ? c - 1 : c + 1);
  };

  const handleShare = async () => {
    const shareUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/posts/${encodeURIComponent(id)}`
        : `/posts/${encodeURIComponent(id)}`;

    try {
      const nav =
        typeof window !== "undefined"
          ? (window.navigator as Navigator & {
              share?: (data: { title?: string; text?: string; url?: string }) => Promise<void>;
              clipboard?: { writeText?: (text: string) => Promise<void> };
            })
          : undefined;

      if (nav?.share) {
        await nav.share({
          title: t("app.name"),
          text: tldrSummary ?? content.slice(0, 140),
          url: shareUrl,
        });
        setShareStatus("idle");
        return;
      }

      if (nav?.clipboard?.writeText) {
        await nav.clipboard.writeText(shareUrl);
        setShareStatus("copied");
        setTimeout(() => setShareStatus("idle"), 1200);
        return;
      }

      setShareStatus("failed");
      setTimeout(() => setShareStatus("idle"), 1200);
    } catch {
      setShareStatus("failed");
      setTimeout(() => setShareStatus("idle"), 1200);
    }
  };

  return (
    <motion.article
      className="glass-card"
      style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "14px", position: "relative", overflow: "hidden" }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      layout
    >
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: "linear-gradient(90deg, rgba(108,99,255,0) 0%, rgba(108,99,255,0.7) 50%, rgba(0,212,255,0) 100%)",
        borderRadius: "20px 20px 0 0",
      }} />

      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Avatar */}
          <div style={{ position: "relative" }}>
            {showAvatar && author.avatar ? (
              <img 
                src={author.avatar} 
                alt={author.name}
                style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  objectFit: "cover", boxShadow: `0 0 16px ${from}80`,
                }}
              />
            ) : (
              <div style={{
                width: "44px", height: "44px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: "1.1rem", color: "white", flexShrink: 0,
                background: `linear-gradient(135deg, ${from}, ${to})`,
                boxShadow: `0 0 16px ${from}80`,
              }}>{author.name.charAt(0)}</div>
            )}
            <span className="pulse-orb" style={{ position: "absolute", bottom: "-2px", right: "-2px" }} />
          </div>
          <div>
            <p style={{ fontWeight: 600, color: "var(--pulse-text)", fontSize: "0.9rem" }}>{author.name}</p>
            <p style={{ fontSize: "0.75rem", color: "var(--pulse-text-muted)" }}>@{author.username} · {timeAgo}</p>
          </div>
        </div>

        {/* Reputation */}
        <div style={{
          display: "flex", alignItems: "center", gap: "6px",
          padding: "4px 10px", borderRadius: "999px",
          background: "var(--pulse-orb-primary)", border: "1px solid var(--pulse-primary)",
        }}>
          <Shield style={{ width: "12px", height: "12px", color: "var(--pulse-primary)" }} />
          <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--pulse-primary)" }}>{author.reputationScore.toLocaleString()}</span>
        </div>
      </div>

      {/* ── Content ── */}
      <p
        style={{
          fontSize: "0.875rem",
          lineHeight: 1.7,
          color: "var(--pulse-text)",
          overflowWrap: "anywhere",
          wordBreak: "break-word",
        }}
      >
        {content}
      </p>

      {/* ── Link ── */}
      {originalUrl && (
        <a href={originalUrl} target="_blank" rel="noopener noreferrer" style={{
          display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem",
          padding: "8px 12px", borderRadius: "10px", textDecoration: "none",
          background: "var(--pulse-orb-secondary)", border: "1px solid var(--pulse-secondary)", color: "var(--pulse-secondary)",
          overflow: "hidden",
        }}>
          <ExternalLink style={{ width: "12px", height: "12px", flexShrink: 0 }} />
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: 500 }}>{originalUrl}</span>
        </a>
      )}

      {/* ── AI Summary ── */}
      {tldrSummary && (
        <div>
          <button
            onClick={() => setShowSummary(p => !p)}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              fontSize: "0.75rem", fontWeight: 700, color: "var(--pulse-primary)",
              background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: "8px",
            }}
          >
            <Sparkles style={{ width: "13px", height: "13px" }} />
            {t("post.aiTldr")} {showSummary ? "▲" : "▼"}
          </button>
          {showSummary && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                fontSize: "0.8rem", lineHeight: 1.6, padding: "12px",
                borderRadius: "12px", overflow: "hidden",
                background: "var(--pulse-orb-primary)", border: "1px solid var(--pulse-border)",
                color: "var(--pulse-text-muted)",
                overflowWrap: "anywhere",
                wordBreak: "break-word",
              }}
            >
              <div style={{ display: "flex", gap: "8px" }}>
                <Brain style={{ width: "13px", height: "13px", color: "var(--pulse-primary)", flexShrink: 0, marginTop: "2px" }} />
                <span>{tldrSummary}</span>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* ── Fact check + trust score ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          padding: "3px 10px", borderRadius: "8px", fontSize: "0.75rem", fontWeight: 700,
          background: s.bg, border: `1px solid ${s.border}`, color: s.color,
        }}>
          <Icon style={{ width: "12px", height: "12px" }} />
          {t(s.labelKey)}
        </div>

        {trustScore !== undefined && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ height: "5px", width: "80px", borderRadius: "999px", background: "var(--pulse-surface)", overflow: "hidden", border: "1px solid var(--pulse-border)" }}>
              <motion.div
                style={{
                  height: "100%", borderRadius: "999px",
                  background: trustScore > 70 ? "var(--pulse-success)" : trustScore > 40 ? "var(--pulse-warning)" : "var(--pulse-danger)",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${trustScore}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <span style={{ fontSize: "0.7rem", color: "var(--pulse-text-muted)", fontWeight: 600 }}>{trustScore}%</span>
          </div>
        )}
      </div>

      {/* ── Tags ── */}
      {tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {tags.map(tag => (
            <span key={tag} style={{
              fontSize: "0.7rem", padding: "2px 10px", borderRadius: "999px", cursor: "pointer",
              background: "var(--pulse-surface)", border: "1px solid var(--pulse-border)",
              color: "var(--pulse-text-muted)", fontWeight: 500,
            }}>#{tag}</span>
          ))}
        </div>
      )}

      {/* ── Actions ── */}
      <div style={{
        display: "flex", alignItems: "center", gap: "4px",
        paddingTop: "12px", borderTop: "1px solid var(--pulse-border)",
      }}>
        <button onClick={handleLike} style={{
          display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem",
          padding: "6px 12px", borderRadius: "8px", cursor: "pointer",
          background: liked ? "var(--pulse-orb-primary)" : "none", border: "none",
          color: liked ? "var(--pulse-primary)" : "var(--pulse-text-muted)", transition: "all 0.2s",
          fontWeight: liked ? 700 : 500,
        }}>
          <ThumbsUp style={{ width: "13px", height: "13px" }} /> {likeCount}
        </button>
        <button onClick={() => setSaved(p => !p)} style={{
          display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem",
          padding: "6px 12px", borderRadius: "8px", cursor: "pointer",
          background: saved ? "var(--pulse-orb-secondary)" : "none", border: "none",
          color: saved ? "var(--pulse-secondary)" : "var(--pulse-text-muted)", transition: "all 0.2s",
          fontWeight: saved ? 700 : 500,
        }}>
          <Bookmark style={{ width: "13px", height: "13px" }} /> {saves}
        </button>
        <Link href={`/posts/${encodeURIComponent(id)}`} style={{
          display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem",
          padding: "6px 12px", borderRadius: "8px", cursor: "pointer",
          background: "none", border: "none", color: "var(--pulse-text-muted)", textDecoration: "none", marginLeft: "auto",
          fontWeight: 500,
        }}>
          <ArrowUpRight style={{ width: "13px", height: "13px" }} /> {t("post.open")}
        </Link>
        <button onClick={handleShare} style={{
          display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem",
          padding: "6px 12px", borderRadius: "8px", cursor: "pointer",
          background: shareStatus === "copied" ? "var(--status-v-bg)" : shareStatus === "failed" ? "var(--status-f-bg)" : "none",
          border: "none",
          color: shareStatus === "copied" ? "var(--status-v-text)" : shareStatus === "failed" ? "var(--status-f-text)" : "var(--pulse-text-muted)",
          fontWeight: 600,
        }}>
          <Share2 style={{ width: "13px", height: "13px" }} /> {shareStatus === "copied" ? t("post.copied") : shareStatus === "failed" ? t("post.failed") : t("post.share")}
        </button>
      </div>
    </motion.article>
  );
}
