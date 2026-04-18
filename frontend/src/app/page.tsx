"use client";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Feed } from "@/components/Feed";
import { RightPanel } from "@/components/RightPanel";
import { Zap, ArrowRight, Brain, Shield, Sparkles } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";

function HeroSection() {
  const { t } = useI18n();
  return (
    <section style={{
      position: "relative",
      paddingTop: "112px",
      paddingBottom: "64px",
      paddingLeft: "24px",
      paddingRight: "24px",
      overflow: "hidden",
      backgroundImage: `
        linear-gradient(var(--pulse-grid-line) 1px, transparent 1px),
        linear-gradient(90deg, var(--pulse-grid-line) 1px, transparent 1px)
      `,
      backgroundSize: "50px 50px",
    }}>
      {/* Floating orbs */}
      <div className="animate-float" style={{
        position: "absolute", top: "60px", left: "25%",
        width: "288px", height: "288px", borderRadius: "50%",
        background: "radial-gradient(circle, var(--pulse-orb-primary), transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none",
      }} />
      <div className="animate-float" style={{
        position: "absolute", top: "96px", right: "25%",
        width: "224px", height: "224px", borderRadius: "50%",
        background: "radial-gradient(circle, var(--pulse-orb-secondary), transparent 70%)",
        filter: "blur(40px)", animationDelay: "-3s", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "896px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* Eyebrow */}
        <motion.div
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px", borderRadius: "999px", marginBottom: "24px",
            background: "rgba(108,99,255,0.12)", border: "1px solid rgba(108,99,255,0.3)",
          }}
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles style={{ width: "14px", height: "14px", color: "#a78bfa" }} />
          <span style={{ fontSize: "12px", fontWeight: 600, color: "#c4b5fd" }}>{t("home.eyebrow")}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "24px" }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        >
          {t("home.h1a")}{" "}
          <span className="gradient-text">{t("home.h1b")}</span>
          <br />
          {t("home.h1c")}{" "}
          <span style={{ color: "#00d4ff" }}>{t("home.h1d")}</span>
        </motion.h1>

        <motion.p
          style={{ fontSize: "1.1rem", maxWidth: "640px", margin: "0 auto 40px", lineHeight: 1.7, color: "var(--pulse-text-muted)" }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        >
          {t("home.desc")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        >
          <Link href="#feed" className="btn-primary">
            <Zap style={{ width: "16px", height: "16px" }} />
            {t("home.cta.feed")}
            <ArrowRight style={{ width: "16px", height: "16px" }} />
          </Link>
          <Link href="/discover" className="btn-ghost">
            {t("home.cta.explore")}
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginTop: "56px", maxWidth: "400px", margin: "56px auto 0" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        >
          {[
            { val: "50K+", label: t("home.stat.posts") },
            { val: "12K+", label: t("home.stat.paths") },
            { val: "99.1%", label: t("home.stat.accuracy") },
          ].map(({ val, label }) => (
            <div key={label} className="glass" style={{ padding: "12px 8px", textAlign: "center" }}>
              <p className="gradient-text" style={{ fontSize: "1.5rem", fontWeight: 900 }}>{val}</p>
              <p style={{ fontSize: "0.7rem", marginTop: "4px", color: "var(--pulse-text-muted)" }}>{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Feature pills */}
        <motion.div
          style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "32px", flexWrap: "wrap" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        >
          {[
            { icon: Brain, label: t("home.pill.tldr") },
            { icon: Shield, label: t("home.pill.fact") },
            { icon: Sparkles, label: t("home.pill.semantic") },
          ].map(({ icon: Icon, label }) => (
            <div key={label} style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "8px 16px", borderRadius: "12px",
              background: "var(--pulse-surface)", border: "1px solid var(--pulse-border)",
            }}>
              <Icon style={{ width: "14px", height: "14px", color: "#a78bfa" }} />
              <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--pulse-text-muted)" }}>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <HeroSection />

      {/* 3-column layout */}
      <div id="feed" style={{ maxWidth: "1400px", margin: "0 auto", padding: "32px 24px" }}>
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          <div style={{ flex: 1, minWidth: 0, width: "100%" }}>
            <Feed />
          </div>
          <div className="hidden xl:block">
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
