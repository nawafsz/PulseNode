"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { AdminNav } from "@/components/AdminNav";
import { isAdminUser, readAuthUser } from "@/lib/auth";

export default function ControlCenterLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed] = useState(() => isAdminUser(readAuthUser()));

  useEffect(() => {
    if (!allowed) router.replace("/");
  }, [allowed, router]);

  if (!allowed) {
    return (
      <div className="min-h-screen">
        <Navbar />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "96px 24px 64px" }}>
        <div style={{ display: "flex", gap: "18px", alignItems: "flex-start" }}>
          <div className="hidden lg:block" style={{ width: "260px", flexShrink: 0 }}>
            <AdminNav basePath="/control-center" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
        </div>
      </div>
    </div>
  );
}
