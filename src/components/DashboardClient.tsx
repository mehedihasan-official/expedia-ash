"use client";

import ResortStub from "@/components/ResortStub";
import {
  getAvailableYears,
  getBookingsForYear,
  getDefaultYear,
  getTotalPayoutCentsForYear,
} from "@/lib/dashboardContent";
import { formatCents } from "@/lib/types";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

// The payouts section of the dashboard: year switcher, total, listing count
// and the card grid. It's a client component because the selected year lives
// in the URL (?year=2025) so it survives a refresh and can be shared or
// bookmarked. All filtering happens in memory over the static data in
// src/lib/dashboardContent.ts — no fetch, no page reload.
export default function DashboardClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dataYears = useMemo(() => getAvailableYears(), []);
  const defaultYear = useMemo(() => getDefaultYear(), []);

  // ?year=2025 wins when it's a sane four-digit year; anything else (missing,
  // "abc", "20255") falls back to the newest year in the data.
  const rawYear = Number(searchParams.get("year"));
  const selectedYear =
    Number.isInteger(rawYear) && rawYear >= 2000 && rawYear <= 2100
      ? rawYear
      : defaultYear;

  // Keeps the control coherent if someone lands on ?year=2019 — the selected
  // year is always present in the list, even with no bookings behind it.
  const years = useMemo(
    () =>
      Array.from(new Set([...dataYears, selectedYear])).sort((a, b) => b - a),
    [dataYears, selectedYear],
  );

  const bookings = useMemo(
    () => getBookingsForYear(selectedYear),
    [selectedYear],
  );
  const totalPayoutCents = useMemo(
    () => getTotalPayoutCentsForYear(selectedYear),
    [selectedYear],
  );

  function handleSelectYear(year: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("year", String(year));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-sm font-semibold tracking-[0.14em] uppercase text-xp-blue mb-2">
        Your resorts
      </p>

      <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
        <h1 className="font-display text-4xl text-xp-navy">
          All Listings ({bookings.length})
        </h1>

        <div className="flex flex-col items-start sm:items-end gap-2">
          <div className="flex items-center gap-2">
            <YearSelect
              years={years}
              selectedYear={selectedYear}
              onSelect={handleSelectYear}
            />
            <span className="text-sm text-xp-muted">Total payouts</span>
          </div>
          <p className="font-display text-3xl text-xp-green leading-none">
            {formatCents(totalPayoutCents)}
          </p>
          <Link
            href="/pages/history"
            className="text-sm font-semibold text-xp-blue hover:underline"
          >
            View booking history →
          </Link>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-xp-line bg-xp-gray/60 px-6 py-14 text-center">
          <p className="text-xp-muted italic">
            No payouts recorded for {selectedYear}.
          </p>
          {selectedYear !== defaultYear && (
            <button
              type="button"
              onClick={() => handleSelectYear(defaultYear)}
              className="mt-3 text-sm font-medium text-xp-navy underline underline-offset-4 hover:text-xp-blue transition"
            >
              View {defaultYear} instead
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map(({ resort, booking }) => (
            // Ref IDs can repeat across resorts in the source data, so the
            // React key pairs the resort with the booking.
            <ResortStub
              key={`${resort.id}-${booking.id}`}
              resort={resort}
              booking={booking}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// Compact year pill — same visual language as the header's account dropdown
// (hairline border, white surface, soft shadow on the menu) so it reads
// as part of the dashboard rather than a bolted-on form control.
function YearSelect({
  years,
  selectedYear,
  onSelect,
}: {
  years: number[];
  selectedYear: number;
  onSelect: (year: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Close on Escape and hand focus back to the pill
  useEffect(() => {
    if (!open) return;
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  // Move focus onto the selected option when the menu opens
  useEffect(() => {
    if (!open) return;
    const index = Math.max(0, years.indexOf(selectedYear));
    optionRefs.current[index]?.focus();
  }, [open, years, selectedYear]);

  function handleOptionKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const next =
        event.key === "ArrowDown"
          ? (index + 1) % years.length
          : (index - 1 + years.length) % years.length;
      optionRefs.current[next]?.focus();
    }
  }

  function choose(year: number) {
    setOpen(false);
    onSelect(year);
    triggerRef.current?.focus();
  }

  return (
    <div className="relative" ref={wrapRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Payout year: ${selectedYear}`}
        className="inline-flex items-center gap-1.5 rounded-full border border-xp-line bg-white px-3 py-1 text-sm font-semibold text-xp-navy shadow-sm hover:bg-xp-gray focus:outline-none focus-visible:ring-2 focus-visible:ring-xp-blue/40 transition"
      >
        {selectedYear}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`text-xp-muted transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select payout year"
          className="absolute left-0 top-full z-50 mt-2 min-w-[7rem] rounded-xl border border-xp-line bg-white py-1 shadow-lg sm:left-auto sm:right-0"
        >
          {years.map((year, index) => {
            const isSelected = year === selectedYear;
            return (
              <li key={year} role="option" aria-selected={isSelected}>
                <button
                  ref={(node) => {
                    optionRefs.current[index] = node;
                  }}
                  type="button"
                  onClick={() => choose(year)}
                  onKeyDown={(event) => handleOptionKeyDown(event, index)}
                  className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition hover:bg-xp-gray focus:bg-xp-gray focus:outline-none ${
                    isSelected
                      ? "font-semibold text-xp-navy"
                      : "font-medium text-xp-navy"
                  }`}
                >
                  {year}
                  {isSelected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="text-xp-green"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
