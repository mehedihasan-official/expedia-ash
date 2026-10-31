import HistoryClient from "@/components/history/HistoryClient";
import RequireAuth from "@/components/RequireAuth";
import SiteHeader from "@/components/SiteHeader";
import { BRAND_NAME } from "@/lib/dashboardContent";
import { Suspense } from "react";

// Server shell. The filters live in the URL (?q=&year=&status=&sort=), read with
// useSearchParams() inside HistoryClient — which Next requires to sit in Suspense.
export default function HistoryPage() {
  return (
    <RequireAuth>
      <SiteHeader />

      <main className="flex-1">
        <Suspense
          fallback={
            <section className="mx-auto max-w-6xl px-6 py-12">
              <p className="text-sm text-xp-muted">Loading your booking history…</p>
            </section>
          }
        >
          <HistoryClient />
        </Suspense>
      </main>

      <footer className="border-t border-xp-line bg-xp-gray">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-xp-muted">
          © {new Date().getFullYear()} {BRAND_NAME}&rsquo;s Resorts. Independently owned and operated.
        </div>
      </footer>
    </RequireAuth>
  );
}
