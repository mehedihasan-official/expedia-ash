"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Gates a page behind Firebase auth (client-side, same approach as Koala).
export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/pages/login?callbackUrl=/pages/dashboard");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-[60vh] flex-1 items-center justify-center">
        <p className="text-sm text-xp-muted">Checking your session…</p>
      </div>
    );
  }
  return <>{children}</>;
}
