"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function Topbar({ email }) {
  const router = useRouter();

  const onLogout = async () => {
    const supabase = createClient();
    if (supabase) await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div className="hidden md:flex items-center justify-between px-10 py-5 border-b border-[color:var(--color-stroke)]">
      <div className="text-sm text-[color:var(--color-muted)]">
        Signed in as <span className="text-[color:var(--color-text)]">{email}</span>
      </div>
      <button
        onClick={onLogout}
        className="pill pill-outline text-sm"
      >
        <LogOut size={14} /> Log out
      </button>
    </div>
  );
}
