import LoginForm from "./LoginForm";
import DotCluster from "@/components/ui/DotCluster";

export default function LoginPage() {
  const configured = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <DotCluster size={28} />
          <span className="font-display text-2xl font-extrabold tracking-tight text-[color:var(--color-red)]">
            FONSI
          </span>
          <span className="text-[color:var(--color-muted)] text-sm">· Admin</span>
        </div>

        {!configured && (
          <div className="mb-6 rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-4 text-sm text-yellow-200">
            Supabase environment variables are not set. Add{" "}
            <code className="text-yellow-300">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code className="text-yellow-300">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to
            <code className="text-yellow-300"> .env.local</code> (see{" "}
            <code className="text-yellow-300">sql/SETUP.md</code>) and restart.
          </div>
        )}

        <LoginForm disabled={!configured} />
      </div>
    </div>
  );
}
