"use client";
import { motion } from "framer-motion";
import { Bell, Search, User, Settings, LogOut, ChevronDown, Menu, X, Shield, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { clearAuthUser, isAdminUser, readAuthUser, type AuthUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useI18n } from "@/components/I18nProvider";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(() => readAuthUser());
  const [langOpen, setLangOpen] = useState(false);
  const { locale, setLocale, t } = useI18n();
  const router = useRouter();

  useEffect(() => {
    setUser(readAuthUser());
  }, []);

  const initials = user?.name ? user.name.trim().slice(0, 1).toUpperCase() : "?";
  const showAdmin = isAdminUser(user);

  const toggleTheme = () => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const current = root.dataset.theme === "light" ? "light" : "dark";
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      window.localStorage.setItem("pulsenode.theme", next);
    } catch {}
  };

  const handleLogout = () => {
    clearAuthUser();
    setUser(null);
    setProfileOpen(false);
    router.push("/login");
  };

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: "var(--pulse-glass-bg)",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      borderBottom: "1px solid var(--pulse-border)",
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px", gap: "16px" }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}>
            <span style={{ position: "relative", width: "36px", height: "36px", display: "block", flexShrink: 0 }}>
              <Image className="logo-dark" src="/mindly-mark-dark.svg" alt="Mindly" width={36} height={36} priority />
              <Image className="logo-light" src="/mindly-mark-light.svg" alt="Mindly" width={36} height={36} priority />
            </span>
            <span className="gradient-text" style={{ fontSize: "1.2rem", fontWeight: 800 }}>Mindly</span>
          </Link>

          {/* Search */}
          <div style={{
            flex: 1, maxWidth: "480px",
            display: "flex", alignItems: "center", gap: "8px",
            padding: "8px 16px", borderRadius: "12px",
            background: "var(--pulse-surface)", border: "1px solid var(--pulse-border)",
          }}>
            <Search style={{ width: "15px", height: "15px", color: "var(--pulse-text-muted)", flexShrink: 0 }} />
            <input
              type="search"
              placeholder={t("nav.search")}
              style={{
                background: "transparent", border: "none", outline: "none",
                width: "100%", fontSize: "0.875rem", color: "var(--pulse-text)",
              }}
            />
            <kbd style={{
              fontSize: "11px", padding: "2px 6px", borderRadius: "6px",
              background: "var(--pulse-surface)", color: "var(--pulse-text-muted)",
              border: "1px solid var(--pulse-border)", flexShrink: 0,
            }}>⌘K</kbd>
          </div>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* Bell */}
            <button style={{
              position: "relative", width: "36px", height: "36px", borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "var(--pulse-surface)", border: "1px solid var(--pulse-border)", cursor: "pointer",
            }}>
              <Bell style={{ width: "16px", height: "16px", color: "var(--pulse-text-muted)" }} />
              <span style={{
                position: "absolute", top: "8px", right: "8px", width: "7px", height: "7px",
                borderRadius: "50%", background: "var(--pulse-danger)", boxShadow: "0 0 6px var(--pulse-danger)",
              }} />
            </button>

            <div style={{ position: "relative" }}>
              <button
                onClick={() => setLangOpen((p) => !p)}
                type="button"
                aria-label={t("nav.language")}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--pulse-surface)",
                  border: "1px solid var(--pulse-border)",
                  cursor: "pointer",
                }}
              >
                <Image
                  src={locale === "ar" ? "/flag-ar.svg" : locale === "fr" ? "/flag-fr.svg" : locale === "zh" ? "/flag-zh.svg" : "/flag-en.svg"}
                  alt={t("nav.language")}
                  width={20}
                  height={14}
                />
              </button>

              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 8px)",
                    width: "190px",
                    borderRadius: "14px",
                    overflow: "hidden",
                    background: "var(--pulse-glass-bg)",
                    border: "1px solid var(--pulse-border)",
                    backdropFilter: "blur(20px)",
                    zIndex: 100,
                  }}
                >
                  {[
                    { code: "en" as const, label: "English", flag: "/flag-en.svg" },
                    { code: "ar" as const, label: "العربية", flag: "/flag-ar.svg" },
                    { code: "fr" as const, label: "Français", flag: "/flag-fr.svg" },
                    { code: "zh" as const, label: "中文", flag: "/flag-zh.svg" },
                  ].map((opt) => (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => {
                        setLocale(opt.code);
                        setLangOpen(false);
                        setProfileOpen(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        width: "100%",
                        padding: "12px 16px",
                        fontSize: "0.875rem",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: opt.code === locale ? "var(--pulse-primary)" : "var(--pulse-text-muted)",
                        textAlign: "start",
                        fontWeight: opt.code === locale ? 700 : 500,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--pulse-orb-primary)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                    >
                      <Image src={opt.flag} alt={opt.label} width={20} height={14} />
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            <button
              onClick={toggleTheme}
              type="button"
              aria-label={t("nav.toggleTheme")}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--pulse-surface)",
                border: "1px solid var(--pulse-border)",
                cursor: "pointer",
              }}
            >
              <Sun className="theme-icon-sun" style={{ width: "16px", height: "16px", color: "var(--pulse-text-muted)" }} />
              <Moon className="theme-icon-moon" style={{ width: "16px", height: "16px", color: "var(--pulse-text-muted)" }} />
            </button>

            {/* Profile */}
            <div style={{ position: "relative" }}>
              {user ? (
                <button
                  onClick={() => setProfileOpen((p) => !p)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 12px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    background: "var(--pulse-surface)",
                    border: "1px solid var(--pulse-border)",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "white",
                      background: "linear-gradient(135deg, var(--pulse-primary), var(--pulse-secondary))",
                    }}
                  >
                    {initials}
                  </div>
                  <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--pulse-text)" }}>{user.name}</span>
                  <ChevronDown style={{ width: "14px", height: "14px", color: "var(--pulse-text-muted)" }} />
                </button>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Link href="/login" className="btn-ghost" style={{ padding: "8px 12px", borderRadius: "10px" }}>
                    {t("nav.signIn")}
                  </Link>
                  <Link href="/register" className="btn-primary" style={{ padding: "8px 12px", borderRadius: "10px" }}>
                    {t("nav.signUp")}
                  </Link>
                </div>
              )}

              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  style={{
                    position: "absolute", right: 0, top: "calc(100% + 8px)",
                    width: "180px", borderRadius: "14px", overflow: "hidden",
                    background: "var(--pulse-glass-bg)", border: "1px solid var(--pulse-border)",
                    backdropFilter: "blur(20px)", zIndex: 100,
                  }}
                >
                  {[
                    { icon: User, label: t("nav.profile"), href: "/profile", kind: "link" as const },
                    { icon: Settings, label: t("nav.settings"), href: "/settings", kind: "link" as const },
                    ...(showAdmin ? [{ icon: Shield, label: t("nav.admin"), href: "/control-center", kind: "link" as const }] : []),
                    { icon: LogOut, label: t("nav.signOut"), href: "/login", kind: "logout" as const },
                  ].map(({ icon: Icon, label, href, kind }) => (
                    <Link
                      key={label}
                      href={href}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        width: "100%",
                        padding: "12px 16px",
                        fontSize: "0.875rem",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--pulse-text-muted)",
                        textAlign: "start",
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                      onClick={(e) => {
                        if (kind === "logout") {
                          e.preventDefault();
                          handleLogout();
                          return;
                        }
                        setProfileOpen(false);
                        setLangOpen(false);
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--pulse-orb-primary)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                    >
                      <Icon style={{ width: "15px", height: "15px", color: "var(--pulse-primary)" }} />
                      {label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(p => !p)}
              style={{
                width: "36px", height: "36px", borderRadius: "10px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "var(--pulse-surface)", border: "1px solid var(--pulse-border)", cursor: "pointer",
              }}
            >
              {menuOpen
                ? <X style={{ width: "16px", height: "16px", color: "var(--pulse-text)" }} />
                : <Menu style={{ width: "16px", height: "16px", color: "var(--pulse-text)" }} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
