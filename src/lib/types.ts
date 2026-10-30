// A single reservation/payout for a resort — matches the "KL363332" style
// booking cards Koala referenced (Ref ID, dates, status, payout amount).
export interface Booking {
  id: string; // e.g. "KL363332" — shown as the reference number
  status: "Paid" | "Pending" | "Expired";
  dateRange: string; // e.g. "Jun 05, 2026 - Jun 12, 2026"
  // Explicit payout year. Kept as its own field rather than parsed out of
  // `dateRange` so the year switcher never depends on string formatting,
  // and so a stay that straddles New Year can be booked to whichever year
  // the payout actually lands in.
  year: number; // e.g. 2026
  payoutCents: number;
  guestNights?: number;
}

export interface Resort {
  id: string;
  name: string; // e.g. "Marriott's Cypress Harbour"
  unitType?: string; // e.g. "2 Bedroom Villa"
  location?: string;
  image: string; // path under /public or a remote URL
  bookings: Booking[];
}

// A booking paired with the resort it belongs to — the flattened shape the
// dashboard grid renders, one card per booking.
export interface ResortBooking {
  resort: Resort;
  booking: Booking;
}

export interface Testimonial {
  id: string;
  guestName: string;
  quote: string;
  rating: number;
  propertyName?: string;
}

export function formatCents(cents: number): string {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}
