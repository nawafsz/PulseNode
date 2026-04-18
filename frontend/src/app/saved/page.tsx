"use client";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Bookmark, Sparkles, ExternalLink } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";

const saved = [
  {
    id: "s1",
    title: "OpenAI's Hybrid Architecture Could Reduce AI Costs by 60%",
    summary: "OpenAI's hybrid sparse-dense architecture could reduce inference costs by 60%, potentially enabling GPT-class AI on consumer devices within 18 months.",
    tags: ["AI", "OpenAI"],
    savedAt: "2h ago",
    trustScore: 91,
    status: "VERIFIED",
  },
  {
    id: "s2",
    title: "EU AI Act: How New Rules Affect Foundation Models",
    summary: "EU AI Act now classifies models trained above 10^25 FLOPs as high-risk, requiring conformity assessments. Q3 2026 deadline.",
    tags: ["EU AI Act", "Regulation"],
    savedAt: "1d ago",
    trustScore: 88,
    status: "VERIFIED",
  },
  {
    id: "s3",
    title: "IBM Condor Hits Sub-0.1% Error Rates in Quantum Gates",
    summary: "IBM's 1121-qubit Condor hits sub-0.1% two-qubit error rates — the key threshold for fault-tolerant quantum computing.",
    tags: ["Quantum", "IBM"],
    savedAt: "3d ago",
    trustScore: 94,
    status: "VERIFIED",
  },
];

const statusColors: Record<string, string> = { VERIFIED: "#00f5a0", DISPUTED: "#f5a623", FALSE: "#ff4d4d", PENDING: "#888" };

export default function SavedPage() {
  const { locale, t } = useI18n();

  const formatSavedAt = (raw: string) => {
    const m = raw.match(/^(\d+)(h|d) ago$/);
    if (!m) return raw;
    const n = Number(m[1]);
    const unit = m[2];
    if (locale === "ar") {
      if (unit === "h") return n === 1 ? "قبل ساعة" : n === 2 ? "قبل ساعتين" : `قبل ${n} ساعات`;
      return n === 1 ? "قبل يوم" : n === 2 ? "قبل يومين" : `قبل ${n} أيام`;
    }
    if (locale === "fr") return unit === "h" ? `il y a ${n} h` : `il y a ${n} j`;
    if (locale === "zh") return unit === "h" ? `${n} 小时前` : `${n} 天前`;
    return unit === "h" ? `${n}h ago` : `${n}d ago`;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">

        <motion.div className="mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-2">
            <Bookmark className="w-5 h-5 text-purple-400" />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--pulse-text-muted)" }}>{t("saved.eyebrow")}</span>
          </div>
          <h1 className="text-4xl font-black text-white">{t("saved.title")}</h1>
          <p className="text-base mt-2" style={{ color: "var(--pulse-text-muted)" }}>{t("saved.desc")}</p>
        </motion.div>

        <div className="space-y-4">
          {saved.map(({ id, title, summary, tags, savedAt, trustScore, status }, i) => (
            <motion.div
              key={id}
              className="glass-card p-5 flex flex-col gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-sm font-bold text-white leading-snug">{title}</h2>
                <button className="flex-shrink-0 text-xs" style={{ color: "var(--pulse-text-muted)" }}>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-start gap-2 p-3 rounded-xl" style={{ background: "rgba(108,99,255,0.06)", border: "1px solid rgba(108,99,255,0.15)" }}>
                <Sparkles className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed" style={{ color: "var(--pulse-text-muted)" }}>{summary}</p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--pulse-text-muted)" }}>
                    #{t}
                  </span>
                ))}
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-semibold ml-auto"
                  style={{ background: `${statusColors[status]}15`, color: statusColors[status], border: `1px solid ${statusColors[status]}35` }}
                >
                  {status}
                </span>
                <span className="text-xs" style={{ color: "var(--pulse-text-muted)" }}>{formatSavedAt(savedAt)}</span>
              </div>

              {/* Trust bar */}
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: "var(--pulse-text-muted)" }}>{t("saved.trust")}</span>
                <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "#00f5a0" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${trustScore}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                  />
                </div>
                <span className="text-xs font-semibold" style={{ color: "#00f5a0" }}>{trustScore}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
