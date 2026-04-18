"use client";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Compass, Flame, BookOpen, Cpu, Globe, Leaf, FlaskConical, BarChart2, ArrowRight, Rocket, Shield, Briefcase, Zap, History } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { useRouter } from "next/navigation";

const categories = [
  { icon: Cpu,          key: "topic.ai",         count: "4.2k posts", color: "#6c63ff" },
  { icon: Globe,        key: "topic.geopolitics", count: "2.8k posts", color: "#00d4ff" },
  { icon: Flame,        key: "topic.climate",     count: "3.1k posts", color: "#00f5a0" },
  { icon: BookOpen,     key: "topic.philosophy",  count: "1.5k posts", color: "#ff6b9d" },
  { icon: BarChart2,    key: "topic.economics",   count: "2.2k posts", color: "#f5a623" },
  { icon: FlaskConical, key: "topic.science",     count: "1.9k posts", color: "#a78bfa" },
  { icon: Leaf,         key: "topic.biology",     count: "2.6k posts", color: "#34d399" },
  { icon: Cpu,          key: "topic.quantum",     count: "980 posts",  color: "#fb923c" },
  { icon: Rocket,       key: "topic.space",       count: "1.2k posts", color: "#8b5cf6" },
  { icon: Shield,       key: "topic.cyber",       count: "2.4k posts", color: "#ef4444" },
  { icon: Briefcase,    key: "topic.work",        count: "1.7k posts", color: "#6366f1" },
  { icon: Zap,          key: "topic.energy",      count: "3.5k posts", color: "#fbbf24" },
  { icon: History,      key: "topic.history",     count: "900 posts",  color: "#d946ef" },
  { icon: FlaskConical, key: "topic.biotech",     count: "2.1k posts", color: "#2dd4bf" },
];

const featuredPaths = [
  {
    id: "fp1",
    title: "Understanding Large Language Models",
    description: "From attention mechanisms to GPT-4o — a structured 12-node path through the core concepts.",
    nodes: 12, difficulty: "Intermediate", estimatedTime: "4h 30min", followers: 8420,
    tags: ["AI", "LLM", "Deep Learning"],
    gradientFrom: "#6c63ff", gradientTo: "#00d4ff",
  },
  {
    id: "fp2",
    title: "The Geopolitics of Semiconductor Supply Chains",
    description: "From TSMC to ASML — how chip manufacturing controls global power.",
    nodes: 9, difficulty: "Advanced", estimatedTime: "3h 15min", followers: 5610,
    tags: ["Geopolitics", "Technology", "Economics"],
    gradientFrom: "#00d4ff", gradientTo: "#00f5a0",
  },
  {
    id: "fp3",
    title: "Climate Science: Beyond CO₂",
    description: "Methane, albedo feedback loops, and ocean acidification — the complete picture.",
    nodes: 15, difficulty: "Beginner", estimatedTime: "6h 00min", followers: 12300,
    tags: ["Climate", "Science", "Environment"],
    gradientFrom: "#00f5a0", gradientTo: "#6c63ff",
  },
  {
    id: "fp4",
    title: "Mars Colonization: Logistics & Biology",
    description: "The challenges of sustaining life on the Red Planet, from rocket payloads to radiation shielding.",
    nodes: 11, difficulty: "Advanced", estimatedTime: "5h 20min", followers: 4100,
    tags: ["Space", "Biology", "Engineering"],
    gradientFrom: "#ff6b9d", gradientTo: "#f5a623",
  },
  {
    id: "fp5",
    title: "Macroeconomics: Beyond Interest Rates",
    description: "A deep dive into fiscal policy, sovereign debt, and how global markets react to instability.",
    nodes: 8, difficulty: "Intermediate", estimatedTime: "3h 45min", followers: 2900,
    tags: ["Economics", "Finance", "Policy"],
    gradientFrom: "#f5a623", gradientTo: "#ff6b9d",
  },
  {
    id: "fp6",
    title: "CRISPR & Synthetic Biology",
    description: "Editing the code of life: the science, ethics, and future of genomic engineering.",
    nodes: 14, difficulty: "Intermediate", estimatedTime: "6h 15min", followers: 7200,
    tags: ["Biology", "Genetics", "Ethics"],
    gradientFrom: "#a78bfa", gradientTo: "#6c63ff",
  },
];

