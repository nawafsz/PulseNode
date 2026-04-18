"use client";
import { motion } from "framer-motion";
import { TrendingUp, Zap, Award, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";

const trending = [
  { rank: 1, topic: "GPT-5 Architecture Leak", growth: "+240%", hot: true },
  { rank: 2, topic: "Quantum Supremacy 2025",  growth: "+180%" },
  { rank: 3, topic: "CRISPR Gene Therapy",     growth: "+130%" },
  { rank: 4, topic: "EU AI Act Compliance",    growth: "+95%"  },
  { rank: 5, topic: "Fusion Energy Milestone", growth: "+72%"  },
];

const topContributors = [
  { name: "Dr. Sarah Chen", username: "sarahc", rep: 9420, avatar: "S", from: "#6c63ff", to: "#00d4ff" },
  { name: "Alex Rivera",    username: "alexr",  rep: 8750, avatar: "A", from: "#00d4ff", to: "#00f5a0" },
  { name: "Priya Nair",     username: "priyan", rep: 7890, avatar: "P", from: "#00f5a0", to: "#6c63ff" },
];

export function RightPanel() {
  const { t } = useI18n();
  return (
    <aside style={{ width: "280px", flexShrink: 0 }}>
      <div style={{ position: "sticky", top: "80px", display: "flex", flexDirection: "column", gap: "16px" }}>

        {/* AI Engine status */}
        <motion.div
          className="glass"
          style={{ padding: "16px" }}
          animate={{ boxShadow: ["0 0 20px rgba(108,99,255,0.05)", "0 0 30px rgba(108,99,255,0.15)", "0 0 20px rgba(108,99,255,0.05)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "10px", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(135deg, var(--pulse-primary), var(--pulse-secondary))",
            }}>
              <Zap style={{ width: "16px", height: "16px", color: "white" }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--pulse-text)" }}>{t("rightpanel.aiEngine")}</p>
              <p style={{ fontSize: "0.75rem", color: "var(--pulse-text-muted)" }}>{t("rightpanel.processing")} 42 {t("rightpanel.posts")}</p>
            </div>
            <span className="pulse-orb" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
            {[
              { label: t("rightpanel.summarized"), val: "1.2k" },
              { label: t("rightpanel.factChecked"), val: "890" },
              { label: t("rightpanel.embedded"), val: "3.5k" },
            ].map(({ label, val }) => (
              <div key={label} style={{
                textAlign: "center", padding: "8px 4px", borderRadius: "10px",
                background: "var(--pulse-surface)",
                border: "1px solid var(--pulse-border)",
              }}>
                <p className="gradient-text-purple" style={{ fontSize: "0.875rem", fontWeight: 700 }}>{val}</p>
                <p style={{ fontSize: "10px", marginTop: "2px", color: "var(--pulse-text-muted)" }}>{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trending now */}
        <div className="glass" style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <TrendingUp style={{ width: "14px", height: "14px", color: "var(--pulse-primary)" }} />
            <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--pulse-text-muted)" }}>
              {t("rightpanel.trendingNow")}
            </p>
          </div>
          {trending.map(({ rank, topic, growth, hot }) => (
            <div key={rank} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <span style={{
                fontSize: "0.75rem", fontWeight: 700, width: "20px", textAlign: "center", flexShrink: 0,
                color: rank <= 3 ? "var(--pulse-primary)" : "var(--pulse-text-muted)",
              }}>{rank}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--pulse-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {topic}
                  {hot && <span style={{
                    marginLeft: "6px", fontSize: "10px", padding: "1px 6px", borderRadius: "999px",
                    background: "var(--status-f-bg)", color: "var(--status-f-text)", border: "1px solid var(--status-f-border)",
                  }}>🔥</span>}
                </p>
                <p style={{ fontSize: "0.7rem", color: "var(--pulse-success)" }}>{growth}</p>
              </div>
              <ArrowUpRight style={{ width: "13px", height: "13px", color: "var(--pulse-primary)", flexShrink: 0 }} />
            </div>
          ))}
        </div>

        {/* Top contributors */}
        <div className="glass" style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Award style={{ width: "14px", height: "14px", color: "var(--pulse-warning)" }} />
            <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--pulse-text-muted)" }}>
              {t("rightpanel.topContributors")}
            </p>
          </div>
          {topContributors.map(({ name, username, rep, avatar, from, to }) => (
            <div key={username} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: "0.9rem", color: "white",
                background: `linear-gradient(135deg, ${from}, ${to})`,
              }}>{avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--pulse-text)" }}>{name}</p>
                <p style={{ fontSize: "0.7rem", color: "var(--pulse-text-muted)" }}>@{username}</p>
              </div>
              <span style={{
                fontSize: "0.7rem", padding: "2px 8px", borderRadius: "999px", fontWeight: 600,
                background: "var(--status-p-bg)", color: "var(--status-p-text)", border: "1px solid var(--status-p-border)",
              }}>{rep.toLocaleString()}</span>
            </div>
          ))}
        </div>

      </div>
    </aside>
  );
}
