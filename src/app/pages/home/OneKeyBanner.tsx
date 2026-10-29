import Image from "next/image";
import Link from "next/link";

/** Black "Key+" credit-card graphic, drawn in SVG so no extra image is needed. */
function KeyCard() {
  return (
    <svg viewBox="0 0 72 113" className="h-[105px] w-[67px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] md:h-[113px] md:w-[72px]" aria-hidden="true">
      <defs>
        <linearGradient id="key-card" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a2a2a" />
          <stop offset="1" stopColor="#0d0d0d" />
        </linearGradient>
      </defs>
      <rect width="72" height="113" rx="5" fill="url(#key-card)" />
      <rect x="40" y="9" width="15" height="12" rx="2" fill="#cfd2d6" />
      <rect x="40" y="13" width="15" height="1" fill="#8d9096" />
      <text x="4" y="62" fill="#fff" fontSize="26" fontWeight="300" fontFamily="Figtree Variable, Figtree, sans-serif" letterSpacing="-1">
        ‹ey
      </text>
      <text x="52" y="52" fill="#fff" fontSize="10" fontFamily="Figtree Variable, Figtree, sans-serif">+</text>
      <circle cx="51" cy="101" r="4.6" fill="#8a8a8a" />
      <circle cx="57" cy="101" r="4.6" fill="#b5b5b5" fillOpacity="0.8" />
    </svg>
  );
}

export default function OneKeyBanner() {
  return (
    <section className="mx-auto mt-12 max-w-[1248px] px-6 md:mt-[52px] md:px-6">
      <Link
        href="#"
        className="group relative flex min-h-[151px] items-stretch overflow-hidden rounded-2xl border border-xp-line bg-white transition hover:shadow-md md:h-[162px]"
      >
        <div className="relative w-[105px] shrink-0 md:w-[43%] desk:w-[448px]">
          <Image src="/images/onekey-photo.jpg" alt="" fill sizes="448px" className="object-cover object-left" />
        </div>

        {/* card straddles the photo edge */}
        <div className="absolute left-[69px] top-1/2 -translate-y-1/2 md:left-[calc(43%-36px)] desk:left-[412px]">
          <KeyCard />
        </div>

        <div className="flex flex-1 items-center justify-between gap-3 py-4 pl-[72px] pr-5 md:pl-[64px] md:pr-8">
          <div>
            <p className="text-base font-medium leading-6 md:text-lg">
              Earn $350 in OneKeyCash™
            </p>
            <p className="mt-2 text-xs leading-4 md:mt-3 md:text-sm md:leading-5">
              after qualifying purchases. Terms apply.
            </p>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
            <path d="m9 5 7 7-7 7" stroke="#191e3b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </Link>
    </section>
  );
}
