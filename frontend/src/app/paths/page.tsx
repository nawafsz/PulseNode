"use client";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { BookOpen, Check, Lock, ArrowRight, Clock, Star } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { useRouter } from "next/navigation";

const myPaths = [
  {
    id: "p1",
    title: "Understanding Large Language Models",
    progress: 58,
    totalNodes: 12,
    completedNodes: 7,
    lastActivity: "2h ago",
    gradientFrom: "#6c63ff",
    gradientTo: "#00d4ff",
  },
  {
    id: "p2",
    title: "Geopolitics of Semiconductor Supply Chains",
    progress: 22,
    totalNodes: 9,
    completedNodes: 2,
    lastActivity: "Yesterday",
    gradientFrom: "#00d4ff",
    gradientTo: "#00f5a0",
  },
];

const pathNodes = [
  { id: "n1", title: "What is a Transformer?", status: "done", time: "20 min" },
  { id: "n2", title: "Attention Is All You Need — Explained", status: "done", time: "35 min" },
  { id: "n3", title: "Pre-Training vs Fine-Tuning", status: "done", time: "25 min" },
  { id: "n4", title: "RLHF: Aligning Models to Human Values", status: "done", time: "40 min" },
  { id: "n5", title: "GPT-3 Architecture Deep Dive", status: "done", time: "45 min" },
  { id: "n6", title: "From GPT-3 to GPT-4: What Changed?", status: "done", time: "30 min" },
  { id: "n7", title: "The Context Window Problem", status: "done", time: "25 min" },
  { id: "n8", title: "Mixture of Experts Models", status: "active", time: "35 min" },
  { id: "n9", title: "Multimodal LLMs: Seeing and Reading", status: "locked", time: "40 min" },
  { id: "n10", title: "AI Agents and Tool Use", status: "locked", time: "50 min" },
  { id: "n11", title: "The Frontier: GPT-4o & Beyond", status: "locked", time: "45 min" },
  { id: "n12", title: "Capstone: Build a RAG Application", status: "locked", time: "90 min" },
];

const statusStyle = {
  done: { bg: "rgba(0,245,160,0.1)", border: "rgba(0,245,160,0.25)", color: "#00f5a0", icon: Check },
  active: { bg: "rgba(108,99,255,0.15)", border: "rgba(108,99,255,0.4)", color: "#a78bfa", icon: ArrowRight },
  locked: { bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.08)", color: "rgba(232,234,246,0.3)", icon: Lock },
};

export default function PathsPage() {
  const { locale, t } = useI18n();
  const router = useRouter();

  const formatLastActivity = (raw: string) => {
    if (raw === "Yesterday") {
      if (locale === "ar") return "أمس";
      if (locale === "fr") return "Hier";
      if (locale === "zh") return "昨天";
      return "Yesterday";
    }
    const m = raw.match(/^(\d+)h ago$/);
    if (!m) return raw;
    const n = Number(m[1]);
    if (locale === "ar") return n === 1 ? "قبل ساعة" : n === 2 ? "قبل ساعتين" : `قبل ${n} ساعات`;
    if (locale === "fr") return `il y a ${n} h`;
    if (locale === "zh") return `${n} 小时前`;
    return `${n}h ago`;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">

        {/* Header */}
        <motion.div className="mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--pulse-text-muted)" }}>{t("paths.eyebrow")}</span>
          </div>
          <h1 className="text-4xl font-black text-white">{t("paths.title")}</h1>
          <p className="text-base mt-2" style={{ color: "var(--pulse-text-muted)" }}>
            {t("paths.desc")}
          </p>
        </motion.div>

        {/* Active paths */}
        <section className="mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--pulse-text-muted)" }}>{t("paths.inProgress")}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {myPaths.map(({ id, title, progress, totalNodes, completedNodes, lastActivity, gradientFrom, gradientTo }, i) => (
              <motion.div
                key={id}
                className="glass-card p-5 relative overflow-hidden cursor-pointer"
                onClick={() => router.push(`/paths?id=${id}`)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})` }} />
                <h3 className="text-sm font-bold text-white mb-3 leading-snug">{title}</h3>

                {/* Progress bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1.5" style={{ color: "var(--pulse-text-muted)" }}>
                    <span>{completedNodes}/{totalNodes} {t("paths.nodes")}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs" style={{ color: "var(--pulse-text-muted)" }}>
                    <Clock className="w-3 h-3 inline mr-1" />
                    {formatLastActivity(lastActivity)}
                  </span>
                  <button
                    className="flex items-center gap-1 text-xs font-semibold"
                    style={{ color: gradientFrom }}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/paths?id=${id}&node=active`);
                    }}
                  >
                    {t("paths.continue")} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Path detail — node timeline */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--pulse-text-muted)" }}>
              {t("paths.detailTitle")}
            </h2>
            <div className="flex items-center gap-1 text-xs" style={{ color: "#f5a623" }}>
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-semibold">4.9</span>
              <span style={{ color: "var(--pulse-text-muted)" }}>(832 {t("paths.reviews")})</span>
            </div>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute top-0 bottom-0 w-px"
              style={{ insetInlineStart: "20px", background: "linear-gradient(180deg, #6c63ff40, transparent)" }}
            />

            <div className="space-y-3" style={{ paddingInlineStart: "48px" }}>
              {pathNodes.map(({ id, title, status, time }, i) => {
                const s = statusStyle[status as keyof typeof statusStyle];
                const Icon = s.icon;
                return (
                  <motion.div
                    key={id}
                    className="relative flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all"
                    onClick={() => {
                      if (status !== "locked") {
                        router.push(`/paths?id=p1&node=${id}`);
                      }
                    }}
                    style={{ background: s.bg, border: `1px solid ${s.border}` }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={status !== "locked" ? { x: 4 } : {}}
                  >
                    {/* Node dot */}
                    <div
                      className="absolute w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ insetInlineStart: "-48px", background: s.bg, border: `2px solid ${s.color}`, boxShadow: status !== "locked" ? `0 0 10px ${s.color}60` : "none" }}
                    >
                      <Icon className="w-2.5 h-2.5" style={{ color: s.color }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-medium"
                        style={{ color: status === "locked" ? "rgba(232,234,246,0.35)" : "var(--pulse-text)" }}
                      >
                        {title}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-xs flex-shrink-0" style={{ color: "var(--pulse-text-muted)" }}>
                      <Clock className="w-3 h-3" />
                      {time}
                    </div>

                    {status === "active" && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0" style={{ background: "rgba(108,99,255,0.2)", color: "#a78bfa", border: "1px solid rgba(108,99,255,0.35)" }}>
                        {t("paths.current")}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
