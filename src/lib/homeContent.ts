// Static content for the home page — mirrors the Expedia reference screenshots.
// Swap image paths / copy here (and drop new photos into /public/images).
//
// Some values differ between the desktop and the tablet/mobile screenshots
// (different travel dates → different prices). Those fields carry both:
// `d` = desktop (lg and up), `m` = tablet + mobile.

export interface Resp {
  d: string;
  m: string;
}

export interface ServiceTab {
  id: string;
  label: string;
  icon: string;
  href: string;
  /** hidden on phones (the mobile screenshot only shows four tabs) */
  desktopOnly?: boolean;
}

export const serviceTabs: ServiceTab[] = [
  { id: "stays", label: "Stays", icon: "/images/icon-stays.png", href: "/" },
  { id: "flights", label: "Flights", icon: "/images/icon-flights.png", href: "#" },
  { id: "cars", label: "Cars", icon: "/images/icon-cars.png", href: "#" },
  { id: "packages", label: "Packages", icon: "/images/icon-packages.png", href: "#" },
  { id: "things", label: "Things to do", icon: "/images/icon-things.png", href: "#", desktopOnly: true },
  { id: "cruises", label: "Cruises", icon: "/images/icon-cruises.png", href: "#", desktopOnly: true },
];

export interface HotelDeal {
  id: string;
  name: string;
  location: string;
  image: string;
  score: string;
  ratingLabel: string;
  reviews: number;
  memberPrice?: boolean;
  off?: Resp;
  nightly: Resp;
  total: Resp;
  strike: Resp;
}

export const lastMinuteDeals: HotelDeal[] = [
  {
    id: "royal-palace-uttara",
    name: "The Royal Palace Uttara",
    location: "Dhaka",
    image: "/images/hotel-royal-palace.jpg",
    score: "10",
    ratingLabel: "Exceptional",
    reviews: 3,
    memberPrice: true,
    nightly: { d: "$61", m: "$61" },
    total: { d: "$155", m: "$155" },
    strike: { d: "$207", m: "$207" },
  },
  {
    id: "grand-palace-sylhet",
    name: "Grand Palace Hotel & Resorts Sylhet",
    location: "Sylhet",
    image: "/images/hotel-grand-palace.jpg",
    score: "9.0",
    ratingLabel: "Wonderful",
    reviews: 9,
    off: { d: "$43 off", m: "$120 off" },
    nightly: { d: "$64", m: "$43" },
    total: { d: "$162", m: "$108" },
    strike: { d: "$205", m: "$228" },
  },
  {
    id: "hotel-grand-park",
    name: "Hotel Grand Park",
    location: "Barisal",
    image: "/images/hotel-grand-park.jpg",
    score: "8.6",
    ratingLabel: "Excellent",
    reviews: 16,
    off: { d: "$57 off", m: "$57 off" },
    nightly: { d: "$91", m: "$91" },
    total: { d: "$230", m: "$230" },
    strike: { d: "$287", m: "$287" },
  },
];

export const promoCards = [
  {
    id: "luxury",
    tag: "Featured",
    title: "Save up to 15% on luxury vacations",
    body: "Deals on premium flights and standout stays for your next trip",
    cta: "Book now",
  },
  {
    id: "last-minute",
    tag: "Promotion",
    title: "Last minute deals – up to 25% off",
    body: "Save on hotels, vacation rentals, packages, and flights",
    cta: "Book now",
  },
];

export const bundleItems = [
  {
    id: "bundle",
    icon: "/images/icon-bundle.png",
    title: "Bundle & Save",
    body: "Save whether you book your trip all at once, or over time",
    cta: "Get started",
  },
  {
    id: "one-stop",
    icon: "/images/icon-onestop.png",
    title: "One-stop travel shop",
    body: "Book flights, hotels, homes, cars and more - all in one place",
    cta: "Start planning",
  },
  {
    id: "one-key",
    icon: "/images/icon-onekey.png",
    title: "Expedia One Key",
    body: "Instant discounts, plus OneKeyCash for the future",
    cta: "Join for free",
  },
];

export const vacationRentals = [
  { id: "private", label: "Private vacation homes", image: "/images/rental-private-homes.jpg" },
  { id: "apartments", label: "Apartments & Condos", image: "/images/rental-apartments.jpg" },
  { id: "cabins", label: "Cabins", image: "/images/rental-cabins.jpg" },
  { id: "cottages", label: "Cottages", image: "/images/rental-cottages.jpg" },
  { id: "villas", label: "Villas", image: "/images/rental-villas.jpg" },
];

export const stayTabs = ["Beach", "Culture", "Ski", "Family", "Wellness and Relaxation"];

export interface StayCard {
  id: string;
  city: string;
  region: string;
  price: string;
  badge: string;
  image: string;
  /** desktop = lg+ only, mobile = below lg only (the screenshots personalise the list) */
  show: "all" | "desktop" | "mobile";
}

export const staysByStyle: Record<string, StayCard[]> = {
  Beach: [
    { id: "alicante", city: "Alicante", region: "Valencian Community, Spain", price: "$157", badge: "Mediterranean vibe", image: "/images/stay-alicante.jpg", show: "mobile" },
    { id: "wichit", city: "Wichit", region: "Phuket Province, Thailand", price: "$81", badge: "", image: "/images/stay-wichit.jpg", show: "mobile" },
    { id: "busan", city: "Busan", region: "South Korea", price: "$125", badge: "Coastal charm", image: "/images/stay-busan.jpg", show: "desktop" },
    { id: "pattaya", city: "Pattaya", region: "Chonburi Province, Thailand", price: "$46", badge: "Lively beaches", image: "/images/stay-pattaya.jpg", show: "all" },
    { id: "sydney", city: "Sydney", region: "New South Wales, Australia", price: "$205", badge: "Modern and vibrant", image: "/images/stay-sydney.jpg", show: "desktop" },
    { id: "princeville", city: "Princeville", region: "Hawaii, United States of America", price: "$806", badge: "Tropical serenity", image: "/images/stay-princeville.jpg", show: "desktop" },
  ],
};

