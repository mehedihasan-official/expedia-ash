import Link from "next/link";

/** Expedia-style wordmark: yellow arrow tile + "Expedia". Pure SVG/CSS, no image. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Expedia home"
      className={`inline-flex items-center gap-[7px] text-xp-navy ${className}`}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="h-[21px] w-[21px] shrink-0 md:h-6 md:w-6">
        <rect width="24" height="24" rx="3.5" fill="#fddb32" />
        <path
          d="M7.2 16.8 16 8M9.6 7.6h6.8v6.8"
          fill="none"
          stroke="#191e3b"
          strokeWidth="2.3"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
      <span className="text-[26px] font-medium md:text-[28.5px] leading-none tracking-[-0.03em]">Expedia</span>
    </Link>
  );
}
