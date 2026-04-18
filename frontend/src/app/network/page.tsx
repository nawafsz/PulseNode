"use client";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Users, UserPlus, MessageCircle, Shield } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { readAuthUser } from "@/lib/auth";
import { useEffect, useMemo, useState } from "react";

const suggested = [
  { name: "Dr. Sarah Chen", username: "sarahc", email: "sarahc@mindly.ai", rep: 9420, specialty: "AI Research", avatar: "S", mutual: 12, following: false },
  { name: "Alex Rivera", username: "alexr", email: "alexr@mindly.ai", rep: 8750, specialty: "Geopolitics", avatar: "A", mutual: 8, following: true },
  { name: "Priya Nair", username: "priyan", email: "priyan@mindly.ai", rep: 7890, specialty: "Climate Science", avatar: "P", mutual: 5, following: false },
  { name: "Marcus Webb", username: "marcusw", email: "marcusw@mindly.ai", rep: 5230, specialty: "Quantum Computing", avatar: "M", mutual: 3, following: false },
  { name: "Zoe Kim", username: "zoek", email: "zoek@mindly.ai", rep: 3100, specialty: "Fact-Checking", avatar: "Z", mutual: 7, following: true },
  { name: "Raj Patel", username: "rajp", email: "rajp@mindly.ai", rep: 6600, specialty: "Infrastructure & DevOps", avatar: "R", mutual: 2, following: false },
];

const avatarGradients = ["#6c63ff,#00d4ff", "#00d4ff,#00f5a0", "#00f5a0,#6c63ff", "#ff6b9d,#6c63ff", "#f5a623,#ff6b9d", "#a78bfa,#6c63ff"];

export default function NetworkPage() {
  const { locale, t } = useI18n();
  const currentUser = useMemo(() => readAuthUser(), []);
  const [toast, setToast] = useState<string | null>(null);
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = window.localStorage.getItem("mindly.following");
      if (!raw) return {};
      const parsed = JSON.parse(raw) as unknown;
      if (typeof parsed === "object" && parsed !== null) return parsed as Record<string, boolean>;
      return {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    if (!toast) return;
    const tmr = window.setTimeout(() => setToast(null), 1400);
    return () => window.clearTimeout(tmr);
  }, [toast]);

  const setFollowing = (username: string, next: boolean) => {
    setFollowingMap((prev) => {
      const updated = { ...prev, [username]: next };
      try {
        window.localStorage.setItem("mindly.following", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const formatMutual = (n: number) => {
    if (locale === "ar") return `${n} ${t("network.mutual")}`;
    if (locale === "fr") return `${n} ${t("network.mutual")}`;
    if (locale === "zh") return `${n} ${t("network.mutual")}`;
    return `${n} ${t("network.mutual")}`;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {toast && (
          <div style={{ position: "fixed", bottom: "18px", left: "50%", transform: "translateX(-50%)", zIndex: 60 }}>
            <div className="glass" style={{ padding: "10px 14px", borderRadius: "12px", color: "var(--pulse-text)", fontSize: "0.85rem" }}>
              {toast}
            </div>
          </div>
        )}

        <motion.div className="mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-purple-400" />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--pulse-text-muted)" }}>{t("network.eyebrow")}</span>
          </div>
          <h1 className="text-4xl font-black text-white">{t("network.title")}</h1>
          <p className="text-base mt-2" style={{ color: "var(--pulse-text-muted)" }}>
            {t("network.desc")}
          </p>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          className="grid grid-cols-3 gap-4 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {[
            { label: t("network.stat.following"), val: "148" },
            { label: t("network.stat.followers"), val: "2.3k" },
            { label: t("network.stat.avgRep"), val: "7,240" },
          ].map(({ label, val }) => (
            <div key={label} className="glass p-4 text-center">
              <p className="text-2xl font-black gradient-text">{val}</p>
              <p className="text-xs mt-1" style={{ color: "var(--pulse-text-muted)" }}>{label}</p>
            </div>
          ))}
        </motion.div>

        <h2 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--pulse-text-muted)" }}>
          {t("network.suggested")}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {suggested.map(({ name, username, email, rep, specialty, avatar, mutual, following }, i) => {
            const [from, to] = avatarGradients[i % avatarGradients.length].split(",");
            const isFollowing = followingMap[username] ?? following;
            return (
              <motion.div
                key={username}
                className="glass-card p-5 flex gap-4 items-start"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                {/* Avatar */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${from}, ${to})`, boxShadow: `0 0 20px ${from}50` }}
                >
                  {avatar}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-white">{name}</span>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full" style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)" }}>
                      <Shield className="w-2.5 h-2.5 text-purple-400" />
                      <span className="text-xs font-semibold text-purple-300">{rep.toLocaleString()}</span>
                    </div>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "var(--pulse-text-muted)" }}>@{username} · {specialty}</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(232,234,246,0.4)" }}>{formatMutual(mutual)}</p>
                  <p className="text-xs mt-1" style={{ color: "var(--pulse-text-muted)" }}>
                    {t("network.email")}: {email}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() => setFollowing(username, !isFollowing)}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all"
                      style={{
                        background: isFollowing ? "rgba(255,255,255,0.05)" : "rgba(108,99,255,0.2)",
                        border: isFollowing ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(108,99,255,0.4)",
                        color: isFollowing ? "rgba(232,234,246,0.6)" : "#a78bfa",
                      }}
                    >
                      <UserPlus className="w-3 h-3" />
                      {isFollowing ? t("network.followingBtn") : t("network.follow")}
                    </button>
                    <button
                      type="button"
                      disabled={!isFollowing}
                      onClick={() => {
                        if (!isFollowing) {
                          setToast(t("network.messageLocked"));
                          return;
                        }
                        const subject = encodeURIComponent(t("network.mailSubject"));
                        const fromEmail = currentUser?.email ? `\n\nFrom: ${currentUser.email}` : "";
                        const body = encodeURIComponent(fromEmail);
                        window.location.href = `mailto:${encodeURIComponent(email)}?subject=${subject}&body=${body}`;
                      }}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
                      style={{
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: isFollowing ? "var(--pulse-text-muted)" : "rgba(232,234,246,0.35)",
                        opacity: isFollowing ? 1 : 0.7,
                        cursor: isFollowing ? "pointer" : "not-allowed",
                      }}
                    >
                      <MessageCircle className="w-3 h-3" />
                      {t("network.message")}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
