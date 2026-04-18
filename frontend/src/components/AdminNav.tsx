"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, Flag, Headset, Settings, Users, UserRound, Waypoints } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";

export function AdminNav({ basePath = "/control-center" }: { basePath?: string }) {
  const pathname = usePathname();
  const { t } = useI18n();
  const items = [
    { href: `${basePath}`, key: "admin.dashboard", icon: BarChart3 },
    { href: `${basePath}/users`, key: "admin.users", icon: Users },
    { href: `${basePath}/posts`, key: "admin.posts", icon: FileText },
    { href: `${basePath}/reports`, key: "admin.reports", icon: Flag },
    { href: `${basePath}/paths`, key: "admin.paths", icon: Waypoints },
    { href: `${basePath}/settings`, key: "admin.adminSettings", icon: Settings },
    { href: `${basePath}/team`, key: "admin.team", icon: UserRound },
    { href: `${basePath}/support`, key: "admin.support", icon: Headset },
  ];

  return (
    <nav className="glass" style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
      {items.map((it) => {
        const active = it.href === basePath ? pathname === basePath : pathname === it.href || pathname.startsWith(`${it.href}/`);
        const Icon = it.icon;
        return (
          <Link
            key={it.href}
            href={it.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 12px",
              borderRadius: "12px",
              textDecoration: "none",
              transition: "all 0.2s",
              background: active ? "rgba(108,99,255,0.15)" : "transparent",
              color: active ? "#a78bfa" : "rgba(232,234,246,0.7)",
              border: active ? "1px solid rgba(108,99,255,0.25)" : "1px solid transparent",
            }}
          >
            <Icon style={{ width: "16px", height: "16px", flexShrink: 0 }} />
            <span style={{ fontSize: "0.875rem", fontWeight: 600, flex: 1 }}>{t(it.key)}</span>
          </Link>
        );
      })}
    </nav>
  );
}
