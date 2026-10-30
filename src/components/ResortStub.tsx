import Image from "next/image";
import type { Resort, Booking } from "@/lib/types";
import { formatCents } from "@/lib/types";

// Status pills sit on top of the resort photo, so each one is a solid fill
// rather than a translucent tint — a 10%-opacity chip disappears against a
// bright pool or sky. "Paid" uses Expedia green (--color-xp-green in globals.css); the other two
// keep their palette colours in the same treatment so the set reads as one family.
const statusStyles: Record<Booking["status"], string> = {
  Paid: "bg-white text-xp-green ring-xp-green/30",
  Pending: "bg-xp-yellow text-xp-navy ring-xp-yellow/50",
  Expired: "bg-xp-navy/55 text-white ring-xp-navy/30",
};

// One card per booking — matches the reference screenshots where each
// reservation (Ref ID, dates, payout) gets its own full block, even when
// two bookings belong to the same resort.
export default function ResortStub({
  resort,
  booking,
}: {
  resort: Resort;
  booking: Booking;
}) {
  return (
    <div className="rounded-2xl border border-xp-line bg-white overflow-hidden shadow-sm">
      <div className="relative h-44 bg-xp-navy">
        <Image
          fill
          src={resort.image}
          alt={resort.name}
          sizes="(max-width: 640px) 100vw, 380px"
          className="object-cover"
        />
        <span
          className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusStyles[booking.status]}`}
        >
          {booking.status}
        </span>
      </div>

      <div className="p-6">
        <p className="text-xs font-mono text-xp-muted mb-2">Ref {booking.id}</p>

        <h3 className="font-display text-xl text-xp-navy mb-1">{resort.name}</h3>
        <p className="text-sm text-xp-muted mb-4">
          {resort.unitType}
          {resort.location ? ` · ${resort.location}` : ""}
        </p>

        <div className="stub-edge mb-4" />

        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-xp-muted">Dates</span>
          <span className="font-medium text-xp-navy">{booking.dateRange}</span>
        </div>

        <div className="flex items-baseline justify-between mt-3">
          <span className="text-sm text-xp-muted">Payout</span>
          <span className="font-display text-2xl text-xp-green">
            {formatCents(booking.payoutCents)}
          </span>
        </div>
      </div>
    </div>
  );
}
