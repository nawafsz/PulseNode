"use client";
import { Navbar } from "@/components/Navbar";
import { MOCK_POSTS } from "@/lib/mockPosts";
import Link from "next/link";
import { readAuthUser, writeAuthUser, type AuthUser } from "@/lib/auth";
import { useI18n } from "@/components/I18nProvider";
import { useState, useEffect } from "react";
import { User, Settings, Camera, Check, Shield, Activity } from "lucide-react";

export default function ProfilePage() {
  const { locale, t } = useI18n();
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [showAvatar, setShowAvatar] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const user = readAuthUser();
    if (user) {
      setAuthUser(user);
      setName(user.name);
      setAvatarUrl(user.avatarUrl || "/avatars/default.png");
      setShowAvatar(user.showAvatarOnPosts !== false);
    }
  }, []);

  const handleSave = () => {
    if (!authUser) return;
    const updated = { ...authUser, name, avatarUrl, showAvatarOnPosts: showAvatar };
    writeAuthUser(updated);
    setAuthUser(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const fallbackName = locale === "ar" ? "مستخدم" : locale === "fr" ? "Utilisateur" : locale === "zh" ? "用户" : "User";
  const stats = {
    reputationScore: 8420,
    followers: 1280,
    following: 312,
  };

  const recentPosts = MOCK_POSTS.slice(0, 3);

  if (!authUser) return <div className="min-h-screen"><Navbar /><div style={{ padding: "100px", textAlign: "center", color: "var(--pulse-text)" }}>Loading...</div></div>;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Profile Header */}
      <div style={{ 
        height: "220px", 
        background: "linear-gradient(180deg, rgba(108,99,255,0.15) 0%, rgba(10,10,12,0) 100%)",
        borderBottom: "1px solid var(--pulse-border)"
      }} />

      <div style={{ maxWidth: "1000px", margin: "-80px auto 64px", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "24px", alignItems: "start" }}>
          
          {/* Sidebar / Photo */}
          <div style={{ display: "grid", gap: "24px" }}>
            <div className="glass-card" style={{ padding: "24px", textAlign: "center" }}>
              <div style={{ position: "relative", width: "140px", height: "140px", margin: "0 auto 16px" }}>
                <img
                  src={avatarUrl || "/avatars/default.png"}
                  alt={name}
                  style={{
                    width: "100%", height: "100%", borderRadius: "32px",
                    objectFit: "cover", border: "4px solid var(--pulse-border)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.2)"
                  }}
                />
                <div style={{ 
                  position: "absolute", bottom: "-8px", right: "-8px", 
                  width: "40px", height: "40px", borderRadius: "14px", 
                  background: "var(--pulse-primary)", display: "flex", 
                  alignItems: "center", justifyContent: "center", border: "4px solid var(--pulse-bg)"
                }}>
                  <Camera size={18} color="white" />
                </div>
              </div>
              <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "var(--pulse-text)", marginBottom: "4px" }}>{name}</h1>
              <p style={{ fontSize: "0.85rem", color: "var(--pulse-text-muted)", marginBottom: "20px" }}>@{authUser.username}</p>
              
              <div style={{ display: "flex", justifyContent: "center", gap: "20px", borderTop: "1px solid var(--pulse-border)", paddingTop: "20px" }}>
                <div>
                  <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--pulse-text)" }}>{stats.followers.toLocaleString()}</p>
                  <p style={{ fontSize: "0.7rem", color: "var(--pulse-text-muted)", textTransform: "uppercase" }}>{t("profile.followers")}</p>
                </div>
                <div style={{ width: "1px", background: "var(--pulse-border)" }} />
                <div>
                  <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--pulse-text)" }}>{stats.reputationScore.toLocaleString()}</p>
                  <p style={{ fontSize: "0.7rem", color: "var(--pulse-text-muted)", textTransform: "uppercase" }}>{t("profile.reputation")}</p>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: "20px" }}>
              <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--pulse-text)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Shield size={14} color="var(--pulse-primary)" /> {t("profile.personalInfo")}
              </h3>
              <div style={{ display: "grid", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.7rem", color: "var(--pulse-text-muted)", marginBottom: "4px" }}>{t("auth.register.name")}</label>
                  <input 
                    value={name} onChange={e => setName(e.target.value)}
                    style={{ width: "100%", background: "var(--pulse-surface)", border: "1px solid var(--pulse-border)", borderRadius: "8px", padding: "8px 12px", color: "var(--pulse-text)", fontSize: "0.85rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.7rem", color: "var(--pulse-text-muted)", marginBottom: "4px" }}>{t("profile.avatarUrl")}</label>
                  <input 
                    value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)}
                    style={{ width: "100%", background: "var(--pulse-surface)", border: "1px solid var(--pulse-border)", borderRadius: "8px", padding: "8px 12px", color: "var(--pulse-text)", fontSize: "0.85rem" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ display: "grid", gap: "24px" }}>
            <div className="glass-card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--pulse-text)", display: "flex", alignItems: "center", gap: "10px" }}>
                  <Settings size={20} color="var(--pulse-primary)" /> {t("profile.settings")}
                </h2>
                <button onClick={handleSave} className="btn-primary" style={{ padding: "8px 20px" }}>
                  {saved ? <Check size={18} /> : t("profile.save")}
                </button>
              </div>

              <div style={{ display: "grid", gap: "16px" }}>
                <label style={{ 
                  display: "flex", alignItems: "center", gap: "12px", padding: "16px", 
                  borderRadius: "14px", background: "var(--pulse-surface)", 
                  border: "1px solid var(--pulse-border)", cursor: "pointer" 
                }}>
                  <input 
                    type="checkbox" checked={showAvatar} onChange={e => setShowAvatar(e.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: "var(--pulse-primary)" }}
                  />
                  <div>
                    <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--pulse-text)" }}>{t("profile.showAvatar")}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--pulse-text-muted)" }}>Control privacy on your published articles</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="glass-card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--pulse-text)", display: "flex", alignItems: "center", gap: "10px" }}>
                  <Activity size={18} color="var(--pulse-primary)" /> {t("profile.recent")}
                </h2>
                <Link href="/" style={{ fontSize: "0.8rem", color: "var(--pulse-primary)", textDecoration: "none", fontWeight: 700 }}>{t("profile.backToFeed")}</Link>
              </div>
              
              <div style={{ display: "grid", gap: "12px" }}>
                {recentPosts.map((p) => (
                  <Link key={p.id} href={`/posts/${p.id}`} className="glass" style={{ padding: "16px", borderRadius: "16px", display: "block", textDecoration: "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                      {showAvatar ? (
                        <img src={avatarUrl} style={{ width: "24px", height: "24px", borderRadius: "50%" }} />
                      ) : (
                        <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--pulse-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", color: "white" }}>{name.charAt(0)}</div>
                      )}
                      <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--pulse-text)" }}>{name}</p>
                    </div>
                    <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "var(--pulse-text-muted)" }}>
                      {(p.tldrSummary || p.content).slice(0, 120)}...
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
