"use client";
import { motion } from "framer-motion";
import { PostCard } from "@/components/PostCard";
import { Brain, RefreshCw, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { MOCK_POSTS } from "@/lib/mockPosts";
import { useI18n } from "@/components/I18nProvider";

const filterKeys = ["filter.all", "filter.verified", "filter.trending", "filter.ai", "filter.science", "filter.tech", "filter.policy"] as const;
type FilterKey = typeof filterKeys[number];

export function Feed() {
  const { t } = useI18n();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("filter.all");
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/posts");
      const data = await res.json();
      // Transform backend data to match PostCard props
      const backendPosts = data.map((p: any) => ({
        id: p.id,
        author: {
          name: p.author.name,
          username: p.author.username,
          avatar: p.author.avatar || "/avatars/default.png",
          reputationScore: p.author.reputationScore,
        },
        content: p.content,
        tldrSummary: p.tldrSummary,
        originalUrl: p.originalUrl,
        factCheckStatus: p.factCheckStatus,
        trustScore: p.trustScore,
        tags: p.tags?.map((t: any) => t.name) || [],
        timeAgo: "Just now",
        likes: p.likes,
        saves: p.saves,
      }));
      setPosts([...backendPosts, ...MOCK_POSTS]);
    } catch (err) {
      console.error(err);
      setPosts(MOCK_POSTS);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleRefresh = () => {
    fetchPosts();
  };

  const tagQuery =
    activeFilter === "filter.ai" ? "ai" :
    activeFilter === "filter.science" ? "science" :
    activeFilter === "filter.tech" ? "tech" :
    activeFilter === "filter.policy" ? "policy" :
    null;

  const filteredPosts =
    activeFilter === "filter.all" ? posts :
    activeFilter === "filter.verified" ? posts.filter(p => p.factCheckStatus === "VERIFIED") :
    activeFilter === "filter.trending" ? [...posts].sort((a, b) => b.likes - a.likes) :
    posts.filter(p => tagQuery ? p.tags.some((tag: string) => tag.toLowerCase().includes(tagQuery)) : true);

  return (
    <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "16px" }}>

      {/* Feed header */}
      <div className="glass" style={{ padding: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Brain style={{ width: "18px", height: "18px", color: "var(--pulse-primary)" }} />
            <h1 style={{ fontWeight: 700, color: "var(--pulse-text)", fontSize: "1rem" }}>{t("feed.title")}</h1>
          </div>
          <button
            onClick={handleRefresh}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              fontSize: "0.75rem", padding: "6px 12px", borderRadius: "10px",
              background: "none", border: "1px solid var(--pulse-border)",
              color: "var(--pulse-text-muted)", cursor: "pointer",
            }}
          >
            <RefreshCw style={{ width: "12px", height: "12px" }} className={loading ? "animate-spin" : ""} />
            {t("feed.refresh")}
          </button>
        </div>

        {/* Filter pills */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
          <Filter style={{ width: "13px", height: "13px", flexShrink: 0, color: "var(--pulse-text-muted)" }} />
          {filterKeys.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                flexShrink: 0, fontSize: "0.75rem", padding: "6px 14px", borderRadius: "999px",
                cursor: "pointer", fontWeight: 500, transition: "all 0.2s",
                background: activeFilter === f ? "var(--pulse-orb-primary)" : "var(--pulse-surface)",
                border: activeFilter === f ? "1px solid var(--pulse-primary)" : "1px solid var(--pulse-border)",
                color: activeFilter === f ? "var(--pulse-primary)" : "var(--pulse-text-muted)",
              }}
            >{t(f)}</button>
          ))}
        </div>
      </div>

      {/* Semantic banner */}
      <motion.div
        className="glass"
        style={{
          padding: "14px 16px", display: "flex", alignItems: "center", gap: "12px",
          border: "1px solid var(--pulse-border)", background: "var(--pulse-surface)",
        }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
      >
        <div style={{
          width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "linear-gradient(135deg, var(--pulse-orb-primary), var(--pulse-orb-secondary))",
          border: "1px solid var(--pulse-border)",
        }}>
          <Brain style={{ width: "16px", height: "16px", color: "var(--pulse-primary)" }} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--pulse-text)" }}>{t("feed.semanticTitle")}</p>
          <p style={{ fontSize: "0.75rem", marginTop: "2px", color: "var(--pulse-text-muted)" }}>
            {t("feed.semanticDesc")}
          </p>
        </div>
        <div style={{
          flexShrink: 0, fontSize: "0.75rem", padding: "3px 10px", borderRadius: "999px",
          background: "var(--status-v-bg)", color: "var(--status-v-text)", border: "1px solid var(--status-v-border)",
        }}>{t("feed.live")}</div>
      </motion.div>

      {/* Posts */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          overflowY: "auto",
          maxHeight: "calc(100vh - 360px)",
          paddingRight: "6px",
          overscrollBehavior: "contain",
        }}
      >
        {filteredPosts.length === 0 ? (
          <div className="glass" style={{ padding: "40px", textAlign: "center" }}>
            <p style={{ fontSize: "0.875rem", color: "var(--pulse-text-muted)" }}>{t("feed.empty")}</p>
          </div>
        ) : (
          filteredPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
            >
              <PostCard {...post} />
            </motion.div>
          ))
        )}
      </div>
    </main>
  );
}
