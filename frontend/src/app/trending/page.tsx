"use client";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { TrendingUp, Flame, ArrowUpRight, Clock } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";

const trendingTopics = [
  { rank: 1, topic: "GPT-5 Architecture Leak", growth: "+240%", posts: 1842, hot: true, category: "AI" },
  { rank: 2, topic: "Quantum Supremacy 2025", growth: "+180%", posts: 1230, category: "Science" },
  { rank: 3, topic: "CRISPR Gene Therapy Trials", growth: "+130%", posts: 984, hot: true, category: "Biology" },
  { rank: 4, topic: "EU AI Act Enforcement", growth: "+95%", posts: 766, category: "Policy" },
  { rank: 5, topic: "NIF Fusion Ignition", growth: "+72%", posts: 630, hot: true, category: "Energy" },
  { rank: 6, topic: "Starship Full Stack Test", growth: "+68%", posts: 590, category: "Space" },
  { rank: 7, topic: "China Semiconductor Surge", growth: "+55%", posts: 512, category: "Economics" },
  { rank: 8, topic: "Alzheimer's mRNA Vaccine", growth: "+49%", posts: 430, category: "Health" },
  { rank: 9, topic: "Web3 Social Protocols", growth: "+42%", posts: 387, category: "Web3" },
  { rank: 10, topic: "Carbon Capture Scaling", growth: "+38%", posts: 355, category: "Climate" },
];

const categoryColors: Record<string, string> = {
  AI: "#6c63ff",
  Science: "#00d4ff",
  Biology: "#34d399",
  Policy: "#f5a623",
  Energy: "#00f5a0",
  Space: "#a78bfa",
  Economics: "#fb923c",
  Health: "#ff6b9d",
  Web3: "#fbbf24",
  Climate: "#4ade80",
};

const timeframes = ["1h", "24h", "7d", "30d"];

export default function TrendingPage() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">

        {/* Header */}
        <motion.div className="mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--pulse-text-muted)" }}>{t("trending.eyebrow")}</span>
          </div>
          <h1 className="text-4xl font-black text-white">{t("trending.title")}</h1>
          <p className="text-base mt-2" style={{ color: "var(--pulse-text-muted)" }}>
            {t("trending.desc")}
          </p>
        </motion.div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-3 mb-8">
          <Clock className="w-4 h-4" style={{ color: "var(--pulse-text-muted)" }} />
          <div className="flex gap-2">
            {timeframes.map((t) => (
              <button
                key={t}
                className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
                style={{
                  background: t === "24h" ? "rgba(108,99,255,0.2)" : "rgba(255,255,255,0.04)",
                  border: t === "24h" ? "1px solid rgba(108,99,255,0.4)" : "1px solid rgba(255,255,255,0.08)",
                  color: t === "24h" ? "#a78bfa" : "rgba(232,234,246,0.6)",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Trending list */}
        <div className="space-y-3">
          {trendingTopics.map(({ rank, topic, growth, posts, hot, category }, i) => {
            const color = categoryColors[category] ?? "#6c63ff";
            return (
              <motion.div
                key={rank}
                className="glass-card px-5 py-4 flex items-center gap-4 cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ x: 4 }}
              >
                {/* Rank */}
                <span
                  className="text-2xl font-black w-8 text-center flex-shrink-0"
                  style={{ color: rank <= 3 ? "#6c63ff" : "rgba(255,255,255,0.2)" }}
                >
                  {rank}
                </span>

                {/* Main info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base font-semibold text-white">{topic}</span>
                    {hot && (
                      <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,107,157,0.15)", color: "#ff6b9d", border: "1px solid rgba(255,107,157,0.25)" }}>
                        <Flame className="w-3 h-3" /> {t("trending.hot")}
                      </span>
                    )}
                  </div>
                  <p className="text-xs mt-1" style={{ color: "var(--pulse-text-muted)" }}>
                    {posts.toLocaleString()} {t("trending.posts")}
                  </p>
                </div>

                {/* Category badge */}
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0"
                  style={{ background: `${color}15`, color, border: `1px solid ${color}35` }}
                >
                  {category}
                </span>

                {/* Growth */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <ArrowUpRight className="w-4 h-4" style={{ color: "#00f5a0" }} />
                  <span className="text-sm font-bold" style={{ color: "#00f5a0" }}>{growth}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
