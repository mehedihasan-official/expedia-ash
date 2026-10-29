"use client";

import { useAuth } from "@/components/AuthProvider";
import Logo from "@/components/Logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// STEP 2 placeholder — the Expedia-style Firebase login UI lands here.
export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) router.replace("/pages/dashboard");
  }, [loading, user, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Logo />
      <h1 className="font-display text-3xl">Sign in</h1>
      <p className="max-w-sm text-sm text-xp-muted">
        The Firebase login screen is built in Step 2 of the project.
      </p>
      <Link href="/" className="font-semibold text-xp-blue hover:underline">
        ← Back to home
      </Link>
    </main>
  );
}
