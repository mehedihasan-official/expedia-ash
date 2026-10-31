import type { Resort, ResortBooking, Testimonial } from "@/lib/types";

// Company name used in the dashboard copy (plans, member stories, testimonials,
// footer). Change it here and every mention updates.
export const BRAND_NAME = "Expedia";

// ---------------------------------------------------------------------------
// ADDING A NEW YEAR (e.g. 2027)
// ---------------------------------------------------------------------------
// There is no database here on purpose — this file *is* the dashboard's data.
// To make 2027 (or any other year) appear in the dashboard's year dropdown,
// just add a booking with `year: 2027` to any resort below:
//
//   { id: "KL364001", status: "Paid",
//     dateRange: "Mar 14, 2027 - Mar 21, 2027",
//     year: 2027, payoutCents: 310000 }
//
// The dropdown, the total payout figure, the "All Listings (N)" counter and
// the card grid all derive from these objects via getAvailableYears() /
// getBookingsForYear() at the bottom of this file. No component changes, no
// route changes, no migration — save the file and 2027 is there, selected by
// default because the list is sorted newest-first.
// ---------------------------------------------------------------------------

// Koala's actual resort data (from the resort details he provided).
//
// Scope was for 3-4 resorts on this page. The layout (grid, "All Listings (N)"
// counter, total payout) scales cleanly to more without any code changes. To
// add the next resort, copy one of the objects below, swap in its real Ref ID
// / dates / year / payout, and point `image` at a photo dropped into
// public/images/ (rsort-img3.webp is already sitting in that folder, unused,
// ready for the next resort once its details come in).
export const resorts: Resort[] = [
  {
    id: "cypress-harbour-4",
    name: "Holiday Inn Club Vacations Orange Lake Resort",
    unitType: "3 Bd villa",
    location: "Orlando, Florida",
    image: "/images/rsort-img5.webp",
    bookings: [
      {
        id: "KL359661",
        status: "Paid",
        dateRange: "Sep 06, 2025 - Sep 13, 2025",
        year: 2025,
        payoutCents: 241300, // $2,413.00
      },
      {
        id: "KL363330",
        status: "Paid",
        dateRange: "Jan 02, 2026 - Jan 09, 2026",
        year: 2026,
        payoutCents: 186555, // $1,865.55
      },
    ],
  },

  {
    id: "cypress-harbour-1",
    name: "Marriott's Cypress Harbour",
    unitType: "2 Bedroom Villa",
    location: "Orlando, FL",
    image: "/images/rsort-img1.webp",
    bookings: [
      {
        id: "KL358810",
        status: "Paid",
        dateRange: "Feb 14, 2025 - Feb 21, 2025",
        year: 2025,
        payoutCents: 298400, // $2,984.00
      },
      {
        id: "KL363332",
        status: "Paid",
        dateRange: "Jun 05, 2026 - Jun 12, 2026",
        year: 2026,
        payoutCents: 345568, // $3,455.68
      },
    ],
  },

  {
    id: "cypress-harbour-2",
    name: "Marriott's Cypress Harbour",
    unitType: "2 Bedroom Villa",
    location: "Orlando, FL",
    image: "/images/rsort-img2.webp",
    bookings: [
      {
        id: "KL363333",
        status: "Paid",
        dateRange: "Jun 05, 2026 - Jun 12, 2026",
        year: 2026,
        payoutCents: 393755, // $3,937.55
      },
    ],
  },

  {
    id: "cypress-harbour-5",
    name: "The Residences at Orange Lake Resort",
    unitType: "Holiday Inn Club Vacations",
    location: "Kissimmee, FL 34747",
    image: "/images/rsort-img6.webp",
    bookings: [
      {
        id: "KL363330",
        status: "Paid",
        dateRange: "Jul 19, 2026 - Jul 22, 2026",
        year: 2026,
        payoutCents: 579867, // $5,798.67
      },
    ],
  },

  {
    id: "cypress-harbour-3",
    name: "Westin Princeville Ocean Resort Villas",
    unitType: "Studio Standard",
    location: "3838 Wyllie Road, Princeville, HI, 96722",
    image: "/images/rsort-img4.webp",
    bookings: [
      {
        id: "KL359204",
        status: "Paid",
        dateRange: "Oct 11, 2025 - Oct 18, 2025",
        year: 2025,
        payoutCents: 412990, // $4,129.90
      },
      {
        id: "KL363334",
        status: "Paid",
        dateRange: "Aug 09, 2026 - Aug 16, 2026",
        year: 2026,
        payoutCents: 273693, // $2,736.93
      },
    ],
  },

  {
  id: "disneys-animal-kingdom-villas-jambo-house-2bd",
  name: "Disney's Animal Kingdom Villas at Jambo House",
  unitType: "2 Bedroom",
  location: "2901 Osceola Parkway, Lake Buena Vista, FL, 32830",
  image: "/images/disney-animal-kingdom.jpg", // placeholder — set to your local asset filename
  bookings: [
    {
      id: "KLXXXXXX", // Ash didn't give a booking ID — fill in once you have it
      status: "Paid", // assumed to match your existing entries — confirm with Ash
      dateRange: "Oct 24, 2025 - Oct 31, 2025",
      year: 2025,
      payoutCents: 464755, // $4,647.55
    },
  ],
},
];

// --- Derived helpers -------------------------------------------------------
// The dashboard reads everything through these, so the page component stays
// thin and the year list is always whatever is actually in the data above.

// Every resort + booking pair, flattened so each booking renders as its own
// card (two bookings on one resort = two cards, as in the reference screens).
export function getAllBookings(): ResortBooking[] {
  return resorts.flatMap((resort) =>
    resort.bookings.map((booking) => ({ resort, booking })),
  );
}

// Years present in the data, newest first. Add a booking with a new `year`
// and it shows up here — and therefore in the dropdown — automatically.
export function getAvailableYears(): number[] {
  return Array.from(
    new Set(getAllBookings().map(({ booking }) => booking.year)),
  ).sort((a, b) => b - a);
}

// The most recent year with payouts — the dashboard's default selection.
export function getDefaultYear(): number {
  return getAvailableYears()[0] ?? new Date().getFullYear();
}

export function getBookingsForYear(year: number): ResortBooking[] {
  return getAllBookings().filter(({ booking }) => booking.year === year);
}

export function getTotalPayoutCentsForYear(year: number): number {
  return getBookingsForYear(year).reduce(
    (sum, { booking }) => sum + booking.payoutCents,
    0,
  );
}

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    guestName: "Janice M.",
    quote: `The booking was seamless and the villa was even better than the photos. Would rent from ${BRAND_NAME} again in a heartbeat.`,
    rating: 5,
  },
  {
    id: "t-2",
    guestName: "Thomas C.",
    quote:
      "Great communication throughout and the resort amenities were fantastic for our family trip.",
    rating: 5,
  },
  {
    id: "t-3",
    guestName: "Laurie K.",
    quote:
      "Easy process from start to finish. Everything matched what was promised — highly recommend.",
    rating: 5,
  },
];
