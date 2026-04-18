export type AuthUser = {
  id: string;
  name: string;
  username: string;
  email?: string;
  role?: "user" | "admin";
  avatarUrl?: string;
  showAvatarOnPosts?: boolean;
};

const STORAGE_KEY = "pulsenode.user";

export function readAuthUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as any;
    if (parsed && typeof parsed.name === "string" && typeof parsed.username === "string") {
      return {
        id: parsed.id || "system-user",
        name: parsed.name,
        username: parsed.username,
        email: parsed.email,
        role: parsed.role,
        avatarUrl: parsed.avatarUrl,
        showAvatarOnPosts: parsed.showAvatarOnPosts ?? true,
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function writeAuthUser(user: AuthUser) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearAuthUser() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export const ADMIN_EMAIL = "nsznsz201@gmail.com";

export function isAdminUser(user: AuthUser | null | undefined) {
  if (!user) return false;
  if (user.role === "admin") return true;
  return (user.email ?? "").toLowerCase() === ADMIN_EMAIL.toLowerCase();
}
