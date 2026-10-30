"use client";

import { BRAND_NAME } from "@/lib/dashboardContent";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useRef, useState, useSyncExternalStore } from "react";

// ---------------------------------------------------------------------------
// Content — edit here.
//
// PLACEHOLDER COPY: the quote, names and photo below are sample content so the
// layout can be reviewed. Swap them for a real member's testimonial (and a
// photo you have permission to use) before going live.
// ---------------------------------------------------------------------------

const MEMBER = {
  quote:
    `${BRAND_NAME} turned our timeshare from a burden into a blessing. Our week rented quickly, the payout arrived right on schedule, and we’ve already sent friends and family to list with ${BRAND_NAME} too. We can’t thank you enough!`,
  names: "Dan & Linda R.",
  since: "MEMBERS SINCE 2014",
  photo: "/images/what-is-section-1.png",
  photoAlt: `Dan and Linda R., ${BRAND_NAME} members, smiling together at a table`,
  background: "/images/featured2.webp",
};

const SEARCH_PLACEHOLDER = "Search by location, resort name, or brand";
// Same prompt, short enough to fit a 320px-wide phone next to the button.
const SEARCH_PLACEHOLDER_SHORT = "Location, resort, brand";

// True below Tailwind's `sm` breakpoint. useSyncExternalStore keeps server and
// first client render identical (false) so there is no hydration mismatch.
function useIsPhone() {
  return useSyncExternalStore(
    (notify) => {
      const mql = window.matchMedia("(max-width: 639px)");
      mql.addEventListener("change", notify);
      return () => mql.removeEventListener("change", notify);
    },
    () => window.matchMedia("(max-width: 639px)").matches,
    () => false,
  );
}

// Shortcut destinations under the search bar. `href` is where each one goes;
// the last entry is the "and more" link.
const BROWSE_LINKS = [
  { label: "Disney", href: "/?q=Disney" },
  { label: "Thanksgiving", href: "/?q=Thanksgiving" },
  { label: "Christmas", href: "/?q=Christmas" },
  { label: "Las Vegas", href: "/?q=Las%20Vegas" },
  { label: "Aruba", href: "/?q=Aruba" },
  { label: "Hawaii", href: "/?q=Hawaii" },
  { label: "Mexico", href: "/?q=Mexico" },
  { label: "California", href: "/?q=California" },
];
const BROWSE_MORE = { label: "and more »", href: "/" };

// ---------------------------------------------------------------------------
// Section: member story banner + resort search + browse shortcuts
// ---------------------------------------------------------------------------

export default function PricingHero() {
  return (
    <section aria-label="Member story and resort search" className="bg-white">
      <MemberBanner />
      <SearchArea />
    </section>
  );
}

function MemberBanner() {
  return (
    <div className="relative isolate overflow-hidden bg-xp-navy">
      <Image
        fill
        src={MEMBER.background}
        alt=""
        aria-hidden="true"
        sizes="100vw"
        className="-z-10 object-cover object-[50%_35%]"
      />

      {/* Bare photo shows above the dark band; the polaroid straddles the two */}
      <div className="pt-24 sm:pt-28 lg:pt-32">
        <div className="bg-xp-navy/70 py-7 backdrop-blur-[2px] lg:py-8">
          <figure className="mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-y-5 px-5 text-center sm:px-6 md:grid-cols-[auto_minmax(0,1fr)] md:justify-items-start md:gap-x-8 md:gap-y-3 md:text-left lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:gap-x-10 lg:gap-y-0">
            <Polaroid />

            <blockquote className="max-w-xl text-sm italic leading-relaxed text-white sm:text-base md:col-start-2 md:row-start-1 md:self-end lg:col-start-1 lg:max-w-lg lg:justify-self-end lg:text-center">
              <p>&ldquo;{MEMBER.quote}&rdquo;</p>
            </blockquote>

            <figcaption className="md:col-start-2 md:row-start-2 md:self-start lg:col-start-3 lg:row-start-1 lg:self-center">
              <p className="font-display text-3xl italic leading-tight text-white sm:text-4xl">
                {MEMBER.names}
              </p>
              <p className="mt-1 text-[0.7rem] font-medium tracking-[0.14em] text-white/80">
                {MEMBER.since}
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}

function Polaroid() {
  return (
    <div className="-mt-28 w-52 shrink-0 -rotate-2 bg-white p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:w-56 md:row-span-2 md:row-start-1 md:col-start-1 md:self-start lg:col-start-2 lg:row-span-1 lg:-mt-32 lg:w-64">
      <div className="relative aspect-[4/3] overflow-hidden bg-xp-gray">
        <Image
          fill
          src={MEMBER.photo}
          alt={MEMBER.photoAlt}
          sizes="(min-width: 1024px) 256px, (min-width: 640px) 224px, 208px"
          className="object-cover"
        />
      </div>
    </div>
  );
}

function SearchArea() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const [query, setQuery] = useState("");
  const isPhone = useIsPhone();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      inputRef.current?.focus();
      return;
    }
    router.push(`/?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <div className="border-b border-xp-line">
      <div className="mx-auto max-w-6xl px-4 pb-4 pt-5 sm:px-6 sm:pt-6">
        <form
          role="search"
          onSubmit={handleSubmit}
          className="flex h-14 overflow-hidden rounded-lg border border-xp-line bg-white shadow-sm focus-within:border-xp-blue focus-within:ring-2 focus-within:ring-xp-blue/30"
        >
          <label htmlFor={inputId} className="sr-only">
            {SEARCH_PLACEHOLDER}
          </label>
          <div className="flex min-w-0 flex-1 items-center gap-3 pl-4 pr-2 sm:pl-5">
            <Search
              aria-hidden="true"
              className="hidden size-5 shrink-0 text-xp-muted sm:block"
              strokeWidth={2}
            />
            <input
              id={inputId}
              ref={inputRef}
              type="search"
              name="q"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={isPhone ? SEARCH_PLACEHOLDER_SHORT : SEARCH_PLACEHOLDER}
              autoComplete="off"
              enterKeyHint="search"
              className="min-w-0 flex-1 bg-transparent text-base text-xp-navy placeholder:text-sm placeholder:text-xp-muted focus:outline-none sm:placeholder:text-base"
            />
          </div>
          <button
            type="submit"
            className="shrink-0 bg-xp-blue px-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-xp-blue-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white sm:px-10 sm:text-base"
          >
            SEARCH
          </button>
        </form>

        <nav
          aria-label="Browse popular searches"
          className="mt-4 flex flex-wrap items-baseline justify-center gap-x-1.5 gap-y-1 text-center text-sm text-xp-navy"
        >
          <span>or browse</span>
          <ul className="flex flex-wrap justify-center gap-x-1.5">
            {BROWSE_LINKS.map((link) => (
              <li key={link.label} className="after:content-[',']">
                <Link
                  href={link.href}
                  className="inline-block py-1 text-xp-blue hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-xp-blue/50"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={BROWSE_MORE.href}
                className="inline-block py-1 text-xp-blue hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-xp-blue/50"
              >
                {BROWSE_MORE.label}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
