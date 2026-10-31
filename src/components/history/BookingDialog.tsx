"use client";

import StatusPill from "@/components/history/StatusPill";
import { cityOf, formatCents, formatShortDate, type HistoryEntry } from "@/lib/history";
import { Check, Copy, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/** Full details for one booking, opened from a History row/card. */
export default function BookingDialog({ entry, onClose }: { entry: HistoryEntry; onClose: () => void }) {
  const { resort, booking } = entry;
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // keep Tab inside the dialog
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    ref.current?.querySelector<HTMLElement>("button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  async function copyRef() {
    try {
      await navigator.clipboard.writeText(booking.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — nothing to do */
    }
  }

  const rows: [string, React.ReactNode][] = [
    ["Check-in", formatShortDate(entry.checkIn)],
    ["Check-out", formatShortDate(entry.checkOut)],
    ["Length of stay", entry.nights !== null ? `${entry.nights} night${entry.nights === 1 ? "" : "s"}` : "—"],
    ["Payout year", booking.year],
    ["Status", <StatusPill key="s" status={booking.status} />],
  ];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 sm:items-center sm:p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="xp-pop max-h-[92vh] w-full max-w-[520px] overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
      >
        <div className="relative h-44 bg-xp-navy sm:h-52">
          <Image src={resort.image} alt={resort.name} fill sizes="520px" className="object-cover" />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-xp-navy shadow transition hover:bg-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 text-xs text-xp-muted">
            <span className="font-mono">Ref {booking.id}</span>
            <button
              onClick={copyRef}
              aria-label="Copy reference number"
              className="inline-flex items-center gap-1 rounded-full px-2 py-1 font-sans font-semibold text-xp-blue transition hover:bg-xp-gray"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <h2 id="booking-title" className="mt-1 font-display text-2xl leading-8">{resort.name}</h2>
          <p className="mt-1 text-sm text-xp-muted">
            {resort.unitType}
            {resort.location ? ` · ${resort.location}` : ""}
          </p>

          <dl className="mt-5 divide-y divide-xp-line rounded-xl border border-xp-line text-sm">
            {rows.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between px-4 py-3">
                <dt className="text-xp-muted">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between bg-xp-gray/60 px-4 py-3">
              <dt className="text-xp-muted">Payout</dt>
              <dd className="font-display text-2xl text-xp-green">{formatCents(booking.payoutCents)}</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/?q=${encodeURIComponent(cityOf(resort.location, resort.name))}`}
              className="flex h-12 shrink-0 items-center justify-center rounded-full bg-xp-blue sm:flex-1 text-base font-semibold text-white transition hover:bg-xp-blue-dark"
            >
              Search stays nearby
            </Link>
            <button
              onClick={onClose}
              className="h-12 shrink-0 rounded-full border border-xp-outline sm:flex-1 text-base font-semibold text-xp-blue transition hover:bg-xp-blue/5"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
