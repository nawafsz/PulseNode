"use client";
import { Home, Compass, BookOpen, TrendingUp, Users, Star, Plus, ChevronRight, User, Settings, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { isAdminUser, readAuthUser } from "@/lib/auth";
import { useI18n } from "@/components/I18nProvider";

const navItems = [
  { icon: Home,       key: "sidebar.feed",     href: "/",         badge: null },
  { icon: Compass,    key: "sidebar.discover", href: "/discover", badge: "New" },
  { icon: TrendingUp, key: "sidebar.trending", href: "/trending", badge: null },
  { icon: BookOpen,   key: "sidebar.paths",    href: "/paths",    badge: "3" },
  { icon: Users,      key: "sidebar.network",  href: "/network",  badge: null },
  { icon: Star,       key: "sidebar.saved",    href: "/saved",    badge: null },
  { icon: User,       key: "sidebar.profile",  href: "/profile",  badge: null },
  { icon: Settings,   key: "sidebar.settings", href: "/settings", badge: null },
  { icon: Shield,     key: "sidebar.admin",    href: "/control-center",    badge: null },
];

const topics = [
  { key: "topic.ai",         color: "#6c63ff" },
  { key: "topic.geopolitics", color: "#00d4ff" },
  { key: "topic.climate",    color: "#00f5a0" },
  { key: "topic.quantum",    color: "#ff6b9d" },
  { key: "topic.space",      color: "#8b5cf6" },
  { key: "topic.cyber",      color: "#ef4444" },
  { key: "topic.macro",      color: "#fbbf24" },
  { key: "topic.arts",       color: "#d946ef" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useI18n();
  const showAdmin = isAdminUser(readAuthUser());

  return (
    <aside style={{ width: "240px", flexShrink: 0 }}>
      <div style={{ position: "sticky", top: "80px", display: "flex", flexDirection: "column", gap: "12px" }}>

        {/* Navigation */}
        <nav className="glass" style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {navItems
            .filter((it) => (it.key === "sidebar.admin" ? showAdmin : true))
            .map(({ icon: Icon, key, href, badge }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link key={href} href={href} style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "10px 12px", borderRadius: "12px", textDecoration: "none",
                transition: "all 0.2s",
                background: active ? "var(--pulse-orb-primary)" : "transparent",
                color: active ? "var(--pulse-primary)" : "var(--pulse-text-muted)",
                border: active ? "1px solid var(--pulse-primary)" : "1px solid transparent",
              }}>
                <Icon style={{ width: "16px", height: "16px", flexShrink: 0, color: active ? "var(--pulse-primary)" : "inherit" }} />
                <span style={{ fontSize: "0.875rem", fontWeight: active ? 700 : 500, flex: 1 }}>{t(key)}</span>
                {badge && (
                  <span style={{
                    fontSize: "0.7rem", padding: "2px 8px", borderRadius: "999px", fontWeight: 600,
                    background: badge === "New" ? "var(--status-v-bg)" : "var(--status-p-bg)",
                    color: badge === "New" ? "var(--status-v-text)" : "var(--status-p-text)",
                    border: `1px solid ${badge === "New" ? "var(--status-v-border)" : "var(--status-p-border)"}`,
                  }}>{badge === "New" ? t("common.new") : badge}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Create post CTA */}
        <Link
          href="/share"
          className="btn-primary"
          style={{ width: "100%", justifyContent: "center", fontSize: "0.875rem" }}
          onClick={(e) => {
            if (!readAuthUser()) {
              e.preventDefault();
              router.push("/register");
            }
          }}
        >
          <Plus style={{ width: "16px", height: "16px" }} />
          {t("sidebar.share")}
        </Link>

        {/* Trending topics */}
        <div className="glass" style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--pulse-text-muted)" }}>
            {t("sidebar.topTopics")}
          </p>
          {topics.map(({ key, color }) => (
            <button
              key={key}
              onClick={() => router.push(`/trending?topic=${encodeURIComponent(t(key))}`)}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                width: "100%", background: "none", border: "none", cursor: "pointer", padding: 0,
              }}
            >
              <span style={{
                width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0,
                background: color, boxShadow: `0 0 6px ${color}`,
              }} />
              <span style={{ fontSize: "0.8rem", flex: 1, textAlign: "start", color: "var(--pulse-text-muted)", fontWeight: 500 }}>{t(key)}</span>
              <ChevronRight style={{ width: "12px", height: "12px", color, opacity: 0.8 }} />
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
