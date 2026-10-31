"use client";

import BookingDialog from "@/components/history/BookingDialog";
import StatusPill from "@/components/history/StatusPill";
import {
  applyFilters,
  buildCsv,
  computeStats,
  DEFAULT_FILTERS,
  formatCents,
  formatShortDate,
  getHistory,
  SORT_OPTIONS,
  STATUS_OPTIONS,
  type HistoryEntry,
  type HistoryFilters,
  type SortKey,
  type StatusFilter,
} from "@/lib/history";
import { ChevronRight, Download, Search, X } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const PAGE_SIZE = 8;

const selectCls =
  "h-11 w-full rounded-lg border border-[#8d8f9d] bg-white px-3 text-sm text-xp-navy outline-none transition hover:border-xp-navy focus:border-xp-blue focus:ring-1 focus:ring-xp-blue";

/** Reads the filters out of the URL (?q=&year=&status=&sort=), ignoring junk values. */
function filtersFromParams(sp: URLSearchParams, years: number[]): HistoryFilters {
  const year = Number(sp.get("year"));
  const status = sp.get("status") as StatusFilter | null;
  const sort = sp.get("sort") as SortKey | null;
  return {
    query: (sp.get("q") ?? "").slice(0, 80),
    year: years.includes(year) ? year : "all",
    status: status && STATUS_OPTIONS.includes(status) ? status : "all",
    sort: sort && SORT_OPTIONS.some((o) => o.value === sort) ? sort : "newest",
  };
}

