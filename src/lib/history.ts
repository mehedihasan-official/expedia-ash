import { getAllBookings } from "@/lib/dashboardContent";
import { formatCents, type Booking, type Resort } from "@/lib/types";

// Everything the History page needs, derived from the same resort data the
// dashboard uses (src/lib/dashboardContent.ts) — add a booking there and it
// shows up in both places.

export type BookingStatus = Booking["status"];
export type SortKey = "newest" | "oldest" | "payout-high" | "payout-low";
export type StatusFilter = "all" | BookingStatus;

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "payout-high", label: "Highest payout" },
  { value: "payout-low", label: "Lowest payout" },
];

export const STATUS_OPTIONS: StatusFilter[] = ["all", "Paid", "Pending", "Expired"];

export interface HistoryEntry {
  /** Unique even when two resorts share a Ref ID in the source data. */
  key: string;
  resort: Resort;
  booking: Booking;
  checkIn: Date | null;
  checkOut: Date | null;
  nights: number | null;
}

const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

/** "Sep 06, 2025" → Date (UTC midnight). Returns null when it can't be read. */
export function parseDisplayDate(text: string): Date | null {
  const m = text.trim().match(/^([A-Za-z]{3})[a-z]*\.?\s+(\d{1,2}),?\s+(\d{4})$/);
  if (!m) return null;
  const month = MONTHS[m[1].toLowerCase()];
  if (month === undefined) return null;
  return new Date(Date.UTC(Number(m[3]), month, Number(m[2])));
}

/** "Jun 05, 2026 - Jun 12, 2026" → [checkIn, checkOut]. */
export function parseDateRange(range: string): [Date | null, Date | null] {
  const [a, b] = range.split(/\s+[-–—]\s+/);
  return [a ? parseDisplayDate(a) : null, b ? parseDisplayDate(b) : null];
}

const DAY_MS = 86_400_000;

export function getHistory(): HistoryEntry[] {
  return getAllBookings().map(({ resort, booking }) => {
    const [checkIn, checkOut] = parseDateRange(booking.dateRange);
    const nights =
      booking.guestNights ??
      (checkIn && checkOut ? Math.round((checkOut.getTime() - checkIn.getTime()) / DAY_MS) : null);
    return { key: `${resort.id}-${booking.id}`, resort, booking, checkIn, checkOut, nights };
  });
}

export interface HistoryFilters {
  query: string;
  year: number | "all";
  status: StatusFilter;
  sort: SortKey;
}

export const DEFAULT_FILTERS: HistoryFilters = { query: "", year: "all", status: "all", sort: "newest" };

export function applyFilters(entries: HistoryEntry[], f: HistoryFilters): HistoryEntry[] {
  const q = f.query.trim().toLowerCase();
  const out = entries.filter(({ resort, booking }) => {
    if (f.year !== "all" && booking.year !== f.year) return false;
    if (f.status !== "all" && booking.status !== f.status) return false;
    if (!q) return true;
    return [booking.id, resort.name, resort.unitType, resort.location, booking.dateRange, booking.status]
      .filter(Boolean)
      .some((v) => String(v).toLowerCase().includes(q));
  });

  const time = (e: HistoryEntry) => e.checkIn?.getTime() ?? e.booking.year * 1e9;
  const sorters: Record<SortKey, (a: HistoryEntry, b: HistoryEntry) => number> = {
    newest: (a, b) => time(b) - time(a),
    oldest: (a, b) => time(a) - time(b),
    "payout-high": (a, b) => b.booking.payoutCents - a.booking.payoutCents,
    "payout-low": (a, b) => a.booking.payoutCents - b.booking.payoutCents,
  };
  return out.sort(sorters[f.sort]);
}

export interface HistoryStats {
  count: number;
  paidCents: number;
  pendingCents: number;
  nights: number;
}

export function computeStats(entries: HistoryEntry[]): HistoryStats {
  return entries.reduce<HistoryStats>(
    (s, e) => ({
      count: s.count + 1,
      paidCents: s.paidCents + (e.booking.status === "Paid" ? e.booking.payoutCents : 0),
      pendingCents: s.pendingCents + (e.booking.status === "Pending" ? e.booking.payoutCents : 0),
      nights: s.nights + (e.nights ?? 0),
    }),
    { count: 0, paidCents: 0, pendingCents: 0, nights: 0 },
  );
}

/** "3838 Wyllie Road, Princeville, HI" → "Princeville"; "Orlando, FL" → "Orlando". */
export function cityOf(location: string | undefined, fallback: string): string {
  if (!location) return fallback;
  const parts = location.split(",").map((p) => p.trim()).filter(Boolean);
  if (!parts.length) return fallback;
  return /^\d/.test(parts[0]) && parts[1] ? parts[1] : parts[0];
}

export function formatShortDate(d: Date | null): string {
  return d
    ? d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })
    : "—";
}

// --- CSV export -------------------------------------------------------------

// Cells that start with = + - @ can be run as formulas by spreadsheet apps, so
// they're prefixed with an apostrophe. Quotes are doubled per RFC 4180.
function csvCell(value: string | number | null | undefined): string {
  let s = value === null || value === undefined ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function buildCsv(entries: HistoryEntry[]): string {
  const header = ["Reference", "Resort", "Unit", "Location", "Check-in", "Check-out", "Nights", "Year", "Status", "Payout (USD)"];
  const rows = entries.map((e) => [
    e.booking.id,
    e.resort.name,
    e.resort.unitType,
    e.resort.location,
    e.checkIn ? e.checkIn.toISOString().slice(0, 10) : "",
    e.checkOut ? e.checkOut.toISOString().slice(0, 10) : "",
    e.nights,
    e.booking.year,
    e.booking.status,
    (e.booking.payoutCents / 100).toFixed(2),
  ]);
  return [header, ...rows].map((r) => r.map(csvCell).join(",")).join("\r\n");
}

export { formatCents };