export const seattleAd = {
  heading: "Your fall family escape",
  body: "From colorful leaves to hands-on museums and great food, Seattle is made for fall family trips.",
  images: [
    { label: "City", image: "/images/seattle-city.jpg" },
    { label: "Places to go", image: "/images/seattle-places.jpg" },
    { label: "Things to do", image: "/images/seattle-things.jpg" },
  ],
};

export const savingsDisclaimer =
  "*Savings vary and are not available on all packages. Savings are compared to the price of the same components booked separately.";

// "Explore a world of travel with Expedia" — link lists. The first tab matches
// the screenshot (row-major order: 4 columns on desktop, 1 column on mobile).
export const exploreTabs: { id: string; label: string; links: string[] }[] = [
  {
    id: "domestic-hotels",
    label: "Top Hotel Deals on Domestic Destinations",
    links: [
      "Top Hotels in Chicago", "Top Hotels in Pigeon Forge", "Top Hotels in Myrtle Beach", "Top Hotels in Los Angeles",
      "Top Hotels in Nashville", "Top Hotels in San Francisco", "Top Hotels in Miami", "Top Hotels in New Orleans",
      "Top Hotels in Atlanta", "Top Hotels in Orlando", "Top Hotels in Las Vegas", "Top Hotels in Anna Maria Island",
      "Top Hotels in New York City", "Top Hotels in Boston", "Top Hotels in Houston", "Top Hotels in Dallas",
      "Top Hotels in Kansas City", "Top Hotels in Philadelphia", "Top Hotels in Seattle", "Top Hotels in Washington, DC",
    ],
  },
  {
    id: "intl-hotels",
    label: "Book hotels internationally",
    links: [
      "Hotels in London", "Hotels in Paris", "Hotels in Rome", "Hotels in Cancún",
      "Hotels in Tokyo", "Hotels in Toronto", "Hotels in Dubai", "Hotels in Barcelona",
      "Hotels in Amsterdam", "Hotels in Bangkok", "Hotels in Sydney", "Hotels in Madrid",
      "Hotels in Mexico City", "Hotels in Dublin", "Hotels in Istanbul", "Hotels in Singapore",
      "Hotels in Berlin", "Hotels in Lisbon", "Hotels in Bali", "Hotels in Vancouver",
    ],
  },
  {
    id: "domestic-flights",
    label: "Find flight deals to domestic cities",
    links: [
      "Flights to Chicago", "Flights to Orlando", "Flights to Las Vegas", "Flights to Los Angeles",
      "Flights to Atlanta", "Flights to Dallas", "Flights to Denver", "Flights to New York",
      "Flights to Miami", "Flights to Seattle", "Flights to Boston", "Flights to Phoenix",
      "Flights to Houston", "Flights to San Diego", "Flights to Nashville", "Flights to Honolulu",
      "Flights to San Francisco", "Flights to Washington, DC", "Flights to Austin", "Flights to Charlotte",
    ],
  },
  {
    id: "intl-flights",
    label: "Top International Flights",
    links: [
      "Flights to London", "Flights to Paris", "Flights to Cancún", "Flights to Rome",
      "Flights to Tokyo", "Flights to Dublin", "Flights to Toronto", "Flights to Dubai",
      "Flights to Madrid", "Flights to Amsterdam", "Flights to Bangkok", "Flights to Mexico City",
      "Flights to Barcelona", "Flights to Lisbon", "Flights to Seoul", "Flights to Singapore",
      "Flights to Istanbul", "Flights to Sydney", "Flights to Vancouver", "Flights to Dhaka",
    ],
  },
  {
    id: "packages",
    label: "Save today on vacation packages",
    links: [
      "Packages to Orlando", "Packages to Las Vegas", "Packages to Cancún", "Packages to Miami",
      "Packages to Honolulu", "Packages to New York", "Packages to Punta Cana", "Packages to Los Angeles",
      "Packages to Chicago", "Packages to Maui", "Packages to San Diego", "Packages to Nashville",
      "Packages to Seattle", "Packages to Boston", "Packages to Fort Lauderdale", "Packages to New Orleans",
      "Packages to Atlanta", "Packages to Myrtle Beach", "Packages to Washington, DC", "Packages to Dallas",
    ],
  },
];

export const footerColumns: { heading: string; links: string[] }[] = [
  { heading: "Company", links: ["About", "Jobs", "List your property", "Partnerships", "Newsroom", "Investor Relations", "Advertising", "Affiliate Marketing", "Feedback"] },
  { heading: "Explore", links: ["United States of America travel guide", "Hotels in United States of America", "Vacation rentals in United States of America", "Vacation packages in United States of America", "Domestic flights", "Car rentals in United States of America", "All accommodation types", "Rewards with One Key", "One Key credit cards"] },
  { heading: "Policies", links: ["Privacy", "Cookies", "Terms of use", "One Key™ terms and conditions", "Vrbo terms and conditions", "Accessibility", "Your privacy choices", "Content guidelines and reporting content"] },
  { heading: "Help", links: ["Support", "Cancel your hotel or vacation rental booking", "Cancel your flight", "Refund basics", "Use an Expedia coupon", "International travel documents", "Your rights as a flights traveler"] },
];

export const footerCopyright =
  "© 2026 Expedia, Inc., an Expedia Group company. All rights reserved. Expedia and the Expedia Logo are trademarks or registered trademarks of Expedia, Inc. CST# 2029030-50.";