const difficultyColors: Record<string, string> = {
  Beginner: "#00f5a0", Intermediate: "#f5a623", Advanced: "#ff6b9d",
};

export default function DiscoverPage() {
  const { t } = useI18n();
  const router = useRouter();
  return (
    <div className="min-h-screen">
      <Navbar />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "96px 24px 64px" }}>

        {/* Page header */}
        <motion.div style={{ marginBottom: "40px" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <Compass style={{ width: "20px", height: "20px", color: "#a78bfa" }} />
            <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--pulse-text-muted)" }}>
              {t("discover.eyebrow")}
            </span>
          </div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 900, color: "white" }}>{t("discover.title")}</h1>
          <p style={{ marginTop: "8px", color: "var(--pulse-text-muted)" }}>
            {t("discover.desc")}
          </p>
        </motion.div>

        {/* Category grid — 4 columns */}
        <section style={{ marginBottom: "56px" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "white", marginBottom: "16px" }}>{t("discover.byTopic")}</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
          }}>
            {categories.map(({ icon: Icon, key, count, color }, i) => (
              <motion.button
                key={key}
                className="glass-card"
                onClick={() => router.push(`/trending?topic=${encodeURIComponent(t(key))}`)}
                style={{
                  padding: "20px",
                  textAlign: "start",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  minHeight: "130px",
                  cursor: "pointer",
                  width: "100%",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4, scale: 1.01 }}
              >
                <div style={{
                  width: "44px", height: "44px", borderRadius: "12px",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  background: `${color}22`,
                  border: `1px solid ${color}55`,
                  boxShadow: `0 0 18px ${color}55`,
                }}>
                  <Icon style={{ width: "22px", height: "22px", color }} />
                </div>
                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "white", lineHeight: 1.3 }}>{t(key)}</p>
                  <p style={{ fontSize: "0.75rem", marginTop: "4px", color: "var(--pulse-text-muted)" }}>{count}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Featured knowledge paths — 3 columns */}
        <section>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "white", marginBottom: "16px" }}>{t("discover.featured")}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {featuredPaths.map(({ id, title, description, nodes, difficulty, estimatedTime, followers, tags, gradientFrom, gradientTo }, i) => (
              <motion.div
                key={id}
                className="glass-card"
                style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px", position: "relative", overflow: "hidden" }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                {/* Top gradient bar */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                  background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`,
                }} />

                <div>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px", marginBottom: "8px" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "white", lineHeight: 1.3 }}>{title}</h3>
                    <span style={{
                      fontSize: "0.7rem", padding: "2px 10px", borderRadius: "999px", flexShrink: 0, fontWeight: 600,
                      background: `${difficultyColors[difficulty]}18`,
                      color: difficultyColors[difficulty],
                      border: `1px solid ${difficultyColors[difficulty]}40`,
                    }}>
                      {difficulty}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "rgba(232,234,246,0.65)" }}>{description}</p>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {tags.map((t) => (
                    <span key={t} style={{
                      fontSize: "0.7rem", padding: "2px 10px", borderRadius: "999px",
                      background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                      color: "var(--pulse-text-muted)"
                    }}>#{t}</span>
                  ))}
                </div>

                <p style={{ fontSize: "0.75rem", color: "var(--pulse-text-muted)" }}>
                  {nodes} nodes · {estimatedTime} · {followers.toLocaleString()} following
                </p>

                <button
                  onClick={() => router.push(`/paths?id=${id}`)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    padding: "10px", borderRadius: "12px", fontSize: "0.875rem", fontWeight: 600,
                    cursor: "pointer", width: "100%", marginTop: "auto",
                    background: `linear-gradient(135deg, ${gradientFrom}25, ${gradientTo}25)`,
                    border: `1px solid ${gradientFrom}50`, color: gradientFrom,
                  }}
                >
                  {t("discover.startPath")} <ArrowRight style={{ width: "16px", height: "16px" }} />
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
