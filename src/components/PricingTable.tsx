"use client";

import PricingHero from "@/components/PricingHero";
import { BRAND_NAME } from "@/lib/dashboardContent";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Content — edit here, both layouts (desktop table / mobile cards) read from
// these constants.
// ---------------------------------------------------------------------------

type PlanId = "diy" | "full";

interface Plan {
  id: PlanId;
  name: string;
  badge?: string;
  price: string;
  note: string;
  blurb: string;
  ctaSub: string;
  href: string;
}

const PLANS: Record<PlanId, Plan> = {
  diy: {
    id: "diy",
    name: "DO-IT-YOURSELF",
    price: "$49.99",
    note: "*Only when rented",
    blurb: `Use ${BRAND_NAME}\u2019s online booking system to increase potential of success.`,
    ctaSub: "WITH DO-IT-YOURSELF",
    href: "#",
  },
  full: {
    id: "full",
    name: "FULL-SERVICE",
    badge: "VERIFIED & PROTECTED",
    price: "$59.99",
    note: "*Only when rented",
    blurb:
      "Let us do it ALL - posting and advertising, to rental and payment. We guarantee your week to rent within 90 days. ZERO risk - you only pay when it rents.",
    ctaSub: "WITH FULL-SERVICE",
    href: "#",
  },
};

// Plan colours. DIY keeps the red price of the reference; Full-Service uses the
// green already used for "Paid".
const PLAN_STYLES: Record<PlanId, { price: string; button: string }> = {
  diy: {
    price: "text-xp-heart",
    button:
      "bg-xp-blue hover:bg-xp-blue-dark focus-visible:ring-xp-blue/50",
  },
  full: {
    price: "text-xp-green",
    button:
      "bg-xp-green hover:bg-[#1b6141] focus-visible:ring-xp-green/50",
  },
};

type CellValue = boolean | string;

interface Feature {
  label: string;
  diy: CellValue;
  full: CellValue;
  info?: string; // renders the little "?" button + tooltip next to the label
  footnote?: boolean; // adds the superscript 1 to a text value
}

const FEATURES: Feature[] = [
  { label: "Ad duration", diy: "Up to 6 months", full: "Until Rented", footnote: true },
  { label: "Email alerts to prospective renters", diy: true, full: true },
  {
    label: "\u201CNew\u201D flag for first 30 days",
    diy: true,
    full: true,
    info: "Your listing is marked \u201CNew\u201D for its first 30 days so renters notice it.",
  },
  { label: "Easy Online Booking", diy: true, full: true },
  { label: "90 Day Rental Guarantee", diy: false, full: true },
  { label: "Verified & Protected Listing Badge", diy: false, full: true },
  { label: "Pricing review & guidance", diy: false, full: true },
  { label: "Professional inquiry management", diy: false, full: true },
  { label: "Dedicated phone support", diy: false, full: true },
];

