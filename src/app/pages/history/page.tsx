import RequireAuth from "@/components/RequireAuth";

// Placeholder — the History page is built in a later step.
export default function HistoryPage() {
  return (
    <RequireAuth>
      <main className="flex min-h-screen items-center justify-center px-6 text-center">
        <div>
          <h1 className="font-display text-3xl">History</h1>
          <p className="mt-2 text-sm text-xp-muted">Coming in a later step.</p>
        </div>
      </main>
    </RequireAuth>
  );
}
