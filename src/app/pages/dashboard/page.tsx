import DashboardClient from "@/components/DashboardClient";
import GuaranteeSection from "@/components/GuaranteeSection";
import PricingTable from "@/components/PricingTable";
import RequireAuth from "@/components/RequireAuth";
import SiteHeader from "@/components/SiteHeader";
import Testimonials from "@/components/Testimonials";
import { BRAND_NAME, testimonials } from "@/lib/dashboardContent";
import { Suspense } from "react";

// Server shell (same structure as Koala's dashboard). The payouts section reads
// the selected year from the URL (?year=2025) via useSearchParams, which Next
// requires to sit inside a Suspense boundary, so it lives in DashboardClient.
//
// The header is the shared Expedia SiteHeader: its account menu already holds
// Dashboard, History and Sign out.
export default function DashboardPage() {
  return (
    <RequireAuth>
      <SiteHeader />

      <main className="flex-1">
        <Suspense
          fallback={
            <section className="mx-auto max-w-6xl px-6 py-12">
              <p className="text-sm text-xp-muted">Loading your payouts…</p>
            </section>
          }
        >
          <DashboardClient />
        </Suspense>

        <PricingTable />

        <GuaranteeSection />

        <Testimonials testimonials={testimonials} />
      </main>

      <footer className="border-t border-xp-line bg-xp-gray">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-xp-muted">
          © {new Date().getFullYear()} {BRAND_NAME}&rsquo;s Resorts.
          Independently owned and operated.
        </div>
      </footer>
    </RequireAuth>
  );
}
