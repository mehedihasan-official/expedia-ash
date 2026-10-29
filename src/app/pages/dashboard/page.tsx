import RequireAuth from "@/components/RequireAuth";

// STEP 3 placeholder — the post-login dashboard (same structure as Koala's).
export default function DashboardPage() {
  return (
    <RequireAuth>
      <main className="flex min-h-screen items-center justify-center px-6 text-center">
        <div>
          <h1 className="font-display text-3xl">Dashboard</h1>
          <p className="mt-2 text-sm text-xp-muted">Built in Step 3 of the project.</p>
        </div>
      </main>
    </RequireAuth>
  );
}