const FOOTNOTE = "Full-Service listings stay live until your week rents.";

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export default function PricingTable() {
  return (
    <section
      aria-labelledby="pricing-heading"
      className="overflow-x-clip border-t border-xp-line bg-white"
    >
      {/* Member story banner + resort search + browse shortcuts */}
      <PricingHero />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h2
          id="pricing-heading"
          className="font-display text-3xl text-balance text-xp-navy mb-2"
        >
          Choose your listing plan
        </h2>
        <p className="text-xp-muted mb-10 max-w-xl">
          Both plans are charged only when your week rents.
        </p>

        <div className="relative">
          {/* Mobile / tablet: sits above the plans. Desktop (lg+): floats over
              the empty top-left cell of the table, like the reference. */}
          <MemberCard className="relative z-10 mx-auto mb-9 max-w-sm sm:max-w-md lg:absolute lg:-left-4 lg:top-10 lg:mx-0 lg:mb-0 lg:w-[calc(38%-0.5rem)] lg:max-w-none" />

          {/* Phones: two stacked plan cards, Full-Service first */}
          <div className="space-y-6 md:hidden">
            <PlanCard plan={PLANS.full} featured />
            <PlanCard plan={PLANS.diy} />
          </div>

          {/* Tablets and up: the comparison table */}
          <div className="hidden md:block">
            <ComparisonTable />
          </div>
        </div>

        <p className="mt-5 text-xs text-xp-muted">
          <sup className="mr-0.5 text-xp-green">1</sup>
          {FOOTNOTE}
        </p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// "Michelle C." card
// ---------------------------------------------------------------------------

function MemberCard({ className = "" }: { className?: string }) {
  return (
    <figure
      className={`-rotate-2 bg-white p-3 shadow-[0_8px_28px_rgba(25,30,59,0.16)] ${className}`}
    >
      {/* folded photo corners */}
      <span
        aria-hidden="true"
        className="absolute -right-px -top-px size-7 bg-[#b9a688] [clip-path:polygon(0_0,100%_0,100%_100%)]"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-px -left-px size-7 bg-[#b9a688] [clip-path:polygon(0_0,0_100%,100%_100%)]"
      />

      <div className="flex items-center gap-4 pr-1">
        <div className="relative aspect-square w-24 shrink-0 overflow-hidden shadow-sm ring-4 ring-white sm:w-32 lg:w-[38%]">
          <Image
            fill
            src="/images/img-mc.jpeg"
            alt="Michelle C. with her family on the beach"
            sizes="(min-width: 1024px) 150px, (min-width: 640px) 128px, 96px"
            className="object-cover object-[52%_30%]"
          />
        </div>

        <figcaption className="min-w-0">
          <blockquote className="font-display text-[0.8rem] italic leading-snug text-xp-navy sm:text-sm">
            I have used {BRAND_NAME} for 10 years to rent my timeshares and have
            had success every single time!
          </blockquote>
          <p className="mt-2 font-display text-xl italic leading-none text-xp-navy sm:text-2xl">
            Michelle C.
          </p>
          <p className="mt-1.5 text-[0.65rem] tracking-wide text-xp-muted">
            MEMBER SINCE 2010
          </p>
        </figcaption>
      </div>
    </figure>
  );
}

// ---------------------------------------------------------------------------
// Desktop / tablet table
// ---------------------------------------------------------------------------

function ComparisonTable() {
  const { diy, full } = PLANS;

  return (
    <>
      <table className="w-full table-fixed border-separate border-spacing-0 text-center">
        <caption className="sr-only">
          Compare the Do-It-Yourself and Full-Service listing plans
        </caption>
        <colgroup>
          <col className="w-[38%]" />
          <col className="w-[31%]" />
          <col className="w-[31%]" />
        </colgroup>

        <thead>
          {/* Row 1 — plan name, price, blurb */}
          <tr>
            <th
              scope="col"
              rowSpan={2}
              className="rounded-tl-2xl border-l border-t border-l-xp-line border-t-xp-line bg-white"
            >
              <span className="sr-only">Feature</span>
            </th>
            <th
              scope="col"
              className="border-x-2 border-t border-x-transparent border-t-xp-line bg-white px-5 pt-10 align-top font-normal lg:px-8"
            >
              <PlanHeading plan={diy} />
            </th>
            <th
              scope="col"
              className="rounded-t-2xl border-x-2 border-t-2 border-xp-green bg-white px-5 pt-10 align-top font-normal lg:px-8"
            >
              <PlanHeading plan={full} />
            </th>
          </tr>

          {/* Row 2 — buttons, so both always line up */}
          <tr>
            <td className="border-x-2 border-x-transparent bg-white px-5 pb-9 pt-7 lg:px-8">
              <PlanButton plan={diy} />
            </td>
            <td className="border-x-2 border-x-xp-green bg-white px-5 pb-9 pt-7 lg:px-8">
              <PlanButton plan={full} />
            </td>
          </tr>
        </thead>

        <tbody>
          {FEATURES.map((feature, index) => {
            const isLast = index === FEATURES.length - 1;
            return (
              <tr key={feature.label}>
                <th
                  scope="row"
                  className={`relative border-l border-t border-l-xp-line border-t-xp-line bg-white px-6 py-5 text-sm font-normal text-xp-navy lg:py-6 lg:text-base ${
                    isLast ? "rounded-bl-2xl border-b border-b-xp-line" : ""
                  }`}
                >
                  <FeatureLabel feature={feature} tipId={`tip-t-${index}`} />
                </th>
                <td
                  className={`border-t border-t-xp-line bg-white px-4 py-5 lg:py-6 ${
                    isLast ? "border-b border-b-xp-line" : ""
                  }`}
                >
                  <Mark value={feature.diy} footnote={feature.footnote} />
                </td>
                <td
                  className={`border-x-2 border-t border-x-xp-green border-t-xp-line bg-white px-4 py-5 lg:py-6 ${
                    isLast ? "rounded-b-2xl border-b-2 border-b-xp-green" : ""
                  }`}
                >
                  <Mark value={feature.full} footnote={feature.footnote} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Second set of buttons under the table, same column grid */}
      <div className="grid grid-cols-[38%_31%_31%]">
        <div />
        <div className="px-[calc(1.25rem+2px)] pt-6 text-center lg:px-[calc(2rem+2px)]">
          <PlanButton plan={diy} />
          <p className="mt-2 text-[0.65rem] tracking-wide text-xp-muted">
            {diy.ctaSub}
          </p>
        </div>
        <div className="px-[calc(1.25rem+2px)] pt-6 text-center lg:px-[calc(2rem+2px)]">
          <PlanButton plan={full} />
          <p className="mt-2 text-[0.65rem] tracking-wide text-xp-muted">
            {full.ctaSub}
          </p>
        </div>
      </div>
    </>
  );
}

function PlanHeading({ plan }: { plan: Plan }) {
  return (
    <>
      <h3 className="text-base font-medium tracking-wide text-xp-navy lg:text-lg">
        {plan.name}
      </h3>
      {/* Reserved on both plans so the prices line up */}
      <p
        className="mt-1 min-h-4 text-[0.65rem] tracking-wide text-xp-green"
        aria-hidden={plan.badge ? undefined : true}
      >
        {plan.badge}
      </p>
      <p
        className={`mt-2 font-display text-4xl leading-none lg:text-[2.6rem] ${PLAN_STYLES[plan.id].price}`}
      >
        {plan.price}
      </p>
      <p className="mt-2 text-[0.7rem] text-xp-muted">{plan.note}</p>
      <p className="mx-auto mt-5 max-w-[22rem] text-sm leading-relaxed text-xp-navy lg:text-[0.95rem]">
        {plan.blurb}
      </p>
    </>
  );
}

// ---------------------------------------------------------------------------
// Phone layout
// ---------------------------------------------------------------------------

function PlanCard({
  plan,
  featured = false,
}: {
  plan: Plan;
  featured?: boolean;
}) {
  const headingId = `plan-${plan.id}`;

  return (
    <section
      aria-labelledby={headingId}
      className={`overflow-hidden rounded-2xl bg-white ${
        featured
          ? "border-2 border-xp-green shadow-[0_6px_24px_rgba(34,121,80,0.16)]"
          : "border border-xp-line"
      }`}
    >
      <div className="px-5 pb-6 pt-7 text-center">
        <h3
          id={headingId}
          className="text-base font-medium tracking-wide text-xp-navy"
        >
          {plan.name}
        </h3>
        {plan.badge && (
          <p className="mt-1 text-[0.65rem] tracking-wide text-xp-green">
            {plan.badge}
          </p>
        )}
        <p
          className={`mt-3 font-display text-5xl leading-none ${PLAN_STYLES[plan.id].price}`}
        >
          {plan.price}
        </p>
        <p className="mt-2 text-xs text-xp-muted">{plan.note}</p>
        <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-xp-navy">
          {plan.blurb}
        </p>
        <div className="mt-6">
          <PlanButton plan={plan} />
        </div>
      </div>

      <ul>
        {FEATURES.map((feature, index) => {
          const value = feature[plan.id];
          return (
            <li
              key={feature.label}
              className="relative flex items-center justify-between gap-4 border-t border-xp-line px-5 py-3.5 text-sm text-xp-navy"
            >
              <span className="min-w-0">
                <FeatureLabel
                  feature={feature}
                  tipId={`tip-${plan.id}-${index}`}
                />
              </span>
              <span className="shrink-0">
                <Mark value={value} footnote={feature.footnote} />
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Shared bits
// ---------------------------------------------------------------------------

function PlanButton({ plan }: { plan: Plan }) {
  return (
    <a
      href={plan.href}
      aria-label={`Get started with ${plan.name.toLowerCase()}`}
      className={`inline-flex h-12 w-full items-center justify-center rounded-lg px-4 text-base font-semibold tracking-wide text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${PLAN_STYLES[plan.id].button}`}
    >
      GET STARTED
    </a>
  );
}

function Mark({ value, footnote }: { value: CellValue; footnote?: boolean }) {
  if (value === true) {
    return (
      <span role="img" aria-label="Included" className="inline-flex">
        <Check aria-hidden="true" className="size-6 text-xp-green" strokeWidth={2.5} />
      </span>
    );
  }
  if (value === false) {
    return (
      <span role="img" aria-label="Not included" className="inline-flex">
        <X aria-hidden="true" className="size-6 text-red-600" strokeWidth={3} />
      </span>
    );
  }
  return (
    <span className="text-sm text-xp-navy lg:text-base">
      {value}
      {footnote && (
        <sup className="ml-0.5 text-[0.65rem] text-xp-green">
          <span aria-hidden="true">1</span>
          <span className="sr-only"> (see note below)</span>
        </sup>
      )}
    </span>
  );
}

// Feature name, plus the small "?" button + tooltip when the row has `info`.
// The tooltip is anchored to the nearest positioned ancestor (the table row
// header / list item, both `relative`), so it spans the row instead of
// floating off the edge of a narrow phone screen.
function FeatureLabel({ feature, tipId }: { feature: Feature; tipId: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: Event) {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    // pointerdown covers touch + mouse in current browsers; mousedown is the
    // fallback for older ones (matches the header dropdown).
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <span ref={wrapRef}>
      {feature.label}
      {feature.info && (
        <>
          <button
            type="button"
            onClick={() => setOpen((isOpen) => !isOpen)}
            aria-expanded={open}
            aria-describedby={open ? tipId : undefined}
            aria-label={`About: ${feature.label}`}
            className="relative ml-2 inline-flex size-[1.15rem] translate-y-px items-center justify-center rounded-full bg-xp-navy text-[0.7rem] font-bold leading-none text-white transition-colors before:absolute before:-inset-2.5 before:content-[''] hover:bg-xp-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-xp-blue/50 focus-visible:ring-offset-1"
          >
            ?
          </button>
          {open && (
            <span
              id={tipId}
              role="tooltip"
              className="absolute inset-x-3 top-full z-30 mt-1 rounded-lg bg-xp-navy px-3 py-2 text-left text-xs leading-snug text-white shadow-lg"
            >
              {feature.info}
            </span>
          )}
        </>
      )}
    </span>
  );
}