export default function HistoryClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const all = useMemo(() => getHistory(), []);
  const years = useMemo(() => Array.from(new Set(all.map((e) => e.booking.year))).sort((a, b) => b - a), [all]);

  // Filters live in React state (so typing is instant) and are mirrored into the
  // URL so a filtered view survives a refresh and can be bookmarked or shared.
  const [filters, setFilters] = useState<HistoryFilters>(() => filtersFromParams(new URLSearchParams(searchParams.toString()), years));
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<HistoryEntry | null>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const t = setTimeout(() => {
      const p = new URLSearchParams();
      if (filters.query.trim()) p.set("q", filters.query.trim());
      if (filters.year !== "all") p.set("year", String(filters.year));
      if (filters.status !== "all") p.set("status", filters.status);
      if (filters.sort !== DEFAULT_FILTERS.sort) p.set("sort", filters.sort);
      const qs = p.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, 250);
    return () => clearTimeout(t);
  }, [filters, pathname, router]);

  const update = (patch: Partial<HistoryFilters>) => {
    setFilters((f) => ({ ...f, ...patch }));
    setVisible(PAGE_SIZE);
  };

  const filtered = useMemo(() => applyFilters(all, filters), [all, filters]);
  const stats = useMemo(() => computeStats(filtered), [filtered]);
  const shown = filtered.slice(0, visible);
  const isFiltered =
    filters.query.trim() !== "" || filters.year !== "all" || filters.status !== "all" || filters.sort !== DEFAULT_FILTERS.sort;

  function exportCsv() {
    const blob = new Blob(["\uFEFF" + buildCsv(filtered)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `booking-history-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  const statCards: [string, string, string?][] = [
    ["Bookings", String(stats.count)],
    ["Paid out", formatCents(stats.paidCents), "text-xp-green"],
    ["Pending", formatCents(stats.pendingCents)],
    ["Nights booked", String(stats.nights)],
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-xp-blue">Your history</p>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-4xl">Booking History</h1>
        <button
          onClick={exportCsv}
          disabled={filtered.length === 0}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-xp-outline px-4 text-sm font-semibold text-xp-blue transition hover:bg-xp-blue/5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* ---- summary (follows the filters) ---- */}
      <dl className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4" aria-label="Summary of the bookings shown">
        {statCards.map(([label, value, tone]) => (
          <div key={label} className="rounded-2xl border border-xp-line bg-white px-4 py-4 md:px-5">
            <dt className="text-sm text-xp-muted">{label}</dt>
            <dd className={`mt-1 font-display text-2xl leading-8 md:text-[28px] ${tone ?? ""}`} data-testid={`stat-${label}`}>
              {value}
            </dd>
          </div>
        ))}
      </dl>

      {/* ---- filters ---- */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-[minmax(0,2fr)_1fr_1fr_1fr]">
        <label className="relative col-span-2 sm:col-span-3 lg:col-span-1">
          <span className="sr-only">Search bookings</span>
          <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xp-muted" />
          <input
            type="search"
            value={filters.query}
            onChange={(e) => update({ query: e.target.value })}
            placeholder="Search by reference, resort or location"
            className={`${selectCls} pl-10`}
          />
        </label>
        <label>
          <span className="sr-only">Year</span>
          <select value={String(filters.year)} onChange={(e) => update({ year: e.target.value === "all" ? "all" : Number(e.target.value) })} className={selectCls}>
            <option value="all">All years</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Status</span>
          <select value={filters.status} onChange={(e) => update({ status: e.target.value as StatusFilter })} className={selectCls}>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s === "all" ? "All statuses" : s}</option>
            ))}
          </select>
        </label>
        <label className="col-span-2 sm:col-span-1">
          <span className="sr-only">Sort by</span>
          <select value={filters.sort} onChange={(e) => update({ sort: e.target.value as SortKey })} className={selectCls}>
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 flex min-h-6 items-center justify-between text-sm text-xp-muted" aria-live="polite">
        <span>
          Showing {shown.length} of {filtered.length} booking{filtered.length === 1 ? "" : "s"}
        </span>
        {isFiltered && (
          <button
            onClick={() => {
              setFilters(DEFAULT_FILTERS);
              setVisible(PAGE_SIZE);
            }}
            className="inline-flex items-center gap-1 font-semibold text-xp-blue hover:underline"
          >
            <X size={14} /> Clear filters
          </button>
        )}
      </div>

      {/* ---- results ---- */}
      {filtered.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-xp-line bg-xp-gray/60 px-6 py-14 text-center">
          <p className="font-display text-2xl">No bookings found</p>
          <p className="mt-1 text-sm text-xp-muted">Try a different search or clear the filters.</p>
          {isFiltered && (
            <button
              onClick={() => update({ ...DEFAULT_FILTERS })}
              className="mt-5 h-11 rounded-full bg-xp-blue px-6 text-sm font-semibold text-white transition hover:bg-xp-blue-dark"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <>
          {/* tablet + desktop: table */}
          <div className="mt-3 hidden overflow-hidden rounded-2xl border border-xp-line bg-white md:block">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Booking history</caption>
              <thead className="bg-xp-gray/70 text-xs uppercase tracking-wider text-xp-muted">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">Resort</th>
                  <th scope="col" className="px-3 py-3 font-semibold">Dates</th>
                  <th scope="col" className="px-3 py-3 font-semibold">Status</th>
                  <th scope="col" className="px-3 py-3 text-right font-semibold">Payout</th>
                  <th scope="col" className="w-10 px-3 py-3"><span className="sr-only">Details</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-xp-line">
                {shown.map((e) => (
                  <tr key={e.key} className="transition hover:bg-xp-gray/50">
                    <td className="px-5 py-3">
                      <button onClick={() => setSelected(e)} className="flex w-full items-center gap-4 text-left" aria-label={`View details for ${e.resort.name}, reference ${e.booking.id}`}>
                        <span className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-xp-navy">
                          <Image src={e.resort.image} alt="" fill sizes="80px" className="object-cover" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-[15px] font-semibold">{e.resort.name}</span>
                          <span className="block truncate text-xs text-xp-muted">
                            {e.resort.unitType}{e.resort.location ? ` · ${e.resort.location}` : ""}
                          </span>
                          <span className="block font-mono text-xs text-xp-muted">Ref {e.booking.id}</span>
                        </span>
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <span className="block">{formatShortDate(e.checkIn)} – {formatShortDate(e.checkOut)}</span>
                      {e.nights !== null && <span className="block text-xs text-xp-muted">{e.nights} night{e.nights === 1 ? "" : "s"}</span>}
                    </td>
                    <td className="px-3 py-3"><StatusPill status={e.booking.status} /></td>
                    <td className="whitespace-nowrap px-3 py-3 text-right font-display text-lg text-xp-green">{formatCents(e.booking.payoutCents)}</td>
                    <td className="px-3 py-3 text-xp-muted"><ChevronRight size={18} aria-hidden="true" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* phones: cards */}
          <ul className="mt-3 flex flex-col gap-3 md:hidden">
            {shown.map((e) => (
              <li key={e.key}>
                <button
                  onClick={() => setSelected(e)}
                  className="flex w-full gap-3 rounded-2xl border border-xp-line bg-white p-3 text-left transition hover:shadow-md"
                  aria-label={`View details for ${e.resort.name}, reference ${e.booking.id}`}
                >
                  <span className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-xp-navy">
                    <Image src={e.resort.image} alt="" fill sizes="96px" className="object-cover" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-2">
                      <span className="block font-mono text-xs text-xp-muted">Ref {e.booking.id}</span>
                      <StatusPill status={e.booking.status} />
                    </span>
                    <span className="mt-1 block truncate text-[15px] font-semibold">{e.resort.name}</span>
                    <span className="block text-xs text-xp-muted">{formatShortDate(e.checkIn)} – {formatShortDate(e.checkOut)}</span>
                    <span className="mt-1 block font-display text-xl text-xp-green">{formatCents(e.booking.payoutCents)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {visible < filtered.length && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="h-11 rounded-full border border-xp-outline px-6 text-sm font-semibold text-xp-blue transition hover:bg-xp-blue/5"
              >
                Show more ({filtered.length - visible} remaining)
              </button>
            </div>
          )}
        </>
      )}

      {selected && <BookingDialog entry={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
