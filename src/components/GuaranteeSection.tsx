const rows = [
  { feature: "Easy Online Booking", included: true },
  { feature: "90 Day Rental Guarantee", included: true },
  { feature: "Verified & Protected Listing Badge", included: true },
  { feature: "Pricing review & guidance", included: true },
  { feature: "Professional inquiry management", included: true },
  { feature: "Dedicated phone support", included: true },
];

export default function GuaranteeSection() {
  return (
    <section className="border-y border-xp-line bg-xp-navy">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-semibold tracking-[0.18em] uppercase text-xp-yellow mb-3">
          Full-Service · 90-Day Rental Guarantee
        </p>
        <h2 className="font-display text-3xl text-white mb-2">
          FULL-SERVICE · ZERO COST TO YOU
        </h2>
        <p className="text-white/70 mb-10 max-w-xl">
          We handle everything — listing, marketing, booking, guest communication. For Holiday Inn Club Vacations Owners, we guarantee your points rent within 90 days. Zero risk, zero cost upfront — we take 8% ONLY AFTER YOU GET PAID.
        </p>

        <div className="rounded-2xl bg-white/5 border border-white/15 divide-y divide-white/10 overflow-hidden">
          {rows.map((row) => (
            <div
              key={row.feature}
              className="flex items-center justify-between px-6 py-4"
            >
              <span className="text-white/85 text-sm sm:text-base">
                {row.feature}
              </span>
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full bg-xp-yellow text-xp-navy text-sm font-bold shrink-0 ml-4"
                aria-label="Included"
              >
                ✓
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
